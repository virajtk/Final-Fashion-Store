import React, {Component} from 'react';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);

        this.state = {
            selectedProduct: [],
            isLoaded: false,
            totalValue : 0.0,
        };

    }
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
                // this.state.cartItems.push(this.state.selectedProduct);
                // console.log(this.state.cartItems[0]._id);
                // // alert(this.state.cartItems.length);
                //
                // for(let i = 0 ; i < this.state.cartItems.length ; i++ ){
                //     this.state.totalValue += this.state.cartItems[i].discountPrice;
                // }
                // alert(this.state.totalValue);


            });
    }
    render() {
        let {  selectedProduct , totalValue } = this.state;
        return (
            <section className="product-section">
                <div className="container">
                    {/*style={{maxWidth: "960px"}}*/}
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your Wishlist</span>
                                <span className="badge badge-secondary badge-pill">3 Items</span>

                            </h4>
                            <ul className="list-group mb-3 sticky-top">

                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">Product One</h6>
                                            {/*<small className="text-muted">Brief description</small>*/}
                                        </div>
                                        <span className="text-muted">LKR.1055.00</span>
                                    </li>

                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Sleeveless Blouse</h6>
                                        {/*<small className="text-muted">Brief description</small>*/}
                                    </div>
                                    <span className="text-muted">LKR.2400.00</span>
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
                                    <strong>{totalValue}</strong>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Wishlist;
