import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategory: "",
      mainCategory: "",
      description: "",
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
      let result = await fetch("http://localhost:3000/category", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      console.log("Result: " + result);
      toast.success("✔️ Category Added Susseccfully !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(function() { //Start the timer
        this.setState({redirect: "/categorylist"}) //After 3 second, set redirect to true
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
        <div className="row">
          <div className="col-lg-12 mt-5">
            <div className="card">
              <div className="card-body">
                <div>
                  <h4 className="header-title">Add New Category</h4>
                </div>
                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label className="col-form-label">Main Category</label>
                        <select
                          className="custom-select style-input select-style"
                          id="selectMainCategory"
                          name="mainCategory"
                          value={this.state.mainCategory}
                          onChange={this.onChangeHandler}
                          required
                        >
                          <option selected="selected"></option>
                          <option value="Woman Wear">Woman Wear</option>
                          <option value="Men Wear">Men Wear</option>
                          <option value="Kids Wear">Kids Wear</option>
                          <option value="Bags and Purses">Bags and Purses</option>
                          <option value="Footwear">Footwear</option>
                          <option value="Jewellery">Jewellery</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Sub Category Name</label>
                        <input
                          type="text"
                          className="form-control style-input"
                          placeholder="Enter New Sub Category"
                          id="inputSubCategory"
                          name="subCategory"
                          value={this.state.subCategory}
                          onChange={this.onChangeHandler}
                          required
                        />
                        <small id="emailHelp" className="form-text text-muted">
                          This category should be related to the main category.
                        </small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea
                          className="form-control style-input"
                          id="InputDescription"
                          placeholder="Enter Description for Sub Category"
                          rows="3"
                          name="description"
                          value={this.state.description}
                          onChange={this.onChangeHandler}
                          required
                        />
                      </div>
                      <div className="form-check text-left">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          required
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                          Confirmation
                        </label>
                      </div>
                      <div className="fashion-buttons text-left">
                        <button type="submit" className="btn fashion-btn ">
                          Submit
                        </button>
                        <button type="reset" className="btn fashion-btn">
                          Clear
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

export default AddCategory;
