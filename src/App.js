import React from 'react';
import AuthContext from './context/Auth-context';
import { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home/Home';
import Profiles from './components/Profiless/Profiles';
import SeeProfile from './components/Profiless/SeeProfile';
import CreatePost from './components/Post/CreatePost';
import ListPosts from './Admin/ListPosts';
// import ListUsers from './Admin/ListUsers';
import AuthorizeRoute from './components/AuthorizeRoute';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Followers from './FlsFlg/Followers';
import Following from './FlsFlg/Following';
import Hero from './components/Hero';

function App() {
  const { isLoggedIn, user, handleLogout } = useContext(AuthContext);
  console.log(isLoggedIn, user);
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/login">MicroBlog</Navbar.Brand>
          <Nav className="flex-end gap-4">
            {isLoggedIn ? (
              <>
                {user.role !== 'admin' && (
                  <Nav.Link as={Link} to="/home">
                    Home
                  </Nav.Link>
                )}

                <Nav.Link as={Link} to="/profiles">
                  Search
                </Nav.Link>

                {user.role !== 'admin' && (
                  <Nav.Link as={Link} to="/createpost">
                    Create Post
                  </Nav.Link>
                )}
                {user.role === 'admin' && (
                  <Nav.Link as={Link} to="/list-posts">
                    List posts
                  </Nav.Link>
                )}

                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>

                {/* <li>
                {user.role == 'admin' && (
                  <li>
                    <Link to="/list-users"> List posts</Link>
                  </li>
                )}
              </li> */}

                <Nav.Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-dark btn-sm"
                  >
                    Logout
                  </button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route
          path="/register"
          element={<Register isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            <PrivateRoute>
              <Profiles />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <SeeProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/createpost"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/followers/:id"
          element={
            <PrivateRoute>
              <Followers />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/following/:id"
          element={
            <PrivateRoute>
              <Following />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/list-users"
          element={
            <PrivateRoute>
              <AuthorizeRoute permittedRoles={['admin']}>
                <ListUsers />
              </AuthorizeRoute>
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/list-posts"
          element={
            <PrivateRoute>
              <AuthorizeRoute permittedRoles={['admin']}>
                <ListPosts />
              </AuthorizeRoute>
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
