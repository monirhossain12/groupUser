import * as types from "../types/getUserListTypes";

const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case types.START_LOADING_ALL_USER_LIST: {
            return { ...state, loading: true, error: "" };
        }
        case types.SUCCESSFUL_LOADING_ALL_USER_LIST: {
            return { ...state, loading: false, userList: action.payload.docs.map((doc)=>({
                ...doc.data(),id:doc.id
                  })) }
        }
        case types.FAILED_LOADING_ALL_USER_LIST: {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state
        }
    }

}

export default userListReducer;