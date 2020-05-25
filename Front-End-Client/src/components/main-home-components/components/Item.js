import React, {Component} from 'react';

import Product from "../../img/product/8.jpg";
import {Redirect} from "react-router-dom";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    handleSelectedItem = (productID) => {
        window.sessionStorage.setItem("productID:",productID);
        this.setState({ redirect: "/selectedItem" });
};

    render() {
        const {price, productName, id} = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="col-lg-4 col-sm-6">
                    <div className="product-item" key={this.props.id} onClick={this.handleSelectedItem.bind(this, id)}>
                        <div className="pi-pic">
                            <img src={Product} alt="product" />
                            <div className="pi-links">
                                <a href="" className="add-card"><i className="ti-bag"/><span>ADD TO CART</span></a>
                                <a href="/wishlist" className="wishlist-btn"><i className="ti-heart"/></a>
                            </div>
                        </div>
                        <div className="pi-text">
                            <h6>Rs.{price}</h6>
                            <p>{productName}</p>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Item;
