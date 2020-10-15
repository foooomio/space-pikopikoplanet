import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';

export const autocomplete = async (cm: CodeMirror.Editor): Promise<void> => {
  const cursor = cm.getCursor();
  const token = cm.getTokenAt(cursor);
  const tokens = cm.getLineTokens(cursor.line);

  if (
    tokens.length === 3 &&
    tokens[0].string.toUpperCase() === 'PREFIX' &&
    tokens[1].type === null &&
    tokens[2].start === token.start &&
    tokens[2].end === token.end
  ) {
    const prefixes = await getPrefixes();
    const list = prefixes.filter((prefix) => prefix.startsWith(token.string));

    cm.showHint({
      hint: () => ({
        list,
        from: CodeMirror.Pos(cursor.line, token.start),
        to: CodeMirror.Pos(cursor.line, token.end),
      }),
      completeSingle: false,
    });
  }
};

const STORAGE_KEY = 'prefixes';
const PREFIX_CC_URL = 'https://prefix.cc/popular/all.file.json';

let cache: string[] | undefined;

export const getPrefixes = async (): Promise<string[]> => {
  if (cache) {
    return cache;
  }

  const item = sessionStorage.getItem(STORAGE_KEY);
  if (item) {
    cache = JSON.parse(item) as string[];
    return cache;
  }

  try {
    const json = await fetch(PREFIX_CC_URL).then((res) => res.json());
    cache = Object.entries(json).map(([key, value]) => `${key}: <${value}>`);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.error(e);
    cache = [];
  }

  return cache;
};
