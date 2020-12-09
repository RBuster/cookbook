import React from "react";
import { Subscription } from "rxjs";
import { ViewState } from "../const/codes";
import manager from "../lib/manager";
import { RecipeModel } from "../lib/models/recipe-model";
import { UserModel } from "../lib/models/user-model";
import { Recipe } from "./Recipe";
import * as _ from "lodash";

const defaultState = {
  recipes: [] as Array<RecipeModel>,
  savedRecipes: [] as Array<string>,
  isLoggedIn: false,
};

export class RecipesGrid extends React.Component<
  { currentView: string },
  typeof defaultState
> {
  recipeListSub: Subscription = new Subscription();
  activeUserSub: Subscription = new Subscription();
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    this.recipeListSub = manager.recipeManager.recipesList$.subscribe(
      (recipes: Array<RecipeModel>) => {
        this.setState({
          recipes: recipes,
        });
      }
    );
    this.activeUserSub = manager.userManager.currentUser$.subscribe(
      (user: UserModel) => {
        if (user) {
          this.setState({ isLoggedIn: user && !!user.userName });
        } else {
          this.setState({ isLoggedIn: false });
        }
        if (user && user.savedRecipes && user.savedRecipes.length) {
          this.setState({ savedRecipes: user.savedRecipes });
        } else {
          this.setState({ savedRecipes: [] });
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.recipeListSub) {
      this.recipeListSub.unsubscribe();
    }
    if (this.activeUserSub) {
      this.activeUserSub.unsubscribe();
    }
  }

  render() {
    let viewRecipes = this.state.recipes.map((recipe: RecipeModel) => {
      recipe.isSaved = _.includes(this.state.savedRecipes || [], recipe._id);
      return recipe;
    });
    let renderRecipes: Array<RecipeModel>;
    if (
      this.props.currentView === ViewState.viewPinned &&
      this.state.isLoggedIn
    ) {
      renderRecipes = viewRecipes.filter((recipe: RecipeModel) => {
        return _.includes(this.state.savedRecipes, recipe._id);
      });
    } else {
      renderRecipes = viewRecipes;
    }
    return (
      <div className="columns is-desktop is-multiline is-centered">
        {renderRecipes.map((r, index) => {
          return <Recipe data={r} index={index} key={index}></Recipe>;
        })}
      </div>
    );
  }
}
