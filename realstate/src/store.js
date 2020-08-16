import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import { menuListReducers, menuDetailsReducers, menuSaveReducers, menuDeleteReducers, menuReviewSaveReducer } from './reducers/menuReducers';
import { cartReducer } from './reducers/cartReducers';
import Cookie from "js-cookie";
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, myOrderListReducer, orderListReducer, orderDeleteReducer, orderPayReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    cart:{cartItems, payment: {}},
    userSignin: {userInfo},
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    menuList: menuListReducers,
    menuDetails: menuDetailsReducers,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    menuSave : menuSaveReducers,
    menuDelete: menuDeleteReducers,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailsReducer,
    myOrderList: myOrderListReducer,
    userUpdate: userUpdateReducer,
    orderList:orderListReducer,
    orderDelete: orderDeleteReducer,
    menuReviewSave:menuReviewSaveReducer,
    orderPay: orderPayReducer,
})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    reducer, 
    initialState , 
    compose(applyMiddleware(thunk)));
export default store;