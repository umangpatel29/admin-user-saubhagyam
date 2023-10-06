import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="border border-1">
      <nav className="d-flex m-3">
        <h3 className="mx-3">Logo</h3>
        <div className="m-2">
          <Link className="nav-link" to="/user">Home</Link>
        </div>
        <div className="m-2">
          <Link className="nav-link" to="/product">Produduct</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;