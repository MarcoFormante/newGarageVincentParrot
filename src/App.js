import React,{useEffect, useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import TimeOpeningBlock from './components/pages/Home/TimeOpeningBlock';
import Footer from './components/Footer/Footer';
import ParcAuto from './components/pages/ParcAuto/ParcAuto';
import { Routes, Route, useLocation, Navigate,Outlet, useNavigate } from 'react-router-dom';
import CarDetails from './components/pages/ParcAuto/CarDetails';
import Contact from './components/pages/Contact/Contact';
import ReservedArea from './components/pages/ReservedArea/ReservedArea';
import CheckUser from './helpers/CheckUser';
import axios from 'axios';


function App() {
  const location = useLocation()
  const hiddenElementsWith = ["admin", "area-reserve"];
  
  return (
    <div className="App">

      {/*public*/}
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/parc-auto' element={<ParcAuto />} />
        <Route path='/parc-auto/details/:id' element={<CarDetails />} />
        <Route path="/contact"  element={<Contact/>} />
        <Route path="/area-reserve" element={<ReservedArea />} />
        <Route path='*' element={"NOT FOUND 404"} />
    
        {/*Protected*/}
        
        <Route element={<ProtectedRoute auth={window.localStorage.getItem("token")} redirectPath={"/"}/>}>
          <Route path={"/admin"} element={<div><Home /></div>} />
       </Route>

       
      </Routes>
      {
        !hiddenElementsWith.includes(location.pathname.slice(1)) &&
        <div>
          <TimeOpeningBlock />
          <Footer />
        </div>
      }
      
    </div>
  );
}

export default App;

const ProtectedRoute = ({ auth, redirectPath }) => {
  const location = useLocation();
 

return auth
      ?
      <div>
    <Outlet />
      </div>
      :
      <Navigate to={redirectPath} replace state={{from: location} } />
}
