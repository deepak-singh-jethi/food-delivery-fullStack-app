import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress:'',//'cart', 'checkout'
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{},
});

export function  UserProgressProvider({children}){
    const [userProgress, setUserProgress] = useState('');

    function showCart(){
        setUserProgress('cart');
    }
    function hideCart(){
        setUserProgress('');
    }
    function showCheckout(){
        setUserProgress('checkout');
    }
    function hideCheckout(){
        setUserProgress('')
    }

   const userProgressContextValue = {
        progress:userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
   }


    return <UserProgressContext.Provider value={userProgressContextValue}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;