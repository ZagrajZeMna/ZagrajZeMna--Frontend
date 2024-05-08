import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { Routes, Route } from 'react-router-dom';
import ResetPassword from "./ResetPassword/ResetPassword";

import LobbyForm from "./LobbyForm/LobbyForm"

import Space from "./navbar/space";
import MyNavbar from "./navbar/navbar";
import UserPage from "./userPage/userPage";


function App() {
  

  return (
    <div>
      <MyNavbar/>
      <Space/>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>

        <Route path="/lobbyForm" element={<LobbyForm/>}/>

        <Route path="/userPage" element={<UserPage/>}/>

      </Routes>
    </div>
      
  )
}

export default App
