const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize')

class Post extends Model {
  static associate(models) {
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    }),
      models.Post.hasMany(models.Comment)
    models.Post.hasMany(models.Like)
  }
}
Post.init(
  {
    message: {
      type: DataTypes.TEXT,
      allowNul: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
)

module.export = Post
