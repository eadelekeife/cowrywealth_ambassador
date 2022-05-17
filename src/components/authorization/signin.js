import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';
import { loginUser } from '../../common_files/reducers/auth';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/logo_green.svg';

import { Controller, useForm } from 'react-hook-form';

const SignIn = props => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validator = yup.object().shape({
        emailAddress: yup.string().email('Email is not valid').required('Email field can not be empty'),
        password: yup.string().min(6).required('Password field can not be empty')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValue: {
            emailAddress: "",
            password: "",
        },
        resolver: yupResolver(validator)
    });

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            navigate('/');
        }
        if (props.loginError.loginError.length) {
            setErrorMessage(props.loginError.loginError)
        }
    }, [props.auth, props.loginError]);

    const submitMe = e => {
        let { emailAddress, password } = e;
        props.loginUser({
            emailAddress, password
        });
    }

    return (
        <div>
            <div className="auth_bg">
                <div className="form_display">
                    <div className="form_heading_text">
                        <img src={Logo} alt="logo" />
                        {/* <h3 className="big_site_text">Event Basic Info</h3> */}
                        <p>Help people in the area discover your event and let attendees know
                            where to show up. Name your event and tell event-goers why they
                            should come. Add details that highlight what makes it unique.</p>
                    </div>
                    {
                        errorMessage ?
                            <p className="errorMessage">{errorMessage}</p>
                            : ''
                    }
                    <form onSubmit={handleSubmit(submitMe)}>
                        <div className="form-group">
                            <label htmlFor="emailAddress" style={{ width: '100%' }}>Email Address</label>
                            <Controller control={control} defaultValue="" name="emailAddress"
                                render={({ field }) => (
                                    <Input {...field} id="emailAddress"
                                        type="email" style={{ height: '3rem' }} />
                                )
                                } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" style={{ width: '100%' }}>Password</label>
                            <Controller control={control} defaultValue="" name="password"
                                render={({ field }) => (
                                    <Input.Password {...field} id="password"
                                        type="password" style={{ height: '3rem' }} />
                                )
                                } />
                        </div>
                        <div>
                            <div style={{ marginTop: '7%' }}></div>
                            <button
                                style={{ width: '100%' }}
                                className="bg_red">Login to Ambassadors Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// export default SignIn;
const mapStateToProps = state => {
    return { auth: state.auth, loginError: state.loginError }
}

export default connect(mapStateToProps, { loginUser })(SignIn);