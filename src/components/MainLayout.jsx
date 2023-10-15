import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

// const Home = lazy(() => import('../Pages/Home')); 
import Home from '../Pages/Home';
import Blogs from '../Pages/Blogs';
import Categories from '../Pages/Categories';
import About from '../Pages/About';
import Error from '../Pages/Error';
import ArticleView from './ArticleView';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile/Profile';
import EditorPage from '../Pages/editor/EditorPage';
import ScrollToTop from './ScrollToTop';


export default function MainLayout() {
  return (
    <div className=''>
      <BrowserRouter>
        {/* <ScrollToTop /> */}
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/:slug" element={<ArticleView />} />
          <Route exact path="/blogs/edit/:slug" element={<EditorPage />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<h1>Yaad rakhty na. ab mazy kr...</h1>} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/*" element={<Error />} />
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </div>
  )
}
