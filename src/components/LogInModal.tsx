import React from "react";
import manager from "../lib/manager";
const defaultState = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
};
export class LogInModal extends React.Component<
  { isOpen: string; closeModal: Function; isNewUser: boolean },
  typeof defaultState
> {
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  cancel() {
    this.setState({
      userName: "",
      password: "",
    });
    this.props.closeModal();
  }

  submit() {
    if (this.props.isNewUser) {
      return manager.userManager.registerUser(
        this.state.userName,
        this.state.password,
        this.state.firstName,
        this.state.lastName
      );
    } else {
      return manager.userManager.logIn(
        this.state.userName,
        this.state.password
      );
    }
  }

  render() {
    return (
      <div className={this.props.isOpen}>
        <div className="modal-background" onClick={() => this.cancel()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {this.props.isNewUser
                ? "Register for Cookbook"
                : "Login to Cookbook"}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.cancel()}
            ></button>
          </header>
          <section className="modal-card-body">
            {this.props.isNewUser && (
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label has-text-left" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        id="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={(event) =>
                          this.setState({
                            firstName: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label className="label has-text-left" htmlFor="lastName">
                      Last Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        id="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={(event) =>
                          this.setState({
                            lastName: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="field">
              <label className="label has-text-left" htmlFor="userName">
                User Name
              </label>
              <div className="control">
                <input
                  className="input"
                  id="userName"
                  type="text"
                  value={this.state.userName}
                  onChange={(event) =>
                    this.setState({
                      userName: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label has-text-left" htmlFor="password">
                Password
              </label>
              <div className="control">
                <input
                  className="input"
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState(() => ({
                      password: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot is-justify-content-flex-end">
            <button className="button is-success" onClick={() => this.submit()}>
              {this.props.isNewUser ? "Register" : "Login"}
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
