import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from "../trash.svg"
//import Delete from '@material-ui/icons/Delete'


export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center text-light fst-italic fs-3'>Cart is Empty!</div>
            </div>
        )
    }

const handleCheckOut=async()=>{
    let userEmail=localStorage.getItem("userEmail");
    let response=await fetch("http://localhost:5000/api/orderData",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            order_data:data,
            email:userEmail,
            order_date:new Date().toDateString()
        })
    }
);
console.log("Order Response:", response)
if(response.status===200){
    dispatch({type:"DROP"})
} }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div className='bg-light'>
            <div className='container m-auto mt-5 table-responsive table-responsive table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr className='text-dark'>
                        <th scope='row'>{index+1}</th>
                        <td>{food.name}</td>
                        <td>{food.qty}</td>
                        <td>{food.size}</td>
                        <td>{food.price}</td> 
                        <td><button type="button" className='btn p-0'><img src={trash} alt="delete" onClick={()=>{dispatch({
                            type: "REMOVE", index:index})}} /></button></td> </tr>
                        ))}
                    </tbody>
                </table>
                <div><h5 className='fs-4 text-center text-dark'>Total Price: {totalPrice}/-</h5></div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-outline-success fw-bold mt-5' onClick={handleCheckOut}>Place Order</button>
                </div>
            </div>
        </div>
    )
}
