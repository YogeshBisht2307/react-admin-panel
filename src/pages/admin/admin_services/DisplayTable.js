import React from 'react'

const DisplayTable = ({serviceData, editWindow, setEditWindow}) => {
    return (
        <div className="content-table" style={{overflowX : 'auto'}}>
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Detail</th>
                <th>Image Font</th>
                <th>Image Url</th>
                <th colSpan="2">Action</th>
            </tr>
            </thead>
            <tbody>
                {/* first row */}
                {serviceData.map((service, index) => {
                    return (
                        <tr key={index}>
                            <td data-title='service_title'>{service.serviceTitle}</td>
                            <td data-title='service_detail'>{service.serviceDetail}</td>
                            <td data-title='service_image_font'>{service.serviceImageFont}</td>
                            <td data-title='service_image_url'>{service.serviceImageUrl}</td>
                            <td className='edit'>
                                <button className='button' id="{serviceId}" onClick={()=>setEditWindow(!editWindow)}>Edit</button>
                            </td>
                            <td className='delete'>
                                <button id="{serviceId}" className='button'>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
           {/* table footer */}
            <tfoot>
                <tr>
                <th colSpan='5'>Year: 2021</th>
                </tr>
            </tfoot>
        </table>
        {/* <div className="edit-content" style={{display:editWindow ? "flex" : "none"}}>
                        <div onClick={()=>setEditWindow(!editWindow)} className="cross">
                            X
                        </div>
                        <div className="form_wrapper">
                            <div className="form_container">
                                <div className="title_container">
                                    <h2>Update Service</h2>
                                </div>
                                <div className="row">
                                    <form>
                                        <div className="form-row">
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" name="name" placeholder="Name"  required />
                                            </div>
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                                <input type="email" name="email" placeholder="Email" required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                                <input type="password" name="password" placeholder="Password" required />
                                            </div>
                                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                                <input type="text" name="confirm_password" placeholder="Confirm Password" required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <input className="button" type="submit" value="Update" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> */}
    </div>
    )
}

export default DisplayTable
