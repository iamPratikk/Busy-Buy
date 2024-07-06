import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { CartContext } from '../CartContext'
import authContext from '../AuthContext'
import { data } from '../Assets/data'

const HomePage = () => {

  const {cart,setCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const {isLoggedIn} = useContext(authContext);
  // console.log(isLoggedIn)
  useEffect(()=>{
    setProducts(data)
  },[])

  const handleChange = (e) =>{
    const filteredData = data.filter((item,index)=>item.name.toLowerCase().includes(e.target.value.toLowerCase()));
    // console.log(filteredData)
    setProducts(filteredData)
  }
  // const {isLoggedIn, setIsLoggedIn} = useContext(authContext);
  // console.log(cart)
  return (
    <>
    <div className='search-box' >
    <input type="text" placeholder='Search Products...' onChange={handleChange} />
    </div>
    <div className='body' >
    {products.map((item,index)=>{
      return <ProductCard key={index} name={item.name} image={item.image} price={item.price} />
    })}
    </div>
    <div className='footer' >
      <p>2024 Your Company. All rights reserved.</p>
    </div>
    </>
  )
}

export default HomePage

// style={{display: 'flex', flexWrap: 'wrap'}}