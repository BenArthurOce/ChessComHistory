import React from "react";
import { useState } from 'react';


const Form = (props) => {

    console.log("===Form RENDERED===")

    //
    // Props
    //
    const { onFormSubmit} = props;

    //
    // Handlers
    //
    // When form is submitted
    const handleSubmit = (event) => {

        event.preventDefault();
    
        const newFormData = new FormData(event.target);
    
        const formData = {
            'website': newFormData.get('website'),
            'username': newFormData.get('username'),
            'numgames': newFormData.get('numgames')
        };
    
        onFormSubmit(formData);        
    };


    return (
        <form onSubmit={handleSubmit}>

            <select name="website" type="text">
                <option value="chesscom">Chess.com</option>
                <option value="lichess">Lichess</option>
            </select>

            <label>Username:</label>
            <input type="text" name="username" defaultValue="BenArthurOCE"/>

            <label># of Games:</label>
            <input type="number" name="numgames" defaultValue="7"/>

            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
