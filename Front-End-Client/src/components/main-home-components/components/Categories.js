import React, {Component} from 'react';
import Item from "./Item";


class Categories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            itemList: [],
            mainCategories : ['Woman Wear','Men Wear','Kids Wear','Bags and Purses','Footwear','Jewellery'],
            selectedCategory: '',
            productTypeList: []
        }
    }

    componentDidMount() {
        let id=  sessionStorage.getItem("selectedCategory:");
        fetch('http://localhost:3000/product/findByMainCategory/'+id)
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    itemList: json,
                })
            });
    }

    handleOnMouseOver = (category) => {

        fetch('http://localhost:3000/product/findProductType/'+category)
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    productTypeList: json,
                })
            });
    };

    handleSelectedCategory = (selectedItem) => {

        fetch('http://localhost:3000/product/findBySubCategory/'+selectedItem)
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    itemList: json,

                })
            });

    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-4 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="filter-widget">
                                <h2 className="fw-title">Categories</h2>
                                <ul className="category-menu">
                                    {this.state.mainCategories.map(category => (
                                    <li onMouseOver={this.handleOnMouseOver.bind(this,category)}><a href="#">{category}</a>
                                        <ul className="sub-menu">
                                            {this.state.productTypeList.map(productTypes => (
                                            <li onClick={this.handleSelectedCategory.bind(this,productTypes.subCategory)}><a>{productTypes.subCategory}<span></span></a></li>
                                            ))}
                                        </ul>
                                    </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {this.state.itemList.map(item => (

                                        <Item
                                            id={item._id}
                                            productName={item.productName}
                                            price={item.price}
                                            discountedPrice={item.discountPrice}
                                            discount={item.discount}
                                        />
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;