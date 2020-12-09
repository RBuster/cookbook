import React from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { RecipesGrid } from "./components/RecipesGrid";
import manager from "./lib/manager";
const defaultState = {
  currentView: "",
};

export class App extends React.Component<{}, typeof defaultState> {
  constructor(props: any) {
    super(props);
    manager.userManager.getUser();
    manager.recipeManager.getRecipes();
    this.state = defaultState;
  }

  setCurrentView(val: string) {
    this.setState({ currentView: val });
  }

  render() {
    return (
      <div className="App">
        <Nav setView={(val: string) => this.setCurrentView(val)}></Nav>
        <div className="container is-fluid">
          <RecipesGrid currentView={this.state.currentView}></RecipesGrid>
        </div>
      </div>
    );
  }
}

export default App;
