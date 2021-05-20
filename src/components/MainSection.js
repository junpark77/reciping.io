import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Jumbotron, InputGroup, FormControl } from 'react-bootstrap';
import RecipeViewer from './RecipeViewer'
import './MainSection.css'

const MainSection = (props) => {
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [linkToOrigin, setLinkToOrigin] = useState('');
  const [recipe, setRecipe] = useState({});
  const [errored, setErrored] = useState(false);

  const handleURLSubmit = (url) => {
      axios.put('/get_recipe',
      {
        url: url
      }
    )
      .then((response) => {
        setRecipe(response.data);
        setLinkToOrigin(url);
        props.setRecipeURL('');
        setRecipeLoaded(true);
      })
      .catch((e)=>{
        setErrored(true);
      })
  }

  return(
  <Jumbotron id="recipeBox">
    {recipeLoaded
    ? <RecipeViewer
        recipe={recipe}
        linkToOrigin={linkToOrigin}
        handleURLSubmit={handleURLSubmit}
        recipeURL={props.recipeURL}
        setRecipeURL={props.setRecipeURL}
        setSavedRecipes={props.setSavedRecipes}
        setShoppingList={props.setShoppingList}
        errored={errored}
        userID={props.userID}
      />
    :
    <div id="urlInput">
    <h1>
      Welcome to Reciping.io!
    </h1>
    <p>
      Please enter the link to your desired recipe
    </p>
    <InputGroup className="mb-3" size="lg">
      <FormControl
        placeholder="URL to recipe page"
        aria-label="URL input"
        aria-describedby="basic-addon1"
        onChange={e => props.setRecipeURL(e.target.value)}
        value={props.recipeURL}
      />
      <InputGroup.Append>
        <Button onClick={() => {handleURLSubmit(props.recipeURL)}} variant="outline-secondary">Show me the recipe</Button>
      </InputGroup.Append>
    </InputGroup>
    {errored ? <Alert variant="danger">Oops! Something went wrong... Try again with a different URL</Alert> : null}
    </div>
    }
  </Jumbotron>

  )
}
export default MainSection;
