import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URL = "http://localhost:3400/products";
const ProductDetails = () => {
    const { id } = useParams();
    const [productInfo, setProductInfo] = useState({});
    console.log(id);

    useEffect(() => {
        const fetchProduct = async () => {
            await axios.get(`${URL}/${id}`).then((res) => {
                const mydata = res.data;
                setProductInfo(mydata.product);
            });
        };
        fetchProduct();
    }, [id]);

    return (
        <div
            className="product_detail_container"
            style={{ display: "grid", placeContent: "center", height: "100vh" }}
        >
            <h1>product details</h1>
            <div className="product_card">
                <img src={productInfo.image} className="product_image" alt="" />
                <div className="product_card-info">
                    <h3>{productInfo.title}</h3>
                    <p>{productInfo.description}</p>
                    <h3>${productInfo.price}</h3>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
