import '../../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../../common_files/sideNav';
import TopNav from '../../../common_files/topNav';

import { Input, Spin, Radio, message, Upload, Divider, Checkbox, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../../common_files/axiosurl';

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
        resolver: yupResolver(resolveForm)
    });

    // image upload

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
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
        axios.post('/admin/createEventsCategory', {
            categoryImage: imageUrl,
            categoryName: e.categoryName,
        }).then(categorySaved => {
            if (categorySaved.data.summary === "success") {
                navigate('/');
            } else {
                setErrorMessage(categorySaved.data.statusMessage)
                setSpinnerStatus(false);
            }
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
                        <TopNav currentPage={"Create Event Category"}
                            buttonTitle={"See all categories under Events"}
                            buttonLink={"/events"}
                            currentPageInfo={"Create a Category for Events"} />
                        <div>
                            <div className="main_compartment">
                                <div className="main_compartment_content_display">
                                    <div className="main_compartment_content">
                                        <div className="form_display">
                                            <form onSubmit={handleSubmit(saveCategory)}>
                                                <div>
                                                    <div className="form_heading_text">
                                                        <h3 className="big_site_text">Event Basic Info</h3>
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
                                                    <div className="form-group">
                                                        <label htmlFor="coverImage" style={{ width: '100%' }}>Category Image</label>
                                                        <Controller control={control} defaultValue="" name="coverImage"
                                                            render={({ field }) => (
                                                                <Upload
                                                                    name="avatar"
                                                                    listType="picture-card"
                                                                    className="avatar-uploader"
                                                                    showUploadList={false}
                                                                    beforeUpload={beforeUpload}
                                                                    onChange={e => watchFileChange(e)}
                                                                >
                                                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                                                </Upload>
                                                            )
                                                            } />
                                                        {/* {errors.coverImage && <p className="form-error">{errors.coverImage.message}</p>} */}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="categoryName">Category name</label>
                                                        <Controller control={control} defaultValue="" name="categoryName"
                                                            render={({ field }) => (
                                                                <Input {...field} id="categoryName"
                                                                    type="text" style={{ height: '3rem' }} />
                                                            )
                                                            } />

                                                        {errors.categoryName && <p className="errorMessage">{errors.categoryName.message}</p>}
                                                    </div>
                                                    <div>
                                                        <div style={{ marginTop: '5%' }}></div>
                                                        <button className="bg_red">Save Category</button>
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