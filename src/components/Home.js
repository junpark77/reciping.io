import React from 'react';
import { Button, Container } from 'react-bootstrap';
import MainSection from './MainSection';
import './Home.css'

const Home = (props) => (
      <Container>
        <MainSection
          userID={props.userID}
          recipeURL={props.recipeURL}
          setRecipeURL={props.setRecipeURL}
          setSavedRecipes={props.setSavedRecipes}
          setShoppingList={props.setShoppingList}
        />
        {props.userID ?
        <div className="bottomNav">
          <h3>
            Saved Recipes
          </h3>
          <p>
            You have {props.savedRecipes.length} saved recipes
          </p>
          <Button onClick={()=>props.setCurrentPage('recipes')}>Saved Recipes</Button>
          <h3 className="homeHeader">
            Shopping List
          </h3>
          <p>
            You have {Object.keys(props.shoppingList).length} items on your shopping list
          </p>
          <Button onClick={()=>props.setCurrentPage('shoppingList')}>My Shopping List</Button>
        </div>
        : null
        }
      </Container>
)

export default Home;