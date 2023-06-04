import React,{useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import TimeOpeningBlock from './components/pages/Home/TimeOpeningBlock';
import Footer from './components/Footer/Footer';
import ParcAuto from './components/pages/ParcAuto/ParcAuto';
import CarDetails from './components/pages/ParcAuto/CarDetails';  
import { Routes, Route } from 'react-router-dom';
import Contact from './components/Contact/Contact';



function App() {
  const [pageTitle, setPageTitle] = useState("")

  return (
    <div className="App">
      {/*public*/}
      <Header />
      <Routes>
        <Route exact path='/' element={<Home pageTitle={(title) => setPageTitle(title)} />} />
        <Route path='/parc-auto' element={<ParcAuto />} />
        <Route path='/parc-auto/details/:id' element={<CarDetails />} />
        <Route path="/contact"  element={<Contact/>} />
        <Route path='*' element={"NOT FOUND 404"} />
      </Routes>
      <TimeOpeningBlock />
      <Footer />
   
       {/*Protected*/}
      
    </div>
  );
}

export default App;
