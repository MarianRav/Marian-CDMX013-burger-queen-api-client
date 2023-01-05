import React from "react";
import "../../../src/stylesheets/TakeOrder.css";

function NavBar({ changeUser }) {
  function logOut() {
    changeUser("", "");
  }
  return (
    <nav className="superiorNav">
      <div>
        <img
          className="logo-logout"
          src={require("../../../src/images/logout.png")}
          alt="Logout"
          onClick={logOut}
        />
        <button className="logout-button" onClick={logOut}>
          Logout
        </button>
      </div>
      <img
        className="logo-waiter-layout"
        src={require("../../../src/images/queen.png")}
        alt="Logo"
      />
    </nav>
  );
}

export default NavBar;
