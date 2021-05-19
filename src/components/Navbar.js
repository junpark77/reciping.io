import React, { useState } from 'react';
import { Form, FormControl, Button, Navbar, Nav } from 'react-bootstrap';

const Header = (props) => {
  //TODO: Implement real authentication
  const[input, setInput] = useState('')

  const handleSubmit = () => {
    props.setUserID(input);
  }

  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        Reciping.io
      </Navbar.Brand>
      <Nav>
        <Nav.Link onClick={()=>props.setCurrentPage('home')}>Home</Nav.Link>
        {props.userID ?
        <>
          <Nav.Link onClick={()=>props.setCurrentPage('recipes')}>Saved Recipes</Nav.Link>
          <Nav.Link onClick={()=> props.setCurrentPage('shoppingList')}>Shopping List</Nav.Link>
        </>
        : null
        }
      </Nav>
      <Nav className="navbar-nav ml-auto">
        {props.userID
        ? <Nav.Link>Hello {props.userID}</Nav.Link>
        : <Form onSubmit={handleSubmit} inline>
            <FormControl value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="username" className=" mr-sm-2" size="sm"/>
            <FormControl type="password" placeholder="password" className=" mr-sm-2" size="sm"/>
            <Button type="submit" size="sm">login</Button>
          </Form>
        }
      </Nav>
    </Navbar>
  )
}

export default Header;

