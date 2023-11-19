// for params se data
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./CodeOutput.css"
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


const CodeOutput = (props) => {
  const [copy, setCopy] = useState(false);
  const [data, setData] = useState("")


  const { id } = useParams();
  console.log('id:', id);

  const navigate = useNavigate();

  useEffect(() => {
    // if the data is comes via the params then we have to use this to fetch data from the server

    if (id) {
      const fetchCode = async () => {
        try {
          // Fetch the authorization token from wherever you store it (localStorage, cookies, etc.)
          const authToken = localStorage.getItem('token'); // Adjust this based on your authentication setup

          const response = await axios.get(`http://localhost:8000/code/${id}`, {
            headers: {

              Authorization: `Bearer ${authToken}`, // Add the authorization token to the header
            },
          });


          const codeDetails = response.data;
          // console.log(codeDetails.code );
          setData(codeDetails.code.generatedCode)

        } catch (error) {
          console.error('Error fetching code details:', error);
        }
      };

      fetchCode();
    }


  }, [id]);




  const handleCopy = async () => {
    try { // Copy to clipboard
      navigator.clipboard.writeText(data);
      setCopy(true);
    } catch (error) {
      console.error('Error saving code:', error);
    }
  };
  const handleClose = () => {
    navigate(-1);

  }



  return (
    <div>
      {data ? (
        <div className='OuterBox'>
          <div className='box'>
            <div className='topBox'>
              <div className='close' onClick={handleClose}>(X) Close</div>
              {!copy ? (
                <div className='copy' >
                  <ion-icon name="clipboard-outline"></ion-icon>
                  <p style={{ marginRight: '3px' }} onClick={handleCopy}>
                    Copy
                  </p>

                </div>
              ) : (
                <span>
                  Copied!
                </span>
              )}
            </div>
            <SyntaxHighlighter language="javascript" style={dark}>
              {data}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white" }}>
          <h1 >Loading....</h1>
        </div>

      )}
    </div>
  );

};

export default CodeOutput;
