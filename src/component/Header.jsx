import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";


const Header = () => {
 const{items} =  useContext(CartContext);
 const {showCart} = useContext(UserProgressContext);
 const totalItems = items.reduce((acc,item)=> acc+item.quantity,0);

 function handleShowCart(){
   showCart();
 }


  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="D food app Logo" />
        <h1>D-Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick = {handleShowCart}>Cart {totalItems}</Button>
      </nav>
    </header>
  );
};

export default Header;
