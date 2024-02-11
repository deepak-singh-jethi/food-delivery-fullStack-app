import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

function Checkout() {
  const {items} =  useContext(CartContext);

  const{hideCheckout,progress} = useContext(UserProgressContext);

 const cartTotal = items.reduce((total,item)=>{
  return  total = total+item.quantity*item.price;
 },0);

 function handleHideCheckout(){
  hideCheckout();
 }


 function handleSubmit(event){

    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());


    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items:items,
          customer: customerData
        }
      })
    });

 }


  return (
    <Modal  open = {progress ==='checkout'}>
        <form onSubmit = {handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input type='text' placeholder='Full Name' label= "Full Name" id="name" />
            <Input type='email' placeholder='Email Address' label= "Email Address" id="email" />
            <Input type = "text" placeholder = "Street" label = "Street" id= "street"/>
            <div className='control-row'>
              <Input label= "Postal Code" type = "text" id="postal-code"/>
              <Input label= "City" type = "text" id= "city"/>
            </div>
            <p className='modal-actions'>
           <Button type = "button" textOnly onClick = {handleHideCheckout} >Close</Button>
           <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
  )
}

export default Checkout;