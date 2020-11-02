import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import New from "./pages/New";
import NewProducts from "./pages/NewProducts";
import News from "./pages/News";
import OldProducts from "./pages/OldProducts";
import ProductDetail from "./pages/ProductDetail";
import ProductsBySlug from "./pages/ProductsBySlug";
import Register from "./pages/Register";
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
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/new-products" exact>
            <NewProducts />
          </Route>
          <Route path="/old-products" exact>
            <OldProducts />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/brands/:slug" exact>
            <ProductsBySlug />
          </Route>
          <Route path="/products/:id" exact>
            <ProductDetail />
          </Route>
          <Route path="/news" exact>
            <News />
          </Route>
          <Route path="/news/:id" exact>
            <New />
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
