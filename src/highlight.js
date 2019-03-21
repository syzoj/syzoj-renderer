import Pygments from 'pygments-promise';
import EscapeHTML from 'escape-html';

export default async function highlight(code, language) {
  if (language === 'plain') {
    return EscapeHTML(code);
  }

  return await Pygments.pygmentize(code, {
    lexer: language,
    format: 'html',
    options: {
      nowrap: true,
      classprefix: 'pl-'
    }
  });
}
