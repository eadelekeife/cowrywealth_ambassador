import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { useNavigate } from 'react-router-dom';

import {
    Input, Spin, Radio, message, Upload, Divider, Checkbox,
    DatePicker, TimePicker,
    Row, Col, Select, notification
} from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import axios from '../../common_files/axiosurl';
import NumberFormat from 'react-number-format';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import businessDays from './businessDays';
import { connect } from 'react-redux';

// import Options from '../../common_files/questions';

const NewEvent = props => {

    const { Option } = Select;
    const navigate = useNavigate();
    const { RangePicker } = TimePicker;

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const { handleSubmit, control } = useForm({});
    const { handleSubmit: submitExtraInfo, control: controlExtraInfo,
        formState: { errors }, register: registerExtraInfo } = useForm({
            // resolver: yupResolver(authorValidator)
        });
    const { fields: sectionFields, append: sectionAppend, remove: sectionRemove } = useFieldArray({
        control,
        name: 'faqs'
    });

    const { handleSubmit: submitPricingInfo, control: controlPricingInfo,
        formState: { errors: pricingError }, register: registerPricingInfo } = useForm({
        });
    const { fields: pricingFields, append: pricingAppend, remove: removePricing } = useFieldArray({
        control,
        name: 'pricingData'
    });

    const [currentDisplay, setCurrentDisplay] = useState('basic');

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [mainImageUrl, setMainImageUrl] = useState('');
    const [loadingMain, setMainLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [bodyText, setBodyText] = useState('');

    const [categoryData, setCategoryData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);

    const [businessDay, setBusinessDay] = useState(businessDays);
    const [monday, setMonday] = useState({
        open: false,
        timeRange: ''
    });
    const [tuesday, setTuesday] = useState({
        open: false,
        timeRange: ''
    });
    const [wednesday, setWednesday] = useState({
        open: false,
        timeRange: ''
    });
    const [thursday, setThursday] = useState({
        open: false,
        timeRange: ''
    });
    const [friday, setFriday] = useState({
        open: false,
        timeRange: ''
    });
    const [saturday, setSaturday] = useState({
        open: false,
        timeRange: ''
    });
    const [sunday, setSunday] = useState({
        open: false,
        timeRange: ''
    });

    const [businessName, setBusinessName] = useState('');
    const [businessOwner, setBusinessOwner] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');
    const [businessState, setBusinessState] = useState('');
    const [businessLGA, setBusinessLGA] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [companyWebsite, setcompanyWebsite] = useState('');
    const [staffCount, setStaffCount] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [closingTime, setClosingTime] = useState('');

    const [eventType, setEventType] = useState('physical');
    const [pricingType, setPricingType] = useState('Service');

    useEffect(() => {
        axios('/get_all_visible_business_categories')
            .then(eventsCategory => {
                if (eventsCategory.data.summary === "success") {
                    setCategoryData(eventsCategory.data.message);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(eventsCategory.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching event categories. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

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

    function getMainBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeMainUpload(file) {
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

    const watchMainFileChange = info => {
        // if (info.file.status === 'uploading') {
        //     setLoading(true)
        //     // this.setState({ loading: true });
        //     return;
        // }
        // if (info.file.status === 'done') {
        // Get this url from response in real world.
        getMainBase64(info.file.originFileObj, imageUrl =>
            setMainImageUrl(imageUrl),
            setMainLoading(false)
            // this.setState({
            //     imageUrl,
            //     loading: false,
            // }),
        );
        // }
    };

    const uploadMainButton = (
        <div>
            {loadingMain ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // description upload
    const handleChange = e => {
        setBodyText(e);
    }
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {

                    const newFile = new FileReader();
                    loader.file.then(file => {
                        newFile.readAsDataURL(file);
                        newFile.addEventListener('load', () => {
                            axios.post('/saveblogcontentimage', {
                                img: newFile.result
                            })
                                .then(data => {
                                    console.log(data);
                                    resolve({
                                        default: data.data.message
                                    })
                                })
                                .catch(err => {
                                    setErrorMessage('An error occurred while uploading image.');
                                    reject(err);
                                })
                        })
                    })

                    // const body = new FormData();
                    // loader.file.then((file) => {
                    //     body.append("files", file);
                    //     // let headers = new Headers();
                    //     // headers.append("Origin", "http://localhost:3000");
                    //     fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                    //         method: "post",
                    //         body: body
                    //         // mode: "no-cors"
                    //     })
                    //         .then((res) => res.json())
                    //         .then((res) => {
                    //             resolve({
                    //                 default: `${API_URL}/${res.filename}`
                    //             });
                    //         })
                    //         .catch((err) => {
                    //             reject(err);
                    //         });
                    // });
                });
            }
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    // accessibility details
    // function onChange(checkedValues) {
    //     console.log('checked = ', checkedValues);
    // }

    function onChangeEventType(checkedValues) {
        setEventType(checkedValues.target.value);
    }

    function onChangePricingPlan(checkedValues) {
        setPricingType(checkedValues.target.value);
    }

    const saveBasicInfo = e => {

        setBusinessName(e.businessName);
        setBusinessOwner(e.businessOwner);
        setBusinessCategory(e.businessCategory);
        setStaffCount(e.staffCount);
        setBusinessState(e.businessState);
        setBusinessLGA(e.businessLGA);
        setPhoneNumber(e.phoneNumber);
        setBusinessAddress(e.businessAddress);
        setClosingTime(e.closingTime);
        setOpeningTime(e.openingTime);
        setCompanyEmail(e.companyEmail);

        setCurrentDisplay('extra');
    }

    const saveExtraInfo = e => {
        setCurrentDisplay('pricing')
    }

    const savePricingInfo = e => {
        setCurrentDisplay('pricing')
    }

    const updateBusinessDayTimeRange = (e, controlOption, day) => {
        let objectClone = day;
        console.log(e)
        let firstTime = e[0] ? String(e[0]._d) : '';
        let secondTime = e[1] ? String(e[1]._d) : '';
        let currentYear = new Date().getFullYear();

        let newObject = {
            open: objectClone.open,
            timeRange: firstTime.split(currentYear)[1].split('GMT')[0] + '-' + secondTime.split(currentYear)[1].split('GMT')[0],
        }
        controlOption(newObject);
    }

    const updateBusinessDayCheckBox = (e, controlOption, day) => {
        let objectClone = day;
        let newObject = {
            open: e.target.checked,
            timeRange: objectClone.timeRange,
        }
        controlOption(newObject);
        console.log(newObject)
    }

    const saveNewEvent = e => {
        setSpinnerStatus(true);
        axios.post('/uploadbusiness', {

            imageUrl, mainImageUrl, businessName, businessOwner, businessCategory, businessState,
            businessLGA, businessAddress, companyWebsite, staffCount, openingTime, phoneNumber, closingTime, companyEmail,
            bodyText, pricingType, e, monday, tuesday, wednesday, thursday, friday, saturday, sunday, 
            ambassadorId: props.auth.userDetails.id
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    // setErrorMessage(newEventData.data.statusMessage)
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
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
                        <TopNav currentPage={"Create Event"}
                            buttonTitle={"See all events"}
                            buttonLink={"/events"}
                            currentPageInfo={"Create a New Event"} />
                        <div>
                            <div className="main_compartment">
                                <div className="main_compartment_content_display">
                                    <div className="main_compartment_content">
                                        <div className="form_display">
                                            {
                                                currentDisplay === 'basic' ?
                                                    <form onSubmit={handleSubmit(saveBasicInfo)}>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3 className="big_site_text">Event Basic Info</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="coverImage" style={{ width: '100%' }}>Cover Image</label>
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
                                                                    <label htmlFor="mainImage" style={{ width: '100%' }}>Main Image</label>
                                                                    <Controller control={control} defaultValue="" name="mainImage"
                                                                        render={({ field }) => (
                                                                            <Upload
                                                                                name="avatar"
                                                                                listType="picture-card"
                                                                                className="avatar-uploader"
                                                                                showUploadList={false}
                                                                                beforeUpload={beforeMainUpload}
                                                                                onChange={e => watchMainFileChange(e)}
                                                                            >
                                                                                {mainImageUrl ? <img src={mainImageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadMainButton}
                                                                            </Upload>
                                                                        )
                                                                        } />
                                                                    {/* {errors.mainImage && <p className="form-error">{errors.mainImage.message}</p>} */}
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <div className="form-group">
                                                                    <label htmlFor="businessName">Business Name</label>
                                                                    <Controller control={control} defaultValue="" name="businessName"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="businessName"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="businessOwner">Business Owner</label>
                                                                    <Controller control={control} defaultValue="" name="businessOwner"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="businessOwner"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="businessCategory">Business Category</label>
                                                                    <Controller control={control} defaultValue="" name="businessCategory"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="businessCategory"
                                                                                optionFilterProp="children" {...field}
                                                                            >
                                                                                {categoryData.map((category, index) => (
                                                                                    <Option key={index}
                                                                                        value={`${category.id}`}>{category.categoryName}</Option>
                                                                                ))}
                                                                            </Select>
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Location</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>

                                                            <div style={{ marginBottom: '5%' }}>
                                                            </div>
                                                            <div>
                                                                <div className="form_flex_2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="businessState">State</label>
                                                                        <Controller control={control} defaultValue="" name="businessState"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="businessState"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="businessLGA">Local Government</label>
                                                                        <Controller control={control} defaultValue="" name="businessLGA"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="businessLGA"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="businessAddress">Business address</label>
                                                                    <Controller control={control} defaultValue="" name="businessAddress"
                                                                        render={({ field }) => (
                                                                            <Input.TextArea {...field} id="businessAddress" />
                                                                            // <Input {...field} id="businessAddress"
                                                                            //     type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Date and Time</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="staffCount">Staff Count</label>
                                                                    <Controller control={control} defaultValue="" name="staffCount"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="staffCount"
                                                                                optionFilterProp="children" {...field}
                                                                            >
                                                                                <Option key="1" value="1-10"> 1 - 10 </Option>
                                                                                <Option key="11" value="11-50"> 11 - 50 </Option>
                                                                                <Option key="51" value="51-100"> 51 - 100 </Option>
                                                                                <Option key="101" value="101-1000"> 101 - 1000 </Option>
                                                                                <Option key="1000" value="1000-~"> 1000 - ~ </Option>
                                                                            </Select>
                                                                        )
                                                                        } />
                                                                </div>

                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="phoneNumber">Phone number</label>
                                                                    <Controller control={control} defaultValue="" name="phoneNumber"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="phoneNumber"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="openingTime">Opening Time</label>
                                                                    <Controller control={control} defaultValue="" name="openingTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                {...field} id="openingTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="closingTime">Closing Time</label>
                                                                    <Controller control={control} defaultValue="" name="closingTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                {...field} id="closingTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="companyEmail">Company Email</label>
                                                                    <Controller control={control} defaultValue="" name="companyEmail"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="companyEmail"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="companyWebsite">Company Website</label>
                                                                    <Controller control={control} defaultValue="" name="companyWebsite"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="companyWebsite"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div style={{ marginTop: '5%' }}></div>
                                                            <button className="bg_red">Save and Continue</button>
                                                        </div>
                                                    </form>
                                                    : ''
                                            }
                                            {
                                                currentDisplay === 'extra' ?
                                                    <form onSubmit={submitExtraInfo(saveExtraInfo)}>
                                                        <div className="form_heading_text">
                                                            <h3 className="big_site_text">Event Extra Info</h3>
                                                            <p>Help people in the area discover your event and let attendees know
                                                                where to show up. Name your event and tell event-goers why they
                                                                should come. Add details that highlight what makes it unique.</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description" style={{ width: '100%' }}>Event description</label>
                                                            <CKEditor
                                                                config={{
                                                                    extraPlugins: [uploadPlugin]
                                                                }}
                                                                editor={ClassicEditor}
                                                                onReady={(editor) => { }}
                                                                onBlur={(event, editor) => { }}
                                                                onFocus={(event, editor) => { }}
                                                                onChange={(event, editor) => {
                                                                    handleChange(editor.getData());
                                                                }}
                                                            />
                                                        </div>
                                                        <Divider />
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Event accessibility details</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form-group">
                                                                <Checkbox.Group style={{ width: '100%' }}
                                                                // onChange={onChange}
                                                                >
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setMonday, monday)}
                                                                                value="monday">Monday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setMonday, monday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setMonday, monday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setTuesday, tuesday)}
                                                                                value="tuesday">Tuesday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setTuesday, tuesday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setTuesday, tuesday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setWednesday, wednesday)}
                                                                                value="wednesday">Wednesday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setWednesday, wednesday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setWednesday, wednesday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setThursday, thursday)}
                                                                                value="thursday">Thursday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setThursday, thursday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setThursday, thursday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setFriday, friday)}
                                                                                value="friday">Friday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setFriday, friday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setFriday, friday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setSaturday, saturday)}
                                                                                value="saturday">Saturday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setSaturday, saturday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setSaturday, saturday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_flex_2">
                                                                        <div>
                                                                            <Checkbox
                                                                                onChange={e => updateBusinessDayCheckBox(e, setSunday, sunday)}
                                                                                value="sunday">Sunday</Checkbox>
                                                                            <div>
                                                                                <div className="form-group">
                                                                                    <Controller control={control} defaultValue="" name=""
                                                                                        render={({ field }) => (
                                                                                            <RangePicker
                                                                                                onChange={e => updateBusinessDayTimeRange(e, setSunday, sunday)}
                                                                                                showTime={{ format: 'HH:mm' }}
                                                                                                style={{ height: '3rem', width: '100%' }}
                                                                                            // onOk={e => updateBusinessDayTimeRange(e, setSunday, sunday)}
                                                                                            />
                                                                                        )
                                                                                        } />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Checkbox.Group>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div style={{ marginTop: '5%' }}></div>
                                                            <div className="flex_buttons_2">
                                                                <button
                                                                    onClick={() => setCurrentDisplay('basic')}
                                                                    className="bg_border_red">Go Back</button>
                                                                <button className="bg_red">Save and Continue</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    : ''
                                            }
                                            {
                                                currentDisplay === 'pricing' ?
                                                    <form onSubmit={submitPricingInfo(saveNewEvent)}>
                                                        <div>
                                                            <div>
                                                                <div className="form_heading_text">
                                                                    <h3 className="big_site_text">What type of business do you run?</h3>
                                                                    <p>Help people in the area discover your event and let attendees know
                                                                        where to show up. Name your event and tell event-goers why they
                                                                        should come. Add details that highlight what makes it unique.</p>
                                                                </div>
                                                                <div style={{ marginBottom: '5%' }}>
                                                                    <Radio.Group
                                                                        onChange={onChangePricingPlan}
                                                                        defaultValue="Service" buttonStyle="solid">
                                                                        <Radio.Button value="Service">Service-Based</Radio.Button>
                                                                        <Radio.Button value="Product">Product-Based</Radio.Button>
                                                                    </Radio.Group>
                                                                </div>
                                                                {/* {
                                                                pricingType === "Service" ? */}
                                                                <div className="form-group">
                                                                    <button type="button" className="addSection bg-blue" onClick={() => pricingAppend({})}>Add {pricingType}</button>
                                                                    <hr /><br />
                                                                    {pricingFields.map(({ id }, index) => {
                                                                        return (
                                                                            <div className="sect" key={id}>
                                                                                <button onClick={() => removePricing(index)} className="removeSection"><DeleteOutlined /></button>
                                                                                <div className={`section${index}`}>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="planName">{pricingType} name</label>
                                                                                        <Controller defaultValue={""} name={`pricingData${index + 1}.planName`}
                                                                                            control={controlPricingInfo} id={`pricingData${index + 1}.planName`}
                                                                                            render={({ field }) => (
                                                                                                <Input {...field}
                                                                                                    placeholder={pricingType === "Service" ? 'Software Installations' : 'Samosa'}
                                                                                                    style={{ height: '3rem' }} />
                                                                                            )} />
                                                                                    </div>
                                                                                    {/* <div className="form-group">
                                                                                            <label htmlFor="planPrice">Plan price</label>
                                                                                            <Controller defaultValue={""} name={`pricingData${index + 1}.planPrice`}
                                                                                                control={controlPricingInfo} id={`pricingData${index + 1}.planPrice`}
                                                                                                render={({ field }) => (
                                                                                                    // <Input {...field} style={{ height: '3rem' }} />
                                                                                                    <NumberFormat thousandSeparator={true}
                                                                                                        prefix={'₦'}
                                                                                                        className="numeric"
                                                                                                        // onInput={e => onChangeValue(e)}
                                                                                                        {...field} style={{ height: '3rem', width: '100%' }} />
                                                                                                )} />
                                                                                        </div> */}
                                                                                    {/* <button onClick={() => inputAppend({})}>Add</button> */}

                                                                                    {/* <Options nestIndex={index + 1} control={controlExtraInfo} register={registerExtraInfo} /> */}

                                                                                </div>
                                                                                <Divider />
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                                {/*  : <Divider />
                                                             */}
                                                            </div>

                                                            <div>
                                                                <div className="form_heading_text">
                                                                    <h3 className="big_site_text">Social Media</h3>
                                                                    <p>Help people in the area discover your event and let attendees know
                                                                        where to show up. Name your event and tell event-goers why they
                                                                        should come. Add details that highlight what makes it unique.</p>
                                                                </div>
                                                                <div className="form_flex_3">
                                                                    <div className="form-group">
                                                                        <label htmlFor="communityFacebook">Facebook</label>
                                                                        <Controller control={controlPricingInfo} defaultValue="" name="communityFacebook"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="communityFacebook"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="communityInstagram">Instagram</label>
                                                                        <Controller control={controlPricingInfo} defaultValue="" name="communityInstagram"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="communityInstagram"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="communityTwitter">Twitter</label>
                                                                        <Controller control={controlPricingInfo} defaultValue="" name="communityTwitter"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="communityTwitter"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider />
                                                            <div>
                                                                <div className="form_heading_text">
                                                                    <h3>Frequently asked questions</h3>
                                                                    <p>Help people in the area discover your event and let attendees know
                                                                        where to show up. Name your event and tell event-goers why they
                                                                        should come. Add details that highlight what makes it unique.</p>
                                                                </div>
                                                                <div className="form-group">
                                                                    <button type="button" className="addSection bg-blue" onClick={() => sectionAppend({})}>Add Question</button>
                                                                    <hr /><br />
                                                                    {sectionFields.map(({ id }, index) => {
                                                                        return (
                                                                            <div className="sect" key={id}>
                                                                                <button onClick={() => sectionRemove(index)} className="removeSection"><DeleteOutlined /></button>
                                                                                <div className={`section${index}`}>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="question">Question {index + 1}</label>
                                                                                        <Controller defaultValue={""} name={`faqs${index + 1}.question`}
                                                                                            control={controlPricingInfo} id={`faqs${index + 1}.question`}
                                                                                            render={({ field }) => (
                                                                                                <Input {...field} style={{ height: '3rem' }} />
                                                                                            )} />
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="answers">Answer</label>
                                                                                        <Controller defaultValue={""} name={`faqs${index + 1}.answers`}
                                                                                            control={controlPricingInfo} id={`faqs${index + 1}.answers`}
                                                                                            render={({ field }) => (
                                                                                                <Input.TextArea {...field} id="answers" />
                                                                                                // <Input {...field} style={{ height: '3rem' }} />
                                                                                            )} />
                                                                                    </div>
                                                                                    {/* <button onClick={() => inputAppend({})}>Add</button> */}

                                                                                    {/* <Options nestIndex={index + 1} control={controlExtraInfo} register={registerExtraInfo} /> */}

                                                                                </div>
                                                                                <Divider />
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div style={{ marginTop: '5%' }}></div>
                                                                <div className="flex_buttons_2">
                                                                    <button
                                                                        onClick={() => setCurrentDisplay('extra')}
                                                                        className="bg_border_red">Go Back</button>
                                                                    <button className="bg_red">Create Event</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    : ''
                                            }
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

const mapStateToProps = store => {
    return { auth: store.auth }
}

export default connect(mapStateToProps)(NewEvent);