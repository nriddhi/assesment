import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';


export default function Header() {

  const {currentUser} = useSelector((state)=> state.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <div className='header'>
     <Link to='/home'>Home</Link>
     <Link to='/products'>Products</Link>
    {currentUser? <Link onClick={handleLogout}>Logout</Link> : '' } 
    </div>
  )
}
