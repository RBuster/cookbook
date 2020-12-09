import React from "react";
import manager from "../lib/manager";

export class LogOutModal extends React.Component<{
  isOpen: string;
  closeModal: Function;
}> {
  activeUser: any = {};

  cancel() {
    this.props.closeModal();
  }

  logOut() {
    return manager.userManager.logOut().then(() => {
      this.props.closeModal();
    });
  }

  render() {
    return (
      <div className={this.props.isOpen}>
        <div className="modal-background" onClick={() => this.cancel()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Log Out of Cookbook?</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.cancel()}
            ></button>
          </header>

          <footer className="modal-card-foot is-justify-content-flex-end">
            <button className="button is-success" onClick={() => this.logOut()}>
              Yup, log me out.
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
