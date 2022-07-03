import { BrowserRouter, Routes, Route } from "react-router-dom";

//-----------------------------------------------> custom imports
import PrivateRoutes from "./PrivateRoutes";
import { Home, Login, Signup, Error, EmployeeDetail, AddEmpolyee } from "./screens";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<PrivateRoutes />} >
          <Route path="/" element={<Home />} />
          <Route path="/emp/add" element={<AddEmpolyee />} />
          <Route path="/emp/details" element={<EmployeeDetail />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}