

module.exports = {
  up: (queryInterface, DataType) => queryInterface.createTable('purchases', {
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

      tokenId: {
        type: DataType.INTEGER,
        allowNull: false,

        references: {
          // This is a reference to another model
          model: "tokens",

          // This is the column name of the referenced model
          key: 'id',

        }
      },

      createdAt: {
        allowNull: false,
        type: DataType.DATE
      },

      updatedAt: {
        allowNull: false,
        type: DataType.DATE
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('purchases')
};
