import React, {Component} from 'react';
import Product from "../../img/product/8.jpg";
import {toast, ToastContainer} from "react-toastify";

class AddProduct extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMainCategory = this.onChangeMainCategory.bind(this);

        this.state = {
            mainCategory: '',
            productType: '',
            productName: '',
            description: '',
            price: '',
            discount:'',
            discountPrice:'',
            brand: '',
            color: '',
            productTypeList: []
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };


    onChangeMainCategory = (event) =>{
        this.setState({
            mainCategory: event.target.value
        });

        fetch('http://localhost:3000/product/findProductType/'+event.target.value)
            .then(res => res.json())
            .then(json =>{
                console.log("json",json);
                this.setState({
                    productTypeList: json,
                })
            });

    };

    onChangeSubCategory = (event) => {
        this.setState({
            productType: event.target.value
        });
    }


    async postData() {
        try {
            if(this.state.discount){
                this.state.discountPrice = this.state.price - this.state.price * (this.state.discount/100);

            }
            let result = await fetch('http://localhost:3000/product/addproduct', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "mainCategory": this.state.mainCategory,
                    "productType": this.state.productType,
                    "productName": this.state.productName,
                    "description": this.state.description,
                    "price": this.state.price,
                    "discount": this.state.discount,
                    "discountPrice":this.state.discountPrice,
                    "brand": this.state.brand,
                    "color": this.state.color,
                })
            });
            toast.success("Product Added Successfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            console.log('Result: '+ result);

        } catch (error) {
            console.log(error.message);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.postData();

    };


    render() {

        return (
            <div>
                <ToastContainer />
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Add New Product</h4>
                                </div>
                                <form onSubmit={this.handleSubmit} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="col-form-label">Main Category</label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="mainCategory"
                                                    value={this.state.mainCategory}
                                                    onChange={this.onChangeMainCategory}
                                                >
                                                    <option selected="selected"> </option>
                                                    <option value="Woman Wear">Women Wear</option>
                                                    <option value="Men Wear">Men Wear</option>
                                                    <option value="Kids Wear">Kids Wear</option>
                                                    <option value="Bags and Purses">Bags and Purses</option>
                                                    <option value="Footwear">Footwear</option>
                                                    <option value="Jewellery">Jewellery</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label">Product Type</label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="productType"
                                                    value={this.state.productType}
                                                    onChange={this.onChangeSubCategory}
                                                >
                                                    <option selected="selected"> </option>
                                                    {this.state.productTypeList.map(productTypes => (
                                                        <option key={productTypes._id} value={productTypes.subCategory}>
                                                            {productTypes.subCategory}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Product Name</label>
                                                <input
                                                       type="text"
                                                       className="form-control style-input"
                                                       placeholder="Product Name"
                                                       name="productName"
                                                       value={this.state.productName}
                                                       onChange={this.handleChange}
                                                />
                                                <small id="emailHelp" className="form-text text-muted">This category should be related to the main category.</small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                                <textarea
                                                    className="form-control style-input"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    name="description"
                                                    value={this.state.description}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Price</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Price"
                                                    name="price"
                                                    value={this.state.price}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Discount</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Discount"
                                                    name="discount"
                                                    value={this.state.discount}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Brand</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Brand"
                                                    name="brand"
                                                    value={this.state.brand}
                                                    onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Colour</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Colour"
                                                    name="color"
                                                    value={this.state.color}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">Submit</button>
                                                <button type="reset" className="btn fashion-btn">Reset</button>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="col-lg-12 col-sm-6">
                                            <div className="product-item">
                                                <div className="pi-pic">
                                                    <img src={Product} alt="product" />
                                                </div>
                                                <div className="pi-text fashion-buttons upload-btn">
                                                    <button type="submit" className="btn fashion-btn ">Upload</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
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

export default AddProduct;
