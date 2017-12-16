import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import PureComponent from 'react-pure-render/component';

import ns from './ns.json';
import {
  createQuestion,
  closeHelpModal,

  helpModalSelector
} from './redux';

const mapStateToProps = state => ({ isOpen: helpModalSelector(state) });
const mapDispatchToProps = { createQuestion, closeHelpModal };
const methodologyUrl = 'https://forum.freecodecamp.org/t/the-read-search-ask-methodology-for-getting-unstuck/137307'; // eslint-disable-line max-len

const propTypes = {
  closeHelpModal: PropTypes.func,
  createQuestion: PropTypes.func,
  isOpen: PropTypes.bool
};

export class HelpModal extends PureComponent {
  render() {
    const {
      isOpen,
      closeHelpModal,
      createQuestion
    } = this.props;
    return (
      <Modal
        show={ isOpen }
        >
        <Modal.Header className={ `${ns}-list-header` }>
          Ask for help?
          <span
            className='close closing-x'
            onClick={ closeHelpModal }
            >
            ×
          </span>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h3>
          If you've already tried the&nbsp;Read-Search-Ask&nbsp;method,
          then you can ask for help on the freeCodeCamp forum.
          </h3>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            href={ methodologyUrl }
            target='_blank'
            >
            Learn about the Read-Search-Ask Methodology
          </Button>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            onClick={ createQuestion }
            >
            Create a help post on the forum
          </Button>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            onClick={ closeHelpModal }
            >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

HelpModal.displayName = 'HelpModal';
HelpModal.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(HelpModal);
