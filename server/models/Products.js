module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        width: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            default: true,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Products;
};
