
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
import {getLocations, deleteLocation} from "../../actions/location";
import DeleteModal from "../deleteModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      editId: null,
      isLoading: false,
     locationList: [],
      textToSearch: ""
    };
  }
  componentWillMount = () => {
    getLocations(res => {          
        this.setState({
      locationList: res.data.locations
      })
    })
  };

  renderActions = (cell, row) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around"
        }}
        // key='etest'
      >      
        <Button
        title="Delete Location"
          color="outline-danger"
          onClick={() => {
            this.setState({
              deleteId: row.locationId
            });
          }}
        >
          <i className="cui-trash" aria-hidden="true" />
        </Button>
        <Button
        title="Edit Location"
          color="outline-primary"
          onClick={() => this.props.history.push(`/location/editlocation/${row.locationId}`)}
        >
          <i className="cui-pencil" aria-hidden="true" />
        </Button>
      </div>
    );
  };  
  render() {
    let { isLoading, locationList } = this.state;
    const options = {
      expandBy: "column",
      prePage: "Prev",
      nextPage: "Next"
    };
    return (
      <div className="animated fadeIn" key='test2'>
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
                      <i className="cui-location-pin"></i>
                      <strong>
                          Event And Promotion Locations
                      </strong>
                    </div>
                    <Button
                    title="Add Location"
                      size="sm"
                      color="outline-dark"
                      style={{ marginRight: 5, float: "right" }}
                      onClick={() => this.props.history.push("/location/addlocation")}
                    >
                      ADD NEW LOCATION
                    </Button>
                  </CardHeader>
             
                  <CardBody>
                    <BootstrapTable
                      data={
                      locationList && locationList.length > 0 ? locationList : []
                      }
                      expandableRow={this.isExpandableRow}
                      expandComponent={this.expandComponent}
                      options={options}
                      pagination
                      hover
                    >
                      <TableHeaderColumn
                        dataField="locationId"
                        isKey={true}
                        dataAlign="center"
                        dataSort={true}
                        hidden={true}
                      >
                        ID
                    </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="locationName"
                        dataSort={true}
                        width={"20%"}
                      >
                     Location Name 
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
          modelName={"Location"}
          isOpen={this.state.deleteId ? true : false}
          onCancel={() => {
            this.setState({ deleteId: null });
          }}
          onSubmit={() => {
              deleteLocation(this.state.deleteId,res =>{              
              if(res.success ===true){
                window.location.reload()
                toast.success("Location Deleted Successfully.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
              }
            })
          }}
        />
      </div>
    );
  }
}
export default (Location);
