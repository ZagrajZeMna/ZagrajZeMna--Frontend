
import AdminPage from "./AdminPage/AdminPage"
import { AuthProvider, useAuth } from './AuthContext/AuthContext';
import ProtectedRoute from './AuthContext/ProtectedRoute';
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Home from "./Home/Home";
import { Routes, Route } from 'react-router-dom';
import ResetPassword from "./ResetPassword/ResetPassword";
import GameCategory from './GameCategory/GameCategory';
import AdminRoute from './AuthContext/AdminRoute';
import LobbyForm from "./LobbyForm/LobbyForm"

import Space from "./navbar/space";
import MyNavbar from "./navbar/navbar";
import UserPage from "./userPage/userPage";
import EditUserPage from "./edtiPage/editUserPage";
import Notification from "./Notification/notification";
import NotiPage from "./Notification/NotiPage";
import Lobby from './Lobby/Lobby';

function App() {

  return (
    <AuthProvider>
      <MyNavbar/>
      <Space/>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>


          <Route path="/category/:game" element={<GameCategory />} />
          <Route path="/category/:game/:lobbyname/:lobbyId" element={<Lobby/>}/>

          <Route path="/lobbyForm" element={<LobbyForm/>}/>

          <Route path="/adminPage" element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>} />

          <Route path="/userPage" element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        } />
        <Route path="/editUserPage" element={
          <ProtectedRoute>
            <EditUserPage />
          </ProtectedRoute>
        } />
        <Route path="/notification" element={
          <ProtectedRoute>
            <NotiPage />
          </ProtectedRoute>
        } />
        </Routes>
      </AuthProvider>
  );
};
export default App
