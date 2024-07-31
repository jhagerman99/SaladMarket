import { recipes } from '../../data/recipesData';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        const recipe = recipes.find(recipe => recipe.id === parseInt(req.query.id));
        if (recipe) {
          res.status(200).json(recipe);
        } else {
          res.status(404).json({ message: "Recipe not found" });
        }
      } else {
        res.status(200).json(recipes);
      }
      break;

    case 'POST':
      const newRecipe = req.body;
      const newId = recipes.length ? recipes[recipes.length - 1].id + 1 : 1;
      newRecipe.id = newId;
      recipes.push(newRecipe);
      console.log('New recipe created:', newRecipe);  // Logging
      res.status(201).json(newRecipe);
      break;

    case 'PUT':
      const { id, updatedRecipe } = req.body;
      const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
      if (recipeIndex !== -1) {
        recipes[recipeIndex] = updatedRecipe;
        res.status(200).json(updatedRecipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
      break;

    case 'DELETE':
      const { id: deleteId } = req.body;
      const newRecipes = recipes.filter(recipe => recipe.id !== deleteId);
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
