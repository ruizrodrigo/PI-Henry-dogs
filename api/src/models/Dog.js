const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('name');
        const first = rawValue[0].toUpperCase()
        const second = rawValue.slice(1, Infinity).toLowerCase()
        return first + second
      }
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_imperial: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_imperial: {
      type: DataTypes.STRING,
    },
    life_span: {
      type: DataTypes.STRING,
      defaultValue: 'Dont provided',
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    timestamps: false,
  });
};
