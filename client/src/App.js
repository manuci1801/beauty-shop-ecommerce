import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Cart from "./pages/Cart";
import CheckPayment from "./pages/CheckPayment";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import VerifyUser from "./pages/VerifyUser";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:id" exact>
            <ProductDetail />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/blog" exact>
            <Blog />
          </Route>
          <Route path="/blog/:id" exact>
            <BlogDetail />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/payment/check" exact>
            <CheckPayment />
          </Route>
          <Route path="/verify/:token" exact>
            <VerifyUser />
          </Route>

          <Route path="/admin" exact>
            <Admin />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
