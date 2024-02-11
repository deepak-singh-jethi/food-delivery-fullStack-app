
import Header from "./component/Header";
import Meals from "./component/Meals";
import {CartContextProvider} from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgressContext";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";

function App() {
 
  return (
 
<UserProgressProvider>
   <CartContextProvider>
       <Header></Header>
       <Meals></Meals>
       <Cart></Cart>
       <Checkout></Checkout>
   </CartContextProvider>
</UserProgressProvider>
  

  );
}

export default App;
