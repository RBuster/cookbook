import React from "react";
import manager from "../lib/manager";
import { RecipeModel } from "../lib/models/recipe-model";
//@ts-ignore
import html2pdf from "html2pdf.js";

const defaultState = {
  modalState: "modal",
};
export class Recipe extends React.Component<
  { data: RecipeModel; index: number },
  typeof defaultState
> {
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  openModal() {
    this.setState({
      modalState: "modal modal-fx-fadeInScale is-active",
    });
  }

  closeModal() {
    this.setState({
      modalState: "modal modal-fx-fadeInScale",
    });
  }

  toggleSaveRecipe(recipeID: string, isSaved: boolean) {
    if (isSaved) {
      return manager.userManager.removeRecipeFromUser(recipeID);
    } else {
      return manager.userManager.saveRecipeToUser(recipeID);
    }
  }

  downloadPDF() {
    var opt = {
      margin: 0.5,
      filename: this.props.data.title,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scrollY: 0 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    var element = document.getElementById(`recipe-${this.props.index}`);
    element?.querySelector(".hiddenTitle")?.removeAttribute("hidden");
    html2pdf().from(element).set(opt).save();
  }

  render() {
    return (
      <>
        <div className="column is-one-quarter-desktop">
          <div className="card recipe-card">
            <header className="card-header">
              <div className="card-header-title">{this.props.data.title}</div>
              <div className="card-header-icon">
                <button
                  className="button is-white"
                  onClick={() =>
                    this.toggleSaveRecipe(
                      this.props.data._id,
                      this.props.data.isSaved
                    )
                  }
                >
                  <i
                    className="fa fa-bookmark"
                    style={{
                      color:
                        this.props.data.isSaved === true ? "blue" : "initial",
                    }}
                  ></i>
                </button>
              </div>
            </header>

            <div className="card-content">
              <p className="subtitle">
                {this.props.data.summary || this.props.data.directions}
              </p>
            </div>
            <footer className="card-footer">
              <p
                className="card-footer-item is-clickable"
                onClick={() => this.downloadPDF()}
              >
                <span>Download As PDF</span>
              </p>
              <p
                className="card-footer-item is-clickable"
                onClick={() => this.openModal()}
              >
                View
              </p>
            </footer>
          </div>
        </div>
        <div className={this.state.modalState}>
          <div
            className="modal-background"
            onClick={() => this.closeModal()}
          ></div>
          <div className="modal-card recipe-modal">
            <div className="modal-card-head">
              <h2 className="modal-card-title is-size-2">
                {this.props.data.title}
              </h2>
            </div>
            <section
              className="modal-card-body"
              id={`recipe-${this.props.index}`}
            >
              <div className="hiddenTitle" hidden>
                <h2 className="is-size-3 hiddenTitle">
                  {this.props.data.title}
                </h2>
                <hr />
              </div>
              <h3 className="is-size-3 has-text-justified">Ingredients</h3>
              <hr />
              <ul
                className="has-text-justified"
                style={{ width: "80%", margin: "0 auto" }}
              >
                {this.props.data.ingredients
                  .filter((i) => !!i.measurement && !!i.item)
                  .map((ingredient, index) => {
                    return (
                      <li key={index}>
                        <i className="far fa-square"></i>&nbsp;
                        {ingredient.measurement} - {ingredient.item}
                      </li>
                    );
                  })}
              </ul>
              <br />
              <h3 className="has-text-justified is-size-3">Directions</h3>
              <hr />
              <p>{this.props.data.directions}</p>
            </section>
            <div className="modal-card-foot is-justify-content-flex-end">
              <button
                className="button is-success"
                onClick={() => this.downloadPDF()}
              >
                Download PDF
              </button>
              <button className="button" onClick={() => this.closeModal()}>
                Close Modal
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
