// import * as Actions from '../actions';

const initialState = [{
    name: "Harrietta Souten",
    designation:"Dental Hygienist",
    image: "/assets/images/sample/user-basic-1.jpg",
    hasUnread: true,
  id: 1
}];

const reducerOne = (state = initialState, action) => {
  switch (action.type) {
      default: {
          return state;
      }
  }
};

export default reducerOne;
