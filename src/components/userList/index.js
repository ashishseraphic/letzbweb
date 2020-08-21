import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Spinner,
  CardHeader
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { getUsersAdmin, deleteUser } from "../../actions/users";
import DeleteModal from "../deleteModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
class VendorMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      editId: null,
      isLoading: false,
      userList: [],
      textToSearch: ""
    };
    this.handlesearch = this.handlesearch.bind(this);
  }
  componentWillMount = () => {
    getUsersAdmin(this.state.textToSearch,res => {  
 
      this.setState({
        userList: res
      })
    
    })
  };
  handlesearch(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        textToSearch: value,
    }, () => {
      getUsersAdmin(value,res =>{

          this.setState({
          userList: res.data
        })
      });
    })
}
  renderActions = (cell, row) => {
    // console.log(row)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
      >
     
        <Button
        title='Delete User'
          color="outline-danger"
          onClick={() => {
            this.setState({
              deleteId: row._id
            });
          }}
        >
          <i className="cui-trash" aria-hidden="true" />
        </Button>
        {/* <Button
        title='View User Profile'
                      size="sm"
                      color="outline-info"
                      style={{ marginRight: 5, float: "right" }}
                       onClick={() => this.props.history.push(`/user/${row._id}`)}
                    >
                      <i className="cui-info" aria-hidden="true" />
                    </Button> */}
   
      </div>
    );
  };
  render() {
    let { isLoading, userList } = this.state;
    
  
    const options = {
      expandBy: "column",
      prePage: "Prev",
      nextPage: "Next"
    };
    return (
      <div className="animated fadeIn">
        <ToastContainer />
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
              <Col xs="12" lg="12">
                <Card style={{ marginTop: "1.5rem" }}>
                  <CardHeader >
                    <div className={"titleContainer"}>
                      <i className="cui-people"></i>
                      <strong>Users</strong>
                    </div>
                  </CardHeader>
                  <div className="focusclass">
                <input onChange={this.handlesearch}
                    placeholder="   Search User"
                    style={{ "height": "36px","width": "300px", "border": "2px solid #dfe4ea", "padding": "8px 15px", " borderRadius": "3px","marginLeft":"22px","marginTop":"22px" }} 
                    type="search">
                  </input>
                  
                </div>
                  <CardBody>
                    <BootstrapTable
                      data={
                       userList && userList.length > 0 ? userList : []
                      }
                      expandableRow={this.isExpandableRow}
                      expandComponent={this.expandComponent}
                      options={options}
                      pagination
                      hover
                    >
                      <TableHeaderColumn
                        dataField="_id"
                        isKey={true}
                        dataAlign="center"
                        dataSort={true}
                        hidden={true}
                      >
                        ID
                    </TableHeaderColumn>
                      <TableHeaderColumn
                      
                        dataField="firstName"
                       
                        dataSort={true}
                        width={"12%"}
                      >
                     First Name 
                    </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="lastName"
                        dataSort={true}
                        width={"12%"}
                      >
                        Last Name
                    </TableHeaderColumn>
                   
                      <TableHeaderColumn
                        dataField="email"
                        dataSort={true}
                        width={"28%"}
                      >
                          Email
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="username"
                        dataSort={true}
                        width={"14%"}
                      >
                        User Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="phoneNumber"
                        dataSort={true}
                        width={"14%"}
                      >
                        Phone Number
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="location"
                        dataSort={true}
                        width={"14%"}
                      >
                        User Location
                    </TableHeaderColumn>
              
                      <TableHeaderColumn
                        dataField="Action"
                        dataFormat={this.renderActions}
                        width={"30%"}
                        expandable={false}
                      >
                        Actions
                    </TableHeaderColumn>
                    </BootstrapTable>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
                        <DeleteModal
          modelName={"User"}
          isOpen={this.state.deleteId ? true : false}
          onCancel={() => {
            this.setState({ deleteId: null });
          }}
          onSubmit={() => {
              deleteUser(this.state.deleteId,res =>{              
              if(res.success){
                window.location.reload()
              }
            })             
                  // this.props.history.push("/participants");
                          toast.success("User Deleted Successfully.", {
                            position: toast.POSITION.BOTTOM_RIGHT
                          });
                        
              
           
          }}
        />
      </div>
    );
  }
}
export default (VendorMaster);
