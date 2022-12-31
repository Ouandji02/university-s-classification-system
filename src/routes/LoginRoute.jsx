import React from 'react'
import { Children } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useFirebaseAuthContext } from '../context/AuthContext'

export default function LoginRoute() {
  const user = useFirebaseAuthContext()
  return (
    user != null ? <Navigate to={"/admin"} replace/> : <Outlet/>
  )
}
