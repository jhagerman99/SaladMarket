import { ingredients } from '../../data/ingredientData';

export default function handler(req, res) {
  res.status(200).json(ingredients);
}
