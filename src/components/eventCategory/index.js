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
import { getCategories, deleteCategory} from "../../actions/category";
import DeleteModal from "../deleteModal";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: null,
      editId: null,
      isLoading: false,
     categoryList: [],
    };
  }
  componentWillMount = () => {
    getCategories(res => { 
      this.setState({
      categoryList: res.data.categories
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
       key = {cell}
       >
        
        <Button
        title="Delete Category"
          color="outline-danger"
          onClick={() => {
            this.setState({
              deleteId: row.categoryId
            });
          }}
        >
          <i className="cui-trash" aria-hidden="true" />
        </Button>
        <Button
        title="Edit Category"
          color="outline-primary"
          onClick={() => this.props.history.push(`category/editcategory/${row.categoryId}`)}
        >
          <i className="cui-pencil" aria-hidden="true" />
        </Button>
      </div>
    );
  };
  render() {
    let { isLoading, categoryList } = this.state;
    

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
                      <i className="cui-chart"></i>
              
                      <strong>
                          Event Categories
                      </strong>
                    </div>
                    <Button
                    title="Add Category"
                      size="sm"
                      color="outline-dark"
                      style={{ marginRight: 5, float: "right" }}
                      onClick={() => this.props.history.push("/category/addcategory")}
                    >
                      ADD NEW CATEGORY
                    </Button>
                  </CardHeader>
             
                  <CardBody>
                    <BootstrapTable
                      data={
                      categoryList && categoryList.length > 0 ? categoryList : []
                      }
                      expandableRow={this.isExpandableRow}
                      expandComponent={this.expandComponent}
                      options={options}
                      pagination
                      hover
                    >
                      <TableHeaderColumn
                        dataField="categoryId"
                        isKey={true}
                        dataAlign="center"
                        dataSort={true}
                        hidden={true}
                      >
                        ID
                    </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="categoryName"
                        dataSort={true}
                        width={"20%"}
                      >
                     Category Name 
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
          modelName={"Category"}
          isOpen={this.state.deleteId ? true : false}
          onCancel={() => {
            this.setState({ deleteId: null });
          }}
          onSubmit={() => {
              deleteCategory(this.state.deleteId,res =>{              
              if(res.success ===true){
                window.location.reload();
                toast.success(" Category Deleted Successfully.", {
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
export default (Category);
