import './App.css';

import {  Routes, Route } from "react-router-dom";

import Login from './Component/Login';
import Main from './Component/Main'
import JoinForm from './Component/member/JoinForm';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/main' element={<Main />} />
            <Route path='/joinForm' element={<JoinForm />} />
        </Routes>

        // <div>
        //     <Menu />
        //     <Routes>
        //         <Route />
        //     </Routes>
        // </div>
    );
}

export default App;
