const redux = require("redux");
const createStore = redux.createStore;

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
// redux
const store = createStore(reducer);
console.log("Initial redux store State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated redux store state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
store.dispatch(buyCake());

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
