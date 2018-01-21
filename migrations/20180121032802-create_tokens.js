

module.exports = {
  up: (queryInterface, DataType) => queryInterface.createTable('tokens', {
      id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataType.INTEGER,
        allowNull: false,

        references: {
          // This is a reference to another model
          model: "users",

          // This is the column name of the referenced model
          key: 'id',

        }
      },

      tokenLogo: {
        type: DataType.STRING(255),
      },

      tokenName: {
        type: DataType.STRING(255),
        allowNull: false,
        unique: true
      },

      tokenTicker: {
        type: DataType.STRING(255),
        allowNull: false,
        unique: true
      },

      totalSupply: {
        type: DataType.BIGINT,
        allowNull: false,
      },

      allocation: {
        type: DataType.BIGINT,
        allowNull: false,
      },

      softCap: {
        type: DataType.BIGINT,
        allowNull: false,
      },

      hardCap: {
        type: DataType.BIGINT,
        allowNull: false,
      },

      fundStartDate: {
        allowNull: false,
        type: DataType.INTEGER,
      },

      fundEndDate: {
        allowNull: false,
        type: DataType.INTEGER,
      },

      rate: {
        allowNull: false,
        type: DataType.INTEGER,
      },

    crowdsaleRskAddress: {
      type: DataType.STRING(40),
      allowNull: false,
      unique: true
    },

    tokenRskAddress: {
      type: DataType.STRING(40),
      allowNull: false,
      unique: true
    },

    createdAt: {
        allowNull: false,
        type: DataType.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataType.DATE
      },
      deletedAt: {
        type: DataType.DATE
      }
    }),

  down: (queryInterface) => queryInterface.dropTable('tokens')
};
