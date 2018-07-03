const { v4 } = require('uuid');

const companiesHouseService = require('../../services/companiesHouse');
const rbsService = require('../../services/rbs');
const experianService = require('../../services/experian');

const fetchCompanyHandler = async request => {
  const companyNumber = encodeURIComponent(request.params.companyNumber); // 01897720
  // todo: companyNumber exists "locally"? fetch it : parse and save it

  // perform all inits/logins at the same time
  try {
    await Promise.all([experianService.init()]);
    console.log('✔ successfully logged in');
  } catch (error) {
    console.log(error);
  }

  const [rbsData, chData, expData] = await Promise.all([
    rbsService.fetchCompany({ companyNumber }),
    companiesHouseService.fetchCompany({ companyNumber }),
    experianService.fetchCompany({ companyNumber }),
  ]);

  return {
    ...rbsData,
    individuals: chData.officers.map(({ name, occupation, address }) => ({
      id: v4(),
      name: name,
      role: occupation,
      address: {
        line1: address.address_line_1 && address.address_line_1,
        line2: address.address_line_2 && address.address_line_2,
        line3: address.address_line_3 && address.address_line_3,
        country: address.country,
        postcode: address.postal_code,
        premises: address.premises,
      },
    })),
    _raw: {
      providers: {
        companiesHouse: chData,
        experian: expData,
      },
    },
  };
};

module.exports = fetchCompanyHandler;
