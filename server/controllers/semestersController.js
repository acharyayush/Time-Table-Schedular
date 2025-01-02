import pool from "../db/pool.js";
export const getSemestersByFaculty = async (req, res) => {
  const faculty = req.params?.faculty;
  if (!faculty) return res.status(400).json({ message: "Invalid route" });
  try {
    const response = await pool.query(
      `SELECT semester FROM semesters WHERE faculty=$1`,
      [faculty]
    );
    const semesters = response.rows.map((row) => row.semester);
    res.json(semesters)
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};
export const addSemesterWithFaculty = async (req, res) => {
  const { faculty, semesterNumber } = req.body;
  if (!faculty || !semesterNumber || !Number(semesterNumber))
    return res.status(400).json({ message: "Invalid route" });
  try {
    await pool.query(
      `INSERT INTO semesters(faculty, semester) VALUES($1, $2)`,
      [faculty, semesterNumber]
    );
    return res.json({ faculty, semesterNumber });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
