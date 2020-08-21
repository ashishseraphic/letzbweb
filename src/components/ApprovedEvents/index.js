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
import { ToastContainer, toast} from "react-toastify";
import { getApprovedEvents, deleteEvent, disapproveEvent} from "../../actions/events";
import DeleteModal from "../deleteModal";
import Disable from '../disableModal'
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class ApprovedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      disableId:null,
      isLoading: false,
     eventList: [],
     eventLocation:[],
     eventCategory:[],
      textToSearch: ""
    };
    // this.handlesearch = this.handlesearch.bind(this);
  }
  componentWillMount = () => {
    getApprovedEvents(res => { 
      // console.log(res) 
      this.setState({
        isLoading: true,
        })
        if(res.success)
        {
      this.setState({
      eventList: res.data,
      isLoading:false
      })
    }
    })
  };
//   handlesearch(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     this.setState({
//         textToSearch: value,
//     }, () => {
//       getApprovedEvents(res =>{
//         this.setState({
//           isLoading:true
//         })
//         if(res.success)
//         {
//           this.setState({
//             eventList: res
//             })
//         }
        
//       });
//     })
    
// }


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
        title="Delete Event"
          color="outline-danger"
          onClick={() => {
            this.setState({
              deleteId: row.eventId
            });
          }}
        >
          <i className="cui-trash" aria-hidden="true" />
        </Button>
       

        <Button
        title="Disable Event"
                      size="sm"
                      color="light"
                      style={{ marginRight: 5, float: "right" }}
                       onClick={() => {
                         this.setState({
                        disableId: row.eventId
                      })
                    }}
                    >
                      Disable
                    </Button>
      </div>
    );
  };
  render() {
    let { isLoading, eventList } = this.state;
    
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
                      <i className="cui-cursor"></i>
                      <strong>
                          Approved Events
                      </strong>
                    </div>
                    <Button
                    title="Pending Events"
                      size="sm"
                      color="outline-dark"
                      style={{ marginRight: 5, float: "right" }}
                      onClick={() => this.props.history.push("/pendingevents")}
                    >
                      PENDING EVENTS
                    </Button>
                  </CardHeader>
                
                  <CardBody>
                    <BootstrapTable
                      data={
                    eventList && eventList.length > 0 ? eventList : []
                      }
                      expandableRow={this.isExpandableRow}
                      expandComponent={this.expandComponent}
                      options={options}
                      pagination
                      hover
                    >
                      <TableHeaderColumn
                        dataField="eventId"
                        isKey={true}
                        dataAlign="center"
                        dataSort={true}
                        hidden={true}
                      >
                        ID
                    </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="eventTitle"
                        dataSort={true}
                        width={"20%"}
                      >
                     Event Title
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        
                        // dataField='eventLocation'
                     dataFormat={(cell, row) => {
                            if (row.eventLocation.locationName) {
                              return (
                                row.eventLocation.locationName
                              );
                            }
                          }}
                        
                        width={"20%"}
                      >
                     Event Location
                    </TableHeaderColumn>
                    <TableHeaderColumn
                            dataFormat={(cell, row) => {
                              if (row.eventCategory.categoryName) {
                                return (
                                  row.eventCategory.categoryName
                                );
                              }
  
                            }}
                        width={"20%"}
                      >
                     Event Category
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataSort= {true}
                        dataField="eventAddress"
                        tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                        width={"20%"}
                      >
                     Event Address
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataSort= {true}
                        dataField="eventDescription"
                        tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                        width={"20%"}
                      >
                     Event Description
                    </TableHeaderColumn>

                    <TableHeaderColumn
                       
                        dataFormat={(cell, row) => {
                          if (row.eventCreator.username) {
                            return (
                              row.eventCreator.username
                            );
                          }
                        }}
                        width={"20%"}
                      >
                     Event By
                    </TableHeaderColumn>
                        
                    <TableHeaderColumn
                      
                      dataField = "eventLink"
                      width={"20%"}
                      tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                    >
                   Event Link
                  </TableHeaderColumn>
 
                      <TableHeaderColumn
                        dataField="Action"
                        dataFormat={this.renderActions}
                        width={"40%"}
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
          modelName={"Event"}
          isOpen={this.state.deleteId ? true : false}
          onCancel={() => {
            this.setState({ deleteId: null });
          }}
          onSubmit={() => {
              deleteEvent(this.state.deleteId,res =>{              
              if(res.success){
                window.location.reload()
                       toast.success("Event Deleted Successfully.", {
                            position: toast.POSITION.BOTTOM_RIGHT
                          });
              }
            })             
         }}
        />

<Disable
          modelName={"Event"}
          isOpen={this.state.disableId ? true : false}
          onCancel={() => {
            this.setState({ disableId: null });
          }}
          onSubmit={() => {
              disapproveEvent(this.state.disableId,res =>{              
              if(res.success){
                window.location.reload()
                       toast.success("Event Disabled.", {
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
export default (ApprovedEvents);
