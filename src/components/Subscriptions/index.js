import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Spinner,
  CardHeader
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import {getAllSubscriptions} from '../../actions/subscriptions'
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      editId: null,
      isLoading: false,
    subscriptionList: [],
    firstName:"",
    lastName:""
    };
  }
  componentWillMount = () => {

    getAllSubscriptions(res => {    
      this.setState({
        subscriptionList: res.data
      })
    })
  };

//   renderActions = (cell, row) => {
//     // console.log(row)
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around"
//         }}
//       >
     
//         <Button
//         title="Delete Vendor"
//           color="outline-danger"
//           onClick={() => {
//             this.setState({
//               deleteId: row._id
//             });
//           }}
//         >
//           <i className="cui-trash" aria-hidden="true" />
//         </Button>
//         <Button
//         title="View Vendor Profile"
//                       size="sm"
//                       color="outline-info"
//                       style={{ marginRight: 5, float: "right" }}
//                        onClick={() => this.props.history.push(`/user/${row._id}`)}
//                     >
//                      <i className="cui-info" aria-hidden="true" />
//                     </Button>
   
//       </div>
//     );
//   };
  render() {
    let { isLoading, subscriptionList } = this.state;
    
  
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
                      <i className="cui-euro"></i>
                      <strong>Subscriptions</strong>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <BootstrapTable
                      data={
                       subscriptionList && subscriptionList.length > 0 ? subscriptionList : []
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
                        hidden={true}
                      >
                        ID
                    </TableHeaderColumn>
                      <TableHeaderColumn
                            dataFormat={(cell, row) => {
                               
                                if (row.user.firstName) {
                                  return (
                                    row.user.firstName                                  );
                                }
                                else{
                                    return(
                                        'Not Found'
                                    )
                                }
                              }}
                        width={"12%"}
                      >
                     First Name 
                    </TableHeaderColumn>
                      <TableHeaderColumn
                        dataFormat={(cell, row) => {
                   
                            if (row.user.lastName) {
                              return (
                                row.user.lastName                                  );
                            }
                            else{
                                return(
                                    'Not Found'
                                )
                            }
                          }}
                        width={"12%"}
                      >
                        Last Name
                    </TableHeaderColumn>
                   
                      <TableHeaderColumn
                         dataFormat={(cell, row) => {
                   
                            if (row.user.email) {
                              return (
                                row.user.email                                  );
                            }
                            else{
                                return(
                                    'Not Found'
                                )
                            }
                          }}
                        width={"12%"}
                      >
                          Email
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        dataFormat={(cell, row) => {
                            if (row.subscriptionType==='ios') {
                                if(row.iosReceiptDetails.productId ==='com.bronze.msp')
                                {
                              return (
                                'Bronze'       
                                    );
                                 }
                                 else if(row.iosReceiptDetails.productId ==='com.silver.msp')
                                 {
                                     return(
                                        'Silver'
                                     )
                                 }
                                 else{
                                    return (
                                        'Basic'                                  
                                        );
                                    }
                                 }
                            else{
                                return(
                                    'Not Found'
                                )
                            }
                          }}
                        width={"14%"}
                      >
                          Subscription Type
                    </TableHeaderColumn>

                    <TableHeaderColumn
                            dataFormat={(cell, row) => {
                                if (row.iosReceiptDetails.expirationDate) {
                                  return (
                                    row.iosReceiptDetails.expirationDate
                                        );
                                }
                                else{
                                    return(
                                        'Not Found'
                                    )
                                }
                              }}
                        width={"12%"}
                      >
                     Expiry
                    </TableHeaderColumn>
   
                    </BootstrapTable>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

      </div>
    );
  }
}
export default (Subscriptions);
