import React,{useEffect, useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import TimeOpeningBlock from './components/pages/Home/TimeOpeningBlock';
import Footer from './components/Footer/Footer';
import ParcAuto from './components/pages/ParcAuto/ParcAuto';
import { Routes, Route, useLocation, Navigate,Outlet} from 'react-router-dom';
import CarDetails from './components/pages/ParcAuto/CarDetails';
import Contact from './components/pages/Contact/Contact';
import ReservedArea from './components/pages/ReservedArea/ReservedArea';
import AdminNav from './components/AdminNav/AdminNav';
import { useSelector,useDispatch } from 'react-redux';
import CheckToken from './helpers/CheckToken';
import { add,remove } from './components/Reducers/RoleReducer';
import AvisPage from './components/pages/avisPage/AvisPage';


function App() {

  const role = (useSelector((state) => state.role.value))
  const [login, setlogin] = useState(false)
  const location = useLocation()


 
  return (
    <div className="App">

      {/*public*/}
      
      <Header />
      <AdminNav role={role}  />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/parc-auto' element={<ParcAuto />} />
        <Route path='/parc-auto/details/:id' element={<CarDetails />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/area-reserve" element={<ReservedArea setLogin={(value) => setlogin(value)} />} />
        <Route path="/avis" element={<AvisPage/>} />
        <Route path='*' element={"NOT FOUND 404"} />
    
        {/*Protected*/}
        
        <Route element={<ProtectedRoute auth={window.localStorage.getItem("token")}
          login={login} redirectPath={"/"} />}
        >
          <Route path={"/admin/new-car"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/modify-car"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/services"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/accounts"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/accounts"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/feedback"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/time-table"} element={<h1>adminpage</h1>} />
          <Route path={"/admin/*"} element={<h1>notfound</h1>} />
        </Route>
        
      </Routes>
      {
        !location.pathname.includes('admin') &&
        <div>
          <TimeOpeningBlock />
          <Footer />
        </div>
      }
      
    </div>
  );
}

export default App;

const ProtectedRoute = ({ auth, redirectPath,login , role}) => {

  const location = useLocation();

  const [token,setToken]= useState("")
  const dispatch = useDispatch()
 
  
  function checkStorage() {
   
    if (token || localStorage.getItem("token")) {
        CheckToken(localStorage.getItem("token")).then((response) => {
         let isValid = response.data.status;
         if (isValid === 1) {
             const userRole = response.data.role; 
              dispatch(add(userRole))
  
         } else {
            dispatch(remove())
             setToken("")
         }
     })
    } else {
      setToken("token")
      dispatch(remove())
    }
  }
  
  useEffect(() => {
     window.addEventListener("storage",checkStorage())
    
    return window.removeEventListener("storage",checkStorage())
    
},[login])

return auth
      ?
  <div>
     <Outlet />
      </div>
      :
      <Navigate to={redirectPath} replace state={{from: location} } />
}
