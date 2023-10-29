import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

const URL = "http://localhost:3400/products";
const Products = () => {
    const [productData, setProductData] = useState([]);
    const fetchData = async () => {
        await axios.get(URL).then((res) => {
            const response = res.data;
            setProductData(response.products);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handledelete = (id) => {
        console.log("deleted");
        const deleteProduct = async () => {
            await axios.delete(`${URL}/${id}`).then((res) => res.data);
            console.log("deleted product");
            fetchData();
        };
        deleteProduct();
    };

    console.log(productData);
    return (
        <div>
            <h1 className="title">My Products</h1>
            {productData?.length ? (
                <div className="products_container">
                    {productData.map((product) => {
                        return (
                            <div className="product" key={product._id}>
                                <Product
                                    productInfo={product}
                                    deleted={handledelete}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <h1>no data</h1>
                </div>
            )}
        </div>
    );
};

export default Products;
