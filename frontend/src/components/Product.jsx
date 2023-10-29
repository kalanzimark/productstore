import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const URL = "http://localhost:3400/products";

const Product = (props) => {
    const { _id, title, description, price, image } = props.productInfo;
    const deleted = props.deleted;
    console.log(props);

    // const handledelete = () => {
    //     const deleteProduct = async () => {
    //         await axios.delete(`${URL}/${_id}`).then((res) => res.data);
    //         console.log("deleted");
    //     };
    //     deleteProduct();
    // };
    // useEffect(() => {}, [handledelete]);
    return (
        <div className="product_card">
            <img src={image} className="product_image" alt="" />
            <div className="product_card-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <h3>${price}</h3>
                <Link to={`/product/${_id}`}>
                    <button>View details</button>
                </Link>
            </div>

            <div className="button_wrapper">
                <button className="delete" onClick={() => deleted(_id)}>
                    Delete
                </button>

                <Link to={`/editproduct/${_id}`}>
                    <button className="update">update</button>
                </Link>
            </div>
        </div>
    );
};

export default Product;
