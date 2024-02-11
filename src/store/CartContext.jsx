import { createContext, useReducer} from "react";

const CartContext = createContext({
    items:[],
    addItem:()=>{},
    removeItem:()=>{},
});

function cartReducer(state, action){
    if(action.type ==='ADD_ITEM'){
      
       const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id);

      const updatedItems = [...state.items]

       if(existingCartItemIndex >= 0){
        const itemToUpdate = {
            ...state.items[existingCartItemIndex],
            quantity: state.items[existingCartItemIndex].quantity+1
        };

        updatedItems[existingCartItemIndex] = itemToUpdate;
           
       }
       else{
       updatedItems.push({...action.item,quantity:1});
       }

       return {...state , items:updatedItems};

    }
    if(action.type === 'REMOVE_ITEM'){
        
    const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.id);

    const updatedItems = [...state.items];

    const existingCartItem = state.items[existingCartItemIndex];

    
    if(existingCartItem.quantity===1){
        
        updatedItems.splice(existingCartItemIndex,1);
        return {...state , items:updatedItems};
    }
    else{
        const itemToUpdate = {...existingCartItem,quantity:existingCartItem.quantity-1};
        updatedItems[existingCartItemIndex] = itemToUpdate;
    }
    
    return {...state , items:updatedItems};
    }

    if(action.type === 'CLEAR_CART'){
        return {...state , items:[]};
    }

    return state;
}

export  const CartContextProvider = ({children})=>{

    const [cart,dispatchCartAction] = useReducer(cartReducer,{items:[]});

   
    function addItem(item){

        dispatchCartAction({type:'ADD_ITEM', item});

    }
    function removeItem(id){
         dispatchCartAction({type:'REMOVE_ITEM', id});
    }

    function clearCart(){
        dispatchCartAction({type:'CLEAR_CART'});
    }

     const contextValue = {
        items:cart.items,
        addItem,
        removeItem,
        clearCart
    }

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}


export default CartContext;
