import Cookie from "js-cookie";
const { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_PAYMENT  } = require("../constants/cartConstants");
const { default: Axios } = require("axios")


const addToCart = (productId,qty) => async (dispatch, getState) =>{
    try {
        const {data} = await Axios.get("/api/menus/" + productId);
        dispatch({type : CART_ADD_ITEM , payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            category: data.category,
            countInStock:data.countInStock,
            qty
        } });

        const {cart:{cartItems}} = getState();
        Cookie.set("cartItems",JSON.stringify(cartItems));

    } catch (error) {
        
    }
}

const removeFromCart = (productId) =>async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload : productId});

    const {cart:{cartItems}} = getState();
        Cookie.set("cartItems",JSON.stringify(cartItems));
}

const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }

export {addToCart,removeFromCart,savePayment}