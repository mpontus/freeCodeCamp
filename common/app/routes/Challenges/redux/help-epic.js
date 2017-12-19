import { ofType } from 'redux-epic';
import {
  types,
  closeBugModal
} from '../redux';

import { filesSelector } from '../../../files';
import { currentChallengeSelector } from '../../../redux';

function filesToMarkdown(files = {}) {
  const moreThenOneFile = Object.keys(files).length > 1;
  return Object.keys(files).reduce((fileString, key) => {
    const file = files[key];
    if (!file) {
      return fileString;
    }
    const fileName = moreThenOneFile ? `\\ file: ${file.contents}` : '';
    const fileType = file.ext;
    return fileString +
      '\`\`\`' +
      fileType +
      '\n' +
      fileName +
      '\n' +
      file.contents +
      '\n' +
      '\`\`\`\n\n';
  }, '\n');
}

export default function bugEpic(actions, { getState }, { window }) {
  return actions::ofType(types.createQuestion)
    .map(() => {
      const state = getState();
      const files = filesSelector(state);
      const challengeName = currentChallengeSelector(state);
      const {
        navigator: { userAgent },
        location: { href }
      } = window;
      const titleText = challengeName;
      const textMessage = [
        // New
        '**Tell us what\'s happening:**\n\n\n\n',
        '**Your code so far**\n',
        filesToMarkdown(files),
        '**Your browser information:**\n\n',
        'User Agent is: <code>',
        userAgent,
        '</code>.\n\n',
        '**Link to the challenge:**\n',
        href
      ].join('');
      
      window.open(
        'https://forum.freecodecamp.org/new-topic'
        + '?title=' + window.encodeURIComponent(titleText)
        + '&body=' + window.encodeURIComponent(textMessage)
        + '&category=help',
        '_blank'
      );

      return closeBugModal();
    });
}
