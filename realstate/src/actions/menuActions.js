const { MENU_LIST_REQUEST, MENU_LIST_SUCCESS, MENU_LIST_FAIL,
    MENU_DETAILS_REQUEST,MENU_DETAILS_SUCCESS,MENU_DETAILS_FAIL,
    MENU_SAVE_REQUEST,MENU_SAVE_SUCCESS,MENU_SAVE_FAIL, MENU_DELETE_REQUEST, MENU_DELETE_SUCCESS, MENU_DELETE_FAIL, MENU_REVIEW_SAVE_REQUEST, MENU_REVIEW_SAVE_SUCCESS, MENU_REVIEW_SAVE_FAIL } = require("../constants/menuConstants");
    const { default: Axios } = require("axios");


const saveMenu = (menu) => async (dispatch, getState) =>{
    try {
        dispatch({type: MENU_SAVE_REQUEST, payload: menu});
        const{
            userSignin: {userInfo},
        } = getState();
        if(!menu._id) {
            const {data} = await Axios.post("/api/menus", menu, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                  },
            });
            dispatch({type:MENU_SAVE_SUCCESS, payload: data});
        }
        else
        {
            const {data} = await Axios.put("/api/menus/" + menu._id, menu, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                  },
            });

            dispatch({type:MENU_SAVE_SUCCESS, payload: data});
        }
    } catch (error) {
        dispatch({ type: MENU_SAVE_FAIL, payload: error.message });
    }
}

const deleteMenu = (menuId) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
          } = getState();
        dispatch({type: MENU_DELETE_REQUEST, payload: menuId});
        const {data} = await Axios.delete("/api/menus/" + menuId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
              },
            })
            dispatch({type:MENU_DELETE_SUCCESS, payload: data, success: true});
    } catch (error) {
        dispatch({type:MENU_DELETE_FAIL, payload: error.message});
    }
}

const listMenu = () => async (dispatch) => {
    try {
        dispatch({type: MENU_LIST_REQUEST});
    const {data} = await Axios.get("/api/menus/");
    dispatch({type: MENU_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: MENU_LIST_FAIL, payload: error.message});
    } 
}

const detailsMenu = (menuId) => async (dispatch) => {
    try {
        dispatch({type: MENU_DETAILS_REQUEST});
        const {data} = await Axios.get("/api/menus/" + menuId);
        dispatch({type: MENU_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: MENU_DETAILS_FAIL, payload: error.message});
    }
}

const saveMenuReview = (menuId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: MENU_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await Axios.post(
        `/api/menus/${menuId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: MENU_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: MENU_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };

export {listMenu, detailsMenu, saveMenu, deleteMenu,saveMenuReview}