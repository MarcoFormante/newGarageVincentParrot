import Header from './components/header/Header';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      {/*public*/}
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
       {/*Protected*/}
      
    </div>
  );
}

export default App;
