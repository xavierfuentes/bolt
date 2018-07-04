import { connect } from 'react-redux';

import LoginRegister from '../components/LoginRegister';
import { authenticate } from '../actions/user';

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  login: authenticate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginRegister);
