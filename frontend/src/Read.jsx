import axios from 'axios'
import { API } from './api'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();
    const [staff, setstaff] = useState({})

    useEffect(function () {
        axios.get(`${API}/api/staff/${id}`)
            .then(function (res) {
                console.log(res)
                setstaff(res.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [])


    return (
        <>
            <div className='min-h-screen bg-blue-600 flex items-center justify-center'>
                <div className='bg-white p-8 rounded shadow-md w-full max-w-md text-lg '>

                    <h2 className='text-2xl font-medium'>Student Detail</h2>
                    <h2><strong>ID:</strong> {staff.id}</h2>
                    <h2><strong>Name:</strong> {staff.name}</h2>
                    <h2><strong>Email:</strong> {staff.email}</h2>
                    <h2><strong>Contact:</strong> {staff.contact}</h2>
                    <div className='flex gap-2 mt-5'>
                        <Link to='/' className='bg-blue-400 w-fit rounded px-3 py-1 mx-2'>Back</Link>
                        <Link to={`/update/${id}`} className='bg-[#00B9F2] w-fit rounded px-3 py-1'>Edit</Link>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Read