import React, { useState, useEffect } from 'react';
import { supportedLanguages, translations } from '../translation/Translation';
import './Login.css';
import Logo from '../assets/images/logo.svg';
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [language, setLanguage] = useState('en');
    const [errors, setErrors] = useState({});
    const [submitCount, setSubmitCount] = useState(0);


    const validate = () => {

        let err = {}

        if (email === '') {
            err.email = 'Email required!'
        } else {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (!regex.test(email)) {
                err.email = 'Email not valid!'
            }
        }
    
        if (password === '') {
            err.password = 'Password required!'
        } else {
            if (password.length < 6) {
                err.password = 'Password should greater than 6 characters!'
            }
        }
    
        if (language === '') {
            err.language = 'Any one language required!'
        }
    
        setErrors({ ...err })
    
        return Object.keys(err).length < 1;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitCount(submitCount + 1);
        const tempErrors = validate();
        if (Object.keys(tempErrors).length === 0) {
            console.log('Form submitted');
            console.log({ email, password, rememberMe, language });
             //API call to server
        } else {
            setErrors(tempErrors);
        }
    };
    useEffect(() => {
        const browserLanguage = navigator.language.split('-')[0];
        if (supportedLanguages.includes(browserLanguage)) {
            setLanguage(browserLanguage);
        } else {
            setLanguage('en');
        }
    }, []);
    return (
        <>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-12 col-12 mx-auto mb-5">
                        <div className="logo"><img src={Logo} alt="" /></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-sm-12 col-12 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="login-wrap">
                                <div className="form-group mb-4">
                                    <div className="row align-items-center">
                                        <div className="col-lg-2 col-md-4 col-sm-12 col-12">
                                            <label className="form-label">{translations[language].email}:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-8 col-sm-12 col-12">
                                            <div className="input-wrap">
                                                <input type="email" name='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <span className="input-icon">
                                                    <AiOutlineMail />
                                                </span>
                                            </div>
                                            <span className='non-valid'>{errors.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="row align-items-center">
                                        <div className="col-lg-2 col-md-4 col-sm-12 col-12">
                                            <label htmlFor="" className="form-label mb-0">{translations[language].password}</label>
                                        </div>
                                        <div className="col-lg-10 col-md-8 col-sm-12 col-12">
                                            <div className="input-wrap">
                                                <input type="password" name='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <span className="input-icon">
                                                    <RiLockPasswordLine />
                                                </span>
                                            </div>
                                            <span className='non-valid'>{errors.password}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="row align-items-center">
                                        <div className="col-lg-2 col-md-4 col-sm-12 col-12">
                                            <label htmlFor="" className="form-label mb-0">{translations[language].language}</label>
                                        </div>
                                        <div className="col-lg-10 col-md-8 col-sm-12 col-12">
                                            <div className="input-wrap">
                                                <select value={language} name='language' className='form-select' onChange={(e) => setLanguage(e.target.value)}>
                                                    {supportedLanguages.map((lang) => (
                                                        <option key={lang} value={lang}>{translations[lang].language}</option>
                                                    ))}
                                                </select>
                                                {submitCount >= 2 && errors.language && <span className='non-valid'>{errors.language}</span>}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row align-items-center">
                                        <div className="col-lg-2 col-md-4 col-sm-12 col-12">
                                            <label htmlFor="" className="form-label mb-0">&nbsp;</label>
                                        </div>
                                        <div className="col-lg-10 col-md-8 col-sm-12 col-12">
                                            <div className="toggle-wrap d-flex align-items-center">
                                                <span className="switch me-2">
                                                    <input id="switch-rounded" name='remember' type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe} />
                                                    <label htmlFor="switch-rounded"></label>
                                                </span>
                                                <span className="title">{translations[language].rememberMe}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrap text-center">
                                <button type='submit' className='login-btn'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin
