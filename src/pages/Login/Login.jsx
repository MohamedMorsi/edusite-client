import React, { Component } from "react";
// import { connect } from "react-redux";
// import { SetCurrentUser } from "../../redux/user/user.actions.js";
import "./Login.css";
import { login } from "../../api/adminApi.js";

class Login extends Component {
  state = {
    userName: "",
    password: "",
  };

  handlelogin = async (e) => {
    e.preventDefault();
    console.log("clicked");
    // console.log(this.state.userName);
    // console.log(this.state.password);

    // let TokenRequestModel = {
    //   userName: this.state.userName,
    //   password: this.state.password,
    // };

    // let res = await login(TokenRequestModel);
    // res = res.data;
    // console.log(res);
    // // console.log("clicked");

    // const token = res.token;
    // localStorage.setItem("token", token);

    // if (res.roles[0] === "Admin") {
    //   console.log(res.roles[0]);
    this.props.history.replace("/admin/categories");
    // } else {
    //   this.props.history.replace("/login");
    // }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h6 className="login-heading mb-4 logoText">
                      RMS - Powered by eFile
                    </h6>
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form onSubmit={this.handlelogin}>
                      <div className="form-label-group">
                        <input
                          type="username"
                          id="username"
                          className="form-control"
                          placeholder="username"
                          required
                          autoFocus
                          onChange={(event) =>
                            this.setState({ userName: event.target.value })
                          }
                        />
                        <label htmlFor="username">username</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="password"
                          required
                          onChange={(event) =>
                            this.setState({ password: event.target.value })
                          }
                        />
                        <label htmlFor="inputPassword">password</label>
                      </div>

                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember password
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                        //onClick={this.handlelogin}
                      >
                        Sign in
                      </button>
                      {/* <div className="text-center">
                                <a className="small" href="/">Forgot password?</a></div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   SetCurrentUser: (user) => dispatch(SetCurrentUser(user)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
