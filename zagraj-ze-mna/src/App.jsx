import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { Routes, Route } from 'react-router-dom';
import ConfirmEmail from "./ConfirmEmail/ConfirmEmail";
import ResetPassword from "./ResetPassword/ResetPassword";

function App() {
  

  return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm/:confirmationCode" element={<ConfirmEmail />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>
      </Routes>
  )
}

export default App
