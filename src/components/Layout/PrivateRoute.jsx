import React from 'react'
import { useUser } from '../../context/UserContext'; 
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
    const {user} = useUser();

  return (
    user ? <Outlet /> : <Navigate to='/' />
  )
}

export default PrivateRoute