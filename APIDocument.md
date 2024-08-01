API Documentation
This API allows you to manage recipes and ingredients by providing endpoints to create, read, update, and delete recipes.

1. Get All ingredients
Base URL: '/api/ingredients'
Endpoint: `GET /api/ingredients`
Description: Retrieves a list of all ingredients.
Response: 200 OK: Returns an array of ingredients.
Exmaple:
[
  {
    "id": 1,
    "ingredient": "green leaf lettuce",
    "category": "vegetable",
    "image": "/images/greenLeafLettuce.png",
    "calories": 8
  },
  {
    "id": 2,
    "ingredient": "Bok choy",
    "category": "vegetable",
    "image": "/images/BokChoy.jpg",
    "calories": 7
  },
]

2. Get All Recipes
Base URL: '/api/recipes'
Endpoint: `GET /api/recipes`
Description: Retrieves a list of all recipes.
Response: 200 OK: Returns an array of recipes.
Example:
[
  {
    "id": 1,
    "name": "Healthy Salad",
    "ingredients": [
      { "ingredient": "green leaf lettuce", "quantity": 1, "calories": 8 },
      { "ingredient": "carrots", "quantity": 3, "calories": 12 },
      { "ingredient": "avocado", "quantity": 1, "calories": 120 }
    ]
  },
  {
    "id": 2,
    "name": "Fruit Smoothie",
    "ingredients": [
      { "ingredient": "mix berries", "quantity": 1, "calories": 28 },
      { "ingredient": "corn", "quantity": 2, "calories": 43 },
      { "ingredient": "pineapple", "quantity": 3, "calories": 25 }
    ]
  }
]

3. Get Recipe by ID
Endpoint: `GET /api/recipes?id={id}`
Description: Retrieves a recipe by its ID.
Parameters: id (required): The ID of the recipe.
Response:
200 OK: Returns the recipe object.
404 Not Found: If the recipe is not found.
Example:
{
  "id": 1,
  "name": "Healthy Salad",
  "ingredients": [
    { "ingredient": "green leaf lettuce", "quantity": 1, "calories": 8 },
    { "ingredient": "carrots", "quantity": 3, "calories": 12 },
    { "ingredient": "avocado", "quantity": 1, "calories": 120 }
  ]
}

4. Create a New Recipe
Endpoint: `POST /api/recipes`
Description: Creates a new recipe.
Request Body:
{
  "name": "New Salad",
  "ingredients": [
    { "ingredient": "Tomato", "quantity": 2, "calories": 10 }
  ]
}
Response:
201 Created: Returns the created recipe with its ID.
Example:
{
  "name": "New Salad",
  "ingredients": [
    {
      "ingredient": "Tomato",
      "quantity": 2,
      "calories": 10
    }
  ],
  "id": 3
}

5. Update a Recipe
Endpoint: `PUT /api/recipes`
Description: Updates an existing recipe.
Request Body:
{
  "id": 1,
  "name": "Update Healthy Salad",
  "ingredients": [
    {
      "ingredient": "green leaf lettuce",
      "quantity": 1,
      "calories": 8
    }
  ]
}
Response:
200 OK: Returns the updated recipe.
404 Not Found: If the recipe is not found.
Example:
{
  "id": 1,
  "name": "Update Healthy Salad",
  "ingredients": [
    {
      "ingredient": "green leaf lettuce",
      "quantity": 1,
      "calories": 8
    }
  ]
}

6. Delete a Recipe
Endpoint: `DELETE /api/recipes?id={id}`
Description: Deletes a recipe by its ID.
Parameters: id (required): The ID of the recipe.
Response:
200 OK: If the recipe was deleted successfully.
404 Not Found: If the recipe is not found.
Example:
{
  "message": "Recipe deleted"
}