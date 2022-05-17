import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Spin, notification } from 'antd';
import axios from '../../common_files/axiosurl';
import { Link } from 'react-router-dom';

import Jacket from '../../assets/images/jacket.svg';
import { connect } from 'react-redux';

const AllEvents = props => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [allData, setAllData] = useState({});
    const [spinnerStatus, setSpinnerStatus] = useState(true);


    useEffect(() => {
        axios('/ambassador/get_all_data', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(eventsData => {
                if (eventsData.data.summary === "success") {
                    setAllData(eventsData.data.message);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(eventsData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

    return (
        <div>
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
                        <div className="dashboard main_compartment">
                            <div className="main_compartment_content_display">
                                <div className="main_compartment_content">
                                    <div className="contain">
                                        <div className="dashboard_banner">
                                            <div className="dashboard_cover">
                                                <div>
                                                    <h3>Welcome back {props.auth.userDetails.firstName},</h3>
                                                    <p>Here you will find all your relevant information. Help
                                                        people in the area discover your event and let attendees
                                                        know where to show up</p>
                                                </div>
                                                <img src={Jacket} alt="user on blue jacket" />
                                            </div>
                                        </div>
                                        {
                                            !spinnerStatus ?
                                                <div>
                                                    <div className="dashboard_compartment">
                                                        <div className="grid_flex">
                                                            <h4 className="dashboard_compartment_title">
                                                                Events ({allData.eventsData.length >= 4 ?
                                                                    `4 of ${allData.eventsData.length}`
                                                                    : `${allData.eventsData.length} of ${allData.eventsData.length}`})</h4>
                                                            <Link to="/events/all">See all</Link>
                                                        </div>
                                                        {
                                                            !errorMessage ?
                                                                <div className="category_display grid_4">
                                                                    {allData.eventsData.slice(0, 4).map((events, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <Link to={`/event/${events.eventTitle}/${events.id}`}>
                                                                                    <img src={events.displayImage} alt={events.displayImage} />
                                                                                    <h5>{events.eventTitle}</h5>
                                                                                    <p style={{ color: '#0a0a0a' }}>{events.EventCategoriesDatum.categoryName}</p>
                                                                                </Link>
                                                                                <Link to={`/events/edit/${events.eventTitle}/${events.id}`}
                                                                                    className="bg_border_red">
                                                                                    Edit Event
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                                :
                                                                <div className="bigErrorData">
                                                                    <div>{errorMessage}</div>
                                                                </div>
                                                        }
                                                    </div>
                                                    <div className="dashboard_compartment">
                                                        <div className="grid_flex">
                                                            <h4 className="dashboard_compartment_title">Communities ({allData.communitiesData.length >= 4 ?
                                                                `4 of ${allData.communitiesData.length}`
                                                                : `${allData.communitiesData.length} of ${allData.communitiesData.length}`})</h4>
                                                            <Link to="/communities/all">See all</Link>
                                                        </div>
                                                        {
                                                            !errorMessage ?
                                                                <div className="category_display grid_4">
                                                                    {allData.communitiesData.slice(0, 4).map((events, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <Link to={`/event/${events.communityName}/${events.id}`}>
                                                                                    <img src={events.displayImage} alt={events.displayImage} />
                                                                                    <h5>{events.communityName}</h5>
                                                                                    <p style={{ color: '#0a0a0a' }}>{events.CommunityCategoriesDatum.categoryName}</p>
                                                                                </Link>
                                                                                <Link to={`/communities/edit/${events.communityName}/${events.id}`}
                                                                                    className="bg_border_red">
                                                                                    Edit Community
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                                :
                                                                <div className="bigErrorData">
                                                                    <div>{errorMessage}</div>
                                                                </div>
                                                        }
                                                    </div>
                                                    <div className="dashboard_compartment">
                                                        <div className="grid_flex">
                                                            <h4 className="dashboard_compartment_title">Businesses ({allData.businessData.length >= 4 ?
                                                                `4 of ${allData.businessData.length}`
                                                                : `${allData.businessData.length} of ${allData.businessData.length}`})</h4>
                                                            <Link to="/businesses/all">See all</Link>
                                                        </div>
                                                        {
                                                            !errorMessage ?
                                                                <div className="category_display grid_4">
                                                                    {allData.businessData.slice(0, 4).map((events, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <Link to={`/event/${events.businessName}/${events.id}`}>
                                                                                    <img src={events.displayImage} alt={events.displayImage} />
                                                                                    <h5>{events.businessName}</h5>
                                                                                    <p style={{ color: '#0a0a0a' }}>{events.BusinessesCategoriesDatum.categoryName}</p>
                                                                                </Link>
                                                                                <Link to={`/businesses/edit/${events.businessName}/${events.id}`}
                                                                                    className="bg_border_red">
                                                                                    Edit Business
                                                                                </Link>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                                :
                                                                <div className="bigErrorData">
                                                                    <div>{errorMessage}</div>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                <Spin />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    return {auth: store.auth};
}

export default connect(mapStateToProps)(AllEvents);