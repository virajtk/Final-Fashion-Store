import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      login: false,
      active: null,
      redirect: null,
    };
  }

  login = (e) => {
    e.preventDefault();
    // console.log(this.state);
    let LOGIN_API = "http://localhost:3000/login/user";
    fetch(LOGIN_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName: this.state.userName,
        password: this.state.password,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.log("result", result);
        if (result.message) {
          // console.log("No User Found")
          toast.error("🚫 User Not Found, UserName/Password does not Match", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (result && result._id) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              userName: result.userName,
              userid: result._id,
            })
          );
          window.location.reload(false);
          let userFullName = result.fullName;

          toast.success(
            "✔️ Welcome " + userFullName + ", You're Loged In Succesfully !",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }

        setTimeout(
          function () {
            //Start the timer
            this.storeCollector(); //After 2 second
          }.bind(this),
          2000
        );
      });
    });
  };

  componentDidMount() {
    this.storeCollector();
  }

  storeCollector() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
        active: active,
        redirect: "/",
      });
    }
  }

  reload(){
    window.location.reload(false);
  }

  render() {
    if (this.state.login) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
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
        {/* login area start */}
        <div className="login-area login-bg">
          <div className="container">
            <div className="login-box ptb--100">
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  this.login(e);
                }}
              >
                <div className="login-form-head">
                  <h4>Sign In</h4>
                  <p>
                    Hello there, Sign in and start managing your Admin Panel
                  </p>
                </div>
                <div className="login-form-body">
                  <div className="form-gp">
                    <label htmlFor="exampleInputEmail1">User Name</label>
                    <input
                      type="Username"
                      id="exampleInputEmail1"
                      onChange={(event) => {
                        this.setState({ userName: event.target.value });
                      }}
                      value={this.state.userName}
                      required
                    />
                    <i className="ti-email" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      id="exampleInputPassword1"
                      onChange={(event) => {
                        this.setState({ password: event.target.value });
                      }}
                      value={this.state.password}
                      required
                    />
                    <i className="ti-lock" />
                    <div className="text-danger" />
                  </div>
                  <div className="row mb-4 rmber-area">
                    <div className="col-6">
                      <div className="custom-control custom-checkbox mr-sm-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlAutosizing"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customControlAutosizing"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-6 text-right">
                      <a href="#">Forgot Password?</a>
                    </div>
                  </div>
                  <div className="submit-btn-area">
                    <button id="form_submit" type="submit">
                      Submit <i className="ti-arrow-right" />
                    </button>
                  </div>
                  <div className="form-footer text-center mt-5">
                    <p className="text-muted">
                      Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* login area end */}
      </div>
    );
  }
}

export default Login;
