const sqlite3 = require('sqlite3').verbose();

//TODO MAKE DATABASE WORK

let db = new sqlite3.Database('./reciping.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});
let controller = {}

controller.getRecipes = (username, callback) => {
  db.get('SELECT recipes FROM users WHERE username=?', [username], (err, result) => {
    console.log(err, result)
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

controller.getShoppingList = (username, callback) => {
  db.get('SELECT shopping_list FROM users WHERE username=?', [username], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

controller.AddRecipe = (username, str, callback) => {
  db.get('UPDATE users SET recipes = ? where username=?', [str, username], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

controller.AddShoppingList = (username, str, callback) => {
  db.get('UPDATE users SET shopping_list = ? where username=?', [str, username], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = controller;
