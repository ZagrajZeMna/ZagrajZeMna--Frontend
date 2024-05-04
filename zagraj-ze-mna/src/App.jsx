import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { Routes, Route } from 'react-router-dom';
import ResetPassword from "./ResetPassword/ResetPassword";
import LobbyForm from "./LobbyForm/LobbyForm"

function App() {
  

  return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/lobbyForm" element={<LobbyForm/>}/>
      </Routes>
  )
}

export default App
