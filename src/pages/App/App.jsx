import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import NewPostPage from '../NewPostPage/NewPostPage';
import PostPage from '../PostPage/PostPage';
import PostHistoryPage from '../PostHistoryPage/PostHistoryPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [post, setPost] = useState({
    text: "",
  });

  useEffect(function() {
    async function initPost() {
      setPost({text: ""})
    }
    initPost();
    
  }, []);

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostHistoryPage />} />
              <Route path="/posts/new" element={<NewPostPage post={post} setPost={setPost} />} />
              <Route path="/posts/:id" element={<PostPage post={post} setPost={setPost} />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
