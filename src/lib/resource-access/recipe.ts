import { RecipeModel } from "../models/recipe-model";
import { BaseRA } from "./base";
const context = "recipe";

export class Recipe extends BaseRA {
  getRecipes(): Promise<Array<RecipeModel>> {
    return this.get(context, "getRecipes");
  }

  createRecipe(recipe: RecipeModel) {
    return this.post(context, "createRecipe", recipe);
  }
}
