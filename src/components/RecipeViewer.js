import React, { useState } from 'react';
import axios from 'axios';
import './RecipeViewer.css'
import { Alert, ListGroup, Row, Image, Col, Button, Container, InputGroup, FormControl } from 'react-bootstrap';

const RecipeViewer = (props) => {
  const { name, ingredients, instructions, time, servings, image  } = props.recipe;
  const [ recipeAdded, setRecipeAdded ] = useState(0);
  const [ ingredientsAdded, setIngredientsAdded ] = useState(0);

  const addRecipe = () => {
    axios.post('/recipes', {name, url: props.linkToOrigin, image})
      .then((result) => {
        props.setSavedRecipes(result.data)
        setRecipeAdded(1);
        setTimeout(()=>{setRecipeAdded(0)}, 2000);
      })
      .catch((error) => {
        setRecipeAdded(-1);
        setTimeout(()=>{setRecipeAdded(0)}, 2000);
      })
  }

  const addIngredients = () => {
    axios.post('/shoppingList', {ingredients: ingredients})
      .then((result) => {
        props.setShoppingList(result.data)
        setIngredientsAdded(1);
        setTimeout(()=>{setIngredientsAdded(0)}, 2000);
      })
      .catch((error) => {
        setIngredientsAdded(-1);
        setTimeout(()=>{setIngredientsAdded(0)}, 2000);
      })
  }

  return(
    <Container>
      <div className="col-md-12 text-right">
      <Button className="btn pull-right" variant="secondary" size="sm" onClick={() => window.open(props.linkToOrigin)}>Original Site</Button>
      </div>
      <Row>
        <Col>
          <Image src={image} rounded fluid/>
        </Col>
        <Col>
        <Row>
          <h3>{name}</h3>
        </Row>
        {servings ? <Row> Servings: {servings} </Row> : null}
        {time.total ? <Row> Total Time: {time.total} </Row> : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Ingredients</h4>
          <ListGroup>
            {ingredients.map((item) => (
              <ListGroup.Item key={item}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
          {props.userID ?
            <>
            <Button className="addButton" onClick={addIngredients}>Add Ingredients</Button>
            <br/>
            <Button className="addButton" onClick={addRecipe}>Save Recipe</Button>
            {ingredientsAdded === -1
              ? <Alert variant='danger'>Oops, something went wrong!</Alert>
              : ingredientsAdded === 1 ? <Alert variant='success'>Added to your shopping list!</Alert> : null
            }
            {recipeAdded === -1
              ? <Alert variant='danger'>Oops, something went wrong!</Alert>
              : recipeAdded === 1 ? <Alert variant='success'>Recipe Added!</Alert> : null
            }
            </>
            : null
          }

          </Col>
        <Col>
          <h4>Directions</h4>
          <ListGroup>
            {instructions.map((item, index) => (
              <ListGroup.Item key={item}>{index+1+ '. ' + item}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row id="urlInput">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Want to search for a new recipe?"
          aria-label="URL input"
          aria-describedby="basic-addon1"
          onChange={e => props.setRecipeURL(e.target.value)}
          value={props.recipeURL}
        />
        <InputGroup.Append>
          <Button onClick={() => props.handleURLSubmit(props.recipeURL)} variant="outline-secondary">Show me another recipe</Button>
        </InputGroup.Append>
    </InputGroup>
        {props.errored ? <Alert variant="danger">Oops! Something went wrong... Try again with a different URL</Alert> : null}
      </Row>
    </Container>
  )


}
export default RecipeViewer;