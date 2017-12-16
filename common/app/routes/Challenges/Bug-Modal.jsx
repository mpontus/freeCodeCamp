import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import ns from './ns.json';
import {
  createIssue,
  openIssueSearch
} from './redux';

const mapDispatchToProps = { createIssue, openIssueSearch };
const bugLink = 'http://forum.freecodecamp.org/t/how-to-report-a-bug/19543';

const propTypes = {
  createIssue: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  openIssueSearch: PropTypes.func,
  show: PropTypes.bool.isRequired
};

export class BugModal extends PureComponent {
  render() {
    const {
      show,
      onClose,
      openIssueSearch,
      createIssue
    } = this.props;
    return (
      <Modal
        show={ show }
        >
        <Modal.Header className={ `${ns}-list-header` }>
          Did you find a bug?
          <span
            className='close closing-x'
            onClick={ onClose }
            >
            ×
          </span>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h3>
            Before you submit a new issue,
            read "How to Report a Bug" and
            browse other issues with this challenge.
          </h3>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            href={ bugLink }
            target='_blank'
            >
            Read "How to Report a Bug"
          </Button>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            onClick={ openIssueSearch }
            >
            Browse other issues with this challenge
          </Button>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            onClick={ createIssue }
            >
            Create topic for issue in community forum
          </Button>
          <Button
            block={ true }
            bsSize='lg'
            bsStyle='primary'
            onClick={ onClose }
            >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

BugModal.displayName = 'BugModal';
BugModal.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(BugModal);
