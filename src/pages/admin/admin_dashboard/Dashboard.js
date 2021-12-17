import React from 'react'

import './dashboard.css';

const DashboardData = [
    {
        id: 1,
        icon: "fa fa-user",
        header: "Hero Section",
        count: 300,
    },
    {
        id: 2,
        icon: "fa fa-desktop",
        header: "Services",
        count: 300,
    },
    {
        id: 3,
        icon: "fa fa-newspaper-o",
        header: "Projects",
        count: 300,
    },
    {
        id: 4,
        icon: "fa fa-graduation-cap",
        header: "Top Skills",
        count: 300,
    },
    {
        id: 5,
        icon: "fa fa-database",
        header: "Tech Stack",
        count: 300,
    },
    {
        id: 6,
        icon: "fa fa-cog",
        header: "Settings",
        count: 300,
    }
]

const AdminDashboard = () => {
    return (
        <div className="container">
            <div className="dashboard-home-page">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Hey welcome to Your Dashboard !... </p>
                </div>
                <div className="dashboard-container">
                    {DashboardData.map((data,index) =>{
                        return(
                            <div key={index} className="dashboard-columns">
                                <div className="column-header">
                                    <h5>{data.header}</h5>
                                </div>
                                <div className="column-content">
                                    <div className="column-icon">
                                        <i className={data.icon}/>
                                    </div>
                                    <div className="column-data">
                                        {data.count}K
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
