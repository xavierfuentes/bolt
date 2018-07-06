import React from 'react';
import PropTypes from 'prop-types';

import Summary from './Summary';
import Contacts from './Contacts';
import Address from './Address';

class Profile extends React.Component {
  static propTypes = {
    registrationNumber: PropTypes.number.isRequired,
    fetchBusinessProfile: PropTypes.func,
    profile: PropTypes.shape({}),
  };

  componentDidMount() {
    const { registrationNumber, fetchBusinessProfile } = this.props;
    fetchBusinessProfile({ registrationNumber });
  }

  render() {
    const { profile = null } = this.props;

    if (!profile) {
      return <article>Loading...</article>;
    }

    // todo: use selectors
    const { company, individuals } = profile;
    const { name, type, number, sic } = company;
    const summary = {
      data: {
        name: { id: 'name', label: 'Business name', value: name },
        type: { id: 'type', label: 'Business type', value: type },
        number: { id: 'number', label: 'Company number', value: number },
        sic: {
          id: 'sic',
          label: 'Nature of business (SIC)',
          value: `${sic.code} - ${sic.description}`,
        },
      },
    };

    return (
      <div>
        <div>
          Your Business Profile / {name}
          Last logged in dd/mm/yy
        </div>

        <div>
          <h3>Business Details</h3>
          <p>
            We check the profile information we hold on you against our{' '}
            <span>3rd party sources</span> to ensure that we have the most up-to-date picture of you
            and your business
          </p>
          <span>Where did this information come from?</span>

          <div>
            <div>
              <h3>Summary</h3>
              <span>Updated dd/mm/yy</span>
            </div>
            <Summary {...summary} />
          </div>

          <div>
            <div>
              <h3>Address Information</h3>
              <span>Updated dd/mm/yy</span>
            </div>
            {/* <Address data={company.address} /> */}
          </div>

          <div>
            <div>
              <h3>Key Contacts</h3>
              <span>Updated dd/mm/yy</span>
            </div>
            {/* <Contacts data={individuals} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
