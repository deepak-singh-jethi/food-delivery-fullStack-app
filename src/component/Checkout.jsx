import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';

function Checkut() {
  const {items} =  useContext(CartContext);

 const cartTotal = items.reduce((total,item)=>{
  return  total = total+item.quantity*item.price;
 },0);

  return (
    <Modal>
        <form>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input type='text' placeholder='Full Name' label= "Full Name" id="full-name" />
            <Input type='email' placeholder='Email Address' label= "Email Address" id="email" />
            <Input type = "text" placeholder = "Street" label = "Street" id= "street"/>
            <div className='control-row'>
              <Input label= "Postal Code" type = "text" id="postal-code"/>
              <Input label= "City" type = "text" id= "city"/>
            </div>
            <p className='modal-actions'>
           <Button textOnly>Close</Button>
           <Button textOnly>Submit Order</Button>
            </p>
        </form>
    </Modal>
  )
}

export default Checkut