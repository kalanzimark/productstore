import React, { useState } from "react";
import "../form.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:3400/products";
const AddProduct = () => {
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
    });

    const handleChange = (e) => {
        setProductInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const sendProductInfo = async () => {
        await axios.post(URL, { ...productInfo }).then((response) => {
            navigate("/");
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productInfo);
        sendProductInfo();
    };
    return (
        <div>
            {" "}
            <div className="form_container">
                <h2>Add Product</h2>
                <div className="form_wrapper">
                    <form on onSubmit={handleSubmit}>
                        <h3>Employee Information</h3>
                        <div className="form_wrapper_items">
                            <div class="form_input">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={productInfo.title}
                                    placeholder="title"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div class="form_input">
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="description"
                                    value={productInfo.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div class="form_input">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="price"
                                    value={productInfo.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div class="form_input">
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    placeholder="image url"
                                    vaalue={productInfo.image}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="form_btn">
                            save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
