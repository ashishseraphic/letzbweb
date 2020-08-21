import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOutAdmin } from "../../actions/user";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  // AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";

// sidebar nav config
import navigation from "../../_nav";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

// const Admin = React.lazy(() => import("../admin"));

const ChangePassword = React.lazy(() => import("../changePassword"));
const UserMaster = React.lazy(() => import("../userList"));
const VendorMaster = React.lazy(()=> import('../vendorList'))
const Category = React.lazy(()=>import('../eventCategory'))
const Location =  React.lazy(()=> import ('../eventLocations'))
const AddCategory = React.lazy(()=> import('../AddCategory'))
const AddLocation = React.lazy(()=> import('../AddLocation'))
const EditCategory = React.lazy(()=> import('../EditCategory'))
const EditLocation = React.lazy(()=> import('../EditLocation'))
const ApprovedEvents = React.lazy(()=> import('../ApprovedEvents'))
const PendingEvents = React.lazy(()=>import('../PendingEvents'))
const ApprovedPromotions = React.lazy(()=> import('../ApprovedPromotions'))
const PendingPromotions = React.lazy(()=>import('../PendingPromos'))
const Feedbacks = React.lazy(()=>import('../Feedbacks'))
const Subscriptions = React.lazy(()=> import('../Subscriptions'))



class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      dataLoaded: false
    };
  }

  loading = () => (
    <div className="overlay-div">
      <Spinner
        style={{
          width: "5rem",
          height: "5rem"
        }}
      />
    </div>
  );

  signoutadmin(e) {
    this.props.signOutAdmin(res => {
      // console.log('res????????', res)
      // this.setState({ 
      //   isLoading: false 
      // });
      if (res.success ===true) {
        localStorage.clear();
        this.props.history.push("/loginadmin");
      } else {
        if (res && res.message) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      }
    });
  }
 

  render() {
    return (
      <div className="app">
        <ToastContainer />
        {/* <AppHeader fixed style= {{"backgroundColor":"#ddd6ff"}}> */}
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              isAdmin={this.state.isAdmin}
              onLogout={e => this.signoutadmin(e)}
              onChangePassword={() => {
                this.props.history.push("/changepassword");
              }}
              onChangeEmail={() => {
                this.props.history.push("/adminemail");
              }}
              onEdit={() => this.onEdit(localStorage.getItem("id"))}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          {/* {this.state.isAdmin && this.state.dataLoaded && ( */}
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            {/* <AppSidebarFooter style= {{"backgroundColor":"#ddd6ff"}}/> */}
            {/* <AppSidebarMinimizer style = {{"backgroundColor":"white"}}/> */}
            <AppSidebarFooter/>
          </AppSidebar>
     
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                <Route
                    path={"/changepassword"}
                    render={props => <ChangePassword {...props} />}
                  /> 
                   
                    <Route
                    path={"/users"}
                    render={props => <UserMaster {...props} />}
                  />                        

                    <Route    
                    path={"/vendors"}
                    render={props => <VendorMaster {...props} />}
                  />  
                   <Route    
                    path={"/categories"}
                    render={props => <Category {...props} />}
                  />                        

                  <Route    
                    path={"/locations"}
                    render={props => <Location {...props} />}
                  />

                  <Route    
                    path={"/category/addcategory"}
                    render={props => <AddCategory {...props} />}
                  />                

                  
                  <Route    
                    path={"/location/addlocation"}
                    render={props => <AddLocation {...props} />}
                  /> 

                  
                  <Route    
                    path={"/category/editcategory/:id"}
                    render={props => <EditCategory {...props} />}
                  />                                
                   

                  <Route    
                    path={"/location/editlocation/:id"}
                    render={props => <EditLocation {...props} />}
                  /> 

                  
                  <Route    
                    path={"/approvedevents"}
                    render={props => <ApprovedEvents {...props} />}
                  />   

                  
                  <Route    
                    path={"/pendingevents"}
                    render={props => <PendingEvents {...props} />}
                  />                                

                       <Route    
                    path={"/approvedpromotions"}
                    render={props => <ApprovedPromotions {...props} />}
                  />   

                  
                  <Route    
                    path={"/pendingpromotions"}
                    render={props => <PendingPromotions {...props} />}
                  />                                
                   
                   <Route    
                    path={"/feedbacks"}
                    render={props => <Feedbacks {...props} />}
                  />                                
                   
                               
                   <Route    
                    path={"/subscriptions"}
                    render={props => <Subscriptions {...props} />}
                  />                                
                   
              
                  <Redirect from="/" to={"/users"} />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}></Suspense>
          </AppAside>
        </div>
        <AppFooter style={{ marginLeft: !this.state.isAdmin ? "0px" : "" }}>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signOutAdmin }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
