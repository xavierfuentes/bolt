const companiesHouseService = require('../../services/companiesHouse');
const experianService = require('../../services/experian');

const BusinessProfile = require('./model');

exports.get = async ({ params }, h) => {
  try {
    const { registrationNumber } = params;

    const rbsData = await BusinessProfile.findOne({
      'company.registrationNumber': registrationNumber,
    })
      .lean()
      .exec();

    if (!rbsData) {
      return { error: 'Business profile not Found' };
    }

    await Promise.all([experianService.init()]);
    console.log('✔ successfully logged in');

    console.log('fetching APIs...');
    const [chData, expData] = await Promise.all([
      companiesHouseService.fetchCompany({ registrationNumber }),
      experianService.fetchCompany({ registrationNumber }),
    ]);

    // todo: merge data

    return {
      ...rbsData,
      _raw: {
        companiesHouse: {
          provider: { id: 'companiesHouse', label: 'Companies House' },
          data: chData,
        },
        experian: { provider: { id: 'experian', label: 'Experian' }, data: expData },
      },
    };
  } catch (error) {
    return error;
    throw error;
  }
};

exports.update = async (req, h) => {
  try {
    const query = BusinessProfile.findByIdAndUpdate(req.params.id, {});
    const businessProfile = await query.exec();

    if (!businessProfile) return { error: 'BusinessProfile not found' };

    return businessProfile;
  } catch (error) {
    return error;
    throw error;
  }
};
