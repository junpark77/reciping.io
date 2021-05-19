const express = require('express');
const recipeScraper = require("recipe-scraper");

const sampleData = require("./sample");

const router = express.Router();



router.put('/get_recipe', async (req, res) => {
  try {
    console.log(req.body);
    let recipe = await recipeScraper(req.body.url);
    res.send(recipe);

  }catch (e) {
    res.sendStatus(500)
    throw e;
  }
});



router.get('/saved_recipes', (req, res) => {
  res.send(sampleData.recipes);

})

router.get('/shopping_list', (req, res) => {
  res.send(sampleData.shoppingList);
})

module.exports = router;