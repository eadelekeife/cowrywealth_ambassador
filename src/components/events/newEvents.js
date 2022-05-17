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
import { connect } from 'react-redux';

// import Options from '../../common_files/questions';

const NewEvent = props => {

    const { Option } = Select;
    const navigate = useNavigate();

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

    const [wheelchair, setWheelChair] = useState(false);
    const [infant, setInfant] = useState(false);
    const [transport, setTransport] = useState(false);
    const [traveller, setTraveller] = useState(false);
    const [backProblems, setBackProblems] = useState(false);
    const [pregnant, setPregnant] = useState(false);
    const [recommended, setRecommended] = useState(false);
    const [physicalFitness, setPhysicalFitness] = useState(false);
    const [infantSeat, setInfantSeat] = useState(false);
    const [pickup, setPickup] = useState(false);

    const [eventTitle, setEventTitle] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventState, setEventState] = useState('');
    const [eventLGA, setEventLGA] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventURL, setEventURL] = useState('');
    const [eventStarts, setEventStarts] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventEnds, setEventEnds] = useState('');
    const [endTime, setEndTime] = useState('');

    const [eventType, setEventType] = useState('physical');
    const [pricingType, setPricingType] = useState('paid');

    useEffect(() => {
        axios('/get_all_visible_event_categories')
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
        let currYear = new Date().getFullYear();
        setEventTitle(e.eventTitle);
        setEventOrganizer(e.eventOrganizer);
        setEventCategory(e.eventCategory);
        setEventStarts(e.eventStarts);
        setEventState(e.eventState);
        setEventLGA(e.eventLGA);
        setEventEnds(e.eventEnds);
        setEventAddress(e.eventAddress);
        setEventURL(e.eventURL);
        setEndTime(String(e.endTime._d).split(currYear)[1].split('GMT')[0].split(' ')[1]);
        setStartTime(String(e.startTime._d).split(currYear)[1].split('GMT')[0].split(' ')[1]);

        setCurrentDisplay('extra');
    }

    const saveExtraInfo = e => {
        setCurrentDisplay('pricing')
    }

    const savePricingInfo = e => {
        setCurrentDisplay('pricing')
    }

    const updateAccessibilityOptions = (e, controlOption) => {
        controlOption(e.target.checked);
    }

    const saveNewEvent = e => {
        setSpinnerStatus(true);
        axios.post('/uploadevent', {
            imageUrl, mainImageUrl, eventTitle, eventOrganizer, eventCategory, eventType, eventState, eventLGA,
            eventAddress, eventURL, eventStarts, startTime, eventEnds, endTime, bodyText,
            wheelchair, infant, transport, traveller, backProblems, pregnant, recommended, physicalFitness,
            infantSeat, pickup, pricingType, e, ambassadorId: props.auth.userDetails.id
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
                                                                    <label htmlFor="eventTitle">Event Title</label>
                                                                    <Controller control={control} defaultValue="" name="eventTitle"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="eventTitle"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="eventOrganizer">Event Organizer</label>
                                                                    <Controller control={control} defaultValue="" name="eventOrganizer"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="eventOrganizer"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="eventCategory">Event Category</label>
                                                                    <Controller control={control} defaultValue="" name="eventCategory"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="eventCategory"
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
                                                                <Radio.Group onChange={onChangeEventType} defaultValue="physical" buttonStyle="solid">
                                                                    <Radio.Button value="physical">Physical</Radio.Button>
                                                                    <Radio.Button value="online">Online</Radio.Button>
                                                                </Radio.Group>
                                                            </div>
                                                            {
                                                                eventType === "physical" ?
                                                                    <div>
                                                                        <div className="form_flex_2">
                                                                            <div className="form-group">
                                                                                <label htmlFor="eventState">State</label>
                                                                                <Controller control={control} defaultValue="" name="eventState"
                                                                                    render={({ field }) => (
                                                                                        <Input {...field} id="eventState"
                                                                                            type="text" style={{ height: '3rem' }} />
                                                                                    )
                                                                                    } />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="eventLGA">Local Government</label>
                                                                                <Controller control={control} defaultValue="" name="eventLGA"
                                                                                    render={({ field }) => (
                                                                                        <Input {...field} id="eventLGA"
                                                                                            type="text" style={{ height: '3rem' }} />
                                                                                    )
                                                                                    } />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="eventAddress">Event address</label>
                                                                            <Controller control={control} defaultValue="" name="eventAddress"
                                                                                render={({ field }) => (
                                                                                    <Input.TextArea {...field} id="eventAddress" />
                                                                                    // <Input {...field} id="eventAddress"
                                                                                    //     type="text" style={{ height: '3rem' }} />
                                                                                )
                                                                                } />
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div className="form-group">
                                                                        <label htmlFor="eventURL">Meeting Link</label>
                                                                        <Controller control={control} defaultValue="" name="eventURL"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="eventURL"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                            }
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
                                                                    <label style={{ width: '100%' }} htmlFor="eventStarts">Event Starts</label>
                                                                    <Controller control={control} defaultValue="" name="eventStarts"
                                                                        render={({ field }) => (
                                                                            <DatePicker
                                                                                {...field} id="eventStarts"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="startTime">Start Time</label>
                                                                    <Controller control={control} defaultValue="" name="startTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                {...field} id="startTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="eventEnds">Event Ends</label>
                                                                    <Controller control={control} defaultValue="" name="eventEnds"
                                                                        render={({ field }) => (
                                                                            <DatePicker
                                                                                {...field} id="eventEnds"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="endTime">End Time</label>
                                                                    <Controller control={control} defaultValue="" name="endTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                {...field} id="endTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }} />
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
                                                        <div>
                                                            <div className="form_heading_text">
                                                                <h3>Event accessibility details</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form-group">
                                                                {/* <Checkbox.Group style={{ width: '100%' }}
                                                                > */}
                                                                <Row>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setWheelChair)}
                                                                            value="wheelchair">Wheelchair accessible</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setTransport)}
                                                                            value="transport">Near public transportation</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setInfant)}
                                                                            value="infant">Infant seats available</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setPregnant)}
                                                                            value="recommended">Recommended for pregnant travelers</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setTraveller)}
                                                                            value="traveller">Traveler pickup</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setPhysicalFitness)}
                                                                            value="physicalFitness">Moderate Physical fitness level</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setBackProblems)}
                                                                            value="backProblems">Recommended for travelers with back problems</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setInfantSeat)}
                                                                            value="infantSeats">Infant seats available</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setRecommended)}
                                                                            value="pregnant">Recommended for pregnant travelers</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            onChange={e => updateAccessibilityOptions(e, setPickup)}
                                                                            value="pickup">Traveler pickup</Checkbox>
                                                                    </Col>
                                                                </Row>
                                                                {/* </Checkbox.Group> */}
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
                                                            <div className="form_heading_text">
                                                                <h3 className="big_site_text">Event pricing details</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div style={{ marginBottom: '5%' }}>
                                                                <Radio.Group
                                                                    onChange={onChangePricingPlan}
                                                                    defaultValue="paid" buttonStyle="solid">
                                                                    <Radio.Button value="paid">Paid</Radio.Button>
                                                                    <Radio.Button value="free">Free</Radio.Button>
                                                                </Radio.Group>
                                                            </div>
                                                            {
                                                                pricingType === "paid" ?
                                                                    <div className="form-group">
                                                                        <button type="button" className="addSection bg-blue" onClick={() => pricingAppend({})}>Add Pricing Plan</button>
                                                                        <hr /><br />
                                                                        {pricingFields.map(({ id }, index) => {
                                                                            return (
                                                                                <div className="sect" key={id}>
                                                                                    <button onClick={() => removePricing(index)} className="removeSection"><DeleteOutlined /></button>
                                                                                    <div className={`form_flex_2 section${index}`}>
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="planName">Plan name</label>
                                                                                            <Controller defaultValue={""} name={`pricingData${index + 1}.planName`}
                                                                                                control={controlPricingInfo} id={`pricingData${index + 1}.planName`}
                                                                                                render={({ field }) => (
                                                                                                    <Input {...field} style={{ height: '3rem' }} />
                                                                                                )} />
                                                                                        </div>
                                                                                        <div className="form-group">
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
                                                                                        </div>
                                                                                        {/* <button onClick={() => inputAppend({})}>Add</button> */}

                                                                                        {/* <Options nestIndex={index + 1} control={controlExtraInfo} register={registerExtraInfo} /> */}

                                                                                    </div>
                                                                                    <Divider />
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                    : <Divider />
                                                            }

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