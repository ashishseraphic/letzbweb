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
import { deleteUser } from "../../actions/users";
import {getVendors} from '../../actions/vendor'
import DeleteModal from "../deleteModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
class UserMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      editId: null,
      isLoading: false,
      vendorList: [],
      textToSearch: ""
    };
    this.handlesearch = this.handlesearch.bind(this);
  }
  componentWillMount = () => {
    getVendors(this.state.textToSearch,res => {       
      this.setState({
        vendorList: res
      })
    })
  };
  handlesearch(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        textToSearch: value,
    }, () => {
      getVendors(value,res =>{
        this.setState({
          vendorList: res,
          
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
        title="Delete Vendor"
          color="outline-danger"
          onClick={() => {
            this.setState({
              deleteId: row._id
            });
          }}
        >
          <i className="cui-trash" aria-hidden="true" />
        </Button>
        <Button
        title="View Vendor Profile"
                      size="sm"
                      color="outline-info"
                      style={{ marginRight: 5, float: "right" }}
                       onClick={() => this.props.history.push(`/user/${row._id}`)}
                    >
                     <i className="cui-info" aria-hidden="true" />
                    </Button>
   
      </div>
    );
  };
  render() {
    let { isLoading, vendorList } = this.state;
    
  
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
                  <CardHeader>
                    <div className={"titleContainer"}>
                      <i className="cui-user"></i>
                      <strong>Vendors</strong>
                    </div>
                  </CardHeader>
                  <div className="focusclass">
                <input onChange={this.handlesearch}
                    placeholder="   Search Vendor"
                    style={{ "height": "36px","width": "300px", "border": "2px solid #dfe4ea", "padding": "8px 15px", " borderRadius": "3px","marginLeft":"22px","marginTop":"22px" }} 
                    type="search">
                  </input>
                  
                </div>
                  <CardBody>
                    <BootstrapTable
                      data={
                       vendorList && vendorList.length > 0 ? vendorList : []
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
{/*                     
                    <TableHeaderColumn
                        dataField="location"
                        dataSort={true}
                        width={"14%"}
                      >
                        Vendor Location
                    </TableHeaderColumn> */}
                    <TableHeaderColumn
                        dataField="venueName"
                        dataSort={true}
                        width={"14%"}
                      >
                        Venue Name
                    </TableHeaderColumn>
              
                      <TableHeaderColumn
                        dataField="Action"
                        dataFormat={this.renderActions}
                        width={"15%"}
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
          modelName={"Vendor"}
          isOpen={this.state.deleteId ? true : false}
          onCancel={() => {
            this.setState({ deleteId: null });
          }}
          onSubmit={() => {
              deleteUser(this.state.deleteId,res =>{              
              if(res.success ===true){
                window.location.reload()
              }
            })             
                  // this.props.history.push("/participants");
                          toast.success("Vendor Deleted Successfully.", {
                            position: toast.POSITION.BOTTOM_RIGHT
                          });
                        
              
           
          }}
        />
      </div>
    );
  }
}
export default (UserMaster);
