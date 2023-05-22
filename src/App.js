import React,{useState} from 'react'
import Header from './components/header/Header';
import Home from './components/pages/Home/Home';
import PageTitle from './components/PageTitle/PageTitle';
import { Routes, Route } from 'react-router-dom';


function App() {
  const [pageTitle, setPageTitle] = useState("")

  return (
    <div className="App">
      {/*public*/}
      <Header />
      <PageTitle pageTitle={pageTitle} />
      <Routes>
        <Route path='/' element={<Home pageTitle={(title) => setPageTitle(title)} />} />
        <Route path='/*' element={""} />
      </Routes>
       {/*Protected*/}
      
    </div>
  );
}

export default App;
