import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from '../component/Error'

const configInitial  = {
  method:'POST',
  headers: {
        'Content-Type': 'application/json'
      }
}

function Checkout() {
  const {items,clearCart} =  useContext(CartContext);

  const{hideCheckout,progress} = useContext(UserProgressContext);

  const {data ,isLoading:isSending,error,sendRequest,cleardata} = useHttp("http://localhost:3000/orders",configInitial);

 const cartTotal = items.reduce((total,item)=>{
  return  total = total+item.quantity*item.price;
 },0);

 function handleHideCheckout(){
  hideCheckout();
 }

 function handleFinish(){
  hideCheckout();
  clearCart();
  cleardata()

 }

 function handleSubmit(event){

    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({
        order: {
          items:items,
          customer: customerData
        }
      }));
 }

 let actions  = ( <><Button type = "button" textOnly onClick = {handleHideCheckout} >Close</Button>
           <Button>Submit Order</Button></> )

if(isSending){
            actions = <p>Sending Order Data...</p>
}

if(data && !error){
  return <Modal open={progress === 'checkout'} onClose={handleHideCheckout}>
    <h2>Success!!</h2>
    <p>Order Submitted successfully</p>
    <p>We will get back to you with more Details on given contact details within few minutes</p>

    <p className='modal-actions'>
     <Button onClick = {handleFinish}>Okay</Button>
    </p>  



  </Modal>
}


  return (
    <Modal  open = {progress ==='checkout'} onClose ={handleHideCheckout}>
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

            {error && <Error title = "Failed to submit order" msg = {error}></Error>}
            <p className='modal-actions'>
              {actions}
            </p>
        </form>
    </Modal>
  )
}

export default Checkout;