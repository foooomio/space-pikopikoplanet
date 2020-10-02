import unified from 'unified';
import parse from 'remark-parse';
import breaks from 'remark-breaks';
const remark2react = require('remark-react');

const processer = unified().use(parse).use(breaks).use(remark2react);

export const markdown = (text: string): JSX.Element =>
  processer.processSync(text).result as JSX.Element;
