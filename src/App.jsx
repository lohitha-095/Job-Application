import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store'; // Adjusted import path to the store folder
import Navbar from './components/Navbar/Navbar';
import Search from './components/SearchDiv/Search';
import Jobs from './components/JobDiv/Jobs';
import Value from './components/ValueDiv/Value';
import Footer from './components/FooterDiv/Footer';
import Login from './pages/Login/login'; // Adjusted import path
import Signup from './pages/Signup/signup'; // Adjusted import path
import Profile from './pages/Profile/profile'; // Adjusted import path

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

const Home = () => (
  <div className="w-[85%] m-auto bg-white">
    <Navbar />
    <Search />
    <Jobs />
    <Value />
    <Footer />
  </div>
);

const LoginPage = () => (
  <div className="w-[100%] m-auto bg-white">
    <Login />
  </div>
);

const SignupPage = () => (
  <div className="w-[100%] m-auto bg-white">
    <Signup />
  </div>
);

const ProfilePage = () => (
  <div className="w-[85%] m-auto bg-white">
    <Profile />
  </div>
);

export default App;
