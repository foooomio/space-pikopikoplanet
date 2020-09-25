import React from 'react';
import type { Input } from 'semantic-ui-react';

export type User = {
  uid: string;
};

export type UserData = {
  uid: string;
  userId: string;
  userName: string;
  website: string;
  facebookId: string;
  twitterId: string;
  gitHubId: string;
};

export type Query = {
  queryId: string;
  authorUid: string;
  authorId: string;
  authorName: string;
  title: string;
  endpoint: string;
  query: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
};

export type QueryWithLikedAt = Query & {
  likedAt: number;
};

export type SearchOptions = {
  authorUid?: string;
  tag?: string;
};

export type SparqlResult = {
  head: {
    vars: string[];
  };
  results: {
    bindings: any[];
  };
};

export type InputWithRef = Input & {
  inputRef: React.RefObject<HTMLInputElement>;
};
