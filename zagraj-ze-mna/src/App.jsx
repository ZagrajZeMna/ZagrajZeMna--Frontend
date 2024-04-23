import Registration from "./Registration/Registration"
import Login from "./Login/Login"
import Home from "./Home/Home"
import { Routes, Route } from 'react-router-dom';
import ConfirmEmail from "./ConfirmEmail/ConfirmEmail";
import ResetPassword from "./ResetPassword/ResetPassword";
import GameCategory from './GameCategory';

function App() {
  

  return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm/:confirmationCode" element={<ConfirmEmail />} />
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/category/:game" element={<GameCategory />} />
      </Routes>
  )
}

export default App
