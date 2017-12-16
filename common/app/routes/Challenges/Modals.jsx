import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PureComponent from 'react-pure-render/component';
import BugModal from './Bug-Modal.jsx';
import HelpModal from './Help-Modal.jsx';
import {
  isModalOpenSelector,
  modalTypeSelector,
  closeModal
} from './redux';

const mapStateToProps = state => ({
  isOpen: isModalOpenSelector(state),
  modalType: modalTypeSelector(state)
});

const mapDispatchToProps = { closeModal };

const propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  modalType: PropTypes.string
};

export class Modals extends PureComponent {
  render() {
    const { isOpen, modalType, closeModal } = this.props;

    switch (modalType) {
      case 'bug':
        return <BugModal onClose={ closeModal } show={ isOpen }/>;

      case 'help':
        return <HelpModal onClose={ closeModal } show={ isOpen }/>;

      default:
        return null;
    }
  }
}

Modals.displayName = 'Modals';
Modals.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals);
