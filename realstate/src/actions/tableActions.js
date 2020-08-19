
const {TABLE_LIST_REQUEST,TABLE_LIST_SUCCESS,TABLE_LIST_FAIL,
   TABLE_DETAILS_REQUEST,TABLE_DETAILS_SUCCESS,TABLE_DETAILS_FAIL,
   TABLE_SAVE_REQUEST,TABLE_SAVE_SUCCESS,TABLE_SAVE_FAIL,TABLE_DELETE_REQUEST,TABLE_DELETE_SUCCESS,TABLE_DELETE_FAIL,TABLE_REVIEW_SAVE_REQUEST,TABLE_REVIEW_SAVE_SUCCESS,TABLE_REVIEW_SAVE_FAIL } = require("../constants/tableConstants");
const { default: Axios } = require("axios");



const listTables = () => async (dispatch) => {
    try {
        dispatch({type: TABLE_LIST_REQUEST});
    const {data} = await Axios.get("/api/tables");
    dispatch({type: TABLE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: TABLE_LIST_FAIL, payload: error.message});
    } 
}

const detailsTable = (tableId) => async (dispatch) => {
    try {
        dispatch({type: TABLE_DETAILS_REQUEST, payload: tableId});
        const {data} = await Axios.get("/api/tables/" + tableId);
        dispatch({type: TABLE_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: TABLE_DETAILS_FAIL, payload: error.message});
    }
}

const saveTable = (table) => async(dispatch, getState) => {
    try {
        dispatch({ type : TABLE_SAVE_REQUEST, payload: table});
        const {
            userSignin : {userInfo},
        } = getState();
        if (!table._id) {
            const {data} = await Axios.post("/api/tables", table, {
                headers: {
                    Authorization: 'Bearer' + userInfo.token,
                },
            });
        dispatch({type: TABLE_SAVE_SUCCESS, payload:data});
        } else {
            const {data} = await Axios.put("/api/tables/" + table._id, table, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                  },
            });
            dispatch({type: TABLE_SAVE_SUCCESS, payload:data});
        }
    } catch (error) {
        dispatch({type: TABLE_SAVE_FAIL, payload: error.message});
    }
}

const deleteTable = (tableId) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
          } = getState();
        dispatch({type: TABLE_DELETE_REQUEST, payload: tableId});
        const {data} = await Axios.delete("/api/tables/" + tableId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
              },
            })
            dispatch({type:TABLE_DELETE_SUCCESS, payload: data, success: true});
    } catch (error) {
        dispatch({type:TABLE_DELETE_FAIL, payload: error.message});
    }
}

const saveTableReview = (tableId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: TABLE_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await Axios.post(
        `/api/tables/${tableId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: TABLE_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: TABLE_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };

export {listTables, detailsTable, saveTable, deleteTable, saveTableReview}