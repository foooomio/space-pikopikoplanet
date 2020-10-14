import { useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  | { type: 'error'; payload: Error }
  | { type: 'reset' };

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
    case 'reset':
      return initialState;
  }
};

export const useQuery = (endpoint: string, query: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleQuery = async () => {
    try {
      dispatch({ type: 'loading' });

      const url = new URL('/api/proxy', location.origin);
      url.searchParams.set('endpoint', endpoint);
      url.searchParams.set('query', query);

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

  const { asPath } = useRouter();

  useEffect(() => {
    dispatch({ type: 'reset' });
  }, [asPath]);

  return { ...state, handleQuery };
};
