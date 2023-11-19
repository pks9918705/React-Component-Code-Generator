import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get('http://localhost:8000/history', { headers });
        console.log('res',response.data.codeData);
        
        setCodes(response.data.codeData);
      } catch (error) {
        console.error('Error fetching codes:', error);
      }
    };

    fetchCodes();
  }, []);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className='history'>
      <h1>History</h1>
      <p className='homeBtn' onClick={handleHome}>
        Home
      </p>
      {
        codes?( <ul className='ul-list'>
          {codes.map((code) => (
            <li className='list' key={code._id} >
              <>
              
              <Link to={`/code/${code._id}`}>
              <p>{code.generatedCode.substr(0,30)}</p>
                <p>{code.createdAt}</p>
              </Link>
               
          
              </>
            </li>
          ))}
        </ul>):(
          <h3>Loading...</h3>
        )
      }
     
    </div>
  );
};

export default History;


 