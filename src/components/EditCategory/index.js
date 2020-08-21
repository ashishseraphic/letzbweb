
import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner
} from "reactstrap";
import {Row, Col, Form} from 'react-bootstrap'
import { AvForm,} from "availity-reactstrap-validation";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { getCategory } from "../../actions/category";
import { getCategory,editCategory} from "../../actions/category";

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        categoryName:'',
      disabled:true,
      isLoading:false
    
    };
 
    this._handleChange = this._handleChange.bind(this);
      }
  componentWillMount() {
      getCategory(this.props.match.params.id,res =>{
          if(res.success) {
              this.setState({
                  categoryName: res.data.category.categoryName,
              })
          }
      })
  
  }
 

  componentDidMount = () => {
    
  };

  handleChange = e => {
    // let name = e.target.name
    // let value = e.target.value;
    // if (name ==="coinsToUpdate") {
      
    // }
    this.setState({ [e.target.name]: e.target.value });
  };
 
  _handleChange(i,event) {
   

  }
  submitForm = () => {

    
    let {  categoryName } = this.state;
  
    const data = {
        categoryName:categoryName,
    };
    
              editCategory(data,this.props.match.params.id, res => {
           
                if (res.success) {
                  this.props.history.push("/categories");
                  // window.location.reload();
                } else {
                  if (res && res.message) {
                    toast.error(res.message, {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                  }
                }
            })
  };
  render() {
    const { categoryName, isLoading } = this.state;

    return (
      <div>
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
          ) : null
          } 
          {/* ( */}
              <Row>
                <Col xs="12" md="8">
                  <Card style={{ marginTop: "1.5rem" }}>
                    <CardHeader >
                      <strong>Edit Category
                      </strong>
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
                      {/* <div className="row">
                       */}
                       <Row>
                           <Col md={5}>
                       <Form.Label>
                           Category Name
                       </Form.Label>
                           </Col>
                       
                   <Col md={7}>
                      <input type="text"
                          id={`categoryName`}
                          name={`categoryName`}
                          className="form-control"
                          onChange={this.handleChange}
                          placeholder="Enter Category Name"
                          value={categoryName}

                      />
                    </Col>
                   </Row>
                

                        <button type="submit" style={{ display: "none" }} />
                      </CardBody>
                      <CardFooter>
                        <Button
                        title="Submit"
                          size="sm"
                          color="primary"
                          // disabled="true"
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
                            this.props.history.push("/categories");
                          }}
                        >
                          <i className="fa fa-ban" /> Cancel
                    </Button>
                      </CardFooter>
                    </AvForm>
                  </Card>
                </Col>
              </Row>
            {/* )} */}
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({editCategory}, dispatch);
}
// function mapDispatchToProps1(dispatch) {
//     return bindActionCreators({ getAllCategory }, dispatch);
//   }

export default connect(
  null,
  
  mapDispatchToProps,
)(EditCategory);
























