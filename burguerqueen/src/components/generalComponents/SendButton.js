import React from "react";
import "../../../src/stylesheets/TakeOrder.css";

function SendButton(props) {
  function sendOrder(){
    props.completeOrder()
  }
  return (
    <button
      className={`send-button ${props.secondclass}`}
      type="submit"
      onClick={sendOrder}
    >
      {props.name}
    </button>
  );
}

export default SendButton;
