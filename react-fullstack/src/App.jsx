import { Routes, Route, Link, Navigate } from "react-router-dom"
import Signin from "./pages/Signin"
import Notfound from "./pages/Notfound"
import User from "./pages/User"
import Signup from "./pages/Signup"
import Logged from "./components/Logged"
import Guest from "./components/Guest"
import Dashboard from "./pages/Dashboard"
import { ContextProvider } from "./contexts/ContextProvider"
import UserForm from "./pages/UserForm"




function App() {
  

  return (
    <>

  <ContextProvider>
  <Routes>
      <Route path="/" element= {<Logged/>}>
      <Route path="/user" element={<User/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/users/new" element={<UserForm key="userCreate"/>}/>
      <Route path="/users/:id" element={<UserForm  key="userUpdate"/>}/>
      <Route path="/" element= {<Navigate to={"/dashboard"}/>} />
      </Route>

      <Route path="/" element= {<Guest/>}>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Route>

     
      <Route path="*" element={<Notfound/>} />
     </Routes>
  </ContextProvider>
    </>
  ) 
}

export default App
