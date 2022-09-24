import axios from "axios";
import * as types from "../types/getGroupListTypes";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import {auth, db} from '../../firebase-config'

export const getGroupListActions = () => async (dispatch) => {
    const groupsRef=collection(db, "groups")
    
    try {
        dispatch({ type: types?.START_LOADING_ALL_GROUP_LIST });
        const data = await getDocs(groupsRef)
        
        if (data) {
            dispatch({ type: types?.SUCCESSFUL_LOADING_ALL_GROUP_LIST, payload: data })
        }

    } catch (error) {
        dispatch({
            type: types?.FAILED_LOADING_ALL_GROUP_LIST,
            payload: "There was an unexpected error"
        })

    }


}