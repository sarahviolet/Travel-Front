import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, redirect} from "react-router-dom";
import HomePage from './components/views/home/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
      </Routes>
      </>
  );
}

export default App;
