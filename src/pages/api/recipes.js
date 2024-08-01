import { recipes } from '../../data/recipesData';

export default function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      handleGetRequest(res, id);
      break;
    case 'POST':
      handlePostRequest(res, body);
      break;
    case 'PUT':
      handlePutRequest(res, body);
      break;
    case 'DELETE':
      handleDeleteRequest(res, id);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const handleGetRequest = (res, id) => {
  if (id) {
    const recipe = recipes.find(recipe => recipe.id === parseInt(id));
    recipe ? res.status(200).json(recipe) : res.status(404).json({ message: "Recipe not found" });
  } else {
    res.status(200).json(recipes);
  }
};

const handlePostRequest = (res, newRecipe) => {
  const newId = recipes.length ? recipes[recipes.length - 1].id + 1 : 1;
  newRecipe.id = newId;
  recipes.push(newRecipe);
  console.log('New recipe created:', newRecipe);
  res.status(201).json(newRecipe);
};

const handlePutRequest = (res, updatedRecipe) => {
  const recipeIndex = recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
  if (recipeIndex !== -1) {
    recipes[recipeIndex] = updatedRecipe;
    res.status(200).json(updatedRecipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
};

const handleDeleteRequest = (res, id) => {
  const initialLength = recipes.length;
  const updatedRecipes = recipes.filter(recipe => recipe.id !== parseInt(id));
  if (updatedRecipes.length === initialLength) {
    res.status(404).json({ message: "Recipe not found" });
  } else {
    recipes.length = 0;
    recipes.push(...updatedRecipes);
    res.status(200).json({ message: "Recipe deleted" });
  }
};
