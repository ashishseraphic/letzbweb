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
import { getFeedbacks, deleteFeedback } from "../../actions/feedback";
import DeleteModal from "../deleteModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class Feedbacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteId: null,
            isLoading: false,
            feedbackList: [],
            textToSearch: ""
        };
    }
    componentWillMount = () => {
        getFeedbacks(res => {
            this.setState({
                feedbackList: res.data,
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
                    title="Delete Feedback"
                    color="outline-danger"
                    onClick={() => {
                        this.setState({
                            deleteId: row.feedbackId
                        });
                    }}
                >
                    <i className="cui-trash" aria-hidden="true" />
                </Button>
            </div>
        );
    };
    render() {
        let { isLoading, feedbackList } = this.state;

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
                                            <i className="cui-info"></i>
                                            <strong>
                                                Feedbacks
                      </strong>
                                        </div>
                                    </CardHeader>

                                    <CardBody>
                                        <BootstrapTable
                                            data={
                                                feedbackList && feedbackList.length > 0 ? feedbackList : []
                                            }
                                            expandableRow={this.isExpandableRow}
                                            expandComponent={this.expandComponent}
                                            options={options}
                                            pagination
                                            hover


                                        >
                                            <TableHeaderColumn
                                                dataField="feedbackId"
                                                isKey={true}
                                                dataAlign="center"
                                                dataSort={true}
                                                hidden={true}
                                                style={{ "white-space": "nowrap" }}
                                            >
                                                ID
                    </TableHeaderColumn>
                                            <TableHeaderColumn
                                                dataField="name"
                                                dataSort={true}
                                                width={"20%"}
                                            >
                                                Name
                    </TableHeaderColumn>
                                            <TableHeaderColumn

                                                // dataField='eventLocation'
                                                dataFormat={(cell, row) => {
                                                    if (row.user.firstName) {
                                                        return (
                                                            row.user.firstName
                                                        );
                                                    }

                                                }}

                                                width={"20%"}
                                            >
                                                First Name
                                           </TableHeaderColumn>

                                            <TableHeaderColumn
                                                dataSort={true}
                                                dataField="subject"
                                                tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                                                width={"20%"}
                                            >
                                                Subject
                                            </TableHeaderColumn>

                                            <TableHeaderColumn
                                                dataSort={true}
                                                dataField="message"
                                                width={"20%"}
                                                tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                                            >
                                                Message
                                            </TableHeaderColumn>


                                            <TableHeaderColumn
                                                dataSort={true}
                                                dataField="email"
                                                tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}

                                                width={"20%"}
                                            >
                                                Email
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
                    modelName={"Feedback"}
                    isOpen={this.state.deleteId ? true : false}
                    onCancel={() => {
                        this.setState({ deleteId: null });
                    }}
                    onSubmit={() => {
                        deleteFeedback(this.state.deleteId, res => {
                            if (res.success === true) {
                                window.location.reload()
                                toast.success("Feedback Deleted Successfully.", {
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
export default (Feedbacks);
