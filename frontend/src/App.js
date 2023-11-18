import './App.css';
import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout';
import Public from './Components/Public';
import Login from './Components/Login';
import Dash from './Components/Dash';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        
        <Route path="dash" element={<Dash />}>


        </Route>

      </Route>
    </Routes>
    
    </>
  );
}

export default App;
