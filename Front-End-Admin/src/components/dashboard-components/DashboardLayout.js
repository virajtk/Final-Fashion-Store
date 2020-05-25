import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import AddCategory from "./components/AddCategory";
import CategoryList from "./components/CategoryList";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import AdminUserList from "../admin-components/AdminUserList";
import DashBoard from "./components/DashBoard";
import EditAdminProfile from "./components/EditAdminProfile";
import DashboardLogin from "../admin-components/DashboardLogin";
import AddAccount from "../admin-components/AddAccount";
import EditCategory from "./components/EditCategory";
import EditAdminUser from "./components/EditAdminUser";

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      adminUser: [],
      redirect: null,
      login: false,
      hiddenAdmin: true,
      hiddenStoreManager: true,
    };
  }

  logoutAction = () => {
    this.state.activeUser = [];
    window.localStorage.clear();
    window.sessionStorage.clear();
    // alert(this.state.activeUser);
    this.setState({ redirect: "/login" });

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
      });
      if(active.userrole.localeCompare('Admin')==0){
        this.setState({
          hiddenAdmin: false,
        })
      }
      else{
        this.setState({
          hiddenStoreManager: false,
        })
      }

      const LogedUserID = active.userid;
    fetch("http://localhost:3000/adminUser/" + LogedUserID)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          adminUser: json,
        });
        window.sessionStorage.setItem("activeUserID:", this.state.adminUser._id);
      });

    }
    else{
      
      this.state.activeUser = [];
    window.localStorage.clear();
    window.sessionStorage.clear();
    // alert(this.state.activeUser);
    this.setState({ redirect: "/login" });
    }
    
  }

  render() {
    if (this.state.redirect) {
      return (
        <Router>
          <Redirect to={this.state.redirect} />
          <Switch>
            <Route path="/login" exact>
              <DashboardLogin />
            </Route>
          </Switch>
        </Router>
      );
    }
    // if (!this.state.adminUser) {
    //   return (
    //     <Router>
    //       <Redirect to="/logout" />
    //       <Switch>
    //         <Route path="/login" exact>
    //           <DashboardLogin />
    //         </Route>
    //       </Switch>
    //     </Router>
    //   );
    // }

    return (
      <div>
        {/* <ToastContainer /> */}
        {/*[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]*/}
        {/* preloader area start */}
        <div id="preloader">
          <div className="loader" />
        </div>
        {/* preloader area end */}
        {/* page container area start */}
        <div className="page-container">
          <Router>
            {/* sidebar menu area start */}
            <div className="sidebar-menu">
              <div className="sidebar-header">
                <div className="logo">
                  <a href="/">
                    <img src="assets/images/icon/logo.png" alt="logo" />
                  </a>
                </div>
              </div>
              <div className="main-menu">
                <div className="menu-inner">
                  <nav>
                    <ul className="metismenu" id="menu">
                      <li className="">
                        <a>
                          <NavLink
                            to="/"
                            exact
                            activeStyle={{ color: "white" }}
                          >
                            <i className="ti-dashboard" />{" "}
                            <span>Dashboard</span>
                          </NavLink>
                        </a>
                      </li>
                      <li hidden={this.state.hiddenAdmin}>
                        <a href="javascript:void(0)" aria-expanded="true">
                          <i className=" ti-layout-grid2" />
                          <span>User Management</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/adminreg"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                > <span>Add Manager</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/adminlist"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                > <span>Manage Users</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li hidden={this.state.hiddenAdmin}>
                        <a href="javascript:void(0)" aria-expanded="true" >
                          <i className="ti-briefcase" />
                          <span>Category Management</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/newcategory"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                > <span>Add Category</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/categorylist"
                                exact
                                activeStyle={{ color: "white" }}
                              >
                                > <span>Category List</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li hidden={this.state.hiddenStoreManager}>
                        <a href="javascript:void(0)" aria-expanded="true" render={this.state.renderStoreManager}>
                          <i className=" ti-layout-grid2" />
                          <span>Product Management</span>
                        </a>
                        <ul className="collapse">
                          <li>
                            <a>
                              <NavLink
                                to="/addproduct"
                                activeStyle={{ color: "white" }}
                              >
                                > <span>Add Product</span>
                              </NavLink>
                            </a>
                          </li>
                          <li>
                            <a>
                              <NavLink
                                to="/productlist"
                                activeStyle={{ color: "white" }}
                              >
                                > <span>Product List</span>
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>

                      {/* <li><a href=""><i className="ti-gift" /> <span>Flash Deals</span></a></li> */}

                      {/* <li>
                        <a href="">
                          <i className="ti-home" />{" "}
                          <span>Store Management</span>
                        </a>
                      </li> */}
                      {/* <li>
                                            <a href="javascript:void(0)" aria-expanded="true"><i className="fa fa-align-left" /> <span>Multi
                          level menu</span></a>
                                            <ul className="collapse">
                                                <li><a href="#">Item level (1)</a></li>
                                                <li><a href="#">Item level (1)</a></li>
                                                <li><a href="#" aria-expanded="true">Item level (1)</a>
                                                    <ul className="collapse">
                                                        <li><a href="#">Item level (2)</a></li>
                                                        <li><a href="#">Item level (2)</a></li>
                                                        <li><a href="#">Item level (2)</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Item level (1)</a></li>
                                            </ul>
                                        </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* sidebar menu area end */}
            {/* main content area start */}
            <div className="main-content">
              {/* header area start */}
              <div className="header-area">
                <div className="row align-items-center">
                  {/* nav and search button */}
                  <div className="col-md-6 col-sm-8 clearfix">
                    <div className="nav-btn pull-left">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="search-box pull-left">
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
                  {/* profile info & task notification */}
                  <div className="col-md-6 col-sm-4 clearfix">
                    <ul className="notification-area pull-right">
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
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                </div>
              </div>
              {/* header area end */}
              {/* page title area start */}
              <div className="page-title-area">
                <div className="row align-items-center">
                  <div className="col-sm-8">
                    <div className="breadcrumbs-area clearfix">
                      <h4 className="page-title pull-left">Dashboard</h4>
                      <ul className="breadcrumbs pull-left">
                        <li>
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <span>Dashboard </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <div className="breadcrumbs-area clearfix">
                      <h4 className="page-title pull-left text-uppercase">
                        {this.state.adminUser.role}
                      </h4>
                    </div>
                  </div>

                  <div className="col-sm-3 clearfix">
                    <div className="user-profile pull-right">
                      <img
                        className="avatar user-thumb"
                        src="assets/images/author/avatar.png"
                        alt="avatar"
                      />
                      <h4
                        className="user-name dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        {this.state.adminUser.userName}{" "}
                        <i className="fa fa-angle-down" />
                      </h4>
                      <div className="dropdown-menu">
                        {/* <a className="dropdown-item" href="#">
                        Message
                      </a>
                      <a className="dropdown-item" href="#">
                        Settings
                      </a> */}
                        <a className="dropdown-item">
                          <Link to="/editprofile">Edit Profile</Link>
                        </a>
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
              {/* page title area end */}
              <div className="main-content-inner">
                <Switch>
                  <Route path="/" exact>
                    <DashBoard />
                  </Route>
                  <Route path="/adminreg" exact>
                    <AddAccount />
                  </Route>
                  <Route path="/adminlist" exact>
                    <AdminUserList />
                  </Route>
                  <Route path="/newcategory" exact>
                    <AddCategory />
                  </Route>
                  <Route path="/categorylist" exact>
                    <CategoryList />
                  </Route>
                  <Route path="/addproduct" exact>
                    <AddProduct />
                  </Route>
                  <Route path="/productlist" exact>
                    <ProductList />
                  </Route>
                  <Route path="/editprofile" exact>
                    <EditAdminProfile />
                  </Route>
                  <Route path="/editadminuser" exact>
                    <EditAdminUser />
                  </Route>
                  <Route path="/editcategory" exact>
                    <EditCategory />
                  </Route>
                </Switch>
              </div>
            </div>
            {/* main content area end */}
            {/* footer area start*/}
            <footer>
              <div className="footer-area">
                <p>
                  © Copyright 2020 <a href="">Divisima</a>. All right reserved.
                  Developed by <a href="">Team BackSlash</a>.
                </p>
              </div>
            </footer>
            {/* footer area end*/}
          </Router>
        </div>
        {/* page container area end */}
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
                  <p>Hello sir , where are you, i am egerly waiting for you.</p>
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
                      The for attribute is necessary to bind our custom checkbox
                      with the input.
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
                      The for attribute is necessary to bind our custom checkbox
                      with the input.
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
      </div>
    );
  }
}

export default DashboardLayout;
