import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export function getPrettyCode({ codeArray }: { codeArray: string[] }) {
  return codeArray.map(elem => hljs.highlight(
    `${elem}`,
    { language: 'javascript' }
  ).value);
}