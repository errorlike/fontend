import { forwardRef, useImperativeHandle, useState } from 'react';
import propTypes from 'prop-types';
import { Button } from '@mui/material';
// eslint-disable-next-line react/display-name
const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : null };
  const showWhenVisible = { display: visible ? null : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' size='small' onClick={toggleVisibility}>{buttonLabel}</Button >
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant='contained' size='small' onClick={toggleVisibility} color='secondary'>cancel</Button>
      </div>
    </div>);

});

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
};
export default Togglable;