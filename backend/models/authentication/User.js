module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      // Basic Info
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },

      mobile: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true
      },

      // Profile
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true
      },

      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true
      },

      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },

      // OTP
      otp_code: {
        type: DataTypes.STRING(6),
        allowNull: true
      },

      otp_expires_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      mobile_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      // Status
      status: {
        type: DataTypes.ENUM("active", "inactive", "blocked"),
        defaultValue: "active"
      },

      // Login Info
      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      last_login_ip: {
        type: DataTypes.STRING,
        allowNull: true
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      timestamps: false,
      paranoid: true,
      tableName: "users",
      underscored: true
    }
  );

  return User;
};
