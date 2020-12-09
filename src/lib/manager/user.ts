import { UserModel } from "../models/user-model";
import { ResourceAccess } from "../resource-access";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

export class UserManager {
  private _RA: ResourceAccess;
  public currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    this._RA = new ResourceAccess();
  }

  async getUser(): Promise<UserModel> {
    const user = await this._RA.userRA.getUser();
    this.currentUser$.next(user);
    return user;
  }

  async logIn(userName: string, password: string) {
    const user = await this._RA.userRA.logIn(userName, password);
    this.currentUser$.next(user);
    return user;
  }

  registerUser(
    userName: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    return this._RA.userRA
      .registerUser(userName, password, firstName, lastName)
      .then((newUser: UserModel) => {
        this.currentUser$.next(newUser);
      });
  }

  logOut() {
    return this._RA.userRA.logOut().then(() => {
      this.currentUser$.next(null);
    });
  }

  saveRecipeToUser(recipeID: string) {
    const user: UserModel = this.currentUser$.getValue();
    if (user) {
      return this._RA.userRA
        .saveRecipeToUser(user._id, recipeID)
        .then((result: { recipeID: string }) => {
          user.savedRecipes.push(result.recipeID);
          this.currentUser$.next(user);
        });
    }
  }

  removeRecipeFromUser(recipeID: string) {
    const user: UserModel = this.currentUser$.getValue();
    if (user) {
      return this._RA.userRA
        .removeRecipeFromUser(user._id, recipeID)
        .then((result: { recipeID: string }) => {
          _.pull(user.savedRecipes, result.recipeID);
          this.currentUser$.next(user);
        });
    }
  }

  saveViewPreference(preference: string) {
    const user: UserModel = this.currentUser$.getValue();
    if (user) {
      return this._RA.userRA.saveViewPreference(user._id, preference);
    }
  }
}
