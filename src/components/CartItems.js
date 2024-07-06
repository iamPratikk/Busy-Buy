import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import ProductCard from "./ProductCard";
import CartCards from "./CartCards";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import authContext from "../AuthContext";
import { toast } from "react-toastify";

const CartItems = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(null);
    // console.log(cart)

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, []);

  useEffect(() => {
    if (cart.items) {
      const price = cart.items.reduce((acc, curr) => {
        return acc + (curr["product-price"]*curr["numberOfItems"]);
      }, 0);
      // console.log(totalPrice)
      setTotalPrice(price);
    }
  }, [cart?.items, totalPrice]);
//   console.log(totalPrice)
  const fetchCart = async () => {
    const user = auth.currentUser;
    const cartRef = doc(db, "carts", user.uid);
    const docSnap = await getDoc(cartRef);
    setCart(docSnap.data());
    // console.log(docSnap.data());
  };

  const purchaseItems = async () =>{
    const user = auth.currentUser;
    const docRef = doc(db,"carts", user.uid)
    const docSnap = await getDoc(docRef);
    const snapData = docSnap.data();
    if(snapData.purchases.length==0){
      await updateDoc(docRef,{
        purchases : [{
          "date" : new Date().toLocaleString(),
          "items" : cart.items,
          "total_price" : totalPrice
        }]
      });
      console.log("updated without any previous Items")
      toast.success("Thanks for Purchasing");
    }else{
      await updateDoc(docRef,{
        purchases : [...snapData.purchases,{
          "date" : new Date().toLocaleString(),
          "items" : cart.items,
          "total-price" : totalPrice
        }]
      });
      console.log("updated with previous Items")
      toast.success("Thanks for Purchasing")
    }
    console.log(docSnap.data());
  }


  
  const cartItems = cart?.items;
  if (!isLoggedIn) {
    return <h1>Please Login bitch....</h1>;
  }

  return (
    <>
    <div className="sideBar-purchase" >
    <h2>Total Price:-- {totalPrice}</h2>
    <button onClick={purchaseItems} >Purchase</button>

    </div>
    <div className="cardParent">
    
      <div className="cardParent">
        {cartItems?.map((item, index) => {
          return (
            <CartCards
              key={index}
              image={item.image}
              name={item["product-name"]}
              price={item["product-price"]}
              numberOfItems={item.numberOfItems}
            />
          );
        })}
      </div>
    </div>
    </>
  );
};

export default CartItems;
