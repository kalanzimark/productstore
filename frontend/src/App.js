import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import About from "./About";
function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Products />}></Route>
                    <Route
                        path="/product/:id"
                        element={<ProductDetails />}
                    ></Route>
                    <Route path="/addproduct" element={<AddProduct />}></Route>
                    <Route
                        path="/editproduct/:id"
                        element={<EditProduct />}
                    ></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
