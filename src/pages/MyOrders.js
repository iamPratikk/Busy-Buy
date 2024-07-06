import React, { useContext, useEffect, useState } from "react";
import authContext from "../AuthContext";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import OrderTable from "../components/OrderTable";

const MyOrders = () => {
  const { isLoggedIn } = useContext(authContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMyOrders();
  }, []);
  // console.log(isLoggedIn)
  const fetchMyOrders = async () => {
    try {
      const user = auth.currentUser;
      const docRef = doc(db, "carts", user.uid);
      const docSnap = await getDoc(docRef);
      const { items, purchases } = docSnap.data();
      setOrders(purchases);
      // console.log(docSnap.data());
    } catch (e) {
      console.log(e.message);
    }
  };

  // console.log(orders);

  if (!isLoggedIn) {
    return <h1>Please login</h1>;
  }
  return (
    orders.map((item,index)=>{
      return <OrderTable key={index} data={item} />
    })
  )
};

export default MyOrders;
