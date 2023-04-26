import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Products from "./components/Products.js";
import ProductDetails from "./components/ProductDetails.js";
import Cart from "./components/Cart.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js";

const AppRoutes = () => {

    const [cart, setCart] = useState(function () {
        let savedCart = [];
        try {
            savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
            savedCart = [];
        }
        return savedCart;
    });

    useEffect(() => {
        if (cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    function handleProductDelete(id) {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
    }

    function handleProductAdd(newProduct) {
        // check if item exists
        const existingProduct = cart.find(
            (product) => product.id === newProduct.id
        );
        if (existingProduct) {
            // increase quantity
            const updatedCart = cart.map((product) => {
                if (product.id === newProduct.id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            });
            setCart(updatedCart);
        } else {
            // product is new to the cart
            setCart([
                ...cart,
                {
                    ...newProduct,
                    quantity: 1,
                },
            ]);
        }
    }

    return (
        <BrowserRouter>
            <Navbar cart={cart} />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="register" element={<Register />} />
                    <Route exact path="/products" element={<Products
                        cart={cart}
                        onProductAdd={handleProductAdd}
                        onProductDelete={handleProductDelete}
                    />} />

                    <Route path="/products/:id" element={<ProductDetails onProductAdd={handleProductAdd} />} />
                    <Route exact path="/cart" element={<Cart cart={cart} />} />

                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes