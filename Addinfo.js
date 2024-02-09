import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


const Addinfo = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [moreDetails, setMoredetails] = useState("");
   
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/addinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          age,
          mobile,
          address,
          workplace,
          moreDetails,
        }),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        navigate('/');
      } else {
        console.error(
          'Failed to save data. Server responded with:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  
   
  return ( <div>
    <div className='form'>
    <h2>Add Employe Information</h2>  
  <form onSubmit={handleOnSubmit}>
        <table>
          <tbody>
          <tr>
              <td>Email:</td>
              <td>
                <input
                  type='email'
                  name='email'
                  value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type='text'
                  name='name'
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>
                <input
                  type='number'
                  name='age'
                  value={age} onChange={(e) => setAge(e.target.value)} required/>
              </td>
            </tr>
            <tr>
              <td>Mobile Number:</td>
              <td>
                <input
                  type='text'
                  name='mobile'
                  value={mobile} onChange={(e) => setMobile(e.target.value)} required/>
              </td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>
                <input
                  type='text'
                  name='address'
                  value={address} onChange={(e) => setAddress(e.target.value)} required/>
              </td>
            </tr>
            <tr>
              <td>Workplace:</td>
              <td>
                <input
                  type='text'
                  name='workplace'
                  value={workplace} onChange={(e) => setWorkplace(e.target.value)} required />
              </td>
            </tr>
            <tr>
              <td>More Details:</td>
              <td>
                <textarea
                  name='moreDetails'
                  value={moreDetails} onChange={(e) => setMoredetails(e.target.value)} required />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
  </form>
    </div>
  </div>

);
};

export default Addinfo;