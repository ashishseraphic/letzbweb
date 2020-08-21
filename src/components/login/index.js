import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signInAdmin } from "../../actions/user";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import newLogo from "../../assets/letzb.jpg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = () => {
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password,
    };

    this.props.signInAdmin(data, (res) => {
      this.setState({ isLoading: false });
      if (res.success) {
        if (res.data.roles[0] === 1) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id", res.id);
          window.location.pathname = "/";
          this.props.history.push("#/");
        } else if (res.roles[0] === 2) {
          toast.error("You are not authorized", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        if (res && res.message) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      }
    });
    // this.setState({ isLoading: true });
    // const { email, password } = this.state;
    // const data = {
    //   username: email,
    //   password
    // };

    // this.props.login(data, res => {
    //   console.log("data",data);

    //   this.setState({ isLoading: false });
    //   if (res.status ===1) {

    //     localStorage.setItem("token", res.token);
    //     this.props.history.push("#/");
    //   } else {
    //     if (res && res.message) {
    //       toast.error(res.message, {
    //         position: toast.POSITION.BOTTOM_RIGHT
    //       });
    //     }
    //   }
    // });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <ToastContainer />
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.submitForm();
                      }}
                    >
                      <div style={{ textAlign: "center", padding: 10 }}>
                        <img
                          src={newLogo}
                          alt=""
                          style={{ height: `50%`, width: `50%` }}
                        />
                      </div>
                      <h3>Login</h3>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            title="Login"
                            disabled={this.state.isLoading}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button
                            title="Forgot Password"
                            color="link"
                            className="px-0"
                            type="button"
                            onClick={() => {
                              this.props.history.push("/forgotPassword");
                            }}
                          >
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signInAdmin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
