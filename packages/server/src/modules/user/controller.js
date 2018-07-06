const User = require('./model');

exports.get = async (request, h) => {
  try {
    const query = User.findOne({ email: request.payload.email });
    const user = await query.exec();

    if (!user) return { error: 'User not Found' };

    return user;
  } catch (error) {
    return error;
    throw error;
  }
};
