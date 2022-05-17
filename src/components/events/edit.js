import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Link, useNavigate } from 'react-router-dom';

import {
    Input, Spin, Radio, message, Upload, Divider, Checkbox,
    DatePicker, TimePicker,
    Row, Col, Select, notification
} from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import axios from '../../common_files/axiosurl';
import axiosUrl from 'axios';
import NumberFormat from 'react-number-format';
import moment from "moment";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import Options from '../../common_files/questions';

const NewEvent = () => {

    const { Option } = Select;
    const navigate = useNavigate();

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const { handleSubmit, control, setValue } = useForm({});
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
    const [displayImageUpdated, setDisplayImageUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const [mainImageUrl, setMainImageUrl] = useState('');
    const [mainImageUpdated, setMainImageUpdated] = useState(false);
    const [loadingMain, setMainLoading] = useState(false);

    const [categoryData, setCategoryData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [bodyText, setBodyText] = useState('');

    const [eventsData, setEventsData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);

    const [wheelchair, setWheelChair] = useState(true);
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
    const [CKEditorContent, setCKEditorContent] = useState('');
    const [pricingPlans, setPricingPlans] = useState([]);
    const [faqTabs, setFaqTabs] = useState([]);
    const [pricingPlanOption, setPricingPlanOption] = useState('free');

    const [eventType, setEventType] = useState('physical');
    const [pricingType, setPricingType] = useState('paid');

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        let eventId = window.location.pathname.split('/')[4];
        axios(`/allevents/${eventId}`)
            .then(async eventData => {
                if (eventData.data.summary === "success") {
                    if (eventData.data.message) {
                        setValue('eventTitle', eventData.data.message.eventTitle);
                        setValue('eventOrganizer', eventData.data.message.eventOrganizer);
                        // setValue('eventCategory', eventData.data.message.EventCategoriesDatum.id);
                        setValue('eventState', eventData.data.message.state);
                        setValue('eventLGA', eventData.data.message.localGovernment);
                        setValue('eventURL', eventData.data.message.eventURL);
                        setValue('eventAddress', eventData.data.message.address);
                        setValue('eventStarts', moment(eventData.data.message.eventStarts.split('T')[0]));
                        setValue('eventEnds', moment(eventData.data.message.eventEnds.split('T')[0]));


                        setEventTitle(eventData.data.message.eventTitle);
                        setEventOrganizer(eventData.data.message.eventOrganizer);
                        setEventCategory(eventData.data.message.EventCategoriesDatum.id);
                        setEventStarts(eventData.data.message.eventStarts);
                        setEventState(eventData.data.message.state);
                        setEventLGA(eventData.data.message.localGovernment);
                        setEventEnds(eventData.data.message.eventEnds);
                        setEventAddress(eventData.data.message.address);
                        setEventURL(eventData.data.message.eventURL);
                        setEndTime(eventData.data.message.endTime);
                        setStartTime(eventData.data.message.startTime);
                        setEventType(eventData.data.message.type);

                        // getBase64(eventData.data.message.mainImage, imageUrl =>
                        setMainImageUrl(eventData.data.message.mainImage)
                        setImageUrl(eventData.data.message.displayImage)

                        // var readerData  = new FileReader();

                        // readerData.onloadend = function () {
                        //   console.log(readerData.result);
                        // }
                        // readerData.readAsArrayBuffer(eventData.data.message.mainImage);
                        // );

                        // getBase64(eventData.data.message.displayImage, imageUrl =>
                        //     setImageUrl(imageUrl),
                        // );

                        // setStartTime(eventData.data.message.startTime);
                        // setStartTime("12:00");

                        setValue('startTime', moment(eventData.data.message.startTime, 'HH:mm'));
                        setValue('endTime', moment(eventData.data.message.endTime, 'HH:mm'));

                        setCKEditorContent(eventData.data.message.eventDescription);

                        setTraveller(eventData.data.message.traveller);
                        setPhysicalFitness(eventData.data.message.physicalFitness);
                        setBackProblems(eventData.data.message.backProblems);
                        setInfantSeat(eventData.data.message.infantSeat);
                        setRecommended(eventData.data.message.recommended);
                        setPickup(eventData.data.message.pickup);
                        setWheelChair(eventData.data.message.wheelchair);
                        setTransport(eventData.data.message.transport);
                        setInfant(eventData.data.message.infant);
                        setPregnant(eventData.data.message.pregnant);
                        setPricingPlans(eventData.data.message.EventPricingPlans);
                        setFaqTabs(eventData.data.message.EventsFAQs);
                        setPricingPlanOption(eventData.data.message.eventPricing);


                        setEventsData(eventData.data.message);
                        setSpinnerStatus(false);
                        setDataLoaded(true);
                    } else {
                        setErrorMessage(eventData.data.statusMessage);
                        setSpinnerStatus(false);
                    }
                } else {
                    setErrorMessage(eventData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                console.log(err)
                setErrorMessage('An error occurred while fetching event categories. Please reload page to try again');
                setSpinnerStatus(false);
            })
        axios(`/get_all_visible_event_categories`)
            .then(eventsCategory => {
                if (eventsCategory.data.summary === "success") {
                    setCategoryData(eventsCategory.data.message);
                } else {
                    setErrorMessage(eventsCategory.data.statusMessage)
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching event categories. Please reload page to try again');
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
            setLoading(false),
            setDisplayImageUpdated(true)
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
            setMainLoading(false),
            setMainImageUpdated(true)
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

        setEventTitle(e.eventTitle);
        setEventOrganizer(e.eventOrganizer);
        setEventCategory(e.eventCategory);
        setEventStarts(e.eventStarts);
        setEventState(e.eventState);
        setEventLGA(e.eventLGA);
        setEventEnds(e.eventEnds);
        setEventAddress(e.eventAddress);
        setEventURL(e.eventURL);
        setEndTime(e.endTime);
        setStartTime(e.startTime);

        setCurrentDisplay('extra');
    }

    const updateAccessibilityInfo = e => {
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
            infantSeat, pickup, pricingType, e
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

    // editEventBasicInfo
    const updateBasicInfo = e => {
        let currYear = new Date().getFullYear();
        let { eventTitle, eventOrganizer, eventCategory, eventState, eventLGA, eventAddress,
            eventURL, eventStarts, startTime, eventEnds, endTime } = e;

        startTime = String(e.startTime._d).split(currYear)[1].split('GMT')[0].split(' ')[1];
        endTime = String(e.endTime._d).split(currYear)[1].split('GMT')[0].split(' ')[1];

        setSpinnerStatus(true);
        axios.post('/admin/editEventBasicInfo', {
            mainImageUpdated, displayImageUpdated, imageUrl, mainImageUrl, eventTitle, eventOrganizer,
            eventCategory, eventType, eventState, eventLGA, eventAddress, eventURL, eventStarts, startTime,
            eventEnds, endTime, eventsId: eventsData.id
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
                setSpinnerStatus(false);
            })
    }

    // editEventAccessibilityInfo
    const updateEventAccessibilityInfo = e => {

        setSpinnerStatus(true);
        axios.post('/admin/editEventAccessibilityInfo', {
            bodyText, wheelchair, infant, transport, traveller, backProblems, pregnant, recommended,
            physicalFitness, infantSeat, pickup, eventsId: eventsData.id
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/');
                } else {
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while saving data. Please try again');
                setSpinnerStatus(false);
            })
    }

    const deleteEvent = e => {
        setSpinnerStatus(true);
        axios.post('/deleteEvent', {
            eventId: e
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
    const editEventVisibility = e => {
        setSpinnerStatus(true);
        let url = e.action ? '/admin/hideEvent' : '/admin/showEvent';
        axios.post(url, {
            eventId: e.eventId
        })
            .then(newEventData => {
                if (newEventData.data.summary === "success") {
                    navigate('/events/all');
                } else {
                    // setErrorMessage(newEventData.data.statusMessage)
                    openNotificationWithIcon('error', newEventData.data.statusMessage);
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('error', 'An error occurred while editing data. Please try again');
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
                                    {dataLoaded ?
                                        <div>
                                            <div className="main_compartment_content" style={{ marginBottom: '5%' }}>
                                                <div className="form_display">
                                                    {/* {
                                                currentDisplay === 'basic' ? */}
                                                    <form onSubmit={handleSubmit(updateBasicInfo)}>
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
                                                                    <Controller control={control} defaultValue={eventsData.eventTitle} name="eventTitle"
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
                                                                    <Controller control={control} defaultValue={eventsData.eventOrganizer} name="eventOrganizer"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="eventOrganizer"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="eventCategory">Event Category</label>
                                                                    <Controller control={control} defaultValue={eventCategory} name="eventCategory"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="eventCategory"
                                                                                defaultValue={eventCategory}
                                                                                optionFilterProp="children" {...field}
                                                                            >
                                                                                {categoryData.map((category, index) => (
                                                                                    <Option key={index}
                                                                                        value={category.id}>{category.categoryName}</Option>
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
                                                                <Radio.Group onChange={onChangeEventType} defaultValue={eventType} buttonStyle="solid">
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
                                                                                <Controller control={control} defaultValue={eventsData.eventState} name="eventState"
                                                                                    render={({ field }) => (
                                                                                        <Input {...field} id="eventState"
                                                                                            type="text" style={{ height: '3rem' }} />
                                                                                    )
                                                                                    } />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="eventLGA">Local Government</label>
                                                                                <Controller control={control} defaultValue={eventsData.eventLGA} name="eventLGA"
                                                                                    render={({ field }) => (
                                                                                        <Input {...field} id="eventLGA"
                                                                                            type="text" style={{ height: '3rem' }} />
                                                                                    )
                                                                                    } />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="eventAddress">Event address</label>
                                                                            <Controller control={control} defaultValue={eventsData.eventAddress} name="eventAddress"
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
                                                                        <Controller control={control} defaultValue={eventsData.eventURL} name="eventURL"
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
                                                                            // <Input {...field} id="eventStarts"
                                                                            //     type="text" style={{ height: '3rem' }} />
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
                                                                            // <Input {...field} id="startTime"
                                                                            //     type="text" style={{ height: '3rem' }} />
                                                                            <TimePicker
                                                                                format="HH:mm"
                                                                                {...field} id="startTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }}
                                                                            />
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
                                                                            // <Input {...field} id="eventEnds"
                                                                            //     type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="endTime">End Time</label>
                                                                    <Controller control={control} defaultValue="" name="endTime"
                                                                        render={({ field }) => (
                                                                            <TimePicker
                                                                                format="HH:mm"
                                                                                {...field} id="endTime"
                                                                                style={{ height: '3rem', width: '100%', display: 'block' }}
                                                                            />
                                                                            // <Input {...field} id="endTime"
                                                                            //     type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div style={{ marginTop: '5%' }}></div>
                                                            <button className="bg_red">Update Basic Information</button>
                                                        </div>
                                                    </form>
                                                    {/* : ''
                                            } */}
                                                </div>
                                            </div>
                                            <div className="main_compartment_content" style={{ marginBottom: '5%' }}>
                                                <div className="form_display">
                                                    {/* {
                                                currentDisplay === 'extra' ? */}
                                                    <form onSubmit={submitExtraInfo(updateEventAccessibilityInfo)}>
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

                                                                onReady={(editor) => {
                                                                    editor.setData(CKEditorContent);
                                                                }}
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
                                                                // onChange={onChange}
                                                                >
                                                                */}
                                                                <Row>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={wheelchair}
                                                                            onChange={e => updateAccessibilityOptions(e, setWheelChair)}
                                                                        >Wheelchair accessible</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={transport}
                                                                            onChange={e => updateAccessibilityOptions(e, setTransport)}
                                                                        >Near public transportation</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={infant}
                                                                            onChange={e => updateAccessibilityOptions(e, setInfant)}
                                                                        >Infant seats available</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={pregnant}
                                                                            onChange={e => updateAccessibilityOptions(e, setPregnant)}
                                                                        >Recommended for pregnant travelers</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={traveller}
                                                                            onChange={e => updateAccessibilityOptions(e, setTraveller)}
                                                                        >Traveler pickup</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={physicalFitness}
                                                                            onChange={e => updateAccessibilityOptions(e, setPhysicalFitness)}
                                                                        >Moderate Physical fitness level</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={backProblems}
                                                                            onChange={e => updateAccessibilityOptions(e, setBackProblems)}
                                                                        >Recommended for travelers with back problems</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={infantSeat}
                                                                            onChange={e => updateAccessibilityOptions(e, setInfantSeat)}
                                                                        >Infant seats available</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={recommended}
                                                                            onChange={e => updateAccessibilityOptions(e, setRecommended)}
                                                                        >Recommended for pregnant travelers</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox
                                                                            defaultChecked={pickup}
                                                                            onChange={e => updateAccessibilityOptions(e, setPickup)}
                                                                        >Traveler pickup</Checkbox>
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
                                                    {/* : ''
                                            } */}
                                                </div>
                                            </div>
                                        </div>
                                        : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default NewEvent;