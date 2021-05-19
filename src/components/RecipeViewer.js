import React from 'react';
import './RecipeViewer.css'
import { ListGroup, Row, Image, Col, Button, Container, InputGroup, FormControl } from 'react-bootstrap';

const RecipeViewer = (props) => {

  const { name, ingredients, instructions, time, servings, image  } = props.recipe;
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
            <Button className="addButton">Add Ingredients</Button>
            <br/>
            <Button className="addButton">Save Recipe</Button>
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
      </Row>
    </Container>
  )


}
export default RecipeViewer;