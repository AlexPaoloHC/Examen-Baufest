import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../App.scss";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fs-3 ubuntu">
        <span className="text-white" >Baufest  </span>
        <span>Rick & Morty</span>
        </Link>
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fas fa-bars open text-dark"></span>
          <span className="fas fa-times close text-dark"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav fs-5">
            <NavLink to="/" className="nav-link text-white" >
              Personajes
            </NavLink>
            <NavLink to="/episodes" className="nav-link text-white">
              Episodios
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link text-white"
              to="/location"
            >
              Ubicación
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;