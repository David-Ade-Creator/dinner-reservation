import React from 'react';
import {Route,Switch} from 'react-router-dom';

import TablePage from '../pages/tablelist';
import Tabledetails from '../pages/tabledetail';
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
import { useSelector } from 'react-redux';
import TableAdmin from '../pages/tableadmin';




function RouterPage(){
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
    <Switch>
    <Route path="/" component={TablePage} exact/>
    {userInfo && userInfo.isAdmin && <Route path="/productadmin" component={ProductAdmin} exact/> }
  {userInfo && userInfo.isAdmin && <Route path="/orderadmin" component={OrderAdmin} exact/> }
  {userInfo && userInfo.isAdmin && <Route path="/tableadmin" component={TableAdmin} exact/> }
    <Route path="/meals" component={MealPage} exact/>
    <Route path="/type/:id" component={MealPage} exact/>
    <Route path="/table/:id" component={Tabledetails} exact />
    <Route path="/menu/:id" component={Menudetails} exact />
  {userInfo &&  <Route path="/order/:id" component={OrderDetails} exact /> }
    <Route path="/signup" component={Register} exact />
    <Route path="/signin" component={Login} exact />
  {userInfo && <Route path="/payment" component={Payment} exact /> }
  {userInfo && <Route path="/placeorder" component={PlaceOrder} exact /> }
  {userInfo &&  <Route path="/profile" component={Profile} exact /> }
  {userInfo &&  <Route path="/edit-user" component={Edituser} exact /> }
    <Route path="/reservations/:id?" component={Reservation} exact />
    </Switch>
    </>
  )
}

export default RouterPage;