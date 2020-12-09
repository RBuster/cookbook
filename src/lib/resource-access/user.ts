import { UserModel } from "../models/user-model";
import { BaseRA } from "./base";
const context = "user";

export class User extends BaseRA {
  getUser(): Promise<UserModel> {
    return this.get(context, "getCurrentUser");
  }

  logIn(userName: string, password: string): Promise<UserModel> {
    return this.post(context, "login", { userName, password });
  }

  logOut() {
    return this.get(context, "logout");
  }

  saveRecipeToUser(userID: string, recipeID: string) {
    return this.post(context, "saveRecipeToUser", { userID, recipeID });
  }

  removeRecipeFromUser(userID: string, recipeID: string) {
    return this.post(context, "removeRecipeFromUser", { userID, recipeID });
  }

  saveViewPreference(userID: string, preference: string) {
    return this.post(context, "saveViewPreference", { userID, preference });
  }

  registerUser(
    userName: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return this.post(context, "createUser", {
      userName,
      password,
      firstName,
      lastName,
    });
  }
}
