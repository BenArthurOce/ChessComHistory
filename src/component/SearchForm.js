import { useState } from 'react';
import styled from 'styled-components';

// Styled form component
const Form = styled.form
`
  margin-bottom: 20px;
`
;

// Styled input component
const Input = styled.input
`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`
;
  
// Styled button component
const Button = styled.button
`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`
;

function SearchForm(props) {
    // const [username, setUsername] = useState('');
    const [username, setUsername] = useState('');
    // const [lastNGames, setLastNGames] = useState('');
    const [lastNGames, setLastNGames] = useState(null);

    function handleSubmit(ev) {
        ev.preventDefault();
        props.onFormSubmit(username);

        props.onFormSubmit({
            username: username
          , lastNGames: lastNGames
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        placeholder="Player name..."
      />
      <Input
        type="text"
        value={lastNGames}
        onChange={(ev) => setLastNGames(ev.target.value)}
        placeholder="No# of Games"
      />
      <Button type="submit">Search</Button>
    </Form>
    );
}

export default SearchForm;