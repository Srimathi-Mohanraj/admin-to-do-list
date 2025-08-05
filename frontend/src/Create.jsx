import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()

  const [values, setvalues] = useState({
    id: '',
    name: '',
    email: '',
    contact: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/staff', values)
      .then(function (data) {
        alert("Staff added successfully");
        console.log(data)
        navigate('/')
      })
      .catch(function (err) {
        console.log("Error adding staff:", err)
      })
  }

  return (
    <>
      <div className="min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Add Student</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="id">ID</label>
              <input
                id="id"
                type="number"
                placeholder="Enter ID"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={event => setvalues({ ...values, id: event.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={event => setvalues({ ...values, name: event.target.value })} />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={event => { setvalues({ ...values, email: event.target.value }) }} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="Contact">Contact</label>
              <input
                id="contact"
                type="number"
                placeholder="Enter contact"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={event => { setvalues({ ...values, contact: event.target.value }) }} />
            </div>

            <button
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default Create