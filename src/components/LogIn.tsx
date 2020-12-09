import React from "react";
import manager from "../lib/manager";
import { LogInModal } from "./LogInModal";
const defaultState = {
  modalState: "modal",
  registerModalState: "modal",
  userName: "",
  password: "",
};
export class LogIn extends React.Component<{}, typeof defaultState> {
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
      registerModalState: "modal",
    });
  }

  openRegisterModal() {
    this.setState({
      modalState: "modal",
      registerModalState: "modal is-active",
    });
  }

  logIn() {
    return manager.userManager.logIn(this.state.userName, this.state.password);
  }

  render() {
    return (
      <>
        <div className="login mr-3 is-inline-block">
          <button className="button" onClick={() => this.openModal()}>
            <span className="icon">
              <i className="fa fa-user"></i>
            </span>
            <span>Login</span>
          </button>
          <LogInModal
            isOpen={this.state.modalState}
            closeModal={() => this.closeModal()}
            isNewUser={false}
          ></LogInModal>
        </div>
        <div className="register is-inline-block">
          <button className="button" onClick={() => this.openRegisterModal()}>
            <span className="icon">
              <i className="fa fa-user-plus"></i>
            </span>
            <span>Register</span>
          </button>
          <LogInModal
            isOpen={this.state.registerModalState}
            closeModal={() => this.closeModal()}
            isNewUser={true}
          ></LogInModal>
        </div>
      </>
    );
  }
}
