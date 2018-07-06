const Profile = require('../models/profile');

exports.get = async (request, h) => {
  try {
    const query = Profile.findOne({ 'company.registrationNumber': request.params.companyNumber });
    const profile = await query.exec();

    if (!profile) return { error: 'Profile not Found' };

    return profile;
  } catch (error) {
    return error;
    throw error;
  }
};

exports.update = async (req, h) => {
  try {
    const query = Profile.findByIdAndUpdate(req.params.id, {});
    const profile = await query.exec();

    if (!profile) return { error: 'Profile not found' };

    return profile;
  } catch (error) {
    return error;
    throw error;
  }
};
