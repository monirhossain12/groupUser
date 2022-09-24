import * as types from "../types/getGroupListTypes";

const groupListReducer = (state = {}, action) => {
    switch (action.type) {
        case types.START_LOADING_ALL_GROUP_LIST: {
            return { ...state, loading: true, error: "" };
        }
        case types.SUCCESSFUL_LOADING_ALL_GROUP_LIST: {
            return { ...state, loading: false, groupList: action.payload.docs.map((doc)=>({
                ...doc.data(),id:doc.id
                  })) }
        }
        case types.FAILED_LOADING_ALL_GROUP_LIST: {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state
        }
    }

}

export default groupListReducer;