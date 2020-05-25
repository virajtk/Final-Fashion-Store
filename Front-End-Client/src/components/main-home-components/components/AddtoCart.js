import React, { Component } from "react";

class AddtoCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategory:'',
            mainCategory: '',
            description: ''
        };
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        alert(JSON.stringify(this.state));
        this.postData();

    };

    async postData() {
        try {
            let result = await fetch('http://localhost:3000/category', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(this.state)
            });

            console.log('Result: '+ result);

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
        return (
            <div>
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
                                >
                                    <option selected="selected"> </option>
                                    <option value="woman-wear">Woman wear</option>
                                    <option value="men-wear">Men wear</option>
                                    <option value="children">Children</option>
                                    <option value="bags-and-purses">Bags and Purses</option>
                                    <option value="footwear">Footwear</option>
                                    <option value="jewellery">Jewellery</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Sub Category Name</label>
                                <input
                                    type="text"
                                    className="form-control style-input"
                                    placeholder="Sub Category"
                                    id="inputSubCategory"
                                    name="subCategory"
                                    value={this.state.subCategory}
                                    onChange={this.onChangeHandler}
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
                                    rows="3"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeHandler}
                                ></textarea>
                            </div>
                            <div className="form-check text-left">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
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
                        <div className="col-md-6"></div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddtoCart;
