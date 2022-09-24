import axios from "axios";
import * as types from "../types/getUserListTypes";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {auth, db} from '../../firebase-config'

export const getUserListActions = () => async (dispatch) => {
    const usersRef=collection(db, "users")
    
    try {
        dispatch({ type: types?.START_LOADING_ALL_USER_LIST });
        const data = await getDocs(usersRef)
        
        if (data) {
            dispatch({ type: types?.SUCCESSFUL_LOADING_ALL_USER_LIST, payload: data })
        }

    } catch (error) {
        dispatch({
            type: types?.FAILED_LOADING_ALL_USER_LIST,
            payload: "There was an unexpected error"
        })

    }


}