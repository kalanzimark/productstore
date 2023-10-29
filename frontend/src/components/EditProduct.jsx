import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:3400/products";
const EditProduct = () => {
    const { id } = useParams();
    const backHome = useNavigate();
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

    const handleChange = (e) => {
        setProductInfo((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const updateProduct = async () => {
            await axios
                .patch(`${URL}/${id}`, { ...productInfo })
                .then((res) => res.data);
            backHome("/");
        };
        updateProduct();
    };

    return (
        <div>
            <div className="form_container">
                <h2>EditProduct</h2>
                <div className="form_wrapper">
                    {productInfo && (
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
                                        value={productInfo.image}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="form_btn">
                                save
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
