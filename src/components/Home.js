import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <div className="overlay"></div>

      <div className="home-content">
        <span className="badge">🌍 React API Project</span>

        <h1>
          Explore Users Around
          <span> The World</span>
        </h1>

        <p>
          Discover random users, explore countries, weather conditions and
          interactive profiles powered by multiple APIs with React.
        </p>

        <div className="home-buttons">
          <button className="btn-primary">
            <Link to="/usuarios">Explore Users</Link>
          </button>

          <button className="btn-secondary">
            <Link to="/paises">View Countries</Link>
          </button>
          <button className="btn-primary">
            <Link to="/clima">View Weather</Link>
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h2>100+</h2>
            <p>Users Loaded</p>
          </div>

          <div className="stat-card">
            <h2>195</h2>
            <p>Countries</p>
          </div>

          <div className="stat-card">
            <h2>Live</h2>
            <p>Weather API</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
