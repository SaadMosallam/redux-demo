// internal store implementation
const internalRedux = require("./internalRedux");
const internalCreateStore = internalRedux.internalCreateStore;

// action creator
const BUY_CAKE = "BUY_CAKE";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

// reducer
const initialState = {
  numberOfCakes: 10,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
}

// store configuration
// internal
const internalStore = internalCreateStore(reducer);
console.log("Initial internal Store State", internalStore.getState());
const internalUnsubscribe = internalStore.subscribe((state) =>
  console.log("updated internal Store state", state)
);
internalStore.dispatch(buyCake());
internalStore.dispatch(buyCake());
internalUnsubscribe();
internalStore.dispatch(buyCake());
