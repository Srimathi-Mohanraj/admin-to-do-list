import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { API } from './api'
import { useParams } from 'react-router-dom'

const Update = () => {

  const navigate = useNavigate()
  const { id } = useParams();

  const [values, setvalues] = useState({
    id: '',
    name: '',
    email: '',
    contact: ''
  })

  useEffect(function () {
   axios.get(`${API}/api/staff/${id}`)
  .then(function (res) {
    console.log('GET staff:', res.data);
    setvalues({
      id: res.data._id ?? res.data.id,
      name: res.data.name,
      email: res.data.email,
      contact: res.data.contact
    });
  })
  .catch(function (err) {
    console.error('Load failed:', err);
  });
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`${API}/api/staff/${id}`, updatedStaff)
  .then(function (res) {
    alert("Staff updated successfully");
    console.log(res.data);
  })
  .catch(function (err) {
    console.error("Update failed:", err);
    alert("Update failed. Check console for details.");
  });
  }



  return (
    <>
      <>
        <div className="min-h-screen bg-blue-600 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6">Update Student</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="id">ID</label>
                <input

                  type="number"
                  placeholder="Enter ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={values.id}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                <input

                  type="text"
                  placeholder="Enter Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={values.name}
                  onChange={e => setvalues({ ...values, name: e.target.value })} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                <input

                  type="email"
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={values.email}
                  onChange={e => setvalues({ ...values, email: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="Contact">Contact</label>
                <input

                  type="number"
                  placeholder="Enter contact"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={values.contact}
                  onChange={e => { setvalues({ ...values, contact: e.target.value }) }} />
              </div>



              <button

                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>

      </>
    </>
  )
}

export default Update