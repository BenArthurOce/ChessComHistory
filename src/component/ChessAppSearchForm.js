import { useState } from "react";
import styled from "styled-components";

//
// Styles
//
const Form = styled.form
`
    margin-bottom: 20px;
`
;

const InputContainer = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 900;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
;

const InputRow = styled.div
`

`
;

const Label = styled.label
`
    font-weight: bold;
    margin-right: 10px;
`
;


const Input = styled.input
`
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50%;
`
;


const Button = styled.button
`
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 50%;
`
;

function ChessAppSearchForm(props) {

    //
    // Props
    //
    // const {onFormSubmit, triggerFormSubmitted} = props

    //
    // States
    //
    const [username, setUsername] = useState('');
    const [lastNGames, setLastNGames] = useState('');

    // const [username, setUsername] = useState("BenArthurOCE");
    // const [lastNGames, setLastNGames] = useState(100);

    //
    // Handlers
    //
    function handleSubmit(ev) {
        ev.preventDefault();
        props.onFormSubmit(username);

        props.onFormSubmit({
            username: username,
            lastNGames: lastNGames,
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputContainer>
                <InputRow>
                    <Label htmlFor="usernameInput">Username:</Label>
                    <Input id="usernameInput" value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="Player name..." />
                </InputRow>

                <InputRow>
                    <Label htmlFor="lastngamesInput"># of Games:</Label>
                    <Input id="usernameInput" value={lastNGames} onChange={(ev) => setLastNGames(ev.target.value)} placeholder="No# of Games" />
                </InputRow>

                <Button type="submit">Search</Button>
            </InputContainer>
        </Form>
    );
}

export default ChessAppSearchForm;
