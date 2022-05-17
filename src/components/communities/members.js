import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { useNavigate } from 'react-router-dom';

import {
    Spin, Table, Pagination, notification
} from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../common_files/axiosurl';
import { DateTime } from 'luxon';

const AllEvents = () => {

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: '',
            description:
                message,
        });
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [communityData, setCommunitiesData] = useState({});
    const [communityMembers, setCommunityMembers] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);
    const [current] = useState(1);


    useEffect(() => {
        let communityId = window.location.pathname.split('/')[3];
        axios(`/ambassador/all_communities_data/${communityId}`)
            .then(communitiesData => {
                if (communitiesData.data.summary === "success") {
                    setCommunitiesData(communitiesData.data.message);
                    setCommunityMembers(communitiesData.data.message.communityMembers);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(communitiesData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching community members. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

    const acceptMembership = e => {
        setSpinnerStatus(true);
        let url = !e ? '/ambassador/suspendMembership' : '/ambassador/acceptMembership';
        axios.post(url, {
            memberId: communityMembers[0].id, communityId: communityData.id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(communitiesData => {
                if (communitiesData.data.summary === "success") {
                    setCommunitiesData(communitiesData.data.message);
                    setCommunityMembers(communitiesData.data.message.communityMembers);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(communitiesData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                console.log(err)
                setErrorMessage('An error occurred while fetching community members. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }

    const deleteMember = e => {
        setSpinnerStatus(true);
        axios.post('/ambassador/deleteMembership', {
            memberId: communityMembers[0].id, communityId: communityData.id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(communitiesData => {
                if (communitiesData.data.summary === "success") {
                    setCommunitiesData(communitiesData.data.message);
                    setCommunityMembers(communitiesData.data.message.communityMembers);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(communitiesData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                console.log(err)
                setErrorMessage('An error occurred while fetching community members. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }

    const columns = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Member Name',
            className: 'column-money',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            className: 'column-money',
            dataIndex: 'emailAddress',
        },
        {
            title: 'Phone number',
            className: 'column-money',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Date added',
            className: 'column-money',
            dataIndex: 'dateAdded',
        },
        {
            title: '',
            className: 'column-money',
            dataIndex: 'action',
        },
        {
            title: '',
            className: 'column-money',
            dataIndex: 'secaction'
        }
    ];
    // const data = []
    const data = communityMembers.map((state, index) => {
        return {
            sn: index + 1,
            key: index,
            name: `${state.User.firstName} ${state.User.lastName}`,
            emailAddress: `${state.User.emailAddress}`,
            phoneNumber: `${state.User.phoneNumber}`,
            dateAdded: state.dateAccepted ? DateTime.fromISO(state.dateAccepted).toLocaleString(DateTime.DATE_HUGE) : state.dateAccepted,
            // members: state.communityMembers.length,
            action:
                !state.accepted ? <button
                    style={{ padding: '2px 25px', fontSize: 12 }}
                    onClick={() => acceptMembership(true)}
                    className="bg_green">Accept</button> : <button
                        onClick={() => acceptMembership(false)}
                        style={{ padding: '2px 25px', fontSize: 12 }}
                        className="bg_red">Reject</button>,
            secaction: <button style={{ marginBottom: 0 }}
            onClick={() => deleteMember()}
            className="bg_border_red">Delete</button>
        }
    })

    const pageSize = 10;

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return data.slice((current - 1) * pageSize, current * pageSize);
    };

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
                                                    <div className="category_display">
                                                        <Table
                                                            columns={columns}
                                                            dataSource={getData(current, pageSize)}
                                                            bordered
                                                        />
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