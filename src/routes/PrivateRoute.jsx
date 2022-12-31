import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useFirebaseAuthContext } from '../context/AuthContext'

export default function PrivateRoute() {
  const user = useFirebaseAuthContext()
  return (
    user != null ? <Outlet/> : <Navigate to={"/"} replace/>
  )
}
