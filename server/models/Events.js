module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("Events", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        startTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 

        endTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Events
}