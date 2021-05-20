import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Dropdown, DropdownButton, Alert, Button, Modal, Container, ListGroup, Jumbotron, InputGroup, FormControl } from 'react-bootstrap';
import './ShoppingList.css';

function ShoppingList(props) {
  const [showModal, setShowModal] = useState(false);
  const [currentIngredient, setCurrentIngeredient] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('')

  const openModal = (ingredient, quantity, unit) => {
    setShowModal(true);
    setCurrentIngeredient(ingredient);
    setQuantity(quantity);
    setUnit(unit);
  };

  const deleteIngredient = (ingredient) => {
    axios.delete(`/shoppingList?ingredient=${encodeURIComponent(ingredient)}`)
      .then((result)=>{props.setShoppingList(result.data)})
      .catch((e) => {
        setDeleteError(true)
        setTimeout(()=>setDeleteError(false), 2000);
      })
  };

  const updateIngredient = () => {
    axios.patch('/shoppingList',
    {ingredient: currentIngredient, quantity, unit})
    .then((result) => {
      props.setShoppingList(result.data)
      setShowModal(false);
    })
    .catch((e) => {
      setUpdateError(true)
      setTimeout(()=>setUpdateError(false), 2000)
    })
  }
  return (
    <>
      <Container>
        <Jumbotron>
          <h3>Shopping List</h3>
        {deleteError
          ? <Alert variant='danger'>Oops, something went wrong!</Alert>
          : null
        }
        <Row>
        <Col>
        <ListGroup>
          {Object.entries(props.shoppingList).map(item => (
            <ListGroup.Item>
              <span className="listItem" onClick={() => {openModal(item[0], item[1].quantity, item[1].unit)}}>
              {(item[1].quantity ?
              item[1].quantity + ' '
              : ''
              ) +
              (item[1].unit ?
                item[1].unit + ' '
                : ''
              ) + item[0]}
              </span>
              <Button
                variant="secondary"
                size="sm"
                className="deleteButton"
                onClick={()=>{deleteIngredient(item[0])}}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        </Col>
        </Row>
        </Jumbotron>
      </Container>

      <Modal show={showModal} onHide={() => {setShowModal(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Shopping List</Modal.Title>
      </Modal.Header>
        {updateError
          ? <Alert variant='danger'>Oops, something went wrong!</Alert>
          : null
        }
      <Modal.Body>
        <div>Ingredient: {currentIngredient}</div>
        <div>Quantity:
          <InputGroup>
            <FormControl
              onChange={e=>setQuantity(e.target.value)}
              placeholder={quantity}
              aria-label="quantity"
              aria-describedby="basic-addon2"
            />

            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={unit}
              value={unit}
              id="input-group-dropdown-2"
                 //setUnit(e.target.value)

            >
              <Dropdown.Item
                onClick={e=>setUnit('tsp')}
                value="gallon">teaspoon</Dropdown.Item>
              <Dropdown.Item
                onClick={e=>setUnit('tbsp')}
                value="gallon">tablespoon</Dropdown.Item>
              <Dropdown.Item
                onClick={e=>setUnit('cup')}
                value="cup">
                  cup
                </Dropdown.Item>
              <Dropdown.Item
                onClick={e=>setUnit('quart')}
                value="quart">quart</Dropdown.Item>
              <Dropdown.Item
                onClick={e=>setUnit('gallon')}
                value="gallon">gallon</Dropdown.Item>
              <Dropdown.Item
                onClick={e=>setUnit('oz')}
                value="gallon">oz</Dropdown.Item>
              <Dropdown.Item
                onClick={e=>setUnit('lb')}
                value="gallon">lb</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={e=>setUnit(null)}
                value="null">no units</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {setShowModal(false)}}>
          Close
        </Button>
        <Button variant="primary" onClick={updateIngredient}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )

}

export default ShoppingList;
