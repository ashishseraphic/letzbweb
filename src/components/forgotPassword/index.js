import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { forgotPassword } from "../../actions/user";
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
  Row
} from "reactstrap";
import newLogo from "../../assets/letzb.jpg";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isLoading: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = () => {
    this.setState({ isLoading: true });
    const { email } = this.state;
    const data = {
      username: email
    };

    this.props.forgotPassword(data, res => {
      this.setState({ isLoading: false });
      if (res.success === true) {
        toast.success(res.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        // this.props.history.push("/");
      } else {
        if (res && res.message) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }
    });
  };

  render() {
    const { email } = this.state;
    return (
      <div className="app flex-row align-items-center" key='test2'>
        <ToastContainer />
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form
                      onSubmit={e => {
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
                      <h3>Forgot Password</h3>
                      <p className="text-muted">Please enter email address</p>
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
                      <Row>
                        <Col xs="6">
                          <Button
                          title="Submit"
                            disabled={this.state.isLoading}
                            color="primary"
                            className="px-4"
                          >
                            Submit
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button
                          title="Cancel"
                            color="link"
                            className="px-0"
                            type="button"
                            onClick={() => {
                              this.props.history.push("/loginadmin");
                            }}
                          >
                            Login
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
  return bindActionCreators({ forgotPassword }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
