const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/sequelize')

class Comment extends Model {
  static associate(models) {
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    }),
      models.Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: 'CASCADE',
      })
  }
}
Comment.init(
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
)

module.export = Comment
