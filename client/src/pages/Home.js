import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import axios from 'axios'; // Import axios
import './Home.css';
import Navbar from '../components/Navbar';


import CodeOutput2 from './CodeOutput2';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [jsonSchema, setJsonSchema] = useState('');
    const [error, setError] = useState("")
    const [code,setCode]=useState("")

    const navigate=useNavigate()

    useEffect(()=>{
     if(!localStorage.getItem('token')){
        navigate('/login')
     }
    },[])

    const handleGenerateCode = async () => {
        try {
            // Send a request to your server to generate code
            const token = localStorage.getItem('token');
            console.log('token', token);

            const headers = {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            };

            // Include jsonSchema in the request payload
            const response = await axios.post('http://localhost:8000/gen', { jsonSchema }, { headers });

            // Handle the response (assuming the server responds with the generated code)

            console.log('res', response.data.code._id);

            const generatedCode = response.data.code.generatedCode;

             
            setCode(generatedCode)
        } catch (error) {
            // Handle errors (e.g., display an error message)
            console.error('Error generating code:', error.message);
            setError(error.message)
        }
    };

    return (
        <>
        {!code? (<> <Navbar />
            <div className="OuterBox">
                <div className="Typewriter  ">
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                        }}
                        onInit={(typewriter) => {
                            typewriter.typeString('React Component Code Generator').pauseFor(1000).deleteAll().typeString('Welcomes You').start();
                        }}
                        className="Typewriter"
                    />
                </div>

                <div className="inputBoxForJSON  ">
                    <label htmlFor="jsonSchema" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                        JSON Schema:
                    </label>
                    <textarea id="jsonSchema" placeholder="Enter JSON Schema" value={jsonSchema} onChange={(event) => setJsonSchema(event.target.value)} />

                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button className="btn" onClick={handleGenerateCode}>
                    Generate Component Code
                </button>

            </div></>):(
               
               <CodeOutput2 data={code} setCode={setCode}/>
            )}
            
        </>
    );
};

export default Home;
