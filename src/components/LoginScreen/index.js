import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { useNavigate } from "react-router-dom";
import * as actions from '../../store/action'

function LoginScreen() {
  const users = useSelector(state => state.reducer.users)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.getUsersFromServer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (user) => {
    dispatch(actions.setSelectedUser(user));
    navigate('/chat');

  }

  return (
    <div className='user-dropdown'>
      <InputLabel id="demo-simple-select-label" >Please Choose User</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={users}
        label="Users"
        className='user-select-input'
      >
        {users.map((user) => (

          <MenuItem key={user.id}
            onClick={() => handleChange(user)}
            value={user.name}>{user.name}</MenuItem>
        ))}

      </Select>
    </div>
  );
}
export default LoginScreen;