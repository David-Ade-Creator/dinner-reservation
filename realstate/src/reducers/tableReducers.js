const {
    TABLE_LIST_REQUEST,
    TABLE_LIST_SUCCESS,
    TABLE_LIST_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_DETAILS_FAIL,
    TABLE_SAVE_REQUEST,
    TABLE_SAVE_SUCCESS,
    TABLE_SAVE_FAIL,
    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DELETE_FAIL,
    TABLE_REVIEW_SAVE_REQUEST,
    TABLE_REVIEW_SAVE_SUCCESS,
    TABLE_REVIEW_SAVE_FAIL ,
    TABLE_REVIEW_SAVE_RESET
} = require("../constants/tableConstants");

function tableListReducer(state = {tables:[]}, action) {
    switch (action.type){
        case TABLE_LIST_REQUEST:
            return{loading: true};
        case TABLE_LIST_SUCCESS:
            return{ loading: false, tables: action.payload};
        case TABLE_LIST_FAIL:
            return { loading : false, error : action.payload}
        default:
            return state;
    }
}

function tableDetailsReducer(state = {table:{reviews:[]}}, action) {
    switch (action.type){
        case TABLE_DETAILS_REQUEST:
            return{loading: true};
        case TABLE_DETAILS_SUCCESS:
            return{ loading: false, table: action.payload};
        case TABLE_DETAILS_FAIL:
            return { loading : false, error : action.payload}
        default:
            return state;
    }
}

function tableSaveReducers(state = {table:{}}, action){
    switch(action.type){
        case TABLE_SAVE_REQUEST:
            return{loading:true};
        case TABLE_SAVE_SUCCESS:
            return{loading:false, success:true, table: action.payload};
        case TABLE_SAVE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function tableDeleteReducers(state = {table:{}}, action){
    switch(action.type){
        case TABLE_DELETE_REQUEST:
            return{loading:true};
        case TABLE_DELETE_SUCCESS:
            return{loading:false, success:true, table: action.payload};
        case TABLE_DELETE_FAIL:
            return{loading:false, error: action.payload}
        default:
            return state;
    }
}

function tableReviewSaveReducer(state = {}, action) {
    switch (action.type) {
      case TABLE_REVIEW_SAVE_REQUEST:
        return { loading: true };
      case TABLE_REVIEW_SAVE_SUCCESS:
        return { loading: false, review: action.payload, success: true };
      case TABLE_REVIEW_SAVE_FAIL:
        return { loading: false, errror: action.payload };
      case TABLE_REVIEW_SAVE_RESET:
        return {};
      default:
        return state;
    }
  }

export {
    tableListReducer, 
    tableDetailsReducer,
    tableSaveReducers,
    tableDeleteReducers,
    tableReviewSaveReducer
}