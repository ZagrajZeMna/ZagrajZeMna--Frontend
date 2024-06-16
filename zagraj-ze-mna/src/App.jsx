
import AdminPage from "./AdminPage/AdminPage"
import Contact from "./Contact/Contact";
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
import EasterEgg from "./PageStructureElements/footer/easterEgg";

import Space from "./PageStructureElements/navbar/space";
import MyNavbar from "./PageStructureElements/navbar/navbar";
import UserPage from "./UserProfilePages/userPage/userPage";
import EditUserPage from "./UserProfilePages/edtiPage/editUserPage";
import Notification from "./Notification/notification";
import NotiPage from "./Notification/NotiPage";
import Lobby from './Lobby/Lobby';
import MyLobby from "./MyLobby/MyLobby";
import UserProfileOthrers from "./UserProfilePages/userProfileOthers/userProfileOthers";

function App() {

  return (
    <AuthProvider>
      <MyNavbar/>
      <Space/>
      <Notification/>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        

          <Route path="/category/:game" element={<GameCategory />} />
        
          <Route path="/category/:game/:lobbyname/:lobbyId" element={<Lobby/>}/>

          <Route path="/lobbyForm" element={<LobbyForm/>}/>
          <Route path="/niktTuNieWejdzieSuperTajemniceTuSiedzaZaDlugaNazwaBySamemuToWpisacLosoweSlowaJabloPociagKostaryka" element={<EasterEgg/>}/>

          <Route path="/myLobby" element={
            <ProtectedRoute>
            <MyLobby/>
            </ProtectedRoute>}></Route>

          <Route path="/userProfile/:id" element={
            <ProtectedRoute>
              <UserProfileOthrers/>
            </ProtectedRoute>}></Route>

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
        <Route path="/contact" element={
          <ProtectedRoute>
            <Contact/>
          </ProtectedRoute>
        } />
        </Routes>
      </AuthProvider>
  );
};
export default App
