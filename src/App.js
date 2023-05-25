import React,{useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import PageTitle from './components/PageTitle/PageTitle';
import TimeOpeningBlock from './components/pages/Home/TimeOpeningBlock';
import Footer from './components/Footer/Footer';
import ParcAuto from './components/pages/ParcAuto/ParcAuto';
import { Routes, Route } from 'react-router-dom';


function App() {
  const [pageTitle, setPageTitle] = useState("")

  return (
    <div className="App">
      {/*public*/}
      <Header />
      <Routes>
        <Route path='/' element={<Home pageTitle={(title) => setPageTitle(title)} />} />
        <Route path='/parc-auto' element={<ParcAuto/>} />
      </Routes>
      <TimeOpeningBlock />
      <Footer/>
       {/*Protected*/}
      
    </div>
  );
}

export default App;
