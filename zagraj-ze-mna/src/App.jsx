import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { Routes, Route } from 'react-router-dom';
import ConfirmEmail from "./ConfirmEmail/ConfirmEmail";
import ResetPassword from "./ResetPassword/ResetPassword";
import Space from "./navbar/space";
import MyNavbar from "./navbar/navbar";

function App() {
  

  return (
    <div>
      <MyNavbar/>
      <Space/>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm/:confirmationCode" element={<ConfirmEmail />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>
      </Routes>
    </div>
      
  )
}

export default App
