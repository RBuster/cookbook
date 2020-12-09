import React, { ChangeEvent } from "react";
import { Ingredient, RecipeModel } from "../lib/models/recipe-model";
import manager from "./../lib/manager";

export class CreateRecipeModal extends React.Component<
  { isOpen: string; cancel: Function },
  RecipeModel
> {
  constructor(props: any) {
    super(props);
    this.state = new RecipeModel();
  }

  handlePropChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState((state: RecipeModel) => {
      state.title = event.target.value;
    });
  }

  addIngredient() {
    this.setState({
      ingredients: this.state.ingredients.concat(new Ingredient()),
    });
  }

  cancel() {
    this.setState(new RecipeModel());
    this.props.cancel();
  }

  saveRecipe() {
    return manager.recipeManager.createRecipe(this.state).then(() => {
      this.cancel();
    });
  }

  render() {
    return (
      <div className={this.props.isOpen}>
        <div className="modal-background" onClick={() => this.cancel()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Create New Recipe</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.cancel()}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label htmlFor="recipeTitle" className="label has-text-left">
                Recipe Title
              </label>
              <div className="control">
                <input
                  id="recipeTitle"
                  type="text"
                  className="input"
                  placeholder="Sheet Cake"
                  value={this.state.title}
                  onChange={(event) =>
                    this.setState({ title: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="recipeSummary" className="label has-text-left">
                Summary
              </label>
              <div className="control">
                <textarea
                  style={{ minHeight: 100 }}
                  id="recipeSummary"
                  className="input"
                  value={this.state.summary}
                  placeholder="Wonderful chocolate cake baked on..."
                  onChange={(event) =>
                    this.setState({ summary: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-left">Ingredients</label>
              <hr />
              {this.state.ingredients.map((ingredient, index) => {
                return (
                  <div className="field" key={index}>
                    <div className="columns">
                      <div className="column">
                        <label
                          htmlFor="recipeTitle"
                          className="label has-text-left"
                        >
                          How Much?
                        </label>
                        <div className="control">
                          <input
                            id="recipeTitle"
                            type="text"
                            className="input"
                            placeholder="1 Cup"
                            value={ingredient.measurement}
                            onChange={(event) => {
                              this.setState((currentState) => {
                                currentState.ingredients[index].measurement =
                                  event.target.value;
                                return currentState;
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="column">
                        <label
                          htmlFor="recipeTitle"
                          className="label has-text-left"
                        >
                          Of What?
                        </label>
                        <div className="control">
                          <input
                            id="recipeTitle"
                            type="text"
                            className="input"
                            placeholder="Sugar"
                            value={ingredient.item}
                            onChange={(event) => {
                              this.setState((currentState) => {
                                currentState.ingredients[index].item =
                                  event.target.value;
                                return currentState;
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="level">
                <div className="level-left"></div>
                <div className="level-right">
                  <button
                    className="button is-primary level-item"
                    onClick={() => this.addIngredient()}
                  >
                    Add Ingredient
                  </button>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="recipeDirections" className="label has-text-left">
                Directions
              </label>
              <div className="control">
                <textarea
                  style={{ minHeight: 150 }}
                  id="recipeDirections"
                  className="input"
                  placeholder="Grease pan and pre-heat oven to..."
                  value={this.state.directions}
                  onChange={(event) =>
                    this.setState({ directions: event.target.value })
                  }
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot is-justify-content-flex-end">
            <button
              className="button is-success"
              onClick={() => this.saveRecipe()}
            >
              Create
            </button>
            <button className="button" onClick={() => this.cancel()}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
