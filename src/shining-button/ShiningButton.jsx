import React from 'react';
import './shining-button.css';

const ShiningButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props}>
    {props.text}
  </button>
));

export default ShiningButton;