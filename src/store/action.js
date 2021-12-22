import axios from 'axios';
import * as actionTypes from './actionTypes'

const token = 'Bearer k3DqhmyEmsLKbswJOLe6UylQ9R5X2SES';
const BASE_URL = 'https://assignment.bunq.com/api'
export const getUsers = data => ({
  type: actionTypes.GET_USERS,
  payload: data
})
export const getUsersFromServer = () => dispatch =>
  axios.get(BASE_URL + '/user', {
    headers: {
      'Authorization': token,
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response && response.data) {
      dispatch(getUsers(response.data.data));

    }
  }).catch((error) => {
    console.log(error)
  })
export const setSelectedUser = data => ({
  type: actionTypes.SET_SELECTED_USER,
  payload: data
})