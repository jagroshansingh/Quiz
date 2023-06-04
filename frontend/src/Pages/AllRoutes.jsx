import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './Signup'
import { Signin } from './Signin'
import { Dashboard } from './Dashboard'
import { Quiz } from './Quiz'
import { Main } from './Main'
import { Admin } from './Admin'
import { CreateQuiz } from './CreateQuiz'
import { PrivateRoute } from '../Components/PrivateRoute'
import { ScoreBoard } from './ScoreBoard'
import { Play } from './Play'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/admin/signup' element={<Signup/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/admin/signin' element={<Signin/>}></Route>
            <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='/quiz' element={<Quiz/>}></Route>
            <Route path='/admin/createQuiz' element={<CreateQuiz/>}></Route>
            <Route path='/scoreBoard' element={<ScoreBoard/>}></Route>
            <Route path='/play' element={<Play/>}></Route>
        </Routes>
    </div>
  )
}
