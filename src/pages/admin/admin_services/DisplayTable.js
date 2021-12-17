import React from 'react'

const DisplayTable = ({editWindow, setEditWindow}) => {
    return (
        <div className="content-table" style={{overflowX : 'auto'}}>
        <table>
            <thead>
            <tr>
                <th>Provider Name</th>
                <th>E-mail</th>
                <th>Image</th>
                <th colSpan="2">Action</th>
            </tr>
            </thead>
            <tbody>
                {/* first row */}
                <tr>
                    <td data-title='Provider Name'>Christoph Koller</td>
                    <td data-title='E-mail'>e-mail@test-email.com</td>
                    <td data-title='Image'>image/src/exe_jpg.png</td>
                    <td className='edit'>
                    <button className='button' id="edit" onClick={()=>setEditWindow(!editWindow)}>Edit</button>
                    <div className="edit-content" style={{display:editWindow ? "flex" : "none"}}>
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
                    </div>
                    </td>
                    <td className='delete'>
                        <button className='button'>Delete</button>
                    </td>
                </tr>
            </tbody>
           {/* table footer */}
            <tfoot>
                <tr>
                <th colSpan='3'>Year: 2021</th>
                </tr>
            </tfoot>
        </table>
    </div>
    )
}

export default DisplayTable
