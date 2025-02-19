import db from "../../database/database.js";

export interface Coach {
  steamid: string;
}

export const getCoaches = (): Promise<Coach[]> => {
  const sql = `SELECT * FROM coaches`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error getting coaches: ", err.message);
        reject(err);
      } else {
        resolve(rows as Coach[]);
      }
    });
  });
};

export const createCoach = (steamid: string) => {
  const sql = `
  INSERT INTO coaches (steamid)
  VALUES (?)
`;
  return new Promise((resolve, reject) => {
    db.run(sql, [steamid], function (err) {
      if (err) {
        console.error("Error inserting coach:", err.message);
        reject(err);
      } else {
        resolve(steamid);
      }
    });
  });
};

export const deleteCoach = (steamid: string) => {
  const sql = `DELETE FROM coaches WHERE steamid = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [steamid], function (err) {
      if (err) {
        console.error("Error deleting coach :", err.message);
        reject(err);
      } else {
        resolve("Coach deleted");
      }
    });
  });
};
