import { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

export const CMD_PAGE_LOADED = 'PAGE_LOADED';

const reducer = (state, action) => {
  switch (action.type) {
    case CMD_PAGE_LOADED:
      return { ...state, historyEmpty: false };
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const AppWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { historyEmpty: true });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAppState = () => useContext(StateContext);
export const useAppDispatch = () => useContext(DispatchContext);
