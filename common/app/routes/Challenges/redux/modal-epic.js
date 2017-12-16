import { Observable } from 'rx';
import { ofType } from 'redux-epic';
import { types, chatRoomSelector } from '../redux';

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
  return actions::ofType(
    types.openIssueSearch,
    types.createIssue,
    types.createQuestion,
    types.openHelpChatRoom
  )
    .map(({ type }) => {
      const state = getState();
      const files = filesSelector(state);
      const challengeName = currentChallengeSelector(state);
      const helpChatRoom = chatRoomSelector(state);
      const {
        navigator: { userAgent },
        location: { href }
      } = window;

      switch (type) {
        case types.openIssueSearch:
          window.open(
            'https://forum.freecodecamp.org/search?q=' +
            window.encodeURIComponent(challengeName)
          );

          break;

        case types.createIssue: {
          const titleText = 'Need assistance in ' + challengeName;
          let textMessage = [
            '#### Challenge Name\n',
            '[',
            challengeName,
            '](',
            href,
            ') has an issue.\n',
            '#### Issue Description\n',
            '<!-- Describe below when the issue happens and how to ',
            'reproduce it -->\n\n\n',
            '#### Browser Information\n',
            '<!-- Describe your workspace in which you are having issues-->\n',
            'User Agent is: <code>',
            userAgent,
            '</code>.\n\n',
            '#### Screenshot\n',
            '<!-- Add a screenshot of your issue -->\n\n\n',
            '#### Your Code'
          ].join('');

          const body = filesToMarkdown(files);
          if (body.length > 10) {
            textMessage += body;
          }

          window.open(
            'https://forum.freecodecamp.org/new-topic'
            + '?category=General'
            + '&title=' + window.encodeURIComponent(titleText)
            + '&body=' + window.encodeURIComponent(textMessage),
            '_blank'
          );

          break;
        }

        case types.openHelpChatRoom:
          window.open(
            'https://gitter.im/freecodecamp/' +
            window.encodeURIComponent(helpChatRoom)
          );

          break;

        case types.createQuestion: {
          const titleText = challengeName;
          const textMessage = [
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
            + '?category=help'
            + '&title=' + window.encodeURIComponent(titleText)
            + '&body=' + window.encodeURIComponent(textMessage),
            '_blank'
          );

          break;
        }

        default:
          break;
      }

      return Observable.empty();
    });
}
