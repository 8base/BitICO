

module.exports = {
  up: (queryInterface, DataType) => queryInterface.createTable('users', {
        id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        email: {
          type: DataType.STRING(255),
          validate: { isEmail: true },
          allowNull: false,
          unique: true
        },

        fullName: {
          type: DataType.STRING(255),
        },

        btcAddress: {
          type: DataType.STRING(120),
        },

        btcPrivateKey: {
          type: DataType.STRING(120),
        },

        rskAddress: {
          type: DataType.STRING(120),
        },

        rskPrivateKey: {
          type: DataType.STRING(120),
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

  down: (queryInterface) => queryInterface.dropTable('users')
};
