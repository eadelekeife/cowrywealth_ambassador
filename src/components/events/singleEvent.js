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
import NumberFormat from 'react-number-format';

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
    const [loading, setLoading] = useState(false);

    const [mainImageUrl, setMainImageUrl] = useState('');
    const [loadingMain, setMainLoading] = useState(false);

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

    useEffect(() => {
        let eventId = window.location.pathname.split('/')[3];
        axios(`/allevents/${eventId}`)
            .then(eventData => {
                if (eventData.data.summary === "success") {
                    if (eventData.data.message) {
                        setValue('eventTitle', eventData.data.message.eventTitle);
                        setValue('eventOrganizer', eventData.data.message.eventOrganizer);
                        setValue('eventCategory', eventData.data.message.EventCategoriesDatum.categoryName);
                        setValue('eventState', eventData.data.message.state);
                        setValue('eventLGA', eventData.data.message.localGovernment);
                        setValue('eventURL', eventData.data.message.eventURL);
                        setValue('eventAddress', eventData.data.message.address);
                        setValue('eventStarts', eventData.data.message.eventStarts.split('T')[0]);
                        setValue('eventEnds', eventData.data.message.eventEnds.split('T')[0]);
                        setValue('startTime', eventData.data.message.startTime.split('T')[1].split('.')[0]);
                        setValue('endTime', eventData.data.message.endTime.split('T')[1].split('.')[0]);
                        setImageUrl(eventData.data.message.displayImage);

                        setCKEditorContent(eventData.data.message.eventDescription);

                        setTraveller(eventData.data.message.traveller);
                        setPhysicalFitness(eventData.data.message.physicalFitness);
                        setBackProblems(eventData.data.message.backProblems);
                        setInfantSeat(eventData.data.message.infantSeat);
                        setRecommended(eventData.data.message.recommended);
                        setPickup(eventData.data.message.pickup);
                        // setWheelChair(eventData.data.message.wheelchair);
                        setTransport(eventData.data.message.transport);
                        setInfant(eventData.data.message.infant);
                        setPregnant(eventData.data.message.pregnant);
                        setPricingPlans(eventData.data.message.EventPricingPlans);
                        setFaqTabs(eventData.data.message.EventsFAQs);
                        setPricingPlanOption(eventData.data.message.eventPricing);





                        setMainImageUrl(eventData.data.message.mainImage);
                        setEventType(eventData.data.message.type);
                        setEventsData(eventData.data.message);
                        setSpinnerStatus(false);
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
                                                                                disabled
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
                                                                                disabled
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
                                                                            <Input {...field} id="eventTitle" disabled
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
                                                                            <Input {...field} id="eventOrganizer" disabled
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
                                                                                placeholder="" id="eventCategory" disabled
                                                                                optionFilterProp="children" {...field}
                                                                            >
                                                                                {/* <Option value={`${eventsData.EventsCategory.categoryName}`}>
                                                                                    {eventsData.EventsCategory.categoryName}
                                                                                </Option> */}
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
                                                                <Radio.Group onChange={onChangeEventType} disabled defaultValue={eventType} buttonStyle="solid">
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
                                                                                        <Input {...field} id="eventState" disabled
                                                                                            type="text" style={{ height: '3rem' }} />
                                                                                    )
                                                                                    } />
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="eventLGA">Local Government</label>
                                                                                <Controller control={control} defaultValue={eventsData.eventLGA} name="eventLGA"
                                                                                    render={({ field }) => (
                                                                                        <Input {...field} id="eventLGA" disabled
                                                                                            type="text" style={{ height: '3rem' }} />
                                                                                    )
                                                                                    } />
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="eventAddress">Event address</label>
                                                                            <Controller control={control} defaultValue={eventsData.eventAddress} name="eventAddress"
                                                                                render={({ field }) => (
                                                                                    <Input.TextArea {...field} disabled id="eventAddress" />
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
                                                                                <Input {...field} id="eventURL" disabled
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
                                                                            <Input {...field} id="eventStarts" disabled
                                                                                type="text" style={{ height: '3rem' }} />
                                                                            // <DatePicker
                                                                            //     {...field} id="eventStarts"
                                                                            //     style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="startTime">Start Time</label>
                                                                    <Controller control={control} defaultValue="" name="startTime"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="startTime" disabled
                                                                                type="text" style={{ height: '3rem' }} />
                                                                            // <TimePicker
                                                                            //     {...field} id="startTime"
                                                                            //     style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="eventEnds">Event Ends</label>
                                                                    <Controller control={control} defaultValue="" name="eventEnds"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="eventEnds" disabled
                                                                                type="text" style={{ height: '3rem' }} />
                                                                            // <DatePicker
                                                                            //     {...field} id="eventEnds"
                                                                            //     style={{ height: '3rem', width: '100%', display: 'block' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label style={{ width: '100%' }} htmlFor="endTime">End Time</label>
                                                                    <Controller control={control} defaultValue="" name="endTime"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="endTime" disabled
                                                                                type="text" style={{ height: '3rem' }} />
                                                                            // <TimePicker
                                                                            //     {...field} id="endTime"
                                                                            //     style={{ height: '3rem', width: '100%', display: 'block' }} />
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
                                                                disabled
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
                                                                        <Checkbox disabled
                                                                            defaultChecked={wheelchair}
                                                                            onChange={e => updateAccessibilityOptions(e, setWheelChair)}
                                                                        >Wheelchair accessible</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={transport}
                                                                            onChange={e => updateAccessibilityOptions(e, setTransport)}
                                                                        >Near public transportation</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={infant}
                                                                            onChange={e => updateAccessibilityOptions(e, setInfant)}
                                                                        >Infant seats available</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={pregnant}
                                                                            onChange={e => updateAccessibilityOptions(e, setPregnant)}
                                                                        >Recommended for pregnant travelers</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={traveller}
                                                                            onChange={e => updateAccessibilityOptions(e, setTraveller)}
                                                                        >Traveler pickup</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={physicalFitness}
                                                                            onChange={e => updateAccessibilityOptions(e, setPhysicalFitness)}
                                                                        >Moderate Physical fitness level</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={backProblems}
                                                                            onChange={e => updateAccessibilityOptions(e, setBackProblems)}
                                                                        >Recommended for travelers with back problems</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={infantSeat}
                                                                            onChange={e => updateAccessibilityOptions(e, setInfantSeat)}
                                                                        >Infant seats available</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
                                                                            defaultChecked={recommended}
                                                                            onChange={e => updateAccessibilityOptions(e, setRecommended)}
                                                                        >Recommended for pregnant travelers</Checkbox>
                                                                    </Col>
                                                                    <Col span={12}>
                                                                        <Checkbox disabled
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
                                                                    onChange={onChangePricingPlan} disabled
                                                                    defaultValue={pricingPlanOption} buttonStyle="solid">
                                                                    <Radio.Button value="paid">Paid</Radio.Button>
                                                                    <Radio.Button value="free">Free</Radio.Button>
                                                                </Radio.Group>
                                                            </div>
                                                            {
                                                                pricingType === "paid" ?
                                                                    <div className="form-group">
                                                                        {/* <button type="button" className="addSection bg-blue" onClick={() => pricingAppend({})}>Add Pricing Plan</button> */}
                                                                        <hr /><br />
                                                                        {/* {pricingFields.map(({ id }, index) => { */}
                                                                        {pricingPlans.map((plan, index) => {
                                                                            return (
                                                                                <div className="sect" key={index}>
                                                                                    {/* <button onClick={() => removePricing(index)} className="removeSection"><DeleteOutlined /></button> */}
                                                                                    <div className={`form_flex_2 section${index}`}>
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="planName">Plan name</label>
                                                                                            <Controller defaultValue={""} name={`pricingData${index + 1}.planName`}
                                                                                                control={controlPricingInfo} id={`pricingData${index + 1}.planName`}
                                                                                                render={({ field }) => (
                                                                                                    <Input {...field}
                                                                                                        disabled
                                                                                                        value={plan.planName}
                                                                                                        style={{ height: '3rem' }} />
                                                                                                )} />
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label htmlFor="planPrice">Plan price</label>
                                                                                            <Controller defaultValue={""} name={`pricingData${index + 1}.planPrice`}
                                                                                                control={controlPricingInfo} id={`pricingData${index + 1}.planPrice`}
                                                                                                render={({ field }) => (
                                                                                                    // <Input {...field} style={{ height: '3rem' }} />
                                                                                                    // <NumberFormat value={plan.planPrice} className="product-price" displayType={'text'}
                                                                                                    //  prefix={"₦"} thousandSeparator={true} />
                                                                                                    <NumberFormat thousandSeparator={true}
                                                                                                        prefix={'₦'}
                                                                                                        className="numeric"
                                                                                                        disabled
                                                                                                        value={plan.planPrice}
                                                                                                        // displayType={'text'}
                                                                                                        // onInput={e => onChangeValue(e)}
                                                                                                        style={{ height: '3rem', width: '100%' }} />
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
                                                                    {/* <button type="button" className="addSection bg-blue" onClick={() => sectionAppend({})}>Add Question</button> */}
                                                                    <hr /><br />
                                                                    {/* {sectionFields.map(({ id }, index) => { */}
                                                                    {faqTabs.map((faq, index) => {
                                                                        return (
                                                                            <div className="sect" key={index}>
                                                                                {/* <button onClick={() => sectionRemove(index)} className="removeSection"><DeleteOutlined /></button> */}
                                                                                <div className={`section${index}`}>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="question">Question {index + 1}</label>
                                                                                        <Controller defaultValue={""} name={`faqs${index + 1}.question`}
                                                                                            control={controlPricingInfo} id={`faqs${index + 1}.question`}
                                                                                            render={({ field }) => (
                                                                                                <Input {...field}
                                                                                                    value={faq.questions} disabled
                                                                                                    style={{ height: '3rem' }} />
                                                                                            )} />
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="answers">Answer</label>
                                                                                        <Controller defaultValue={faq.answers} name={`faqs${index + 1}.answers`}
                                                                                            control={controlPricingInfo} id={`faqs${index + 1}.answers`}
                                                                                            render={({ field }) => (
                                                                                                <Input.TextArea
                                                                                                    disabled
                                                                                                    {...field} id="answers" />
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
                                                                <div className="flex_big_buttons">
                                                                    <button
                                                                        onClick={() => setCurrentDisplay('extra')}
                                                                        className="bg_border_red">Previous</button>
                                                                    <button
                                                                        onClick={e => {
                                                                            e.preventDefault();
                                                                            editEventVisibility(({
                                                                                eventId: eventsData.id,
                                                                                action: eventsData.displayStatus
                                                                            }))
                                                                        }}
                                                                        className="bg_primary">
                                                                        {eventsData.displayStatus ?
                                                                            'Hide'
                                                                            :
                                                                            'Show'
                                                                        }
                                                                    </button>
                                                                    <Link
                                                                        style={{ textAlign: 'center', color: '#fff' }}
                                                                        to={`/event/edit/${eventsData.eventTitle}/${eventsData.id}`} className="bg_green">Edit</Link>
                                                                    <button
                                                                        onClick={e => {
                                                                            e.preventDefault();
                                                                            deleteEvent(eventsData.id)
                                                                        }}
                                                                        className="bg_red">Delete</button>
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

export default NewEvent;