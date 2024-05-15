import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Home from "./Home/Home"
import AdminPage from "./AdminPage/AdminPage"
import { Routes, Route } from 'react-router-dom';
import ResetPassword from "./ResetPassword/ResetPassword";
import GameCategory from './GameCategory/GameCategory';

import LobbyForm from "./LobbyForm/LobbyForm"

import Space from "./navbar/space";
import MyNavbar from "./navbar/navbar";
import UserPage from "./userPage/userPage";
import EditUserPage from "./edtiPage/editUserPage";


function App() {

  return (
    <div>
      <MyNavbar/>
      <Space/>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>

        <Route path="/category/:game" element={<GameCategory />} />


        <Route path="/lobbyForm" element={<LobbyForm/>}/>

        <Route path="/userPage" element={<UserPage/>}/>

        <Route path="/editUserPage" element={<EditUserPage/>} />

      </Routes>
    </div>
      
  )
}

export default App
