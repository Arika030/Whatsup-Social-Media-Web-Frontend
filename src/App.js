import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Auth from './posts/pages/Auth';
import MyPosts from './posts/pages/MyPosts';
import Posts from './posts/pages/Posts';
import NewPost from './posts/pages/NewPost';
import UpdatePost from './posts/pages/UpdatePost';
import { AuthContext } from './shared/Auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import PostItem from './posts/components/PostItem';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId); // 设置用户 ID
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null); // 退出时清除用户 ID
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostItem />} />
        <Route path="/:userId/posts" element={<MyPosts />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/posts/:postId/edit" element={<UpdatePost />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:postId" element={<PostItem />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
      <Router>
       <div className="main-container">
          <MainNavigation />
          <main className="content">{routes}</main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

