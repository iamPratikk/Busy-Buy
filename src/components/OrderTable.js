import React from "react";

const OrderTable = ({data}) => {
  // console.log(date,items)
  const { items } = data;
  const totalPrice = data['total-price'];
  const orderDate = data['date'].slice(0,10)
  // console.log(orderDate, items, totalPrice)
  return (
    <div>
      <h1 className="center-heading" >Ordered on - {orderDate} </h1>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item,index)=>{
          return <tr key={index}>
            <td>{item['product-name']}</td>
            <td>{item['product-price']}</td>
            <td>{item['numberOfItems']}</td>
            <td>{item['product-price']*item['numberOfItems']}</td>
          </tr>
        })}
        
      </tbody>
      <tfoot>
        <tr>
        <td></td>
        <td></td>
        <td>Grand Total-</td>
        <td>{totalPrice}</td>
        </tr>
      </tfoot>
    </table>
    </div>
  );
};

export default OrderTable;
