import { recipes } from '../../data/recipesData';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all recipes
      res.status(200).json(recipes);
      break;

    case 'POST':
      // Create a new recipe
      const newRecipe = req.body;
      recipes.push(newRecipe);
      res.status(201).json(recipes);
      break;

    case 'PUT':
      // Update an existing recipe
      const { name, updatedRecipe } = req.body;
      const recipeIndex = recipes.findIndex(recipe => recipe.name === name);
      if (recipeIndex !== -1) {
        recipes[recipeIndex] = updatedRecipe;
        res.status(200).json(updatedRecipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
      break;

    case 'DELETE':
      // Delete an existing recipe
      const { name: recipeName } = req.body;
      const newRecipes = recipes.filter(recipe => recipe.name !== recipeName);
      if (newRecipes.length === recipes.length) {
        res.status(404).json({ message: "Recipe not found" });
      } else {
        recipes.length = 0;  // Clear the array
        recipes.push(...newRecipes);  // Push the new recipes back
        res.status(200).json({ message: "Recipe deleted" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
