import '../../assets/css/events.css';

import React, { useState, useEffect } from 'react';
import SideNav from '../../common_files/sideNav';
import TopNav from '../../common_files/topNav';

import { useNavigate } from 'react-router-dom';

import {
    Spin, Table, Pagination, notification
} from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
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
    const [communitiesData, setCommunitiesData] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(true);
    const [current, setCurrent] = useState(1);


    useEffect(() => {
        axios('/ambassador/all_communities_data')
            .then(communitiesData => {
                console.log(communitiesData)
                if (communitiesData.data.summary === "success") {
                    setCommunitiesData(communitiesData.data.message);
                    setSpinnerStatus(false);
                } else {
                    setErrorMessage(communitiesData.data.statusMessage)
                    setSpinnerStatus(false);
                }
            })
            .catch(err => {
                setErrorMessage('An error occurred while fetching category data. Please reload page to try again');
                setSpinnerStatus(false);
            })
    }, [])

    const columns = [
        {
            title: 'S/N',
            dataIndex: 'sn',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Community Name',
            className: 'column-money',
            dataIndex: 'name',
        },
        {
            title: 'Date added',
            className: 'column-money',
            dataIndex: 'dateAdded',
        },
        {
            title: 'Members',
            className: 'column-money',
            dataIndex: 'members',
        },
        {
            title: '',
            className: 'column-money',
            dataIndex: 'action',
        }
    ];
    const data = communitiesData.map((state, index) => {
        return {
            sn: index + 1,
            key: index,
            name: `${state.communityName}`,
            dateAdded: DateTime.fromISO(state.createdAt).toLocaleString(DateTime.DATE_HUGE),
            members: state.communityMembers.length,
            action: <Link to={`/communities/${state.communityName}/${state.id}`}>View</Link>
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