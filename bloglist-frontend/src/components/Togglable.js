import { forwardRef, useImperativeHandle, useState } from 'react';
import propTypes from 'prop-types';
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
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>);

});

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
};
export default Togglable;