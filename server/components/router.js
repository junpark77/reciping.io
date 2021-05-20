const express = require('express');
const recipeScraper = require("recipe-scraper");

const sampleData = require("./sample");

const router = express.Router();



router.put('/get_recipe', async (req, res) => {
  try {
    let recipe = await recipeScraper(req.body.url);
    res.send(recipe);

  } catch (e) {
    res.sendStatus(500)
    throw e;
  }
});

router.post('/recipes', (req, res) => {
  try{
    sampleData.recipes.unshift(req.body);
    res.status(201).send(sampleData.recipes);
  } catch (e) {
    res.sendStatus(500)
    throw e;
  }
})

router.delete('/recipes', async(req, res) => {
  try {
    sampleData.recipes = sampleData.recipes.filter(recipe =>
      recipe.name !== decodeURIComponent(req.query.name)
    )
    res.send(sampleData.recipes);
  } catch (e) {
    res.sendStatus(500)
    throw e;
  }
})

router.delete('/shoppingList', (req, res) => {
  let { ingredient } = req.query;
  delete sampleData.shoppingList[decodeURIComponent(ingredient)];
  res.send(sampleData.shoppingList);
})

router.patch('/shoppingList', (req, res) => {
  let { ingredient, quantity, unit } = req.body;
  sampleData.shoppingList[ingredient] = { quantity, unit};
  res.send(sampleData.shoppingList);
})

router.post('/shoppingList', (req, res) => {
  let { ingredients } = req.body;

  let existingIng =Object.keys(sampleData)

  const fractionTable = {
    '¼': .25, '½': .5, '¾': .75, '⅓': .333, '⅔': .666, '⅛': .125, '⅜': .375, '⅝': .625, '⅞': .875, }

  const units = ['teaspoon', 'tablespoon', 'cup', 'cups', 'quart', 'quarts', 'gallon', 'gallons', 'lb', 'lbs', 'oz']

  let splitIng = ingredients.map((item) => {
    if(item.includes(',')) {
      item = item.substring(0,item.indexOf(','))
    }
    return item.split(' ')
  });
  splitIng.forEach((item) => {
    let quantity
    if (parseInt(item[0])) {
      quantity = parseInt(item[0]);
    } else if (item[0].length === 1) {
      quantity = fractionTable[item[0]];
    } else {
      quantity = parseInt(item[0][0]) + fractionTable[item[1]];
    }

    let unit = null;
    if (units.includes(item[1])) {
      if (item[1][item[1].length-1] === 's') {
        unit = item[1].substring(0, item[1].length-1);
      } else {
      unit = item[1]
      }
    }


    let startingIndex

    if (unit) {
      startingIndex = 2;
    } else {
      startingIndex = 1;
    }
    let ingredientArr = item.slice(startingIndex)
    let ingredient = ingredientArr.join(' ')
    if(sampleData.shoppingList[ingredient]) {
      if (sampleData.shoppingList[ingredient].unit === unit
        || sampleData.shoppingList[ingredient].unit === unit + 's'
        || sampleData.shoppingList[ingredient].unit + 's' === unit) {
        sampleData.shoppingList[ingredient].quantity = sampleData.shoppingList[ingredient].quantity + quantity;
      }
    } else {
      sampleData.shoppingList[ingredient] = { quantity: quantity, unit: unit };
    }
  })
  console.log(sampleData.shoppingList)
  res.send(sampleData.shoppingList);
})



router.get('/saved_recipes', (req, res) => {
  res.send(sampleData.recipes);

})

router.get('/shopping_list', (req, res) => {
  res.send(sampleData.shoppingList);
})

module.exports = router;