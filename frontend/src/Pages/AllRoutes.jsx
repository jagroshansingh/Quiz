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
import { LeaderBoard } from './LeaderBoard'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='/quiz' element={<Quiz/>}></Route>
            <Route path='/createQuiz' element={<CreateQuiz/>}></Route>
            <Route path='/scoreBoard' element={<ScoreBoard/>}></Route>
            <Route path='/play' element={<Play/>}></Route>
            <Route path='/leaderBoard' element={<LeaderBoard/>}></Route>
        </Routes>
    </div>
  )
}
