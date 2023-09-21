import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './Signup'
import { Signin } from './Signin'
import { CustomPlayDashboard } from './CustomPlayDashboard'
import { Quiz } from './Quiz'
import { LandingPage } from './LandingPage'
import { CreateQuiz } from './CreateQuiz'
import { PrivateRoute } from '../Components/PrivateRoute'
import { ScoreBoard } from './ScoreBoard'
import { QuickPlayDashboard } from './QuickPlayDashboard'
import { LeaderBoard } from './LeaderBoard'
import { PageNotFound } from './PageNotFound'

export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/CustomPlayDashboard' element={<PrivateRoute><CustomPlayDashboard/></PrivateRoute>}></Route>
            <Route path='/quiz' element={<Quiz/>}></Route>
            <Route path='/createQuiz' element={<CreateQuiz/>}></Route>
            <Route path='/scoreBoard' element={<ScoreBoard/>}></Route>
            <Route path='/QuickPlayDashboard' element={<QuickPlayDashboard/>}></Route>
            <Route path='/leaderBoard' element={<LeaderBoard/>}></Route>
            <Route path='/*' element={<PageNotFound/>} />
        </Routes>
    </div>
  )
}
