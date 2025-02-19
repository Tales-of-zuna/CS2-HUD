import db from "../../database/database.js";

//Services don't know they are working with express.

export const getMatches = () => {
  const sql = `SELECT * FROM matches`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error getting Matches: ", err.message);
        reject(err);
      } else {
        const matches: Match[] = rows.map((row: any) => ({
          id: row.id,
          current: row.current,
          left: { id: row.left_id, wins: row.left_wins },
          right: { id: row.right_id, wins: row.right_wins },
          matchType: row.matchType,
          vetos: JSON.parse(row.vetos),
        }));
        resolve(matches);
      }
    });
  });
};

export const createMatch = (match: Match) => {
  const sql = `
  INSERT INTO matches (id, current, left_id, left_wins, right_id, right_wins, matchType, vetos)
  VALUES (?, ?, ?, ?, ?, ?, ? , ?)
`;
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        match.id,
        match.current,
        match.left.id,
        match.left.wins,
        match.right.id,
        match.right.wins,
        match.matchType,
        JSON.stringify(match.vetos),
      ],
      function (err) {
        if (err) {
          console.error("Error inserting team:", err.message);
          reject(err);
        } else {
          console.log(`${match.matchType} created with ID ${match.id}`);
          resolve(match);
        }
      },
    );
  });
};

export const getMatchById = (id: string) => {
  const sql = `SELECT * FROM matches WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.get(sql, [id], function (err, row: any) {
      if (err) {
        console.error("Error finding match:", err.message);
        reject(err);
      } else {
        const match: Match = {
          id: row.id,
          current: row.current,
          left: { id: row.left_id, wins: row.left_wins },
          right: { id: row.right_id, wins: row.right_wins },
          matchType: row.matchType,
          vetos: JSON.parse(row.vetos),
        };
        resolve(match);
      }
    });
  });
};

export const deleteMatch = (id: string) => {
  const sql = `DELETE FROM matches WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) {
        console.error("Error deleting match:", err.message);
        reject(err);
      } else {
        console.log(`Match deleted`);
        resolve("Match deleted");
      }
    });
  });
};

export const updateMatch = (id: string, match: Match) => {
  const sql = `UPDATE matches SET current = ?, left_id = ?, left_wins = ?, right_id = ?, right_wins = ?, matchType = ?, vetos = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [
        match.current,
        match.left.id,
        match.left.wins,
        match.right.id,
        match.right.wins,
        match.matchType,
        JSON.stringify(match.vetos),
        id,
      ],
      function (err) {
        if (err) {
          console.error("Error updating match:", err.message);
          reject(err);
        } else {
          console.log(`Match updated with id: ${id}`);
          resolve(`Match updated with id: ${id}`);
        }
      },
    );
  });
};

export const getCurrentMatch = () => {
  const sql = `SELECT * FROM matches WHERE current = 1`;
  return new Promise((resolve, reject) => {
    db.get(sql, function (err, row: any) {
      if (err) {
        console.error("Error getting current match:", err.message);
        reject(err);
      }
      if (!row) {
        resolve(null);
      } else {
        const match: Match = {
          id: row.id,
          current: row.current,
          left: { id: row.left_id, wins: row.left_wins },
          right: { id: row.right_id, wins: row.right_wins },
          matchType: row.matchType,
          vetos: JSON.parse(row.vetos),
        };
        resolve(match);
      }
    });
  });
};

export const setCurrentMatch = (id: string, current: boolean) => {
  const checkCurrentSql = `SELECT id FROM matches WHERE current = 1`;
  return new Promise((resolve, reject) => {
    db.get(checkCurrentSql, function (err, row) {
      if (err) {
        console.error("Error checking current match:", err.message);
        reject(err);
      }
      if (row && current) {
        reject("There is already a current match.");
      }

      const updateSql = `UPDATE matches SET current = ? WHERE id = ?`;
      db.run(updateSql, [current, id], function (err) {
        if (err) {
          console.error("Error checking current match:", err.message);
          reject(err);
        } else {
          // console.log("Match set to current");
          resolve("Match set to current");
        }
      });
    });
  });
};

export const updateCurrentMatch = (match: Match) => {
  const sql = `UPDATE matches SET current = ?, left_id = ?, left_wins = ?, right_id = ?, right_wins = ?, matchType = ?, vetos = ? WHERE current = 1`;
  return new Promise((resolve, reject) => {
    const updatedMatch = {
      ...match,
      vetos: JSON.stringify(match.vetos),
    };

    db.run(
      sql,
      [
        updatedMatch.current,
        updatedMatch.left.id,
        updatedMatch.left.wins,
        updatedMatch.right.id,
        updatedMatch.right.wins,
        updatedMatch.matchType,
        updatedMatch.vetos,
      ],
      function (err) {
        if (err) {
          console.error("Error updating current match:", err.message);
          reject(err);
        } else {
          resolve(`Match updated with id: ${this.lastID}`);
        }
      },
    );
  });
};
