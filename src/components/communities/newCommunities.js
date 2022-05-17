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

    const [CommunityTitle, setCommunityTitle] = useState('');
    const [CommunityOrganizer, setCommunityOrganizer] = useState('');
    const [communityCategory, setcommunityCategory] = useState('');
    const [CommunityState, setCommunityState] = useState('');
    const [CommunityLGA, setCommunityLGA] = useState('');
    const [CommunityAddress, setCommunityAddress] = useState('');

    const [communityFacebook, setCommunityFacebook] = useState('');
    const [communityInstagram, setCommunityInstagram] = useState('');
    const [communityTwitter, setCommunityTwitter] = useState('');

    useEffect(() => {
        axios('/get_all_visible_community_categories')
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

    const saveBasicInfo = e => {

        setCommunityTitle(e.CommunityTitle);
        setCommunityOrganizer(e.CommunityOrganizer);
        setcommunityCategory(e.communityCategory);
        setCommunityState(e.CommunityState);
        setCommunityLGA(e.CommunityLGA);
        setCommunityAddress(e.CommunityAddress);

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

    const saveNewCommunity = e => {
        setSpinnerStatus(true);
        axios.post('/uploadcommunity', {
            imageUrl, mainImageUrl, CommunityTitle, CommunityOrganizer, communityCategory, CommunityState, CommunityLGA,
            CommunityAddress, bodyText,
            wheelchair, infant, transport, traveller, backProblems, pregnant, recommended, physicalFitness,
            infantSeat, pickup, e, ambassadorId: props.auth.userDetails.id
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
                        <TopNav currentPage={"Create Community"}
                            buttonTitle={"See all Communities"}
                            buttonLink={"/communities"}
                            currentPageInfo={"Create a New Community"} />
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
                                                                <h3 className="big_site_text">Community Basic Info</h3>
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
                                                                    <label htmlFor="CommunityTitle">Community Title</label>
                                                                    <Controller control={control} defaultValue="" name="CommunityTitle"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="CommunityTitle"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                            </div>
                                                            <div className="form_flex_2">
                                                                <div className="form-group">
                                                                    <label htmlFor="CommunityOrganizer">Community Organizer</label>
                                                                    <Controller control={control} defaultValue="" name="CommunityOrganizer"
                                                                        render={({ field }) => (
                                                                            <Input {...field} id="CommunityOrganizer"
                                                                                type="text" style={{ height: '3rem' }} />
                                                                        )
                                                                        } />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="communityCategory">Community Category</label>
                                                                    <Controller control={control} defaultValue="" name="communityCategory"
                                                                        render={({ field }) => (
                                                                            <Select
                                                                                style={{ width: '100%', height: '3rem' }}
                                                                                placeholder="" id="communityCategory"
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
                                                            <div>
                                                                <div className="form_flex_2">
                                                                    <div className="form-group">
                                                                        <label htmlFor="CommunityState">State</label>
                                                                        <Controller control={control} defaultValue="" name="CommunityState"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="CommunityState"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="CommunityLGA">Local Government</label>
                                                                        <Controller control={control} defaultValue="" name="CommunityLGA"
                                                                            render={({ field }) => (
                                                                                <Input {...field} id="CommunityLGA"
                                                                                    type="text" style={{ height: '3rem' }} />
                                                                            )
                                                                            } />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="CommunityAddress">Community address</label>
                                                                    <Controller control={control} defaultValue="" name="CommunityAddress"
                                                                        render={({ field }) => (
                                                                            <Input.TextArea {...field} id="CommunityAddress" />
                                                                            // <Input {...field} id="CommunityAddress"
                                                                            //     type="text" style={{ height: '3rem' }} />
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
                                                            <h3 className="big_site_text">Community Extra Info</h3>
                                                            <p>Help people in the area discover your event and let attendees know
                                                                where to show up. Name your event and tell event-goers why they
                                                                should come. Add details that highlight what makes it unique.</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description" style={{ width: '100%' }}>Community description</label>
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
                                                                <h3>Community accessibility details</h3>
                                                                <p>Help people in the area discover your event and let attendees know
                                                                    where to show up. Name your event and tell event-goers why they
                                                                    should come. Add details that highlight what makes it unique.</p>
                                                            </div>
                                                            <div className="form-group">
                                                                <Checkbox.Group style={{ width: '100%' }}
                                                                // onChange={onChange}
                                                                >
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
                                                    <form onSubmit={submitPricingInfo(saveNewCommunity)}>
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
                                                                    <button className="bg_red">Create Community</button>
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