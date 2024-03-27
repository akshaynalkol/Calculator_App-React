import React, { useEffect, useRef } from "react";
import './Header.css';

export default function Header({ expression, result, history }) {
    const resultRef = useRef();
    const expressionRef = useRef();

    useEffect(() => {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    useEffect(() => {
        expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
    }, [expression]);

    return (
        <div className="header rounded-top-4 custom_scroll">
            <div className="header_history">
                {
                    history &&
                    history.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))
                }
            </div>
            <div className="header_expression custom_scroll" ref={expressionRef}>
                <p>{expression}</p>
            </div>
            <p ref={resultRef} className="header-result">{result}</p>
        </div>
    )
}