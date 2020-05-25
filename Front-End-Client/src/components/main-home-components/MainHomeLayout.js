import React, { Component } from "react";
import Categories from "./components/Categories";
import SelectedItem from "./components/SelectedItem";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";
import DashHome from "./components/DashHome";
import Register from "./client-handle-components/Register";
import Login from "./client-handle-components/Login";
import EditUserProfile from "./client-handle-components/EditUserProfile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  Link,
} from "react-router-dom";

class MainHomeLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainCategories: [
        "Woman Wear",
        "Men Wear",
        "Kids Wear",
        "Bags and Purses",
        "Footwear",
        "Jewellery",
      ],
      selectedCategory: "",
      isLoaded: false,
      clientUser: [],
      redirect: null,
      login: false,
      hiddenClient: true,
      hiddenGuest: false,
    };
  }

  logoutAction = () => {
    this.state.clientUser = [];
    window.localStorage.clear();
    window.sessionStorage.clear();
    // alert(this.state.activeUser);
    this.setState({ redirect: "/login" });
    window.location.reload(false);

    toast.success("✔️ You're Succesfully Loged Out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  componentDidMount() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
        hiddenClient: false,
        hiddenGuest: true,
      });
      const LogedUserID = active.userid;
      fetch("http://localhost:3000/user/" + LogedUserID)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            isLoaded: true,
            clientUser: json,
          });
          window.sessionStorage.setItem(
            "activeUserID:",
            this.state.clientUser._id
          );
        });
    } else {
      this.state.clientUser = [];
      window.localStorage.clear();
      window.sessionStorage.clear();
      // alert(this.state.activeUser);
      this.setState({
        redirect: "/login",
        hiddenClient: true,
        hiddenGuest: false,
      });
    }
  }

  handleSelectedCategory = (category) => {
    window.sessionStorage.setItem("selectedCategory:", category);
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <Router>
          {/*[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                <![endif]*/}
          {/* preloader area start */}
          <div id="preloader">
            <div className="loader" />
          </div>
          {/* preloader area end */}
          {/* main wrapper start */}
          <div className="horizontal-main-wrapper">
            {/* main header area start */}
            <div className="mainheader-area">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="logo">
                      <a href="/">
                        <img src="assets/images/icon/logo2.png" alt="logo" />
                      </a>
                    </div>
                  </div>
                  {/* profile info & task notification */}
                  <div className="col-md-9 clearfix text-right">
                    <div className="d-md-inline-block d-block mr-md-4">
                      <ul className="notification-area">
                        <li id="full-view">
                          <i className="ti-fullscreen" />
                        </li>
                        <li id="full-view-exit">
                          <i className="ti-zoom-out" />
                        </li>
                        <li className="dropdown">
                          <i
                            className="ti-bell dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <span>2</span>
                          </i>
                          <div className="dropdown-menu bell-notify-box notify-box">
                            <span className="notify-title">
                              You have 3 new notifications{" "}
                              <a href="#">view all</a>
                            </span>
                            <div className="nofity-list">
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-key btn-danger" />
                                </div>
                                <div className="notify-text">
                                  <p>You have Changed Your Password</p>
                                  <span>Just Now</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-comments-smiley btn-info" />
                                </div>
                                <div className="notify-text">
                                  <p>New Commetns On Post</p>
                                  <span>30 Seconds ago</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-key btn-primary" />
                                </div>
                                <div className="notify-text">
                                  <p>Some special like you</p>
                                  <span>Just Now</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-comments-smiley btn-info" />
                                </div>
                                <div className="notify-text">
                                  <p>New Commetns On Post</p>
                                  <span>30 Seconds ago</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-key btn-primary" />
                                </div>
                                <div className="notify-text">
                                  <p>Some special like you</p>
                                  <span>Just Now</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-key btn-danger" />
                                </div>
                                <div className="notify-text">
                                  <p>You have Changed Your Password</p>
                                  <span>Just Now</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <i className="ti-key btn-danger" />
                                </div>
                                <div className="notify-text">
                                  <p>You have Changed Your Password</p>
                                  <span>Just Now</span>
                                </div>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="dropdown">
                          <i
                            className="fa fa-envelope-o dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <span>3</span>
                          </i>
                          <div className="dropdown-menu notify-box nt-enveloper-box">
                            <span className="notify-title">
                              You have 3 new notifications{" "}
                              <a href="#">view all</a>
                            </span>
                            <div className="nofity-list">
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img1.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    Hey I am waiting for you...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img2.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    When you can connect with me...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img3.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    I missed you so much...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img4.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    Your product is completely Ready...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img2.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    Hey I am waiting for you...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img1.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    Hey I am waiting for you...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                              <a href="#" className="notify-item">
                                <div className="notify-thumb">
                                  <img
                                    src="assets/images/author/author-img3.jpg"
                                    alt="image"
                                  />
                                </div>
                                <div className="notify-text">
                                  <p>Aglae Mayer</p>
                                  <span className="msg">
                                    Hey I am waiting for you...
                                  </span>
                                  <span>3:15 PM</span>
                                </div>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="settings-btn">
                          <i className="ti-settings" />
                        </li>
                      </ul>
                    </div>
                    <div className="clearfix d-md-inline-block d-block">
                      <div hidden={this.state.hiddenGuest}>
                        <div className="user-profile m-0">
                          <img
                            className="avatar user-thumb"
                            src="assets/images/author/avatar.png"
                            alt="avatar"
                          />
                          <h4
                            className="user-name dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Guest
                            <i className="fa fa-angle-down" />
                          </h4>
                          <div className="dropdown-menu">
                            <a className="dropdown-item">
                              <Link to="/login">SIGN IN</Link>
                            </a>
                            <a className="dropdown-item">
                              <Link to="/signup">SIGN UP</Link>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div hidden={this.state.hiddenClient}>
                        <div className="user-profile m-0">
                          <img
                            className="avatar user-thumb"
                            src="assets/images/author/avatar.png"
                            alt="avatar"
                          />
                          <h4
                            className="user-name dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            {this.state.clientUser.userName}{" "}
                            <i className="fa fa-angle-down" />
                          </h4>
                          <div className="dropdown-menu">
                            <a className="dropdown-item">
                              <Link to="/editprofile">Edit Profile</Link>
                            </a>
                            {/* <a className="dropdown-item" href="#">Settings</a> */}
                            <a
                              className="dropdown-item"
                              onClick={() => this.logoutAction()}
                            >
                              <Link>Log Out</Link>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* main header area end */}
            {/* header area start */}
            <div className="header-area header-bottom">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-9  d-none d-lg-block">
                    <div className="horizontal-menu">
                      <nav>
                        <ul id="nav_menu">
                          <li>
                            <NavLink to="/" exact>
                              <i className="" />
                              <span>Home</span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/aboutus" exact>
                              <i className="" />
                              <span>About Us</span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="#" exact>
                              <i className="" />
                              <span>Categories</span>
                            </NavLink>
                            <ul className="submenu">
                              {this.state.mainCategories.map((category) => (
                                <li
                                  onClick={this.handleSelectedCategory.bind(
                                    this,
                                    category
                                  )}
                                >
                                  <NavLink to="/categoryList">
                                    {category}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </li>
                          <li>
                            {" "}
                            <NavLink to="/contactus" exact>
                              <i className="" /> <span>Contact Us</span>
                            </NavLink>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  {/* nav and search button */}
                  <div className="col-lg-3 clearfix">
                    <div className="search-box">
                      <form action="#">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search..."
                          required
                        />
                        <i className="ti-search" />
                      </form>
                    </div>
                  </div>
                  {/* mobile_menu */}
                  <div className="col-12 d-block d-lg-none">
                    <div id="mobile_menu" />
                  </div>
                </div>
              </div>
            </div>
            {/* header area end */}
            {/* page title area end */}

            <div className="main-content-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <Switch>
                      <Route path="/" exact>
                        <DashHome />
                      </Route>
                      <Route path="/categoryList" exact>
                        <Categories />
                      </Route>
                      <Route path="/selectedItem" exact>
                        <SelectedItem />
                      </Route>
                      <Route path="/checkout" exact>
                        <Checkout />
                      </Route>
                      <Route path="/wishlist" exact>
                        <Wishlist />
                      </Route>
                      <Route path="/login" exact>
                        <Login />
                      </Route>
                      <Route path="/signup" exact>
                        <Register />
                      </Route>
                      <Route path="/editprofile" exact>
                        <EditUserProfile />
                      </Route>
                    </Switch>

                    {/*<Checkout/>*/}
                  </div>
                </div>
              </div>
            </div>
            {/* main content area end */}
            {/* footer area start*/}
            <footer>
              <div className="home-footer-area">
                <div className="social-links-warp">
                  <a href="" className="instagram">
                    <i className="fa fa-instagram" />
                    <span>instagram</span>
                  </a>
                  <a href="" className="google-plus">
                    <i className="fa fa-google-plus" />
                    <span>g+plus</span>
                  </a>
                  <a href="" className="pinterest">
                    <i className="fa fa-pinterest" />
                    <span>pinterest</span>
                  </a>
                  <a href="" className="facebook">
                    <i className="fa fa-facebook" />
                    <span>facebook</span>
                  </a>
                  <a href="" className="twitter">
                    <i className="fa fa-twitter" />
                    <span>twitter</span>
                  </a>
                  <a href="" className="youtube">
                    <i className="fa fa-youtube" />
                    <span>youtube</span>
                  </a>
                  <a href="" className="tumblr">
                    <i className="fa fa-tumblr-square" />
                    <span>tumblr</span>
                  </a>
                </div>
                <p>
                  © Copyright 2020 <a href="">Divisima</a>. All right reserved.
                  Developed by <a href="">Team BackSlash</a>.
                </p>
              </div>
            </footer>
            {/* footer area end*/}
          </div>
          {/* main wrapper start */}
          {/* offset area start */}
          <div className="offset-area">
            <div className="offset-close">
              <i className="ti-close" />
            </div>
            <ul className="nav offset-menu-tab">
              <li>
                <a className="active" data-toggle="tab" href="#activity">
                  Activity
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#settings">
                  Settings
                </a>
              </li>
            </ul>
            <div className="offset-content tab-content">
              <div id="activity" className="tab-pane fade in show active">
                <div className="recent-activity">
                  <div className="timeline-task">
                    <div className="icon bg1">
                      <i className="fa fa-envelope" />
                    </div>
                    <div className="tm-title">
                      <h4>Rashed sent you an email</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse distinctio itaque at.
                    </p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg2">
                      <i className="fa fa-check" />
                    </div>
                    <div className="tm-title">
                      <h4>Added</h4>
                      <span className="time">
                        <i className="ti-time" />7 Minutes Ago
                      </span>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg2">
                      <i className="fa fa-exclamation-triangle" />
                    </div>
                    <div className="tm-title">
                      <h4>You missed you Password!</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:20 Am
                      </span>
                    </div>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg3">
                      <i className="fa fa-bomb" />
                    </div>
                    <div className="tm-title">
                      <h4>Member waiting for you Attention</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse distinctio itaque at.
                    </p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg3">
                      <i className="ti-signal" />
                    </div>
                    <div className="tm-title">
                      <h4>You Added Kaji Patha few minutes ago</h4>
                      <span className="time">
                        <i className="ti-time" />
                        01 minutes ago
                      </span>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse distinctio itaque at.
                    </p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg1">
                      <i className="fa fa-envelope" />
                    </div>
                    <div className="tm-title">
                      <h4>Ratul Hamba sent you an email</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                    <p>
                      Hello sir , where are you, i am egerly waiting for you.
                    </p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg2">
                      <i className="fa fa-exclamation-triangle" />
                    </div>
                    <div className="tm-title">
                      <h4>Rashed sent you an email</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse distinctio itaque at.
                    </p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg2">
                      <i className="fa fa-exclamation-triangle" />
                    </div>
                    <div className="tm-title">
                      <h4>Rashed sent you an email</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg3">
                      <i className="fa fa-bomb" />
                    </div>
                    <div className="tm-title">
                      <h4>Rashed sent you an email</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse distinctio itaque at.
                    </p>
                  </div>
                  <div className="timeline-task">
                    <div className="icon bg3">
                      <i className="ti-signal" />
                    </div>
                    <div className="tm-title">
                      <h4>Rashed sent you an email</h4>
                      <span className="time">
                        <i className="ti-time" />
                        09:35
                      </span>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse distinctio itaque at.
                    </p>
                  </div>
                </div>
              </div>
              <div id="settings" className="tab-pane fade">
                <div className="offset-settings">
                  <h4>General Settings</h4>
                  <div className="settings-list">
                    <div className="s-settings">
                      <div className="s-sw-title">
                        <h5>Notifications</h5>
                        <div className="s-swtich">
                          <input type="checkbox" id="switch1" />
                          <label htmlFor="switch1">Toggle</label>
                        </div>
                      </div>
                      <p>
                        Keep it 'On' When you want to get all the notification.
                      </p>
                    </div>
                    <div className="s-settings">
                      <div className="s-sw-title">
                        <h5>Show recent activity</h5>
                        <div className="s-swtich">
                          <input type="checkbox" id="switch2" />
                          <label htmlFor="switch2">Toggle</label>
                        </div>
                      </div>
                      <p>
                        The for attribute is necessary to bind our custom
                        checkbox with the input.
                      </p>
                    </div>
                    <div className="s-settings">
                      <div className="s-sw-title">
                        <h5>Show your emails</h5>
                        <div className="s-swtich">
                          <input type="checkbox" id="switch3" />
                          <label htmlFor="switch3">Toggle</label>
                        </div>
                      </div>
                      <p>Show email so that easily find you.</p>
                    </div>
                    <div className="s-settings">
                      <div className="s-sw-title">
                        <h5>Show Task statistics</h5>
                        <div className="s-swtich">
                          <input type="checkbox" id="switch4" />
                          <label htmlFor="switch4">Toggle</label>
                        </div>
                      </div>
                      <p>
                        The for attribute is necessary to bind our custom
                        checkbox with the input.
                      </p>
                    </div>
                    <div className="s-settings">
                      <div className="s-sw-title">
                        <h5>Notifications</h5>
                        <div className="s-swtich">
                          <input type="checkbox" id="switch5" />
                          <label htmlFor="switch5">Toggle</label>
                        </div>
                      </div>
                      <p>Use checkboxes when looking for yes or no answers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* offset area end */}
        </Router>
      </div>
    );
  }
}

export default MainHomeLayout;
