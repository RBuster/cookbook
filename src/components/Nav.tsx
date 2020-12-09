import React from "react";
import { User } from "./User";
import manager from "../lib/manager";
import { UserModel } from "../lib/models/user-model";
import { CreateRecipeOption } from "./CreateRecipeOption";
import { ViewState } from "../const/codes";

const defaultState = {
  currentView: ViewState.viewAll,
  user: {} as UserModel | null,
  showMenu: false,
};

export class Nav extends React.Component<
  { setView: Function },
  typeof defaultState
> {
  userSub: any = {};
  userHasLoaded: boolean = false;
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  setView(val: string) {
    this.props.setView(val);
    this.setState({
      currentView: val,
    });
    manager.userManager.saveViewPreference(val);
  }

  componentDidMount() {
    this.userSub = manager.userManager.currentUser$.subscribe(
      (user: UserModel) => {
        if (user) {
          this.setState({ user: user });
          if (!this.userHasLoaded) {
            //kind of a hack, only update the view once
            this.userHasLoaded = true;
            this.setView(user.viewPreference);
          }
        } else {
          this.setState({ user: null });
        }
      }
    );
  }

  componentWillUnmount() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  render() {
    return (
      <nav
        className="navbar is-transparent is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <i className="fa fa-book"></i>
          </a>
          {this.state.user && this.state.user.userName && (
            <div className="p-4">
              <span className="icon">
                <i className="fa fa-user"></i>
              </span>
              <span>{this.state.user.userName}</span>
            </div>
          )}
          <button
            className={
              this.state.showMenu
                ? "navbar-burger burger button is-white is-active"
                : "navbar-burger burger button is-white"
            }
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
            onClick={() =>
              this.setState((state) => ({
                showMenu: !state.showMenu,
              }))
            }
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div
          className={
            this.state.showMenu ? "navbar-menu is-active" : "navbar-menu"
          }
        >
          <div className="navbar-start">
            {this.state.user && this.state.user.userName && (
              <>
                <div className="navbar-item is-inline-block">
                  <button
                    className={
                      this.state.currentView === ViewState.viewPinned
                        ? "navbar-item button is-primary"
                        : "navbar-item button is-white"
                    }
                    onClick={() => this.setView(ViewState.viewPinned)}
                  >
                    View My Bookmarked Recipes
                  </button>
                </div>
                <div className="navbar-item is-inline-block">
                  <button
                    className={
                      this.state.currentView === ViewState.viewAll
                        ? "navbar-item button is-primary"
                        : "navbar-item button is-white"
                    }
                    onClick={() => this.setView(ViewState.viewAll)}
                  >
                    View All Recipes
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="navbar-end" id="navMenu">
            {this.state.user && this.state.user.canCreateRecipe === true && (
              <div className="navbar-item is-inline-block">
                <CreateRecipeOption></CreateRecipeOption>
              </div>
            )}
            <div className="navbar-item is-inline-block">
              <User></User>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
