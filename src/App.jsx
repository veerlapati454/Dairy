import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";

import Home from "./components/Home/Home";
// import Testimonals from "./components/Testimonals/Testimonals";
// import Features from "./components/Features/Features";
// import About from "./components/About/About";
// import Tech from "./components/Tech/Tech";
// import Stats from "./components/Stats/Stats";
// import Contact from "./components/Contact/Contact";
// import Login from "./components/Login/Login";
// import UserDashboard from "./components/UserDashboard/UserDashboard"
// import Register from "./components/Register/Register";
// import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
// import ElectricAviation404 from "./components/NotFound/NotFound"
 import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <HashRouter>
      <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
                  
        </Route>
        {/* <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/user-dashboard/:view?" element={<UserDashboard/>}/>
        
        <Route path="/admin-dashboard/:view?" element={<AdminDashboard/>}/>

        <Route path="*" element={<ElectricAviation404/>}/> */}

      </Routes>
    </HashRouter>
  );
}

export default App;