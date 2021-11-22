import React from 'react';
import PropTypes from 'prop-types';
import MessageBoxStyel from './Styles';

function MessageBox(props) {
  const { children } = props;

  return <MessageBoxStyel {...props}>{children}</MessageBoxStyel>;
}

MessageBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessageBox;
