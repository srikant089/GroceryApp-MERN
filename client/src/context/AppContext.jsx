import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({})

  const fetchProducts = async() => {
    // fetch produts with api
    setProducts(dummyProducts);
  }

  //add product to cart
  const addToCart = (itemId)=> {
    let cartData = structuredClone(cartItems);
    let toastMgs = '';
    if(cartData[itemId]) {
      cartData[itemId] += 1;
      toastMgs = 'cart updated';      
    }else{
      cartData[itemId] = 1;
      toastMgs = 'added to cart';
    }
    setCartItems(cartData);
    toast.success(toastMgs);
  }

  // update cartItem quantity
  const updateCartItem = (itemId,quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success('cart updated');
  }

  //total cart items
  const cartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  //total cart amount
  const totalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems) {
      let itemInfo = products.find((product)=>product._id===item);
      if(cartItems[item] >0){
        totalAmount +=  cartItems[item] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount);
  }

  //remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]) {
      // cartData[itemId] -= 1;

      // if(cartData[itemId] === 0) {
        delete cartData[itemId];
        toast.success('removed from cart');
      // }else{
      //   toast.success('updated cart');
      // }
      setCartItems(cartData);
    }    
  } 

  useEffect(()=>{
    fetchProducts();
  },[])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    cartCount,
    totalCartAmount,
    removeFromCart,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
