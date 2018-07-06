const Profile = require('../models/profile');

const fetchCompany = ({ companyNumber } = {}) => {
  // ...
};

// const mockedResponse = require('../mocks/rbs-business-profile.json');

// const requiredParamAsync = paramName =>
//   new Promise.reject(new Error(`The parameter "${paramName}" is required and not empty nor null`));

// const fetchCompany = ({ companyNumber } = {}) => {
//   const {
//     businessName,
//     registrationAddress,
//     tradingAddress,
//     correspondenceAddress,
//   } = mockedResponse.businessAddress;
//   const { businessType, registrationNumber } = mockedResponse.userDetails;
//   const { sicCode } = mockedResponse.businessDetails;
//   const { permissions } = mockedResponse.permissionDetails;
//   const getIndividuals = permissions =>
//     permissions.map(person => ({
//       id: person.UNIQUE_OBJECT_ID,
//       name: person.personName,
//       position: person.positionLabels,
//     }));

//   return !companyNumber
//     ? requiredParamAsync('companyNumber')
//     : Promise.resolve({
//         company: {
//           name: businessName,
//           type: businessType.value,
//           number: registrationNumber,
//           sic: { code: sicCode.code, description: sicCode.value },
//           id: 1,
//           address: {
//             registered: { ...registrationAddress, label: 'Registered' },
//             trading: { ...tradingAddress, label: 'Trading' },
//             correspondence: { ...correspondenceAddress, label: 'Correspondence' },
//           },
//         },
//         individuals: getIndividuals(permissions),
//         shareholders: {},
//       });
// };

module.exports = {
  fetchCompany,
};
