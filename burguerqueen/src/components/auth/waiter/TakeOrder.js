import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import OrderDetails from "./OrderDetails";
import "../../../stylesheets/TakeOrder.css";
import NavBar from "../../generalComponents/NavBar";
import Button from "../../generalComponents/Button";
import SendButton from "../../generalComponents/SendButton";
import axios from "axios";

function Menu({ user, changeUser}) {
  //al renderizar el componente se obtiene la data del menú de la API
  // y se le asigna el valor a la variable del Hook
  const [breakfast, setBreakfast] = useState([]);
  const [dinner, setDinner] = useState([]);

  useEffect(() => {
    getMenuBreakfast();
    getMenuDinner();
  }, []);

  const getMenuBreakfast = async () => {
    let request = await axios.get(
      "https://6376d05f81a568fc25067c85.mockapi.io/api/bq6/products?type=breakfast"
    );
    setBreakfast(request.data);
  };
  const getMenuDinner = async () => {
    let request = await axios.get(
      "https://6376d05f81a568fc25067c85.mockapi.io/api/bq6/products?type=lunch"
    );
    setDinner(request.data);
  };

  //Se cambia el estado de ptionFood al apretar el boton para el renderizado condicional
  const [optionFood, setOptionFood] = useState("breakfast");

  function changeMenu(e) {
    if (e.target.value === "breakfast") {
      setOptionFood("breakfast");
      console.log(breakfast);
    }
    if (e.target.value === "dinner") {
      setOptionFood("dinner");
      console.log(dinner);
    }
  }

  //Funciones que renderizan/muestra un componente por cada elemento del menu de la API

  const [order, setOrder] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [finishedOrder, setFinishedOrder] = useState({});

  function addItem(item) {
    if (!order.find((element) => element.product.id === item.id)) {
      const updatedOrder = [...order, { product: item, qty: 1 }];
      setOrder(updatedOrder);
    } else {
      setOrder(
        order.map((element) =>
          element.product.id === item.id
            ? { ...element, qty: element.qty + 1 }
            : element
        )
      );
    }
  }
  console.log(order);
  function productListBreakfast() {
    return breakfast.map((item) => {
      return (
        <ProductCard
          key={item.id.toString()}
          addItem={addItem}
          item={item}
          state={order}
        />
      );
    });
  }

  function productListDinner() {
    return dinner.map((item) => {
      return (
        <ProductCard
          key={item.id.toString()}
          addItem={addItem}
          item={item}
          state={order}
        />
      );
    });
  }

  function showOrderItems() {
    return order.map((item) => {
      return (
        <OrderDetails
          key={item.product.id.toString()}
          qty={item.qty}
          name={item.product.name}
          price={item.product.price}
        />
      );
    });
  }
const total = () => {
  let total = order.reduce((acc, item) => acc + item.qty * item.product.price, 0);
  setTotalAmount(total)
}
useEffect(() => {
  total()
}, [showOrderItems()]);

  console.log(customerName)
  const getName = (e) =>{
    setCustomerName(e.target.value)
  }
  
  const completeOrder = () => {
    setFinishedOrder({
      customerName: customerName,
      date: new Date(),
      items: order,
      total: totalAmount
    })
    axios.post('https://6393aaca11ed187986bb8706.mockapi.io/Orders', {order: finishedOrder})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
console.log(finishedOrder)
  return (
    <div className="menuContainer">
      <NavBar changeUser={changeUser} />
      <main className="menu">
        <section className="options-menu">
          <Button
            filter={changeMenu}
            value="breakfast"
            name="Breakfast"
            secondclass="left"
          />
          <Button
            filter={changeMenu}
            value="dinner"
            name="Lunch & Dinner"
            secondclass="center"
          />
          <div className="lineOne" />
        </section>
        <div className="product-card-container">
          <>
            {optionFood === "breakfast"
              ? productListBreakfast()
              : productListDinner()}
          </>
        </div>
        <img
          className="logo-person"
          src={require("../../../images/person-pin.png")}
          alt="Person icon"
        />
        <p className="waiter-name">{user}</p>
      </main>
      <section className="order-summary-container">
        <h3 className="order-summary-text">Order summary</h3>
        <div className="input-customer-name">
          <label>Customer's Name </label>
          <input className="customer-name-input" type="text" onChange={getName}></input>
        </div>
        <div className="order-container">
          <div className="order-description">
            <table>
              <thead>
                <tr>
                  <th> QTY </th>
                  <th className="style-name-column"> Name </th>
                  <th> Price </th>
                  <th className="style-delete-column"> Delete </th>
                </tr>
              </thead>
              <>{order != [] ? showOrderItems() : console.log("no hay nada")}</>
            </table>
          </div>
          <p className="price"> Total price </p>
          <p className="number-price">$ {totalAmount}.00</p>
          <SendButton name="Send to kitchen" secondclass="orders" completeOrder={completeOrder} />
        </div>
      </section>
    </div>
  );
}

export default Menu;
