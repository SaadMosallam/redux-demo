const initAction = () => ({ type: "@@init" });

const internalCreateStore = (reducer) => {
  let internalState = reducer(undefined, initAction());
  let listeners = [];
  return {
    getState() {
      return internalState;
    },
    dispatch(action) {
      const newState = reducer(internalState, action);
      if (newState !== internalState) {
        internalState = newState;
        listeners.forEach((listener) => listener(internalState));
      }
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
};

exports.internalCreateStore = internalCreateStore;
