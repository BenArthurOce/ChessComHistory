import { useState } from 'react';
import styled from 'styled-components';

// Styled form component
const Form = styled.form`
  margin-bottom: 20px;
`;

// Styled input component
const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Styled button component
const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function SearchForm(props) {
  const [searchText, setSearchText] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    props.onFormSubmit(searchText);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={searchText}
        onChange={(ev) => setSearchText(ev.target.value)}
        placeholder="Enter your search query..."
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}

export default SearchForm;
