import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './Signup'
import { Signin } from './Signin'
import { Dashboard } from './Dashboard'
import { Quiz } from './Quiz'
import { Leaderboard } from './Leaderboard'
import { Main } from './Main'
import { Admin } from './Admin'
import { CreateQuiz } from './CreateQuiz'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/admin/signup' element={<Signup/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/admin/signin' element={<Signin/>}></Route>
            <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
            <Route path='/quiz/:id' element={<Quiz/>}></Route>
            <Route path='/admin/leaderboard' element={<Leaderboard/>}></Route>
            <Route path='/admin/createQuiz' element={<CreateQuiz/>}></Route>
        </Routes>
    </div>
  )
}
