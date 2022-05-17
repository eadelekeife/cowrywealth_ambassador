import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { Link } from 'react-router-dom';

import { Spin, notification } from 'antd';
import axios from '../../common_files/axiosurl';

const AllEvents = () => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [communitiesData, setCommunitiesData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);


    useEffect(() => {
        axios('/admin/get_all_businesses')
            .then(eventsData => {
                console.log(eventsData)
                if (eventsData.data.summary === "success") {
                    setCommunitiesData(eventsData.data.message);
                    setSpinnerStatus(false);
                } else {
                    // openNotificationWithIcon('error', 'An error occurred while fetching data. Please try again.' )
                    openNotificationWithIcon(eventsData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                openNotificationWithIcon('An error occurred while fetching category data. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

    const EditCategory = e => {
        setSpinnerStatus(true);
        let url = e.action ? '/admin/hideBusiness' : '/admin/showBusiness';
        axios.post(url, {
            businessId: e.categoryId
        })
            .then(categoryData => {
                if (categoryData.data.summary === "success") {
                    setCommunitiesData(categoryData.data.message);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(categoryData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
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
                                        <div className="contain">
                                            {
                                                !errorMessage ?
                                                    <div className="category_display grid_4">
                                                        {communitiesData.map((community, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <img src={community.displayImage} alt={community.displayImage} />
                                                                    <h5>{community.businessName}</h5>
                                                                    <p>{community.BusinessesCategoriesDatum.categoryName}</p>
                                                                    <Link 
                                                                    to={`/business/edit/${community.businessName}/${community.id}`}
                                                                    className="bg_border_red">Edit Business</Link>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default AllEvents;