module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        orderNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    })
    return Order;
}