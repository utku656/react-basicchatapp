import * as actionTypes from './actionTypes'

const initialState = {
    users : [],
    selectedUser:{}
}

 const getUsers = (state,action) =>({
     ...state,
     users:action.payload,
})
const setSelectedUser = (state,action) =>({
     ...state,
     selectedUser:action.payload,
})
const reducer = (state = initialState ,action )=>{
    switch(action.type) {
        case actionTypes.GET_USERS:
            return getUsers(state,action);
        case actionTypes.SET_SELECTED_USER:
            return setSelectedUser(state,action);
        default: 
            return state;
    }
}
export default reducer;