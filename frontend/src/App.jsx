import { Route, Routes } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import NotFound from "./components/NotFound";
import SiteRoute from "./routes/SiteRoute";
import Register from "./components/Admin/auth/register/Register";
import Login from "./components/Admin/auth/login/Login";

function App() {
  return (
    <>
      <Routes>
        {/* ----------------------------site route -------------------------- */}

        <Route path="/*" element={<SiteRoute />}></Route>

        {/* -----------------------------if route doesnot found----------------------- */}

        <Route path="*" element={<NotFound />}></Route>

        {/* ---------------------------admin route-------------------------------------- */}
        <Route path="admin/register" element={<Register />} />
        <Route path="admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
          
                <AdminRoute />
    
          }
        />

        {/* ------------------------------userRoute-------------------------------------
        <Route path="/dashboard/*" element={<} */}
      </Routes>
    </>
  );
}

export default App;
