module.exports = (sequelize, DataTypes) => {
  const WhatsappDraft = sequelize.define('WhatsappDrafts', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    step: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'waiting_image',
    },
    draft_json: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    media_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media_mime_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return WhatsappDraft;
};
