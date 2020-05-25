import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      userName: "",
      email: "",
      contactNo: "",
      password: "",
      confirmPassword: "",
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
      let result = await fetch("http://localhost:3000/adminUser", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      console.log("Result: " + result);
      toast.success("✔️ Account Added Susseccfully !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(function() { //Start the timer
        this.setState({ redirect: "/adminlist" });//After 3 second, set redirect to true
      }.bind(this), 3000)
      
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <ToastContainer />
        {/*[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                <![endif]*/}
        {/* preloader area start */}
        {/* <div id="preloader">
          <div className="loader" />
        </div> */}
        {/* preloader area end */}

        {/* Add Account area start */}
        <div className="login-area register-bg">
          <div className="container p-0">
            <div className="row no-gutters">
              <div className="col-xl-4 offset-xl-8 col-lg-6 offset-lg-6">
                <div className="login-box-s2 ptb--100">
                  <form onSubmit={this.onSubmitHandler} autoComplete="off">
                    <div className="login-form-head">
                      <h4>Add Store Manager</h4>
                      <p>
                        Add Store Manager to Give Access for Manage <br /> The
                        Fashion Store
                      </p>
                    </div>
                    <div className="login-form-body">
                      <div className="form-gp">
                        <label htmlFor="exampleInputName1">Full Name</label>
                        <input
                          type="text"
                          id="inputFullName"
                          name="fullName"
                          value={this.state.fullName}
                          onChange={this.onChangeHandler}
                          required
                        />
                        <i className="ti-user" />
                        <div className="text-danger" />
                      </div>
                      <div className="form-gp">
                        <label htmlFor="exampleInputUsername1">Username</label>
                        <input
                          type="userName"
                          id="inputUsername"
                          name="userName"
                          value={this.state.userName}
                          onChange={this.onChangeHandler}
                          required
                        />
                        <i className="ti-id-badge" />
                        <div className="text-danger" />
                      </div>
                      <div className="form-gp">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="inputEmail"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeHandler}
                          required
                        />
                        <i className="ti-email" />
                        <div className="text-danger" />
                      </div>
                      <div className="form-gp">
                        <label htmlFor="exampleInputContactNo1">
                          Contact Number
                        </label>
                        <input
                          type="number"
                          id="inputContactNo"
                          name="contactNo"
                          value={this.state.contactNo}
                          onChange={this.onChangeHandler}
                        />
                        <i className="ti-mobile" />
                        <div className="text-danger" />
                      </div>
                      <div className="form-gp">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          id="inputPassword"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangeHandler}
                          required
                        />
                        <i className="ti-lock" />
                        <div className="text-danger" />
                      </div>
                      <div className="form-gp">
                        <label htmlFor="exampleInputPassword2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="inputConfirmPassword"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.onChangeHandler}
                          required
                        />
                        <i className="ti-lock" />
                        <div className="text-danger" />
                      </div>
                      <div className="submit-btn-area">
                        <button id="form_submit" type="submit">
                          Submit <i className="ti-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Account area end */}
      </div>
    );
  }
}

export default AddAccount;
