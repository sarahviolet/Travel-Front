import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { AuthGuard } from "../../../auth/auth";

export default function BookingPage(){
    AuthGuard();

    const {register, setValue, watch ,handleSubmit} = useForm();

    const onClickSubmitBtn = async (data) => {
        console.log(data)
        const result = await axios.post("http://localhost:4000/api/bookings", data);
        console.log(result);
        fetchData();
    }

    const onClickDeleteBtn = (id) => async () => {
        const result = await axios.delete(`http://localhost:4000/api/bookings/${id}`);
        fetchData();
    }

    const onClickUpdateBtn = (id) => async () => {
        if(watch(`updatedDate${id}`) == null || watch(`updatedDate${id}`) == undefined) return;
        console.log("call")
        const dataToSend = {};
        const updatedDate = watch(`updatedDate${id}`);
        console.log(updatedDate)
        dataToSend.departureDate = updatedDate;
        const result = await axios.put(`http://localhost:4000/api/bookings/${id}`, dataToSend);
        fetchData();
    }

    const fetchData = async () => {

        const result = await axios.get("http://localhost:4000/api/bookings");
        setData(result);
        
        console.log(result)
       
        return result;
    }
    // fetchData();

    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <>
       <section id="manage" class="manage">
            <h2>Manage Bookings</h2>
            
         
            <form id="addBookingForm" onsubmit="addBooking(event)">
                <h3>Create Booking</h3>
                
                <label for="tripType">Trip Type:</label>
                <input {...register("tripType")} type="radio" id="tripTypeAdd" name="tripType" value="roundtrip" required />
                <span>Round Trip</span>
                <input {...register("tripType")} type="radio" id="tripTypeAdd" name="tripType" value="oneway" />
                <span>One Way</span>

                <label for="departureDate">Departure Date:</label>
                <input {...register("departureDate")} type="date" id="departureDateAdd" required />

                <label for="returnDate">Return Date:</label>
                <input {...register("arrivalDate")} type="date" id="arrivalDate" />

                <label for="passengerCount">Passenger Count:</label>
                <input {...register("counts")} type="number" id="passengerCountAdd" required />


                <button onClick={handleSubmit(onClickSubmitBtn)} type="submit">Add Booking</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Trip ID</th>
                        <th>Trip Type</th>
                        <th>Departure Date</th>
                        <th>Return Date</th>
                        <th>Passenger Count</th>
                        <th>Update Input</th>
                        <th>Update Date</th>
                        <th>Delete Trip</th>
                    </tr>
                </thead>
                <tbody id="bookingList">
                
                {data?.data?.map((item)=>{
                    return (
                        <React.Fragment key={item._id}>
                            <tr>

                                <td>{item._id}</td>
                                <td>{item.isReturn ? "Return" : "One Way"}</td>

                                <td>{item.departureDate}</td>
                                <td>{item.arrivalDate}</td>

                                <td>{item.counts}</td>
                                <td><input {...register(`updatedDate${item._id}`)} type="date" /></td>
                                <td><button onClick={onClickUpdateBtn(item._id)}>update</button></td>
                                <td><button onClick={onClickDeleteBtn(item._id)}>delete</button></td>
                            </tr>
                        </React.Fragment>
                    )
                })}
                </tbody>
            </table>
        </section>
        </>
    )
}