import { useReducer } from 'react';

const initialState = {
  result: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
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

export function useQuery(getEndpoint, getQuery) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleQuery = async () => {
    try {
      dispatch({ type: 'loading' });

      const url = new URL('/api/proxy', location.origin);
      url.searchParams.set('endpoint', getEndpoint());
      url.searchParams.set('query', getQuery());

      const response = await fetch(url);

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
}
