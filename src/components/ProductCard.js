import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import authContext from "../AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";



const ProductCard = ({ name, price, image }) => {
  const { cart, setCart } = useContext(CartContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  // const [products, setProducts] = useState([])
  // console.log(cart)

  useEffect(() => {
    // console.log(cart)
    if(isLoggedIn){
      fetchCart()
    }
    
  }, [cart]);
  // console.log(products)
  const fetchCart = async () => {
    const user = auth.currentUser;
    const cartRef = doc(db, "carts", user.uid);
    const docSnap = await getDoc(cartRef);
    setCart(docSnap.data());
    // console.log(docSnap.data());
  };
  const handleItem = async () => {
    if (isLoggedIn) {
      const user = auth.currentUser;
      // console.log(cart)
      if (cart.items.length>0) {
        const present = cart?.items?.filter(
          (item, index) => item["product-name"] == name
        );
        // console.log(present)
        if (present.length>0) {
          const a = cart?.items?.filter((item, index) => {
            if (item["product-name"] == name) {
              item.numberOfItems = ++item.numberOfItems;
            }
            return item;
          });
          console.log(a, "item present in cart");
          const cartRef = doc(db, "carts", user.uid);
          await updateDoc(cartRef, {
            items: a,
          });
          setCart({
            items: a
          })
          // console.log("cart updated",cart);
          toast.success("Product quantity increased");
          return;
        }else{
          // console.log("not present")
          const cartRef = doc(db, "carts", user.uid);
          await updateDoc(cartRef, {
          items: arrayUnion({
          "product-name": name,
          "product-price": price,
          image: image,
          numberOfItems: 1,
        })
      });
      // console.log("Product added to cart")
      toast.success(" New Product added to cart");
        }
      }else{
        const cartRef = doc(db, "carts", user.uid);
        await updateDoc(cartRef, {
        items: arrayUnion({
          "product-name": name,
          "product-price": price,
          image: image,
          numberOfItems: 1,
        }),
      });
      toast.success("New Product added to cart")
      // console.log("Product added to cart with zero cart items")
      }
      // const user = auth.currentUser;
      
    } else {
      // console.log("Please log in first");
      toast.warning("Please Login First")
      // alert("Login first");
    }
  };

  return (
    <div className="product-card">
      <div>
        <img src={image} alt="image" />
      </div>
      <h2>{name}</h2>
      <h2>{price}</h2>
      <button onClick={handleItem}>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
