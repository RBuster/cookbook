import { Recipe } from "./recipe";
import { User } from "./user";

export class ResourceAccess {
  recipeRA: Recipe;
  userRA: User;
  constructor() {
    this.recipeRA = new Recipe();
    this.userRA = new User();
  }
}
