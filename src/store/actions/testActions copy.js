import axios from "axios";
import { baseurl } from "../../common/baseUrls";
import setAuthToken from "../../utilities/setDefaultAuthToken";
import * as types from "../types/activitySalesListTypes";

export const activitySalesListAction = (pageNo = "", date = "", role = "") => async (dispatch) => {
    try {
        dispatch({ type: types?.START_LOADING_ACTIVITY_SALES_LIST });
        setAuthToken();
        const { data } = await axios.get(`${baseurl}/api/${role}/getAllActivitySalesListTerritoryWise?pageNo=${pageNo}&targetDate=${date}`)
        if (data) {
            dispatch({ type: types?.SUCCESSFUL_LOADING_ACTIVITY_SALES_LIST, payload: data })
        }

    } catch (error) {
        dispatch({
            type: types?.FAILED_LOADING_ACTIVITY_SALES_LIST,
            payload: error?.response && error?.response?.data?.message ? error?.response?.data?.message : error?.message
        })

    }


}