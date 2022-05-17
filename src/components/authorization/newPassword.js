import React, {useEffect,useState} from 'react';
import { Input, Spin, Radio, message, Upload, Divider, Checkbox, Row, Col } from 'antd';
import axios from '../../common_files/axiosurl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {connect} from 'react-redux';
import {loginUser} from '../../common_files/reducers/auth';

import Logo from '../../assets/images/logo_green.svg';

import { Controller, useForm, useFieldArray } from 'react-hook-form';

const SignIn = props => {

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
            console.log(props.auth)
                // window.location = "/profile";
        }
        if (props.loginError.loginError.length) {
            document.querySelector('#submit-form').removeAttribute('disabled');
            document.querySelector('#submit-form').textContent = 'Sign in';
            setErrorMessage(props.loginError.loginError)
        }
    }, [props.auth, props.loginError]);

    const submitMe = e => {
        document.querySelector('#submit-form').setAttribute('disabled', true);
        document.querySelector('#submit-form').textContent = 'Signing you in....Please wait';
        let { emailAddress, password } = e;
        let cartId = localStorage.getItem('cartId') ? localStorage.getItem('cartId') : '';
        props.loginUser({
            emailAddress, password, cartId
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
                    <form>
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
                            style={{width: '100%'}}
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