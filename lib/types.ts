import type { RefObject } from 'react';
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
  forkedFrom?: string;
};

export type QueryWithLikedAt = Query & {
  likedAt: number;
};

export type Comment = {
  commentId: string;
  queryId: string;
  authorUid: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: number;
  updatedAt: number;
};

export type NotificationType = 'like' | 'comment';

export type Notification = {
  type: NotificationType;
  notificationId: string;
  queryId: string;
  authorUid: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  unread: boolean;
};

export type SearchOptions = {
  authorUid?: string;
  endpoint?: string;
  tag?: string;
};

export type SparqlResult = {
  head: {
    vars: string[];
  };
  results: {
    bindings: {
      [key: string]: {
        type: 'uri' | 'literal' | 'bnode';
        value: string;
        datatype?: string;
        'xml:lang'?: string;
      };
    }[];
  };
};

export type InputWithRef = Input & {
  inputRef: RefObject<HTMLInputElement>;
};
