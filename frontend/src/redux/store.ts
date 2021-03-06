import { createStore, compose } from 'redux';
import reducer, { initialState } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers =
  process.env.NODE_ENV === 'production' ? compose : composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(reducer, initialState, composeEnhancers());

export default store;
