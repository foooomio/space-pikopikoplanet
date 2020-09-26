import { useReducer } from 'react';
import { SparqlResult } from '@/lib/types';
import type { Reducer } from 'react';

type State = {
  result: SparqlResult | null;
  loading: boolean;
  error: Error | null;
};

type Action =
  | { type: 'loading' }
  | { type: 'result'; payload: SparqlResult }
  | { type: 'error'; payload: Error };

const initialState = {
  result: null,
  loading: false,
  error: null,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        result: state.result,
        loading: true,
        error: null,
      };
    case 'result':
      return {
        result: action.payload,
        loading: false,
        error: null,
      };
    case 'error':
      return {
        result: null,
        loading: false,
        error: action.payload,
      };
  }
};

export const useQuery = (
  getEndpoint: () => string,
  getQuery: () => string
): [State, () => Promise<void>] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleQuery = async () => {
    try {
      dispatch({ type: 'loading' });

      const url = new URL('/api/proxy', location.origin);
      url.searchParams.set('endpoint', getEndpoint());
      url.searchParams.set('query', getQuery());

      const response = await fetch(url.toString());

      if (response.ok) {
        const result = await response.json();
        dispatch({ type: 'result', payload: result });
      } else {
        const error = new Error(await response.text());
        dispatch({ type: 'error', payload: error });
      }
    } catch (e) {
      dispatch({ type: 'error', payload: e });
    }
  };

  return [state, handleQuery];
};
