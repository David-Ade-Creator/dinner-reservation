const { 
    MENU_LIST_REQUEST, 
    MENU_LIST_SUCCESS, 
    MENU_LIST_FAIL, 
    MENU_DETAILS_REQUEST, 
    MENU_DETAILS_SUCCESS, 
    MENU_SAVE_REQUEST, 
    MENU_SAVE_SUCCESS, 
    MENU_SAVE_FAIL, 
    MENU_DELETE_REQUEST, 
    MENU_DELETE_SUCCESS, 
    MENU_DELETE_FAIL, 
    MENU_REVIEW_SAVE_REQUEST,
    MENU_REVIEW_SAVE_SUCCESS,
    MENU_REVIEW_SAVE_FAIL,
    MENU_REVIEW_SAVE_RESET
} = require("../constants/menuConstants");

function menuListReducers(state = {menus:[]}, action) {
    switch(action.type){
        case MENU_LIST_REQUEST:
            return{loading:true};
        case MENU_LIST_SUCCESS:
            return{loading: false, menus: action.payload};
        case MENU_LIST_FAIL:
            return{loading: false, error : action.payload}
        default:
            return state;
    }
}

function menuDetailsReducers(state = {menu:{reviews:[]}}, action){
    switch(action.type){
        case MENU_DETAILS_REQUEST:
            return{loading:true};
        case MENU_DETAILS_SUCCESS:
            return{loading:false, menu: action.payload};
        case MENU_LIST_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function menuSaveReducers(state = {menu:{}}, action){
    switch(action.type){
        case MENU_SAVE_REQUEST:
            return{loading:true};
        case MENU_SAVE_SUCCESS:
            return{loading:false, success:true, menu: action.payload};
        case MENU_SAVE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function menuDeleteReducers(state = {menu:{}}, action){
    switch(action.type){
        case MENU_DELETE_REQUEST:
            return{loading:true};
        case MENU_DELETE_SUCCESS:
            return{loading:false, success:true, menu: action.payload};
        case MENU_DELETE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function menuReviewSaveReducer(state = {}, action) {
    switch (action.type) {
      case MENU_REVIEW_SAVE_REQUEST:
        return { loading: true };
      case MENU_REVIEW_SAVE_SUCCESS:
        return { loading: false, review: action.payload, success: true };
      case MENU_REVIEW_SAVE_FAIL:
        return { loading: false, errror: action.payload };
      case MENU_REVIEW_SAVE_RESET:
        return {};
      default:
        return state;
    }
  }

export {
    menuListReducers, 
    menuDetailsReducers, 
    menuSaveReducers, 
    menuDeleteReducers,
    menuReviewSaveReducer
}