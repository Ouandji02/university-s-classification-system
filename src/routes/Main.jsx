import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import AppBarResponsive from '../components/AppBar'
import { useFirebaseAuthContext } from '../context/AuthContext'
import Command from '../pages/admin/command/Command'
import CreateCritere from '../pages/admin/criteres/CreateCritere'
import CreateFaculty from '../pages/admin/faculty/CreateFaculty'
import ListFaculty from '../pages/admin/faculty/ListFaculty'
import CreateFiliary from '../pages/admin/Filiere/CreateFiliary'
import ListFiliary from '../pages/admin/Filiere/ListFiliere'
import CreateUniversity from '../pages/admin/University/CreateUniversity'
import Vote from '../pages/admin/vote/Vote'
import Auth from '../pages/Auth'
import LoginRoute from './LoginRoute'
import PrivateRoute from './PrivateRoute'

export default function Main() {
  var [state, setState] = useState(false)
  const user = useFirebaseAuthContext()
  return (
    <div>
      <AppBarResponsive connect={user}>
        <Routes>
          <Route path='/admin' element={<PrivateRoute />}>
            <Route path='/admin/createuniversity' element={<CreateUniversity />} />
            <Route path='/admin/createfaculty/:id' element={<CreateFaculty />} />
            <Route path='/admin/createfiliary/:id' element={<CreateFiliary />} />
            <Route path='/admin/createcritere' element={<CreateCritere />} />
            <Route path='/admin/faculty/:id' element={< ListFaculty />} />
            <Route path='/admin/filiary/:id' element={< ListFiliary />} />
            <Route path='/admin/vote' element={< Vote />} />
            <Route path='' element={<Command />} />
          </Route>
        </Routes>
      </AppBarResponsive>
      <Routes>
        <Route path="/" element={<LoginRoute/>}>
          <Route path='' element={<Auth />} />
        </Route>
      </Routes>
    </div>

  )
}
