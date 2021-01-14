const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('Database cleared.');
    return Recipe.create({
      title: 'Hardboiled Web',
      level: 'UltraPro Chef',
      ingredients: ['CSS', 'HTML'],
      cuisine: 'Internetish',
      creator: 'Andy Clarke'
    });
  })
  .then((recipe) => {
    console.log('Just added:', recipe.title);
    const someRecipes = require('./data.json');
    return Recipe.create(someRecipes);
  })
  .then((recipes) => {
    console.log(`Just added ${recipes.length} recipes:`);
    for (const recipe of recipes) {
      console.log(recipe.title);
    }

    console.log('Closing connection');
    return mongoose.disconnect();
  })
  .then(() => console.log('Connection terminated.'))
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
