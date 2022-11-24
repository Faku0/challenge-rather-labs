import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './componentes/landing/Landingpage.jsx';
import Form from './componentes/form/Form.jsx';
import './App.css';

// const contractAcc = "0x437eF217203452317C3C955Cf282b1eE5F6aaF72";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet"/>
      <Routes>
      <Route exact path='/' element= {<LandingPage/>}/>
      <Route path='/form' element= {<Form/>}/>
      </Routes>
    </div>
     </BrowserRouter>
    
  );
}

export default App;
