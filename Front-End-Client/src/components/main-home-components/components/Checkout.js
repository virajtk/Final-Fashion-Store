import React, {Component} from 'react';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            address: '',
            address2: '',
            country: '',
            zip: '',
            same_address: '',
            save_info: '',
            credit: '',
            debit: '',
            paypal: '',
            cc_name: '',
            cc_number: '',
            cc_cvv: '',
            cc_expiration: '',
            selectedProduct: [],
            isLoaded: false,
            cartItems: [],
            totalValue : 0.0,
        };

    }

    async postData() {
        let result = await fetch('http://localhost:3000/checkout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "username": this.state.username,
                "email": this.state.email,
                "address": this.state.address,
                "address2": this.state.address2,
                "country":this.state.country,
                "zip": this.state.zip,
                "same_address": this.state.same_address,
                "save_info": this.state.save_info,
                "credit": this.state.credit,
                "debit": this.state.debit,
                "paypal": this.state.paypal,
                "cc_name": this.state.cc_name,
                "cc_number": this.state.cc_number,
                "cc_cvv": this.state.cc_cvv,
                "cc_expiration": this.state.cc_expiration,
                "selectedProduct": this.state.selectedProduct,
                "cartItems": this.state.cartItems,
                "totalValue": this.state.totalValue,


            })
        });

        console.log('Result: '+ result);

    } catch (error) {
        console.log(error.message);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.postData();

    };

    handleChange = (event) => {
        const target = event.target;
        const  name = target.name;
        const  value = target.value;

        this.setState({
            [name]:value
        });

    };

    componentDidMount() {
        let id=  sessionStorage.getItem("productID:");
        fetch('http://localhost:3000/product/'+id)
            .then(res => res.json())
            .then(json =>{
                // console.log("json",json);
                this.setState({
                    selectedProduct: json,
                    isLoaded: true,
                })
                this.state.cartItems.push(this.state.selectedProduct);
                console.log(this.state.cartItems[0]._id);
                // alert(this.state.cartItems.length);

                for(let i = 0 ; i < this.state.cartItems.length ; i++ ){
                    this.state.totalValue += this.state.cartItems[i].discountPrice;
                }
                alert(this.state.totalValue);


            });
    }
    render() {
        let { cartItems, selectedProduct , totalValue } = this.state;
        return (
            <section className="product-section">
                <div className="container">
                    {/*style={{maxWidth: "960px"}}*/}
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                <span className="badge badge-secondary badge-pill">{this.state.cartItems.length}</span>

                            </h4>
                            <ul className="list-group mb-3 sticky-top">
                            {cartItems.map(item => (
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{item.productName}</h6>
                                        {/*<small className="text-muted">Brief description</small>*/}
                                    </div>
                                    <span className="text-muted">LKR.{item.discountPrice}</span>
                                </li>
                            ))}
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{selectedProduct.productName}</h6>
                                        {/*<small className="text-muted">Brief description</small>*/}
                                    </div>
                                    <span className="text-muted">LKR.{selectedProduct.discountPrice}</span>
                                </li>

                                {/*<li className="list-group-item d-flex justify-content-between bg-light">*/}
                                {/*    <div className="text-success">*/}
                                {/*        <h6 className="my-0">Promo code</h6>*/}
                                {/*        <small>EXAMPLECODE</small>*/}
                                {/*    </div>*/}
                                {/*    <span className="text-success">-$5</span>*/}
                                {/*</li>*/}
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (LKR)</span>
                                    <strong>{totalValue}</strong>
                                </li>
                            </ul>
                            <form onSubmit={this.handleSubmit} autoComplete="off" className="card p-2">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Promo code" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-secondary">Redeem</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <form className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.firstName} className="form-control" id="firstName" placeholder defaultValue required  />
                                        <div className="invalid-feedback"> Valid first name is required. </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.lastName} className="form-control" id="lastName" placeholder defaultValue required />
                                        <div className="invalid-feedback"> Valid last name is required. </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username">Username</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <input type="text" onChange={this.handleChange} value={this.state.username} className="form-control" id="username" placeholder="Username" required />
                                        <div className="invalid-feedback" style={{width: '100%'}}> Your username is required. </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                    <input type="email" onChange={this.handleChange} value={this.state.email} className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" onChange={this.handleChange} value={this.state.address} className="form-control" id="address" placeholder="1234 Main St" required />
                                    <div className="invalid-feedback"> Please enter your shipping address. </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                                    <input type="text" onChange={this.handleChange} value={this.state.address2} className="form-control" id="address2" placeholder="Apartment or suite" />
                                </div>
                                <div className="row">
                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="country">Country</label>
                                        <select className="custom-select d-block w-100" onChange={this.handleChange} value={this.state.country} id="country" required>
                                            <option value>Choose...</option>
                                            <option>Sri Lanka</option>
                                            <option>United States</option>
                                            <option>India</option>
                                            <option>England</option>
                                            <option>China</option>
                                            <option>Pakistan</option>
                                        </select>
                                        <div className="invalid-feedback"> Please select a valid country. </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="state">State</label>
                                        <select className="custom-select d-block w-100" onChange={this.handleChange} value={this.state.state} id="state" required>
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
                                        <div className="invalid-feedback"> Please provide a valid state. </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="zip">Zip</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.zip} className="form-control" id="zip" placeholder required />
                                        <div className="invalid-feedback"> Zip code required. </div>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={this.handleChange} value={this.state.same_address} className="custom-control-input" id="same_address" />
                                    <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" onChange={this.handleChange} value={this.state.save_info} className="custom-control-input" id="save_info" />
                                    <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
                                </div>
                                <hr className="mb-4" />
                                <h4 className="mb-3">Payment</h4>
                                <div className="d-block my-3">
                                    <div className="custom-control custom-radio">
                                        <input id="credit" onChange={this.handleChange} value={this.state.credit} name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
                                        <label className="custom-control-label" htmlFor="credit">Credit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="debit" onChange={this.handleChange} value={this.state.debit} name="paymentMethod" type="radio" className="custom-control-input" required />
                                        <label className="custom-control-label" htmlFor="debit">Debit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="paypal" onChange={this.handleChange} value={this.state.paypal} name="paymentMethod" type="radio" className="custom-control-input" required />
                                        <label className="custom-control-label" htmlFor="paypal">PayPal</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-name">Name on card</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.cc_name} className="form-control" id="cc_name" placeholder required />
                                        <small className="text-muted">Full name as displayed on card</small>
                                        <div className="invalid-feedback"> Name on card is required </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-number">Credit card number</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.cc_number} className="form-control" id="cc_number" placeholder required />
                                        <div className="invalid-feedback"> Credit card number is required </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">Expiration</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.cc_expiration} className="form-control" id="cc_expiration" placeholder required />
                                        <div className="invalid-feedback"> Expiration date required </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-cvv">CVV</label>
                                        <input type="text" onChange={this.handleChange} value={this.state.cc_cvv} className="form-control" id="cc_cvv" placeholder required />
                                        <div className="invalid-feedback"> Security code required </div>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Checkout;
