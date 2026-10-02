CREATE TABLE student (
  student_id INT,
  name       VARCHAR(20) NOT NULL,
  major      VARCHAR(20) DEFAULT 'Undecided',
  PRIMARY KEY(student_id)
);

INSERT INTO student VALUES (1, 'smit', 'it');
INSERT INTO student VALUES (2, 'Kate',  'Sociology');
INSERT INTO student VALUES (3, 'Claire', NULL);
INSERT INTO student VALUES (4, 'raj');
INSERT INTO student VALUES (5, 'mahir');
INSERT INTO student VALUES (6, 'Jack',  'Biology');
INSERT INTO student VALUES (7, 'Jack',  'Biology');
INSERT INTO student VALUES (8, 'Mike',  'Computer Science');
INSERT INTO student VALUES (9, 'raju', 'Chemistry');

UPDATE student SET major = 'Bio' WHERE major = 'Biology';

UPDATE student SET name = 'Tom', major ='Bio' WHERE student_id = 1;

UPDATE student SET major = 'Biochemistry' WHERE major = 'Bio' OR major = 'Chemistry';

UPDATE student SET major = 'Undecided';

DELETE FROM student WHERE student_id = 5;

DELETE FROM student WHERE name = 'Tom' AND major = 'Undecided';

DELETE FROM student;

select * from student ;

SELECT * FROM student ORDER BY name;

SELECT * FROM student ORDER BY student_id DESC;

SELECT * FROM student WHERE major = 'Biology';

SELECT * FROM student WHERE major = 'Chemistry' OR major = 'Biology';

SELECT * FROM student WHERE student_id < 3 AND name <> 'Jack';

SELECT * FROM student LIMIT 5;

SELECT * FROM student
WHERE name IN ('Claire', 'Kate', 'Mike');

SELECT * FROM student
WHERE major IN ('Biology', 'Chemistry');

SELECT name AS first_name, major AS stream
FROM student;

SELECT DISTINCT name FROM student


