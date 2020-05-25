import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            fullName: "",
            userName: "",
            email: "",
            contactNo: "",
            password: "",
            newPassword: "",
            redirect: null,
        };
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state));
        this.postData();
    };

    async postData() {
        try {
            //   let id = sessionStorage.getItem("selectedUserID:");
            let id = '5ecb86d3f0ac9a478c851b05';
            let result;
            if (this.state.newPassword) {
                result = await fetch("http://localhost:3000/user/" + id, {
                    method: "put",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        "fullName": this.state.fullName,
                        "email": this.state.email,
                        "contactNo": this.state.contactNo,
                        "password": this.state.newPassword,
                    }),
                });
            }
            else {
                result = await fetch("http://localhost:3000/user/" + id, {
                    method: "put",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        "fullName": this.state.fullName,
                        "email": this.state.email,
                        "contactNo": this.state.contactNo,
                    }),
                });
            }

            console.log("Result: " + result);
            toast.success("✔️ User Details Updated Susseccfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            //setTimeout(function() { //Start the timer
            // this.setState({redirect: "/adminlist"}) //After 3 second, set redirect to true
            //}.bind(this), 3000)
        } catch (error) {
            console.log(error.message);
        }
    }

    onChangeHandler = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        // let selectedUserID = sessionStorage.getItem("selectedUserID:");
        let selectedUserID = '5ecb86d3f0ac9a478c851b05';
        fetch("http://localhost:3000/user/" + selectedUserID)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    adminUser: json,
                    fullName: json.fullName,
                    userName: json.userName,
                    email: json.email,
                    contactNo: json.contactNo,
                    password: json.password,
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div>
                <ToastContainer />
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Edit User Details</h4>
                                </div>
                                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Full Name"
                                                    id="inputFullName"
                                                    name="fullName"
                                                    value={this.state.fullName}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">User Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="User Name"
                                                    id="inputUserName"
                                                    name="userName"
                                                    value={this.state.userName}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control style-input"
                                                    placeholder="Email"
                                                    id="inputEmail"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Contact Number
                        </label>
                                                <input
                                                    type="number"
                                                    className="form-control style-input"
                                                    placeholder="Contact Number"
                                                    id="inputContactNo"
                                                    name="contactNo"
                                                    value={this.state.contactNo}
                                                    onChange={this.onChangeHandler}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Current Password
                        </label>
                                                <input
                                                    type="password"
                                                    className="form-control style-input"
                                                    placeholder="Current Password"
                                                    id="inputCurrentPassword"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">New Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control style-input"
                                                    placeholder="New Password"
                                                    id="inputNewPassword"
                                                    name="newPassword"
                                                    value={this.state.newPassword}
                                                    onChange={this.onChangeHandler}
                                                />
                                                <small id="emailHelp" className="form-text text-muted">
                                                    Enter New Password if you want to Update the Password.
                        </small>
                                            </div>

                                            <div className="form-check text-left">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="exampleCheck1"
                                                    required
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleCheck1"
                                                >
                                                    Confirmation
                        </label>
                                            </div>
                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Update User
                        </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6"> </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUserProfile;