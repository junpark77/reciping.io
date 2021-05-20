import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Navbar';
import Home from './components/Home';
import SavedRecipes from './components/SavedRecipes';
import ShoppingList from './components/ShoppingList';

function App() {
  const [userID, setUserID] = useState('')
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const[recipeURL, setRecipeURL] = useState('')


  useEffect(() => {
    if(userID) {
      console.log(userID)
      const option = { headers: {userID} }
        axios.get('/saved_recipes', option)
          .then((response) => {setSavedRecipes(response.data)})
          .catch((error) => {throw error})
        axios.get('/shopping_list', option)
          .then((response) => {setShoppingList(response.data)})
          .catch((error) => {throw error})
    }
  }, [userID])

  return (
    <>
    <div className="App">
      <Header userID={userID} setUserID={setUserID} setCurrentPage={setCurrentPage} />
      <div className="wrapper">
      {currentPage === 'home' ?
      <Home
        shoppingList={shoppingList}
        savedRecipes={savedRecipes}
        userID={userID}
        setCurrentPage={setCurrentPage}
        recipeURL={recipeURL}
        setRecipeURL={setRecipeURL}
        setSavedRecipes={setSavedRecipes}
        setShoppingList={setShoppingList}
        />
      : null
      }
      {currentPage === 'recipes' ?
      <SavedRecipes
        savedRecipes={savedRecipes}
        setSavedRecipes={setSavedRecipes}
        setCurrentPage={setCurrentPage}
        setRecipeURL={setRecipeURL}/>
      : null
      }
      {currentPage === 'shoppingList' ?
      <ShoppingList
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
      />
      : null
      }
      </div>
    </div>
      <hr />
      <footer className="footer">
        <p>	&copy;2021 Jun Park</p>
        <p><a href="https://www.linkedin.com/in/junhpark/">Please give me a job</a></p>
      </footer>
      </>
  );
}

export default App;