import React, {Component} from 'react';
import Product from "../../img/product/8.jpg";
import {toast, ToastContainer} from "react-toastify";

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoaded: false,
        };
    }

    handleDeleteProduct = (product) => {
        try {
            fetch('http://localhost:3000/product/' + product._id, {method: "delete"})

            toast.success("Product Deleted Successfully !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(function() { //Start the timer
                this.componentDidMount(); //After 1 second
            }.bind(this), 1000)

        } catch (error) {
            console.log(error.message);
        }
    };

    handleEditProduct = (product) => {
        window.sessionStorage.setItem("selectedProductEdit:", product._id);
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/product/all")
            .then((res) => res.json())
            .then((json) => {
                this.setState({

                    products: json,
                    isLoaded: true,

                });
            });
    };

    render() {
        let { isLoaded, products } = this.state;
        if (!isLoaded) {
            return(
                <div>
                    <h4 className="header-title">Manage Products</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer/>
                    {/* Same as */}
                    <ToastContainer />
                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Manage Products</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Main Category</th>
                                                    <th scope="col">Product Type</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col">Colour</th>
                                                    <th scope="col">Preview</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {products.map((product) => (

                                                    <tr key={product._id} >
                                                        <th scope="row">{products.indexOf(product) + 1}</th>
                                                        <td>{product.mainCategory}</td>
                                                        <td>{product.productType}</td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.description}</td>
                                                        <td>LKR.{product.price}</td>
                                                        <td>{product.discount}%</td>
                                                        <td>{product.brand}</td>
                                                        <td>{product.color}</td>

                                                        <td>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="col-lg-3"> </div>
                                                                    <div className="col-lg-6 product-preview">
                                                                        <img src={Product} alt="product" />
                                                                    </div>
                                                                    <div className="col-lg-3"> </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <ul className="d-flex justify-content-center">
                                                                <li onClick={this.handleEditProduct.bind(this, product)}className="mr-3"><a href="/editproduct" className="text-secondary"><i className="fa fa-edit" /></a></li>
                                                                <li onClick={() => this.handleDeleteProduct(product)}><a className="text-danger"><i className="ti-trash"/></a></li>
                                                            </ul>
                                                        </td>
                                                    </tr>

                                                ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default ProductList;