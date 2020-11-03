import { useState, useEffect } from 'react';

type EditorState = { endpoint: string; query: string };

export const useEditor = (endpoint: string, query: string) => {
  const [editor, setEditor] = useState<EditorState>({ endpoint, query });

  useEffect(() => {
    setEditor({ endpoint, query });
  }, [endpoint, query]);

  const handleEndpointChange = (value: string) => {
    setEditor({ ...editor, endpoint: value });
  };

  const handleQueryChange = (value: string) => {
    setEditor({ ...editor, query: value });
  };

  return { editor, handleEndpointChange, handleQueryChange };
};
