import * as types from "../types/activitySalesGraphTypes";

const activitySalesGraphReducer = (state = {}, action) => {
    switch (action.type) {
        case types.START_LOADING_ACTIVITY_SALES_GRAPH_LIST: {
            return { ...state, loading: true, error: "" };
        }
        case types.SUCCESSFUL_LOADING_ACTIVITY_SALES_GRAPH_LIST: {
            return { ...state, loading: false, getActivitySalesGraph: action.payload }
        }
        case types.FAILED_LOADING_ACTIVITY_SALES_GRAPH_LIST: {
            return { ...state, loading: false, error: action.payload }
        }
        default: {
            return state
        }
    }

}

export default activitySalesGraphReducer;