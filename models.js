const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with environment variables or default to development values
const sequelize = new Sequelize(
    process.env.DB_NAME || 'koslo_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: process.env.NODE_ENV !== 'production',
    }
);

// Define RubberPrice model
const RubberPrice = sequelize.define('RubberPrice', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// Define Order model
const Order = sequelize.define('Order', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Sync models with the database
const syncModels = async () => {
    // Only force sync in development mode
    const forceSync = process.env.NODE_ENV !== 'production';
    await sequelize.sync({ force: forceSync });
    console.log('Database synced', forceSync ? 'with force' : 'without force');
};

// Only auto-sync in development
if (process.env.NODE_ENV !== 'production') {
    syncModels();
}

module.exports = { RubberPrice, Order, sequelize };
