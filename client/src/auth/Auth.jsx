import React from 'react'
import { useDispatch , useSelector } from 'react-redux';
import SignupCard from './Signup';
import Login from './Login';

const Auth = () => {
    const dispath = useDispatch();
    const statevalue = useSelector(state => state.user.logedIn)

  return (
    <div> 
     {statevalue === 'login' ? <Login/> : <SignupCard/>}
    </div>
  )
}

export default Auth;
