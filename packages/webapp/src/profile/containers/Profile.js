import { connect } from 'react-redux';

import Profile from '../components/Profile';
import { fetchBusinessProfile } from '../actions/profile';

const mapStateToProps = state => ({
  profile: state.profile,
  businessId: state.user.business.id,
});

const mapDispatchToProps = {
  fetchBusinessProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
