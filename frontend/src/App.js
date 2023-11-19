import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout';
import Public from './Components/Public';
import Login from './Components/Login';
import Dash from './Components/Dash';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';
import ErrorPage from './Components/404';
import EditNote from './features/notes/EditNote';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import NewNote from './features/notes/NewNote';

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        
       {/* These are protected routes */}
        <Route path="dash" element={<Dash />}>
          
          <Route index element={<Welcome />}/>

          <Route path="notes">
            <Route index element={<NotesList />}/>
            <Route path=":id" element={<EditNote/>}/>
            <Route path="new" element={<NewNote />}/>
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm/>}
/>          </Route>

        </Route>
        
        </Route>
        <Route path="*" element={<ErrorPage />} />
    </Routes>
    </BrowserRouter>

  );
}

export default App;

