import { BehaviorSubject } from "rxjs";
import { RecipeModel } from "../models/recipe-model";
import { ResourceAccess } from "../resource-access";

export class RecipeManager {
  private _RA: ResourceAccess;
  public recipesList$: BehaviorSubject<any> = new BehaviorSubject([]);
  public filteredRecipesList$: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() {
    this._RA = new ResourceAccess();
  }

  getRecipes(): Promise<Array<RecipeModel>> {
    return this._RA.recipeRA
      .getRecipes()
      .then((recipes: Array<RecipeModel>) => {
        this.recipesList$.next(recipes);
        return recipes;
      });
  }

  createRecipe(recipe: RecipeModel) {
    return this._RA.recipeRA.createRecipe(recipe).then(() => {
      return this.getRecipes();
    });
  }
}
