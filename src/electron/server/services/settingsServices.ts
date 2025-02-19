import db from "../../database/database.js";

export const getSettings = () => {
  const sql = `SELECT * FROM settings`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error getting settings: ", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

interface Setting {
  key: string;
  value: string;
}

export const updateSettings = (settings: Setting): Promise<Setting> => {
  const sql = `
    UPDATE settings
    SET value = ?
    WHERE key = ?
`;
  return new Promise((resolve, reject) => {
    db.run(sql, [settings.value, settings.key], function (err) {
      if (err) {
        console.error("Error updating settings:", err.message);
        reject(err);
      } else {
        resolve(settings);
      }
    });
  });
};
