import React, { useState } from "react";
import {
  Routes, Route, Outlet, NavLink, Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/auth";

import LogIn from "./Pages/LogIn";
import Items from "./Pages/Items";
import Contact from "./Pages/Contact";


function App() {

  const [user, setUser] = useState(false);

  return (
    <AuthProvider>
      <Routes>
        {user && <Route element={<Layout />}>
          <Route path="items" element={<Items />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to={user ? "/items" : "/"} />} />
        </Route>}

        {!user && (
          <Route path="/" element={<LogIn authenticate={() => setUser(
            true)} />} />
        )}
        <Route path="*" element={<Navigate to={user ? "/items" : "/"} />} />
      </Routes>
    </AuthProvider>
  );
}


function Layout() {

  let activeStyle = {
    textDecoration: "underline",
    color: "blue",
    fontWeight: "bold"
  };


  return (
    <div>
      <header className="navbar">
        <div className="navbar__logo">
          <h1>main@mail.ee</h1>
        </div>
        <nav className="navbar__items">
          <ul>
            <li>
              <NavLink to="/items" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Items</NavLink>
            </li>
            <li>
              <NavLink to="/contact" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Contact</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default App;