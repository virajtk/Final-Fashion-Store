import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      address: "",
      address2: "",
      zip: "",
      credit: "",
      debit: "",
      paypal: "",
      cc_name: "",
      cc_number: "",
      cc_cvv: "",
      cc_expiration: "",
      selectedProduct: [],
      isLoaded: false,
      cartItems: [],
      productName: "",
      totalValue: 0.0,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();
  };

  async postData() {
    let result = await fetch("http://localhost:3000/cart", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    });
    toast.success("☑️ Added Successfully !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    console.log("Result: " + result);
    this.setState({ redirect: "/categorylist" });
  }
  catch(error) {
    console.log(error.message);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    let id = sessionStorage.getItem("productID:");
    fetch("http://localhost:3000/product/" + id)
      .then((res) => res.json())
      .then((json) => {
        // console.log("json",json);
        this.setState({
          selectedProduct: json,
          isLoaded: true,
        });
        this.state.cartItems.push(this.state.selectedProduct);
        console.log(this.state.cartItems[0]._id);
        // alert(this.state.cartItems.length);

        for (let i = 0; i < this.state.cartItems.length; i++) {
          this.state.totalValue += this.state.cartItems[i].discountPrice;
        }
        // alert(this.state.totalValue);
      });
  }
  render() {
    let { cartItems, selectedProduct, totalValue } = this.state;
    return (
      <section className="product-section">
        <div className="container">
          {/*style={{maxWidth: "960px"}}*/}
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">
                  {this.state.cartItems.length + 1}
                </span>
              </h4>
              <ul className="list-group mb-3 sticky-top">
                {cartItems.map((item) => (
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6
                        className="my-0"
                        name="productName"
                        onChange={this.handleChange}
                        value={item.productName}
                        onSubmit={this.handleSubmit}
                      >
                        {item.productName}
                      </h6>
                      {/*<small className="text-muted">Brief description</small>*/}
                    </div>
                    <span className="text-muted">
                      LKR.{item.discountPrice}.00
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Legible Casual Social Formal Shirt</h6>
                    {/*<small className="text-muted">Brief description</small>*/}
                  </div>
                  <span className="text-muted">LKR.1467.00</span>
                </li>

                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">-$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (LKR)</span>
                  <strong>{totalValue + 1467.0}.00</strong>
                </li>
              </ul>
              {/*<form className="card p-2" >*/}
              {/*    <div className="input-group">*/}
              {/*        <input type="text" className="form-control" placeholder="Promo code" />*/}
              {/*        <div className="input-group-append">*/}
              {/*            <button type="submit" className="btn btn-secondary">Redeem</button>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</form>*/}
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form
                className="needs-validation"
                onSubmit={this.handleSubmit}
                autoComplete="off"
              >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                      id="firstName"
                      required
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Valid first name is required.{" "}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                      id="lastName"
                      required
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Valid last name is required.{" "}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={this.handleChange}
                      value={this.state.username}
                      id="username"
                      placeholder="Username"
                      required
                    />
                    <div className="invalid-feedback" style={{ width: "100%" }}>
                      {" "}
                      Your username is required.{" "}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Please enter a valid email address for shipping updates.{" "}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={this.handleChange}
                    value={this.state.address}
                    id="address"
                    required
                  />
                  <div className="invalid-feedback">
                    {" "}
                    Please enter your shipping address.{" "}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address2">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address2"
                    onChange={this.handleChange}
                    value={this.state.address2}
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <select
                      className="custom-select d-block w-100"
                      name="country"
                      onChange={this.handleChange}
                      value={this.state.country}
                      id="country"
                      required
                    >
                      <option value>Choose...</option>
                      <option>Sri Lanka</option>
                    </select>
                    <div className="invalid-feedback">
                      {" "}
                      Please select a valid country.{" "}
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">State</label>
                    <select
                      className="custom-select d-block w-100"
                      name="state"
                      onChange={this.handleChange}
                      value={this.state.state}
                      id="state"
                      required
                    >
                      <option value>Choose...</option>
                      <option>Galle</option>
                      <option>Colombo</option>
                      <option>Matara</option>
                      <option>Jaffna</option>
                      <option>Kurunegala</option>
                      <option>Kaluthara</option>
                      <option>Kandy</option>
                      <option>Hambantota</option>
                    </select>
                    <div className="invalid-feedback">
                      {" "}
                      Please provide a valid state.{" "}
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      onChange={this.handleChange}
                      value={this.state.zip}
                      id="zip"
                      required
                    />
                    <div className="invalid-feedback"> Zip code required. </div>
                  </div>
                </div>

                <hr className="mb-4" />
                <h4 className="mb-3">Payment</h4>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      name="credit"
                      onChange={this.handleChange}
                      value={this.state.credit}
                    />
                    <label className="custom-control-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      name="debit"
                      onChange={this.handleChange}
                      value={this.state.debit}
                    />
                    <label className="custom-control-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      name="paypal"
                      onChange={this.handleChange}
                      value={this.state.paypal}
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cc_name"
                      onChange={this.handleChange}
                      value={this.state.cc_name}
                      id="cc_name"
                      required
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">
                      {" "}
                      Name on card is required{" "}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Credit card number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cc_number"
                      onChange={this.handleChange}
                      value={this.state.cc_number}
                      id="cc_number"
                      placeholder
                      required
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Credit card number is required{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input
                      type="date"
                      className="form-control"
                      name="cc_expiration"
                      onChange={this.handleChange}
                      value={this.state.cc_expiration}
                      id="cc_expiration"
                      required
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Expiration date required{" "}
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-cvv">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cc_cvv"
                      onChange={this.handleChange}
                      value={this.state.cc_cvv}
                      id="cc_cvv"
                      required
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Security code required{" "}
                    </div>
                  </div>
                </div>
                <hr className="mb-4" />
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  href="/wishlist"
                >
                  Continue to checkout
                </button>
                <br></br>
                <a href="/categoryList" className="site-btn">
                  Go Back
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Checkout;
