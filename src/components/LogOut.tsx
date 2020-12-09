import React from "react";
import { UserModel } from "../lib/models/user-model";
import manager from "../lib/manager";
import { LogOutModal } from "./LogOutModal";
const defaultState = {
  modalState: "modal",
  user: {} as UserModel,
};
export class LogOut extends React.Component<{}, typeof defaultState> {
  activeUser: any = {};
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    this.activeUser = manager.userManager.currentUser$.subscribe(
      (user: UserModel) => {
        this.setState({ user: user });
      }
    );
  }

  componentWillUnmount() {
    if (this.activeUser) {
      this.activeUser.unsubscribe();
    }
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
      <div className="user">
        <button className="button" onClick={() => this.openModal()}>
          <span className="icon">
            <i className="fa fa-user"></i>
          </span>
          <span>Log Out</span>
        </button>
        <LogOutModal
          isOpen={this.state.modalState}
          closeModal={() => this.closeModal()}
        ></LogOutModal>
      </div>
    );
  }
}
