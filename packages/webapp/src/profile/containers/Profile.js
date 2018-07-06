import { connect } from 'react-redux';

import Profile from '../components/Profile';
import { fetchBusinessProfile } from '../actions/profile';

const mapStateToProps = state => ({
  profile: state.profile,
  registrationNumber: state.user.company.registrationNumber,
});

const mapDispatchToProps = {
  fetchBusinessProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
