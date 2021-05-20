import React, { useState } from 'react';
import axios from 'axios';
import { Card, Carousel, Container, Alert, Button, Jumbotron, InputGroup, FormControl } from 'react-bootstrap';
import RecipeViewer from './RecipeViewer'
import './SavedRecipes.css'

const SavedRecipes = (props) => {
  const[deleteError, setDeleteError] = useState(false);

  const handleButtonClick = (url) => {
    props.setRecipeURL(url);
    props.setCurrentPage('home');
  }

  const deleteRecipe = (recipeName) => {
    axios.delete(`/recipes?name=${encodeURIComponent(recipeName)}`)
      .then((result) => {
        props.setSavedRecipes(result.data)
      })
      .catch((error) => {
        setDeleteError(true);
        setTimeout(()=>setDeleteError(false), 2000);
      })
  }

  return (
    <Container>
      <Jumbotron>
      {deleteError
          ? <Alert variant='danger'>Oops, something went wrong!</Alert>
          : null
      }
        <h3>Your Recipes</h3>
        <Container className="cardContainer">
        {props.savedRecipes.map((item) => (
        <Card className="recipeCard" style={{ width: '18rem' }}>
          <svg onClick={()=>deleteRecipe(item.name)} className="deleteRecipe"width="20pt" height="20pt" viewBox="0 0 24 24" version="1.1">
            <g id="surface1">
              <path d="M 12 1.546875 C 6.203125 1.546875 1.5 6.25 1.5 12.046875 C 1.5 17.84375 6.203125 22.546875 12 22.546875 C 17.796875 22.546875 22.5 17.84375 22.5 12.046875 C 22.5 6.25 17.796875 1.546875 12 1.546875 Z M 17.078125 15.585938 C 17.148438 15.65625 17.183594 15.75 17.183594 15.847656 C 17.183594 15.945312 17.148438 16.046875 17.078125 16.109375 L 16.0625 17.128906 C 15.988281 17.203125 15.894531 17.234375 15.800781 17.234375 C 15.707031 17.234375 15.609375 17.199219 15.539062 17.128906 L 12 13.585938 L 8.464844 17.132812 C 8.394531 17.207031 8.296875 17.242188 8.203125 17.242188 C 8.109375 17.242188 8.011719 17.203125 7.941406 17.132812 L 6.929688 16.117188 C 6.859375 16.046875 6.820312 15.953125 6.820312 15.851562 C 6.820312 15.753906 6.859375 15.65625 6.929688 15.589844 L 10.476562 12.027344 L 6.917969 8.511719 C 6.773438 8.367188 6.773438 8.128906 6.917969 7.984375 L 7.929688 6.964844 C 8 6.894531 8.09375 6.859375 8.195312 6.859375 C 8.292969 6.859375 8.386719 6.894531 8.457031 6.964844 L 12.003906 10.46875 L 15.554688 6.964844 C 15.625 6.894531 15.71875 6.859375 15.816406 6.859375 C 15.914062 6.859375 16.007812 6.894531 16.078125 6.964844 L 17.089844 7.984375 C 17.234375 8.128906 17.234375 8.367188 17.089844 8.511719 L 13.53125 12.027344 Z M 17.078125 15.585938 " />
            </g>
          </svg>
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Button type="button" onClick={() => {handleButtonClick(item.url)}}>Load Recipe</Button>
          </Card.Body>
        </Card>
        ))}
        </Container>
      </Jumbotron>
    </Container>
  )
}

export default SavedRecipes;