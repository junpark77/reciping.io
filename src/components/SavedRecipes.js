import React, { useState } from 'react';
import axios from 'axios';
import { Carousel, Container, Alert, Button, Jumbotron, InputGroup, FormControl } from 'react-bootstrap';
import RecipeViewer from './RecipeViewer'
import './SavedRecipes.css'

const SavedRecipes = (props) => {

  const handleButtonClick = (url) => {
    props.setRecipeURL(url);
    props.setCurrentPage('home');
  }

  return (
    <Container>
      <Jumbotron>
        <h3>Your Recipes</h3>
        <Carousel>
        {props.savedRecipes.map((item) => (
        <Carousel.Item className="recipeImage">
          <img
            className="d-block w-100"
            src={item.image}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{item.name}</h3>
            <Button type="button" onClick={() => {handleButtonClick(item.url)}}>Load Recipe</Button>
          </Carousel.Caption>
        </Carousel.Item>
        ))}
        </Carousel>

      </Jumbotron>
    </Container>
  )
}

export default SavedRecipes;