import { connect } from 'react-redux';

import Root from '../components/Root';
import { unauthenticate } from '../../user/actions/user';

const mapStateToProps = state => ({
  isAuthenticated: !!state.user._id,
});

const mapDispatchToProps = {
  unauthenticate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
