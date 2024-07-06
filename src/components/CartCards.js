import React, { useContext, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";

const CartCards = ({ image, name, price, numberOfItems }) => {
  const { cart, setCart } = useContext(CartContext);
  const user = auth.currentUser;
  // console.log(cart)
  const increaseProductCount = async () => {
    const updated = cart.items.filter((item, index) => {
      if (item["product-name"] == name) {
        item.numberOfItems = ++item.numberOfItems;
      }
      return item;
    });
    const user = auth.currentUser;
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, {
      items: updated,
    });
    setCart({ items: updated });
    // console.log("quantity increased by 1");
    toast.success("quantity increased by 1")
  };
  const deleteFromCart = async () => {
    const index = cart.items.findIndex(
      (product) => product["product-name"] == name
    );

    if (index !== -1) {
      // Create a new array with the item removed
      const newItems = [...cart.items];
      newItems.splice(index, 1);

      // Update the cart state with the new array
      setCart((prevCart) => ({
        ...prevCart,
        items: newItems,
      }));

      // Update Firestore with the new array
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        items: newItems,
      });

      // console.log(newItems);
      toast.success("Item deleted from cart")
    }
  };
  const decreaseProductCount = async () => {
    if (numberOfItems == 1) {
      deleteFromCart();
    } else {
      const updated = cart.items.filter((item, index) => {
        if (item["product-name"] == name) {
          item.numberOfItems = --item.numberOfItems;
        }
        return item;
      });
      // const user = auth.currentUser;
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        items: updated,
      });
      setCart({ items: updated });
      // console.log("quantity decreased by 1");
      toast.success("quantity decreased by 1")
    }
  };

  return (
    <div className="cart-item-card">
  <div>
    <img src={image} alt="image" />
  </div>
  <div className="cart-item-details">
    <h2>{name}</h2>
    <h2>{price}</h2>
  </div>
  <div className="cart-item-actions">
    <h2 onClick={increaseProductCount}>+</h2>
    <h2>{numberOfItems}</h2>
    <h2 onClick={decreaseProductCount}>-</h2>
    <button onClick={deleteFromCart}>Delete Item</button>
  </div>
</div>
  );
};

export default CartCards;
