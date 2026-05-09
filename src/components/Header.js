import "./Header.css";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-circle">
          🌎
        </Link>
        <div>
          <h1 className="logo-title">User Explorer</h1>
          <p className="logo-subtitle">Random users, weather and countries</p>
        </div>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/usuarios">Users</Link>
        <Link to="/clima">Wheather</Link>
        <Link to="/paises">Countries</Link>
      </nav>
    </header>
  );
};

export default Header;
