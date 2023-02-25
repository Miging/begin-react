import React, { useState } from "react";

function InputSample(props) {
    const [text,setText]=useState('');

    const onChange=(e)=>{
        setText(e.target.value);
    };
    const onReset=(e)=>{
        setText('');
    };
    return(
        <div>
            <input/>
            <button onChange={onChange} value={text}>초기화</button>
            <div>
                <b>값: </b>
            </div>
        </div>
    )
}

export default InputSample;