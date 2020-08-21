import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Spinner
} from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextInput from "../textInput";
import { changePassword } from "../../actions/user";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      confirmPassword: "",
      newPassword: "",
      currentPassword: ""
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.error !== this.props.error) {
      toast.error(this.props.error, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = () => {
    const { confirmPassword, newPassword, currentPassword } = this.state;
    const data = { confirmPassword, newPassword, currentPassword };
    if (confirmPassword === newPassword) {
      this.props.changePassword(data, res => {        
        this.setState({ isLoading: false });
        if (res.success === true) {
          localStorage.setItem("token", res.token);
          this.props.history.push("/users");
          toast.success("Password successfully changed.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else {
          if (res && res.message) {
            toast.error(res.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }
        }
      });
    } else {
      toast.error("New password mismatch.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="animated fadeIn">
        <ToastContainer style={{ borderColor: "pink" }} />
        {isLoading ? (
          <div className="overlay-div">
            <Spinner
              style={{
                width: "5rem",
                height: "5rem"
              }}
            />
          </div>
        ) : (
          <Row>
            <Col xs="12" md="8">
              <Card style={{ marginTop: "1.5rem" }}>
                <CardHeader >
                  <strong>Change Password</strong>
                </CardHeader>
                <AvForm
                  className="form-horizontal"
                  onSubmit={(event, errors, values) => {
                    if (errors && errors.length > 0) {
                      toast.error("Validation Error", {
                        position: toast.POSITION.BOTTOM_RIGHT
                      });
                    } else {
                      this.submitForm();
                    }
                  }}
                >
                  <CardBody>
                    <TextInput
                      name={"currentPassword"}
                      label={"Current Password"}
                      onChange={this.handleChange}
                      value={this.state.currentPassword}
                      placeholder={"Current Password"}
                      type={"password"}
                    />

                    <TextInput
                      name={"newPassword"}
                      label={"New Password"}
                      onChange={this.handleChange}
                      value={this.state.newPassword}
                      placeholder={"New Password"}
                      type={"password"}
                    />

                    <TextInput
                      name={"confirmPassword"}
                      label={"Confirm Password"}
                      onChange={this.handleChange}
                      value={this.state.confirmPassword}
                      placeholder={"Confirm Password"}
                      type={"password"}
                    />

                    <button type="submit" style={{ display: "none" }} />
                  </CardBody>
                  <CardFooter>
                    <Button
                    title="Submit"
                      size="sm"
                      color="primary"
                      style={{ marginRight: 5 }}
                    >
                      <i className="fa fa-dot-circle-o" /> Submit
                    </Button>
                    <Button
                    title="Cancel"
                      type="reset"
                      size="sm"
                      color="danger"
                      style={{ marginLeft: 5 }}
                      onClick={() => {
                        this.props.history.push("/users");
                      }}
                    >
                      <i className="fa fa-ban" /> Cancel
                    </Button>
                  </CardFooter>
                </AvForm>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     error: state.participantReducer.error
//   };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePassword }, dispatch);
}

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(ChangePassword);
