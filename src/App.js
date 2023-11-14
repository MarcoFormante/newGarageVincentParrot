import React,{useCallback, useEffect, useLayoutEffect, useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import TimeOpeningBlock from './components/pages/Home/TimeOpeningBlock';
import Footer from './components/Footer/Footer';
import ParcAuto from './components/pages/ParcAuto/ParcAuto';
import { Routes, Route, useLocation, Navigate,Outlet, useNavigate} from 'react-router-dom';
import CarDetails from './components/pages/ParcAuto/CarDetails';
import Contact from './components/pages/Contact/Contact';
import ReservedArea from './components/pages/ReservedArea/ReservedArea';
import AdminNav from './components/AdminNav/AdminNav';
import { useSelector,useDispatch } from 'react-redux';
import CheckToken from './helpers/CheckToken';
import { add,remove } from './components/Reducers/RoleReducer';
import AvisPage from './components/pages/avisPage/AvisPage';
import NewCarPage from './components/pages/admin/NewCar/NewCarPage';
import Accounts from './components/pages/admin/Accounts/Accounts';
import ReviewsHandler from './components/pages/admin/reviewsHandler/ReviewsHandler';
import TimesOpeningHandler from './components/pages/admin/TimesOpeningHandler/TimesOpeningHandler';
import ServicesHandler from './components/pages/admin/ServicesHandler/ServicesHandler';
import CarsHandler from './components/pages/admin/CarsHandler/CarsHandler';
import { setAuthToken } from './helpers/SetAuth';
import NotAuth from './helpers/NotAuth';





function App() {

  const role = useSelector((state) => state.role.value)

  const location = useLocation()
  const [hidden,setHidden] = useState([])
  const [checkTrigger,setCheckTrigger]=useState(false)
  const navigate = useNavigate()
 

  useEffect(() => {
    setHidden(["admin", "area-reserve"].filter(path => location.pathname.match(path)))
  },[location.pathname])

 
  // useEffect(() => {
  //   if (location.pathname.match("admin")) {

  //       CheckToken(sessionStorage.getItem("token")).then(response => {
  //       if (response.data.status === 1 ) {
  //           setAuthToken(sessionStorage.getItem("token"))
  //       }else {
  //         NotAuth()
  //         navigate("/",{replace:true})
  //       }
  //     })
  //   }
  // },[checkTrigger])
  
 
  return (
    <div className="App">

      {/*public*/}
      
      <Header />
      <AdminNav role={role} checkTrigger={() => setCheckTrigger(!checkTrigger)} />
      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/parc-auto' element={<ParcAuto />} />
          <Route path='/parc-auto/details/:id' element={<CarDetails />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/area-reserve" element={<ReservedArea />} />
          <Route path="/avis" element={<AvisPage/>} />
          <Route path='*' element={<Navigate to={"/"}/>} />
      
          {/*Protected*/}
          
          <Route element={<ProtectedRoute auth={window.sessionStorage.getItem("token")}
            redirectPath={"/"} checkTrigger={checkTrigger} />}
          >
            <Route path={"/admin/new-car"} element={<NewCarPage/>} />
            <Route path={"/admin/carsHandler"} element={<CarsHandler/>} />
            <Route path={"/admin/services"} element={<ServicesHandler/>} />
            <Route path={"/admin/accounts"} element={<Accounts/>} />
            <Route path={"/admin/reviews"} element={<ReviewsHandler/>} />
            <Route path={"/admin/timeTable"} element={<TimesOpeningHandler/>} />
            <Route path={"/admin/*"} element={<Navigate to={"/"}/>} />
          </Route>
          
        </Routes>
      </main>
      {
        !hidden[0] &&
        <div>
          <TimeOpeningBlock  />
          <Footer />
        </div>
      }
    </div>
  );
}

export default App;





const ProtectedRoute = ({ auth, redirectPath, checkTrigger }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const checkToken = useCallback(() => {
    if (auth) {
      CheckToken(auth).then((response) => {
        let isValid = response.data.status;
        if (isValid === 1) {
          const userRole = response.data.role;
          dispatch(add(userRole));
        } else {
          dispatch(remove());
          sessionStorage.clear();
        }
      });
    } else {
      dispatch(remove());
      sessionStorage.clear();
    }
  }, [dispatch, auth]);

  useEffect(() => {
    checkToken();
  }, [checkTrigger]);

  useEffect(() => {
    window.addEventListener("storage", checkToken);

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return auth ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={redirectPath} replace state={{ from: location }} />
  );
};
