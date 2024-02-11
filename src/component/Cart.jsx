import React,{useContext} from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';


function Cart() {
 const {items,addItem,removeItem} =  useContext(CartContext);
 const  {progress,hideCart} = useContext(UserProgressContext);

 const cartTotal = items.reduce((total,item)=>{
  return  total = total+item.quantity*item.price;
 },0);

const handleClose = ()=>{
    hideCart();
}


  return (
    <Modal className='cart' open={progress==='cart'}>
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
            {items.length>0 && <Button >Checkout</Button>}
        </p>
    </Modal>
  )
}

export default Cart