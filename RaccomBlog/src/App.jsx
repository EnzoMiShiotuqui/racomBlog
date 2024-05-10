// CSS
import './App.css'
// ROUTER
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Search from './pages/Search/Search'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'


// Components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
// Context
import { AuthProvider } from './context/AuthContext'
// Auth
import { onAuthStateChanged } from 'firebase/auth'
// Hooks
import { useState,useEffect } from 'react' 
import { useAuthentication } from './hooks/useAuthentication'


function App() {
  
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  
  const loadingUser = user === undefined

  useEffect(() => {
      onAuthStateChanged(auth,(user)=>{
          setUser(user)
      })
  },[auth])


  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <div className="app">
          <AuthProvider value={ {user} }>
            <BrowserRouter>
              <Navbar/>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/About' element={<About/>}/>
                        <Route path='/search' element={<Search/>}/>
                        <Route path='/Posts/:id' element={<Post/>}/>
                        <Route path='/Login' element={!user ? <Login/> : <Navigate to="/Home"/> }/>
                        <Route path='/Register' element={!user ? <Register/> : <Navigate to="/Home"/>}/>
                        <Route path='/Posts/Edit/:id' element={user ? <EditPost/> : <Navigate to="/Login"/>}/>
                        <Route path='/Posts/Create' element={user ? <CreatePost/> : <Navigate to="/Login"/>}/>
                        <Route path='/Dashboard' element={user ? <Dashboard/> : <Navigate to="/Login"/>}/>
                    </Routes>
                </div>
              <Footer/>
            </BrowserRouter>
          </AuthProvider>
      </div>
    </>
  )
}

export default App
