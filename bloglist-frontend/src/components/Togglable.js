import { useState } from "react";
const Togglable = ({ buttonLabel, children }) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : null };
    const showWhenVisible = { display: visible ? null : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible)
    }
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

};

export default Togglable;