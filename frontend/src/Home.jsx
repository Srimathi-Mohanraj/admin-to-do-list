import React from 'react'
import { useEffect } from 'react'
import { API } from './api';
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {

  const [data, setdata] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/staff`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setdata(response.data);
        } else {
          console.error('API returned non-array:', response.data);
          console.log('Fetched staff data:', response.data);

        }
      })
      .catch(error => {
        console.error('API call error:', error);
      });

  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      axios.delete(`${API}/api/staff/${id}`)

        .then(() => {
          alert('Staff deleted successfully');
          setdata(prevData => prevData.filter(staff => (staff._id ?? staff.id) !== id));

        })
        .catch((err) => {
          console.error("Delete failed:", err.response ? err.response.data : err.message);
          alert("Delete failed. Check console for details.");
        });
    }
  };


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
                        const id = staff._id ?? staff.id
                        return <tr key={id} className='border-b-2 border-gray-100'>
                          <td className='px-4 py-2'>{index + 1}</td>  
                          <td className='px-4 py-2'>{staff.name}</td>
                          <td className='px-4 py-2'>{staff.email}</td>
                          <td className='px-4 py-2'>{staff.contact}</td>
                          <td>
                            <Link to={`/read/${id}`} className="bg-[#00B9F2] text-white w-fit px-1 py-1 border rounded-md mx-1">Read </Link>
                            <Link to={`/update/${id}`} className="bg-blue-600 text-white w-fit px-1 py-1 border rounded-md mx-1">Edit</Link>
                            <button className="bg-red-600 text-white w-fit px-1 py-1 border rounded-md mx-1"
                              onClick={() => handleDelete(id)}>Delete</button>
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