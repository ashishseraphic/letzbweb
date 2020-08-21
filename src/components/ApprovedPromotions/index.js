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
import { getApprovedPromotions, deletePromotion, disapprovePromotion } from "../../actions/prmotions";
import DeleteModal from "../deleteModal";
import Disable from '../disableModal'
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class ApprovedPromotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      disableId:null,
      editId: null,
      isLoading: false,
     promotionList: [],
      textToSearch: ""
    };
  
  }
  componentWillMount = () => {
    getApprovedPromotions(res => { 
      this.setState({
      promotionList: res.data,
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
      >

        <Button
        title="Delete Promotion"
          color="outline-danger"
          onClick={() => {
            this.setState({
              deleteId: row.promotionId
            });
          }}
        >
          <i className="cui-trash" aria-hidden="true" />
        </Button>
       

                  <Button
                      title="Disable Promotion"
                      size="sm"
                      color="light"
                      style={{ marginRight: 5, float: "right" }}
                       onClick={() =>{
                        this.setState({
                          disableId: row.promotionId
                           });
                       }}
                    >
                      Disable
                    </Button>
      </div>
    );
  };
  render() {
    let { isLoading, promotionList } = this.state;
    
    const options = {
      expandBy: "column",
      prePage: "Prev",
      nextPage: "Next"
    };
    //   for (let index = 0; index < promotionList.length; index++) {
        
    //     let e = promotionList[index].promotionLocation.locationName

    //     promotionList[index].promotionLocation = e
    //   }
    //   for (let index = 0; index < promotionList.length; index++) {
        
    //     let e = promotionList[index].PromotionLocation.locationName
    //      promotionList[index].PromotionLocation = e
    //   }

    // for (let index = 0; index < promotionList.length; index++) {
    //   let e = promotionList[index].sessionDate
    //   e = moment(e, "YYYY-MM-DD").format("YYYY-MM-DD")
      
    //   promotionList[index].time = e
    // }
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
                      <i className="cui-star"></i>
                      <strong>
                          Approved Promotions
                      </strong>
                    </div>
                    <Button
                    title="Pending Promotions"
                      size="sm"
                      color="outline-dark"
                      style={{ marginRight: 5, float: "right" }}
                      onClick={() => this.props.history.push("/pendingpromotions")}
                    >
                      PENDING PROMOTIONS
                    </Button>
                  </CardHeader>
                
                  <CardBody>
                    <BootstrapTable
                      data={
                    promotionList && promotionList.length > 0 ? promotionList : []
                      }
                      expandableRow={this.isExpandableRow}
                      expandComponent={this.expandComponent}
                      options={options}
                      pagination
                      hover
                    >
                      <TableHeaderColumn
                        dataField="promotionId"
                        isKey={true}
                        dataAlign="center"
                        dataSort={true}
                        hidden={true}
                      >
                        ID
                    </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="promotionTitle"
                        dataSort={true}
                        width={"20%"}
                      >
                     Promotion Title
                    </TableHeaderColumn>
                    <TableHeaderColumn
                          dataFormat={(cell, row) => {
                            // console.log(row)
                            if (row.promotionLocation.locationName) {
                              return (
                                row.promotionLocation.locationName
                              );
                            }

                          }}
                        
                        width={"20%"}
                      >
                     Promotion Location
                    </TableHeaderColumn>
                
                    <TableHeaderColumn
                        dataSort= {true}
                        dataField="promotionAddress"
                        tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                        width={"20%"}
                      >
                     Promotion Address
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataSort= {true}
                        dataField="promotionDescription"
                        tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                        width={"20%"}
                      >
                     Promotion Description
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      
                        dataFormat={(cell, row) => {
                          // console.log(row)
                          if (row.promotionCreator.username) {
                            return (
                              row.promotionCreator.username
                            );
                          }

                        }}
                        width={"20%"}
                      >
                     Promotion By
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
          modelName={"Promotion"}
          isOpen={this.state.deleteId ? true : false}
          onCancel={() => {
            this.setState({ deleteId: null });
          }}
          onSubmit={() => {
              deletePromotion(this.state.deleteId,res =>{              
              if(res.success ===true){
                window.location.reload()
                       toast.success("Promotion Deleted Successfully.", {
                            position: toast.POSITION.BOTTOM_RIGHT
                          });
              }
            })             
         }}
        />

<Disable
          modelName={"Promotion"}
          isOpen={this.state.disableId ? true : false}
          onCancel={() => {
            this.setState({ disableId: null });
          }}
          onSubmit={() => {
              disapprovePromotion(this.state.disableId,res =>{              
              if(res.success ===true){
                window.location.reload()
                       toast.success("Promotion Disabled.", {
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
export default (ApprovedPromotions);
