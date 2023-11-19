// for params se data
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./CodeOutput.css"

import { useNavigate, } from 'react-router-dom';


const CodeOutput2 = (props) => {
    const [copy, setCopy] = useState(false);
    const [data, setData] = useState("")




    const navigate = useNavigate();

    useEffect(() => {

        setData(props.data);

    }, [])




    const handleCopy = async () => {
        try { // Copy to clipboard
            navigator.clipboard.writeText(data);
            setCopy(true);
        } catch (error) {
            console.error('Error saving code:', error);
        }
    };
    const handleClose = () => {
        props.setCode("")
        navigate('/');


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

export default CodeOutput2;
