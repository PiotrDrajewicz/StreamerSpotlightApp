//model for creating streamer item in the database
module.exports = (sequelize, DataTypes) => {
    const Streamers = sequelize.define("Streamers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        upVotes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        downVotes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Streamers;
}