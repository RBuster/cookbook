import React from "react";
import manager from "../lib/manager";
import { UserModel } from "../lib/models/user-model";
import { LogIn } from "./LogIn";
import { LogOut } from "./LogOut";

const defaultState = {
  isLoggedIn: false,
  user: {},
};

export class User extends React.Component<{}, typeof defaultState> {
  activeUser: any = {};
  constructor(props: any) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount() {
    this.activeUser = manager.userManager.currentUser$.subscribe(
      (user: UserModel) => {
        this.setState({ user: user });
        this.setState({ isLoggedIn: user && !!user.userName });
      }
    );
  }

  componentWillUnmount() {
    if (this.activeUser) {
      this.activeUser.unsubscribe();
    }
  }

  render() {
    return this.state && this.state.isLoggedIn ? (
      <LogOut></LogOut>
    ) : (
      <LogIn></LogIn>
    );
  }
}
