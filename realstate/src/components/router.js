import React from 'react';
import {Route,Switch} from 'react-router-dom';


import Homepage from '../pages/homepage';
import ProductPage from '../pages/productlist';
import Productdetails from '../pages/productdetail';
import Register from '../pages/signuppage';
import Login from '../pages/signinpage';
import Reservation from '../pages/reservation ';
import MealPage from '../pages/mealpage';
import Menudetails from '../pages/menudetails';
import ProductAdmin from '../pages/productadmin';
import Payment from '../pages/payment';
import PlaceOrder from '../pages/placeorder';
import OrderDetails from '../pages/orderDetails';
import Profile from '../pages/profile';
import Edituser from '../pages/edituser';
import OrderAdmin from '../pages/orderdmin';




function RouterPage(){
  return (
    <>
    <Switch>
    <Route path="/" component={Homepage} exact />
    <Route path="/tables" component={ProductPage} exact/>
    <Route path="/productadmin" component={ProductAdmin} exact/>
    <Route path="/orderadmin" component={OrderAdmin} exact/>
    <Route path="/meals" component={MealPage} exact/>
    <Route path="/table/:id" component={Productdetails} exact />
    <Route path="/menu/:id" component={Menudetails} exact />
    <Route path="/order/:id" component={OrderDetails} exact />
    <Route path="/signup" component={Register} exact />
    <Route path="/signin" component={Login} exact />
    <Route path="/payment" component={Payment} exact />
    <Route path="/placeorder" component={PlaceOrder} exact />
    <Route path="/profile" component={Profile} exact />
    <Route path="/edit-user" component={Edituser} exact />
    <Route path="/reservations/:id?" component={Reservation} exact />
    </Switch>
    </>
  )
}

export default RouterPage;