import React from "react";
import { RecipeModel } from "../lib/models/recipe-model";
import { CreateRecipeModal } from "./CreateRecipeModal";
const defaultState = {
  modalState: "modal",
  recipe: new RecipeModel(),
};

export class CreateRecipeOption extends React.Component<
  {},
  typeof defaultState
> {
  newRecipe = new RecipeModel();
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  openModal() {
    this.setState({
      modalState: "modal is-active",
    });
  }

  closeModal() {
    this.setState({
      modalState: "modal",
    });
  }

  render() {
    return (
      <div className="login">
        <button className="button" onClick={() => this.openModal()}>
          <span className="icon">
            <i className="fa fa-plus"></i>
          </span>
          <span>Create Recipe</span>
        </button>
        <CreateRecipeModal
          isOpen={this.state.modalState}
          cancel={() => this.closeModal()}
        ></CreateRecipeModal>
      </div>
    );
  }
}
