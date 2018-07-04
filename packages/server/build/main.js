require('source-map-support/register');
module.exports = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '/'; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 2));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const axios = __webpack_require__(1);

      // todo move to .env file
      const apiKey = 'Y38eajScB0cT55FlDo-9esuGLxnCYDGp1JtxtZ7l';
      const baseUrl = 'https://api.companieshouse.gov.uk';

      // TODO: move to a separate package
      // TODO: document
      const requiredParamAsync = paramName =>
        new Promise((resolve, reject) => {
          reject(new Error(`The parameter "${paramName}" is required and not empty nor null`));
        });

      const get = ({ apiKey, url, query } = {}) => {
        if (!apiKey) {
          requiredParamAsync('apiKey');
        }

        if (!url) {
          requiredParamAsync('url');
        }

        let requestConfig = { auth: { username: apiKey, password: '' } };

        if (query) {
          requestConfig = Object.assign({}, requestConfig, { params: { q: query } });
        }

        return axios.get(`${baseUrl}${url}`, requestConfig).then(r => r.data);
      };

      // Profile
      const fetchCompany = ({ companyNumber }) =>
        Promise.all([
          fetchCompanyProfile({ companyNumber }),
          fetchCompanyAddress({ companyNumber }),
          fetchCompanyOfficers({ companyNumber }),
        ]).then(([profile, address, officers]) => ({ profile, address, officers }));
      const fetchCompanyProfile = ({ companyNumber } = {}) =>
        !companyNumber
          ? requiredParamAsync('companyNumber')
          : get({ apiKey, url: `/company/${companyNumber}` });
      const fetchCompanyAddress = ({ companyNumber } = {}) =>
        !companyNumber
          ? requiredParamAsync('companyNumber')
          : get({ apiKey, url: `/company/${companyNumber}/registered-office-address` });
      const fetchCompanyOfficers = ({ companyNumber } = {}) =>
        !companyNumber
          ? requiredParamAsync('companyNumber')
          : get({ apiKey, url: `/company/${companyNumber}/officers` }).then(r => r.items); // todo: check whether there are more items

      // Search
      const searchAll = ({ query } = {}) =>
        !query ? requiredParamAsync('companyNumber') : get({ apiKey, url: '/search', query });
      const searchForCompanies = ({ query } = {}) =>
        !query
          ? requiredParamAsync('companyNumber')
          : get({ apiKey, url: '/search/companies', query });
      const searchForOfficers = ({ query } = {}) =>
        !query
          ? requiredParamAsync('companyNumber')
          : get({ apiKey, url: '/search/officers', query });
      const searchForDisqualifiedOfficers = ({ query } = {}) =>
        !query
          ? requiredParamAsync('companyNumber')
          : get({ apiKey, url: '/search/disqualified-officers', query });

      module.exports = {
        fetchCompany,
        fetchCompanyProfile,
        fetchCompanyAddress,
        fetchCompanyOfficers,
        searchAll,
        searchForCompanies,
        searchForOfficers,
        searchForDisqualifiedOfficers,
      };

      /***/
    },
    /* 1 */
    /***/ function(module, exports) {
      module.exports = require('axios');

      /***/
    },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(3);

      /***/
    },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const Hapi = __webpack_require__(4);

      const companiesApi = __webpack_require__(5);

      // Create a server with a host and port
      const server = Hapi.server({
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
      });

      // Start the server
      const init = async () => {
        await server.register(companiesApi);
        await server.start();
        return server;
      };

      init()
        .then(initialisedServer => {
          console.log('Server running at:', initialisedServer.info.uri);
        })
        .catch(err => {
          console.log(err);
        });

      process.on('unhandledRejection', err => {
        console.log(err);
        process.exit(1);
      });

      /***/
    },
    /* 4 */
    /***/ function(module, exports) {
      module.exports = require('hapi');

      /***/
    },
    /* 5 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const fetchCompanyHandler = __webpack_require__(6);
      const searchCompaniesHandler = __webpack_require__(11);

      const companiesApi = {
        name: 'CompaniesApi',
        register: async server => {
          server.route([
            {
              method: 'GET',
              path: '/company/{companyNumber}',
              handler: fetchCompanyHandler,
            },
            {
              method: 'GET',
              path: '/search/companies',
              handler: searchCompaniesHandler,
            },
          ]);
        },
      };

      module.exports = companiesApi;

      /***/
    },
    /* 6 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const { v4 } = __webpack_require__(7);

      const companiesHouseService = __webpack_require__(0);
      const rbsService = __webpack_require__(8);
      const experianService = __webpack_require__(10);

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

        return Object.assign({}, rbsData, {
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
        });
      };

      module.exports = fetchCompanyHandler;

      /***/
    },
    /* 7 */
    /***/ function(module, exports) {
      module.exports = require('uuid');

      /***/
    },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const mockedResponse = __webpack_require__(9);

      const requiredParamAsync = paramName =>
        new Promise.reject(
          new Error(`The parameter "${paramName}" is required and not empty nor null`)
        );

      const fetchCompany = ({ companyNumber } = {}) => {
        const {
          businessName,
          registrationAddress,
          tradingAddress,
          correspondenceAddress,
        } = mockedResponse.businessAddress;
        const { businessType, registrationNumber } = mockedResponse.userDetails;
        const { sicCode } = mockedResponse.businessDetails;
        const { permissions } = mockedResponse.permissionDetails;
        const getIndividuals = permissions =>
          permissions.map(person => ({
            id: person.UNIQUE_OBJECT_ID,
            name: person.personName,
            position: person.positionLabels,
          }));

        return !companyNumber
          ? requiredParamAsync('companyNumber')
          : Promise.resolve({
              company: {
                name: businessName,
                type: businessType.value,
                number: registrationNumber,
                sic: { code: sicCode.code, description: sicCode.value },
                id: 1,
                address: {
                  registered: Object.assign({}, registrationAddress, { label: 'Registered' }),
                  trading: Object.assign({}, tradingAddress, { label: 'Trading' }),
                  correspondence: Object.assign({}, correspondenceAddress, {
                    label: 'Correspondence',
                  }),
                },
              },
              individuals: getIndividuals(permissions),
              shareholders: {},
            });
      };

      module.exports = {
        fetchCompany,
      };

      /***/
    },
    /* 9 */
    /***/ function(module, exports) {
      module.exports = {
        summary: {
          requiresEmailMarketing: false,
          requiresTextMarketing: true,
          requiresPhoneCallMarketing: true,
          requiresPostMarketing: false,
        },
        permissionDetails: {
          checkPermissions: false,
          groups: [],
          permissions: [
            {
              personName: 'GEORGIA HUGHES',
              UNIQUE_OBJECT_ID: 'auto-cjhrpbbii0000375jor7ol70e',
              position: 'D, SH',
              positionLabels: 'Director, Shareholder',
              dateOfBirth: '1983-09-17',
              accountSignatory: true,
              isMemberPartner: false,
              hasSignChoice: true,
            },
            {
              personName: 'Test Test',
              UNIQUE_OBJECT_ID: 'kp-cjik1nazu00013c5mjm6oan1v',
              position: 'D, SH',
              positionLabels: 'Director, Shareholder',
              dateOfBirth: '1999-02-01',
              accountSignatory: true,
              isMemberPartner: false,
              hasSignChoice: true,
            },
          ],
          signatoryOptions: 'oneSignatory',
          hasSignatoryGroupsLimit: false,
          willApplyToFutureAccounts: false,
          allSignatoriesSignUnlimitedAmounts: false,
          hasSigningGroups: false,
          otherSigningRules: '',
          signingGroupsLimit: 0,
          groupAssigned: '',
          synchronizedWithTeamDetails: true,
        },
        accessDetails: {
          personsItems: [
            {
              personName: 'GEORGIA HUGHES',
              UNIQUE_OBJECT_ID: 'auto-cjhrpbbii0000375jor7ol70e',
              dateOfBirth: '1983-09-17',
              position: 'D, SH',
              requiresDebitCard: true,
              debitCardIndividualName: 'G HUGHES',
            },
            {
              personName: 'Test Test',
              UNIQUE_OBJECT_ID: 'kp-cjik1nazu00013c5mjm6oan1v',
              dateOfBirth: '1999-02-01',
              position: 'D, SH',
              requiresDebitCard: true,
              debitCardIndividualName: 'T Test',
            },
          ],
          requiresPaperStatements: false,
          requiresPayingInBook: false,
          requiresChequeBook: true,
          additionalProducts: {
            requiresOverdraft: false,
            requiresCreditCard: true,
            requiresDepositAccount: false,
            requiresWorldPay: false,
          },
          creditCardDetails: {
            cardHolders: [[null]],
            signingPerson: {
              firstName: 'GEORGIA',
              surname: 'HUGHES',
              dateOfBirth: '1983-09-17',
              UNIQUE_OBJECT_ID: 'auto-cjhrpbbii0000375jor7ol70e',
            },
            SRFP:
              'GEORGIA|HUGHES||D:SH|1983260|101 BEECH ROAD:FELTHAM:MIDDLESEX::GBR:TW14 8AJ:201432||Test|Test||D:SH|199932|101 BEECH ROAD:FELTHAM:MIDDLESEX::GBR:TW14 8AJ:2000306||',
            nameOnCard: 'SEDGEFIELD WINDOWS',
            BNFP: 'SEDGEFIELD WINDOWS & BUILDING LTD',
            numberOfCards: 1,
            directDebitOption: { code: 'FP', value: 'Full Payment(Total Balance)' },
            directDebitAccount: {
              directDebitAccountHolderName: '',
              sortCode: '',
              directDebitAccountNumber: '',
              isNewAccount: true,
            },
            businessName: 'SEDGEFIELD WINDOWS & BUILDING LTD',
            businessAddress: {
              line5: [null],
              postCode: 'TS21 2BL',
              line2: 'STOCKTON-ON-TEES',
              line1: '7 RECTORY ROW SEDGEFIELD',
            },
            creditcardType: 'Non CCA Simple Form',
          },
          requiresOnlineBanking: true,
          requiresAdditionalAccounts: false,
          businessAccountOperational: {},
          debitCardName: 'SEDGEFIELD WINDOWS & BUILDING LTD',
          synchronizedWithTeamDetails: true,
          requiresEmailMarketing: false,
          requiresTextMarketing: true,
          requiresPhoneCallMarketing: true,
          requiresPostMarketing: false,
          isComplexCardApplication: false,
          paperStatement: {},
        },
        businessDetails: {
          sicCode: {
            activityId: 12754,
            code: '12706',
            sicCode: '33.20/2/0',
            sic2007Code: '26513',
            busSubSector:
              'Manufacture of non-electronic instruments and appliances for measuring, checking',
            boeCode: 'LLN',
            value: 'Test benches, non-electronic, mfr.',
            suppQuestionId: '',
          },
          turnover: { code: '80000', value: 'Â£70,001 - Â£80,000' },
          dateStartedTrading: '2017-02-01',
          financialYearEnd: '2018-01-31',
          fullTimeEmployees: '3',
          tradingDescription:
            'My business is a Chinese take away serving traditional Chinese food such as noodles, fried dishes, serving starters, mains, desserts and soft drinks. We offer a collection and delivery service. Typical food prices range from Â£5 - Â£12. Average customer spends Â£12 - Â£15 weekly of which total taking per week is approximately Â£1500 which equates to a projected turnover of Â£78,000 per annum. I mainly serve customers in the local area and will be managing the day to day running of the business',
          hasLegalProceedings: false,
          accountPaymentTypes: [{ type: 'cheques' }],
          taxResidencyCountry: [],
          initialDeposit: [],
          legalProceedingsDescription: '',
          fluctuationsExplanation: '',
          partTimeEmployees: 0,
          isRegisteredForNonUKTax: false,
          nonUKRelationship: {
            paymentsMade: [],
            paymentsReceived: [],
            isPaymentsMade: false,
            isPaymentsReceived: false,
            paymentsMadePurposeDescription: '',
            paymentsReceivedPurposeDescription: '',
            isHoldMaterialAssetsOutsideUK: false,
            holdMaterialAssetsList: [],
            isHaveSupliersOrOperationsOutsideUK: false,
            suppliersOrOperationsList: [],
          },
          hasFluctuations: false,
          hasExistingBusinessRelationship: false,
          isSwitcher: false,
          hasInitialDeposit: false,
        },
        businessAddress: {
          businessName: 'SEDGEFIELD WINDOWS & BUILDING LTD',
          registrationAddress: {
            line1: '7 RECTORY ROW SEDGEFIELD',
            line2: 'STOCKTON-ON-TEES',
            line5: { code: 'GBR', value: 'United Kingdom' },
            postCode: 'TS21 2BL',
          },
          tradingAddress: {
            line1: '7 RECTORY ROW SEDGEFIELD',
            line2: 'STOCKTON-ON-TEES',
            line5: { code: 'GBR', value: 'United Kingdom' },
            postCode: 'TS21 2BL',
          },
          correspondenceAddress: {
            line1: '7 RECTORY ROW SEDGEFIELD',
            line2: 'STOCKTON-ON-TEES',
            line5: { code: 'GBR', value: 'United Kingdom' },
            postCode: 'TS21 2BL',
          },
          correspondenceAddressType: 'Registered Address',
          isTradingNameSame: true,
          isTradingAddressSame: true,
          isCorrespondenceAddressSame: true,
          otherNames: '',
          isCorrespondenceAddressUK: true,
          businessCountryPhysicallyBased: { code: 'GBR', value: 'United Kingdom' },
          businessCountryOfRegistration: { code: 'GBR', value: 'United Kingdom' },
          premisisOwnedLeased: 'Leased',
        },
        userDetails: {
          title: { code: '01', value: 'MR' },
          firstName: 'Mohammed',
          surname: 'Shariff',
          businessEmail: 'TESTINTUSR013@mde.rbs.co.uk',
          isBasedUK: true,
          businessType: { code: 'LC', value: 'Limited Company' },
          registrationNumber: '11076174',
          keyfactsCheckBox: true,
        },
        applicationInfo: {
          createVersion: 11,
          processInstanceId: 24034,
          bankingDivision: 'Business Banking',
          lastModifiedDate: '2018-06-18 10:17:39',
          channel: 'Telephony Online',
          type: 'BB',
          userId: 'ZEBRA_NAGESH.POLEPALLY@RBS.CO.UK',
          currentVersion: 11,
          subProductType: 'Business Current Account',
          createdByInternal: true,
          applicationStatus: 'Submitted',
          stepName: 'summary',
          snapshotName: 'EOBAO_2018MAY281006',
          lastModifiedUser: 'NAGESH.POLEPALLY@RBS.CO.UK',
          arn: 'NB00278762',
          brand: 'NATWEST',
          taskId: '420510',
          productType: 'Current Account',
          startDate: '2018-05-29 14:10:02',
          sdd: false,
          accountTitle: 'SEDGEFIELD WINDOWS & BUILDING ',
          accountTitleDescription: 'SEDGEFIELD WINDOWS & BUILDING LTD',
          isTrustPlcOrOther: false,
          businessInfoNotFetched: false,
          beneficialOwnersNotFetched: false,
          creditCardFeatureToggle: true,
          isUKIA: false,
        },
        teamDetails: {
          companies: [],
          team: [
            {
              firstName: 'GEORGIA',
              position: [null],
              financialOwnership: '50',
              surname: 'HUGHES',
              votingOwnership: '50',
              kpOccupation: [null],
              kpRelationship: [null],
              countryCallingCode: [null],
              UNIQUE_OBJECT_ID: 'auto-cjhrpbbii0000375jor7ol70e',
              dateOfBirth: '1983-09-17',
              title: [null],
              otherNames: '',
              personalBankAccount: {},
              nonUKTaxResidentCountryTIN: '',
              cardType: [],
              priorHomeAddresses: [],
              timeInBusinessMonths: 7,
              timeInBusinessYears: 17,
              isMemberOfManagementBoard: false,
              isKpHomeAddressUK: true,
              contactName: 'GEORGIA HUGHES',
              countryOfBirth: [null],
              nationality: [null],
              kpCountryOfResidence: [null],
              homeAddress: [null],
              dateOfEntry: '2014-02-01',
              email: 'test@test.com',
              phone: '7766554421',
              gender: 'male',
              townOfBirth: 'London',
              hasPersonalBankAccount: false,
              timeInBusiness: '2000-11-01T00:00:00.000Z',
              isNonUKTaxResident: false,
              isPrimaryContact: true,
              kpHomeTelephoneNumber: '7766554421',
              isUnder18: false,
              hasBeenInsolvent: false,
              dataLevel: '6',
              memorableWord: 'London',
            },
            {
              UNIQUE_OBJECT_ID: 'kp-cjik1nazu00013c5mjm6oan1v',
              position: [null],
              countryOfBirth: [null],
              nationality: [null],
              priorHomeAddresses: [],
              personalBankAccount: {},
              countryCallingCode: [null],
              title: [null],
              firstName: 'Test',
              surname: 'Test',
              dateOfBirth: '1999-02-01',
              isPrimaryContact: false,
              email: 'test1@test.com',
              phone: '7788996655',
              gender: 'female',
              townOfBirth: 'London',
              hasPersonalBankAccount: false,
              timeInBusiness: '2000-11-01T00:00:00.000Z',
              isNonUKTaxResident: false,
              homeAddress: [null],
              kpCountryOfResidence: [null],
              dateOfEntry: '2000-11-01',
              votingOwnership: '50',
              financialOwnership: '50',
              kpOccupation: [null],
              kpRelationship: [null],
              otherNames: '',
              nonUKTaxResidentCountryTIN: '',
              cardType: [],
              timeInBusinessMonths: 7,
              timeInBusinessYears: 17,
              isMemberOfManagementBoard: false,
              isKpHomeAddressUK: true,
              contactName: 'Test Test',
              kpHomeTelephoneNumber: '7788996655',
              isUnder18: false,
              hasBeenInsolvent: false,
              dataLevel: '6',
              memorableWord: 'London',
            },
          ],
          teamIsValid: true,
          hasManagementBoard: false,
          businessEmail: 'test@test.com',
          contacts: [],
          hasRbo: false,
          teamDetailsAlreadySubmitted: true,
        },
      };

      /***/
    },
    /* 10 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const axios = __webpack_require__(1);

      const API_BASE_URL = 'https://sandbox-uk-api.experian.com';
      const TOKEN_URL = `${API_BASE_URL}/oauth2/v1/token`;
      const PROFILE_URL = `${API_BASE_URL}/risk/business/v1/businesstargeter`;
      const CLIENT_ID = 'LnSftXjmh9hNGtUKyS8JxbX9RluG2xb9';
      const CLIENT_SECRET = 'jO3AuQtk6qjeFkpN';
      const CLIENT_USERNAME = 'xavier.fuentes@theappbusiness.com';
      const CLIENT_PASSWORD = '77p*OAk6Pomr';

      let access_token = null;
      let refresh_token = null;

      const init = async () => {
        // if (!access_token) {
        // get access token
        console.log('Logging in Experian...');
        const response = await axios({
          method: 'post',
          url: TOKEN_URL,
          data: { username: CLIENT_USERNAME, password: CLIENT_PASSWORD },
          headers: {
            'Cache-Control': 'no-cache',
            Client_id: CLIENT_ID,
            Client_secret: CLIENT_SECRET,
            'Content-Type': 'application/json',
          },
        })
          .then(r => r.data)
          .catch(error => {
            console.log(error);
          });
        access_token = response.access_token;
        refresh_token = response.refresh_token;
        // } else {
        //   console.log('already logged in -> ', access_token);
        // }
      };

      const fetchCompany = async ({ companyNumber }) => {
        if (!access_token) {
          await init();
        }

        // validate expired token

        return axios({
          method: 'get',
          url: PROFILE_URL,
          params: { name: 'Test' },
          // params: { businessref: companyNumber },
          headers: {
            'Cache-Control': 'no-cache',
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(r => r.data)
          .then(r => r.SearchResults[0]) // should be unique!
          .catch(error => {
            console.log(error);
          });
      };

      module.exports = {
        fetchCompany,
        init,
      };

      /***/
    },
    /* 11 */
    /***/ function(module, exports, __webpack_require__) {
      'use strict';

      const companiesHouseService = __webpack_require__(0);

      const searchCompaniesHandler = async request =>
        companiesHouseService
          .searchForCompanies({ query: request.query.query })
          .then(({ data }) => data);

      module.exports = searchCompaniesHandler;

      /***/
    },
    /******/
  ]
);
//# sourceMappingURL=main.map
