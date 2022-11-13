import { connect } from "react-redux";

const Notification = (props) => {
  const { message } = props;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={style}>
      {message}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    message: state.message
  };
};
const connectNotification = connect(mapStateToProps)(Notification);
export default connectNotification;
