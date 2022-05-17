import React, { useEffect, useState } from 'react';
import { Input, Spin } from 'antd';
import axios from '../../common_files/axiosurl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';

import { Controller, useForm } from 'react-hook-form';

const SignIn = () => {

    let navigate = useNavigate();

    const [authError, setAuthError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { handleSubmit, control, formState: { errors } } = useForm({

    });
    useEffect(() => {
        axios.post('/ambassador/check_ambassador_email', {
            userCode: window.location.pathname.split('/')[2]
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setErrorMessage('Working now boss')
                    // setCategoryData(categoryData.data.message);
                    // setSpinnerStatus(false);
                } else {
                    setAuthError(true);
                    setErrorMessage(categoryData.data.statusMessage)
                    // setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
                // setSpinnerStatus(false);
            })
    }, [])
    const setPassword = e => {
        axios.post('/ambassador/set_ambassador_password', {
            userCode: window.location.pathname.split('/')[2],
            password: e.password   
        })
            .then(passwordSet => {
                if (passwordSet.data.summary === "success") {
                    navigate('/');
                } else {
                    setErrorMessage(passwordSet.data.statusMessage);
                    // setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while saving data. Please try again')
                // setSpinnerStatus(false);
            })
    }
    return (
        <div>
            <div className="auth_bg">
                <div className="form_display">
                    <div className="form_heading_text">
                        <h3 className="big_site_text">Event Basic Info</h3>
                        <p>Help people in the area discover your event and let attendees know
                            where to show up. Name your event and tell event-goers why they
                            should come. Add details that highlight what makes it unique.</p>
                    </div>
                    {
                        errorMessage ?
                            <p className="errorMessage">{errorMessage}</p>
                            : ''
                    }
                    <form onSubmit={handleSubmit(setPassword)}>
                        <div className="form-group">
                            <label htmlFor="password" style={{ width: '100%' }}>Password</label>
                            <Controller control={control} defaultValue="" name="password"
                                render={({ field }) => (
                                    <Input.Password {...field} id="password"
                                        disabled={authError ? true : false}
                                        type="password" style={{ height: '3rem' }} />
                                )
                                } />
                        </div>
                        <div>
                            <div style={{ marginTop: '7%' }}></div>
                            <button
                                disabled={authError ? true : false}
                                style={{ width: '100%' }}
                                className="bg_red">Login to Ambassadors Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;