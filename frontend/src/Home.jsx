import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {

  const [data, setdata] = useState([])
  
useEffect(function()
{
axios.get("http://localhost:5000/staff").then(function(data)
{
  console.log(data.data)
  setdata(data.data) 
})
},[])

const handleDelete =(id) =>{
   if (window.confirm("Are you sure you want to delete this staff?")) {
  axios.delete('http://localhost:5000/delete/' + id).then(function(){
      alert('Staff deleted successfully')
      setdata(prevData => prevData.filter(staff => staff.id !== id));
})
.catch(function(err)
{
  console.log("Deleted Failed "+ err)
         

})
}}


  return (
    <>
      <div >
        <div>
          <div className=' mt-5 container mx-auto'>
            <h1 className='text-3xl text-white py-3 font-medium  text-center bg-blue-500 '>Admin Page</h1>
            <h1 className='text-4xl font-medium my-2 '>Staff List</h1>
            <div className='flex justify-end'>
              <Link to="/Create" className="bg-green-700 text-white px-2 py-2 mb-2 font-medium">Create +</Link>
            </div>
            <hr className="border-t-4 border-gray-200" />
            <div className=' flex justify-center items-center my-4' >
              <div className='b py-2 px-4 '>
                <table className='table-fixed' >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      data.map(function (staff, index) {
                        return <tr key={index} className='border-b-2 border-gray-100'>
                          <td className='px-4 py-2'>{staff.id}</td>
                          <td className='px-4 py-2'>{staff.name}</td>
                          <td className='px-4 py-2'>{staff.email}</td>
                          <td className='px-4 py-2'>{staff.contact}</td>
                          <td>
                            <Link to={`/read/${staff.id}`} className="bg-[#00B9F2] text-white w-fit px-1 py-1 border rounded-md mx-1">Read </Link>
                            <Link to={`/update/${staff.id}`} className="bg-blue-600 text-white w-fit px-1 py-1 border rounded-md mx-1">Edit</Link>
                            <button className="bg-red-600 text-white w-fit px-1 py-1 border rounded-md mx-1"
                            onClick={() => handleDelete(staff.id)}>Delete</button>
                          </td>
                        </tr>
                      })
                    }

                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home