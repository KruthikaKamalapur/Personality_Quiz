import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Header() {

    return (
      <div className="container">
        <h2 id="head1">Which Element Are You?</h2>
        <h2 id="head2">(based on completely random things)</h2>
        <div className="links">
        <p>
        <Link to="/" className="link1">Home </Link>       
        <Link to="/quiz">Quiz</Link>       
        </p>
        </div>
      </div>
    );
}
export default Header;
