import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import SingleBook from "./Pages/SingleBook";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";



const Router = () => 
{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={ Home } exact />
                <Route path="/admin" component={ Admin } exact />
                <Route path="/profile" component={ Profile } exact />
                <Route path="/login" component={ Login } exact />
                <Route path="/register" component={ Register } exact />
                <Route path="/book" component={ SingleBook } exact />
                <Route path="/cart" component={ Cart } exact />
            </Switch>
        </BrowserRouter>

    );
}

export default Router