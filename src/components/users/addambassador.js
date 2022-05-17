import '../../assets/css/events.css';

import React, { useState } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Input, Spin, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../common_files/axiosurl';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// import Options from '../../common_files/questions';

const NewCategory = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [spinnerStatus, setSpinnerStatus] = useState(false);

    const navigate = useNavigate();

    const resolveForm = yup.object().shape({
        categoryName: yup.string().required('Please enter category name')
    })

    const { handleSubmit, control, formState: { errors } } = useForm({
        // resolver: yupResolver(resolveForm)
    });

    // image upload

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG/WEBP file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const watchFileChange = info => {
        // if (info.file.status === 'uploading') {
        //     setLoading(true)
        //     // this.setState({ loading: true });
        //     return;
        // }
        // if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
            setImageUrl(imageUrl),
            setLoading(false)
            // this.setState({
            //     imageUrl,
            //     loading: false,
            // }),
        );
        // }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const saveCategory = e => {
        setErrorMessage('');
        setSpinnerStatus(true);
        axios.post('/admin/asd', {}).then(categorySaved => {
            console.log(categorySaved)
        })
            .catch(err => {
                setErrorMessage('An error occurred while saving category data. Please try again')
                setSpinnerStatus(false);
            })
    }

    return (
        <div>
            <Spin spinning={spinnerStatus}>
                <div className="portal_page">
                    <div>
                        <SideNav />
                    </div>
                    <div className="main_content">
                        <TopNav currentPage={"Create Community Category"}
                            buttonTitle={"See all categories under Communities"}
                            buttonLink={"/Communities"}
                            currentPageInfo={"Create a Category for Communities"} />
                        <div>
                            <div className="main_compartment">
                                <div className="main_compartment_content_display">
                                    <div className="main_compartment_content">
                                        <div className="form_display">
                                            <form onSubmit={handleSubmit(saveCategory)}>
                                                <div>
                                                    <div className="form_heading_text">
                                                        <h3 className="big_site_text">Businesses Basic Info</h3>
                                                        <p>Help people in the area discover your event and let attendees know
                                                            where to show up. Name your event and tell event-goers why they
                                                            should come. Add details that highlight what makes it unique.</p>
                                                    </div>
                                                    <div>
                                                        {
                                                            errorMessage ?
                                                                <p className="errorMessage">{errorMessage}</p> : ''
                                                        }
                                                    </div>
                                                    <div className="form_flex_2">
                                                        <div className="form-group">
                                                            <label htmlFor="firstName">FIrst name</label>
                                                            <Controller control={control} defaultValue="" name="firstName"
                                                                render={({ field }) => (
                                                                    <Input {...field} id="firstName"
                                                                        type="text" style={{ height: '3rem' }} />
                                                                )
                                                                } />

                                                            {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="lastName">Last name</label>
                                                            <Controller control={control} defaultValue="" name="lastName"
                                                                render={({ field }) => (
                                                                    <Input {...field} id="lastName"
                                                                        type="text" style={{ height: '3rem' }} />
                                                                )
                                                                } />

                                                            {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="emailAddress">Email address</label>
                                                        <Controller control={control} defaultValue="" name="emailAddress"
                                                            render={({ field }) => (
                                                                <Input {...field} id="emailAddress"
                                                                    type="email" style={{ height: '3rem' }} />
                                                            )
                                                            } />
                                                        {errors.emailAddress && <p className="errorMessage">{errors.emailAddress.message}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="phoneNumber">Phone number</label>
                                                        <Controller control={control} defaultValue="" name="phoneNumber"
                                                            render={({ field }) => (
                                                                <Input {...field} id="phoneNumber"
                                                                    type="tel" style={{ height: '3rem' }} />
                                                            )
                                                            } />

                                                        {errors.phoneNumber && <p className="errorMessage">{errors.phoneNumber.message}</p>}
                                                    </div>
                                                    <div>
                                                        <div style={{ marginTop: '5%' }}></div>
                                                        <button
                                                            className="bg_red">Send mail to ambassador</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default NewCategory;