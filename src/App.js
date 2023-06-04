import React,{useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import TimeOpeningBlock from './components/pages/Home/TimeOpeningBlock';
import Footer from './components/Footer/Footer';
import ParcAuto from './components/pages/ParcAuto/ParcAuto';
<<<<<<< HEAD
import { Routes, Route, useLocation } from 'react-router-dom';
import CarDetails from './components/pages/ParcAuto/CarDetails';
=======
import CarDetails from './components/pages/ParcAuto/CarDetails';  
import { Routes, Route } from 'react-router-dom';
import Contact from './components/Contact/Contact';

>>>>>>> contact


function App() {
  const [pageTitle, setPageTitle] = useState("")
  const location = useLocation()

  return (
    <div className="App">
      {/*public*/}
      <Header />
      <Routes>
<<<<<<< HEAD
          <Route exact path='/' element={<Home />} />
          <Route path='/parc-auto' element={<ParcAuto />} />
          <Route path='/parc-auto/details/:id' element={<CarDetails />} />
=======
        <Route exact path='/' element={<Home pageTitle={(title) => setPageTitle(title)} />} />
        <Route path='/parc-auto' element={<ParcAuto />} />
        <Route path='/parc-auto/details/:id' element={<CarDetails />} />
        <Route path="/contact"  element={<Contact/>} />
        <Route path='*' element={"NOT FOUND 404"} />
>>>>>>> contact
      </Routes>
          {!location.pathname.includes("admin") && <TimeOpeningBlock />}
          {!location.pathname.includes("admin") && <Footer />}
       {/*Protected*/}
      <Routes>
        <Route exact path="/admin" element={<Home >
         <p>new admin NAv HERE</p>
        </Home>}  />
      </Routes>
    </div>
  );
}

export default App;
