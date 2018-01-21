import moment from 'moment';

const formatDate = d => moment(new Date(d * 1000)).format('MMM Do');

const TokenFields = {
    tokenLogo: {
      name: 'Token Logo',
      key: 'tokenLogo',
      type: 'file',
      visibleInListView: true,
    },
    tokenName: {
      name: 'Token Name',
      key: 'tokenName',
      example: 'Ex: BitBam',
      type: 'text',
      visibleInListView: true,
    },
    tokenTicker: {
      name: 'Token Ticker',
      key: 'tokenTicker',
      example: 'Ex: COI',
      type: 'text',
      validation: (text) => {
        if (/^[^a-z]*$/.test(text)) {
          return "";
        }

        return "Must be an all caps string";
      },
      visibleInListView: true,
    },
    totalSupply: {
      name: 'Total Supply',
      key: 'totalSupply',
      example: 'Ex: 1,000,000',
      type: 'number',
      validation: (text) => {
        if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
          return "";
        }

        return "Must a number without decimals (commas optional but must be properly formatted)";
      },
      visibleInListView: true,
    },
    allocation: {
      name: 'Allocation',
      key: 'allocation',
      example: 'Ex: 300,000',
      type: 'number',
      validation: (text) => {
        if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
          return "";
        }

        return "Must a number without decimals (commas optional but must be properly formatted)";
      },
      visibleInListView: true,
    },
    softCap: {
      name: 'Soft Cap',
      key: 'softCap',
      type: 'number',
      validation: (text) => {
        if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
          return "";
        }

        return "Must a number without decimals (commas optional but must be properly formatted)";
      },
      visibleInListView: true,
    },
    hardCap: {
      name: 'Hard Cap',
      key: 'hardCap',
      type: 'number',
      validation: (text) => {
        if (/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(text)) {
          return "";
        }

        return "Must a number without decimals (commas optional but must be properly formatted)";
      },
      visibleInListView: true,
    },
    fundStartDate: {
      name: 'Fund Start Date',
      key: 'fundStartDate',
      type: 'date',
      visibleInListView: true,
      format: formatDate
    },
    fundEndDate: {
      name: 'Fund End Date',
      key: 'fundEndDate',
      type: 'date',
      visibleInListView: true,
      format: formatDate
    },
    btcValuePerToken: {
      name: 'BTC Value Per Token',
      key: 'btcValuePerToken',
      example: 'Ex: 0.00001',
      type: 'float',
      visibleInListView: true,
    },

  }
;


export default TokenFields;
