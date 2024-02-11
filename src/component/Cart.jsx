import React,{useContext} from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';


function Cart() {
 const {items,addItem,removeItem} =  useContext(CartContext);
 const  {progress,hideCart,showCheckout} = useContext(UserProgressContext);

 const cartTotal = items.reduce((total,item)=>{
  return  total = total+item.quantity*item.price;
 },0);

const handleClose = ()=>{
    hideCart();
}

const handleShowCheckOut = ()=>{
  showCheckout();
}


  return (
    <Modal className='cart' open={progress==='cart'} onClose={progress === 'cart' ? handleClose : null}>
        <h2>Your Cart</h2>
        <ul>
        {items.map(item=>{
            const {name,quantity,price,id} = item;

           return <CartItem key={id}  name = {name} quantity={quantity} price={price} onIncrease={()=>addItem(item)} onDecrease={()=> removeItem(id)}></CartItem>
        })}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick = {handleClose}>Close</Button>
            {items.length>0 && <Button onClick = {handleShowCheckOut}>Checkout</Button>}
        </p>
    </Modal>
  )
}

export default Cart