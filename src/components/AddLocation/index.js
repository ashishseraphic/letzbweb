
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
import TextInput from "../textInput";
import {addLocation} from "../../actions/location";
class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      locationName: "",
      isLoading: false
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
    // this.setState({ isLoading: true });    
    const { locationName } = this.state;
    const data = {
     locationName,
     
    
    };
   addLocation(data, res => {
      if (res && res.success) {
        this.props.history.push("/locations");
        // this.setState({ isLoading: false });
        toast.success("Location Added Successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }
      else {
        toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
      }
    });
};
  render() {
    const { locationName, isLoading } = this.state;
   
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
                  <CardHeader>
                    <strong>Add New Event Location</strong>
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
                        name={"locationName"}
                        label={"Location Name"}
                        value={locationName}
                        onChange={this.handleChange}
                        placeholder={"Enter Location Name"}
                        type={"text"}
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
                          this.props.history.push("/locations");
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

export default AddLocation
