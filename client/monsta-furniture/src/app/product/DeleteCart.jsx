import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { fetchCart } from '../slice/cartSlice';
import { useDispatch } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteCart({ cartId }) {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
    let disPatch = useDispatch();
    let deleteCart = () => {
        alert(cartId)
        if (cartId.length >= 1) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`${apiBaseUrl}cart/delete-cart/${cartId}`)
                        .then((res) => res.data)
                        .then((finalRes) => {
                            if (finalRes.status) {
                                disPatch(fetchCart())

                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your Record has been deleted.",
                                    icon: "success"
                                });

                            }
                            else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Record does not delete. ",
                                });
                            }

                        })

                }
            });

        }

        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Select Records",
            });
        }
    }
    return (
        <div> <RiDeleteBinLine onClick={deleteCart} className='ml-10 text-[18px] text-black hover:text-[#c09578]' /></div>
    )
}
