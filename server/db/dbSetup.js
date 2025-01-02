import pool from "./pool.js";
const createTables = async () => {
  const semesterTableCreateQuery = `
        CREATE TABLE IF NOT EXISTS semesters (
            id SERIAL PRIMARY KEY,
            faculty char(20) NOT NULL CHECK(faculty IN ('CSIT', 'BCA')),
            semester INT NOT NULL,
            UNIQUE (faculty, semester)
        )
    `;
  const teacherTableCreateQuery = `
        CREATE TABLE IF NOT EXISTS teachers (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            type char(20) NOT NULL CHECK(type IN ('Full Timer', 'Part Timer')),
            startTime INT,
            endTime INT
        )    
    `;
  const subjectTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        sem_id INT NOT NULL REFERENCES semesters(id),
        teacher_id INT NOT NULL REFERENCES teachers(id)
    )
    `;
  const periodTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS periods(
        sem_id INT,
        period INT,
        subject_id INT,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        PRIMARY KEY(sem_id, period),
        FOREIGN KEY(sem_id) REFERENCES semesters(id),
        FOREIGN KEY(subject_id) REFERENCES subjects(id)
    )
   `;
  try {
    await pool.query(semesterTableCreateQuery);
    console.log("semesters table created");
    await pool.query(teacherTableCreateQuery);
    console.log("teachers table created");
    await pool.query(subjectTableCreateQuery);
    console.log("subjects table created");
    await pool.query(periodTableCreateQuery);
    console.log("periods table created");
  } catch (err) {
    console.log("Could not create tables : ", err);
  }
  pool.end();
};
await createTables();
