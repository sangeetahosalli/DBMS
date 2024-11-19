// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');
// require('dotenv').config();


// const app = express();
// const PORT = 5000; // Use one port for the server

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Create a database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // replace with your MySQL username
//   password: 'sang09.', // replace with your MySQL password
//   database: 'sample3', // replace with your database name
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to the database!');
// });

//  // Parse incoming JSON requests



// // Dummy data for scholarships and notifications
// const scholarships = [
//   { Scholarship_ID: 1, Title: 'Scholarship 1', Description: 'Description of Scholarship 1', Type: 'cnr' },
//   { Scholarship_ID: 2, Title: 'Scholarship 2', Description: 'Description of Scholarship 2', Type: 'mrd' },
//   { Scholarship_ID: 3, Title: 'Scholarship 3', Description: 'Description of Scholarship 3', Type: 'distinction' },
// ];

// const notifications = [
//   { id: 1, message: 'New scholarship available!' },
//   { id: 2, message: 'Your application has been reviewed.' },
// ];

// // API Route to get scholarships
// app.get('/api/scholarships', (req, res) => {
//   res.json(scholarships);
// });

// // API Route to get notifications
// app.get('/api/notifications', (req, res) => {
//   res.json(notifications);
// });

// // Authentication Route: Login
// app.post('/api/auth/login', (req, res) => {
//   const { email, password } = req.body;

//   // Query to find user by email
//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       console.error('Error fetching user data:', err);
//       return res.status(500).json({ message: 'Error fetching data. Please try again later.' });
//     }
//     if (results.length === 0) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare password
//     const user = results[0];
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: 'Server error' });
//       }
//       if (!result) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Create JWT token
//       const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
//       res.json({ token });
//     });
//   });
// });

// // API Route to submit an application
// app.post('/api/application/submit', (req, res) => {
//   const { scholarshipId } = req.body;
//   console.log('Received scholarshipId:', scholarshipId); // Log the received data

//   if (!scholarshipId) {
//     return res.status(400).json({ message: 'Scholarship ID is required.' });
//   }

//   const query = 'INSERT INTO application (scholarship_Id) VALUES (?)';
//   db.query(query, [scholarshipId], (err, result) => {
//     if (err) {
//       console.error('Error submitting application:', err);
//       return res.status(500).json({ message: 'Error submitting application. Please try again.' });
//     }
//     console.log('Application submitted successfully:', result); // Log the result of the query
//     res.status(200).json({ message: 'Application submitted successfully!', applicationId: result.insertId });
//   });
// });

// // API Route to apply for a scholarship and add bank details
// app.post('/apply', (req, res) => {
//   const { studentName, bankDetails } = req.body;

//   // Step 1: Find the Student ID by student name
//   const findStudentQuery = 'SELECT Student_ID FROM Student WHERE Name = ?';

//   db.query(findStudentQuery, [studentName], (err, results) => {
//     if (err) {
//       console.error('Error fetching Student_ID:', err);
//       return res.status(500).json({ message: 'Database error while fetching student ID' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     const studentID = results[0].Student_ID;

//     // Step 2: Insert bank details into Bank table using Student_ID
//     const insertBankQuery = `
//       INSERT INTO Bank (Bank_Name, Bank_Account_No, IFSC_Code, Student_ID)
//       VALUES (?, ?, ?, ?)
//       ON DUPLICATE KEY UPDATE Bank_Account_No = VALUES(Bank_Account_No), IFSC_Code = VALUES(IFSC_Code)
//     `;
//     db.query(insertBankQuery, ['Student Bank', bankDetails.accountNumber, bankDetails.ifscCode, studentID], (err) => {
//       if (err) {
//         console.error('Error inserting bank details:', err);
//         return res.status(500).json({ message: 'Database error while saving bank details' });
//       }
//       res.status(200).json({ message: 'Application and bank details submitted successfully' });
//     });
//   });
// });

// // API Route for registering a new student
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   // Check for missing fields
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Please fill out all fields.' });
//   }

//   // Hash the password for security
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Insert user data into the database
//   const query = 'INSERT INTO Student (name, email, password) VALUES (?, ?, ?)';
//   db.query(query, [username, email, hashedPassword], (err, result) => {
//     if (err) {
//       console.error('Error inserting user:', err);
//       return res.status(500).json({ message: 'Registration failed. Please try again.' });
//     }
//     res.status(201).json({ message: 'Registration successful!' });
//   });
// });

// // API Route for bank validation
// app.post('/validate-bank', (req, res) => {
//   const { accountNumber, ifscCode } = req.body;

//   // Example bank validation logic
//   if (accountNumber && ifscCode) {
//     // Add your actual bank validation logic here (e.g., check with a bank API or database)
//     const isValid = true; // Simulating a valid response
//     res.json({ isValid });
//   } else {
//     res.json({ isValid: false });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// app.get('/admins', (req, res) => {
//   const query = 'SELECT * FROM Admin'; // Replace with your actual table name
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching admins:', err);
//       return res.status(500).json({ message: 'Error fetching admins' });
//     }
//     res.json({ admins: results });
//   });
// });

// // Add a new admin
// app.post('/addAdmin', (req, res) => {
//   const { Name, Email, Role } = req.body;

//   const query = 'INSERT INTO admin (Name, Email, Role) VALUES (?, ?, ?)';
//   db.query(query, [Name, Email, Role], (err, results) => {
//     if (err) {
//       console.error('Error adding admin:', err); // Log error to console
//       return res.status(500).json({ message: 'Failed to add admin', error: err.message }); // Return error message
//     }
//     res.status(201).json({
//       message: 'Admin added successfully',
//       admin: { Admin_ID: results.insertId, Name, Email, Role },
//     });
//   });
// });

// app.get('/notifications', (req, res) => {
//   const { studentId } = req.query;

//   const query = 'SELECT * FROM notification WHERE student_id = ? ORDER BY created_at DESC';
//   db.query(query, [studentId], (err, results) => {
//     if (err) {
//       console.error('Error fetching notifications:', err);
//       return res.status(500).json({ message: 'Failed to fetch notifications' });
//     }

//     res.status(200).json({ notification: results });
//   });
// });



// // Endpoint to submit application
// app.post('/apply/sumbit', (req, res) => {
//   const {
    
//     application_Date,
//     status,
//     student_Id,
//     scholarship_Id,
//     admin_Id
//   } = req.body;
//   console.log(req.body);

//   const query = `
//     INSERT INTO application (
//       Application_Date, Status, Student_ID, Scholarship_ID, Admin_ID
//     ) VALUES (?, ?, ?, ?, ?)
//   `;

//   const values = [
    
//     application_Date,
//     status,
//     student_Id,
//     scholarship_Id,
//     admin_Id
//   ];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting application:', err);
//       res.status(500).json({ message: 'Error submitting application. Please try again later.' });
//     } else {
//       res.status(200).json({ message: 'Application submitted successfully!', applicationId: result.insertId });
//     }
//   });
// });





// // const express = require('express');
// // const cors = require('cors');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const mysql = require('mysql2');
// // require('dotenv').config();

// // const app = express();
// // const PORT = 5000; // Use one port for the server

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Create a database connection
// // const db = mysql.createConnection({
// //   host: 'localhost',
// //   user: 'root', // replace with your MySQL username
// //   password: 'sang09.', // replace with your MySQL password
// //   database: 'sample3', // replace with your database name
// // });

// // // Connect to the database
// // db.connect((err) => {
// //   if (err) {
// //     console.error('Database connection failed:', err.stack);
// //     return;
// //   }
// //   console.log('Connected to the database!');
// // });

// // // Dummy data for scholarships and notifications
// // const scholarships = [
// //   { Scholarship_ID: 1, Title: 'Scholarship 1', Description: 'Description of Scholarship 1', Type: 'cnr' },
// //   { Scholarship_ID: 2, Title: 'Scholarship 2', Description: 'Description of Scholarship 2', Type: 'mrd' },
// //   { Scholarship_ID: 3, Title: 'Scholarship 3', Description: 'Description of Scholarship 3', Type: 'distinction' },
// // ];

// // const notifications = [
// //   { id: 1, message: 'New scholarship available!' },
// //   { id: 2, message: 'Your application has been reviewed.' },
// // ];

// // // API Route to get scholarships
// // app.get('/api/scholarships', (req, res) => {
// //   res.json(scholarships);
// // });

// // // API Route to get notifications
// // app.get('/api/notifications', (req, res) => {
// //   res.json(notifications);
// // });

// // // Authentication Route: Login
// // app.post('/api/auth/login', (req, res) => {
// //   const { email, password } = req.body;

// //   // Query to find user by email
// //   const query = 'SELECT * FROM users WHERE email = ?';
// //   db.query(query, [email], (err, results) => {
// //     if (err) {
// //       console.error('Error fetching user data:', err);
// //       return res.status(500).json({ message: 'Error fetching data. Please try again later.' });
// //     }
// //     if (results.length === 0) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     // Compare password
// //     const user = results[0];
// //     bcrypt.compare(password, user.password, (err, result) => {
// //       if (err) {
// //         return res.status(500).json({ message: 'Server error' });
// //       }
// //       if (!result) {
// //         return res.status(400).json({ message: 'Invalid credentials' });
// //       }

// //       // Create JWT token
// //       const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
// //       res.json({ token });
// //     });
// //   });
// // });

// // // API Route to submit an application
// // app.post('/api/application/submit', (req, res) => {
// //   const { scholarshipId } = req.body;
// //   console.log('Received scholarshipId:', scholarshipId); // Log the received data

// //   if (!scholarshipId) {
// //     return res.status(400).json({ message: 'Scholarship ID is required.' });
// //   }

// //   const query = 'INSERT INTO application (scholarship_Id) VALUES (?)';
// //   db.query(query, [scholarshipId], (err, result) => {
// //     if (err) {
// //       console.error('Error submitting application:', err);
// //       return res.status(500).json({ message: 'Error submitting application. Please try again.' });
// //     }
// //     console.log('Application submitted successfully:', result); // Log the result of the query
// //     res.status(200).json({ message: 'Application submitted successfully!', applicationId: result.insertId });
// //   });
// // });

// // // API Route to apply for a scholarship and add bank details
// // app.post('/api/apply', (req, res) => {
// //   const { studentName, bankDetails } = req.body;

// //   // Step 1: Find the Student ID by student name
// //   const findStudentQuery = 'SELECT Student_ID FROM Student WHERE Name = ?';

// //   db.query(findStudentQuery, [studentName], (err, results) => {
// //     if (err) {
// //       console.error('Error fetching Student_ID:', err);
// //       return res.status(500).json({ message: 'Database error while fetching student ID' });
// //     }

// //     if (results.length === 0) {
// //       return res.status(404).json({ message: 'Student not found' });
// //     }

// //     const studentID = results[0].Student_ID;

// //     // Step 2: Insert bank details into Bank table using Student_ID
// //     const insertBankQuery = `
// //       INSERT INTO Bank (Bank_Name, Bank_Account_No, IFSC_Code, Student_ID)
// //       VALUES (?, ?, ?, ?)
// //       ON DUPLICATE KEY UPDATE Bank_Account_No = VALUES(Bank_Account_No), IFSC_Code = VALUES(IFSC_Code)
// //     `;
// //     db.query(insertBankQuery, ['Student Bank', bankDetails.accountNumber, bankDetails.ifscCode, studentID], (err) => {
// //       if (err) {
// //         console.error('Error inserting bank details:', err);
// //         return res.status(500).json({ message: 'Database error while saving bank details' });
// //       }
// //       res.status(200).json({ message: 'Application and bank details submitted successfully' });
// //     });
// //   });
// // });

// // // API Route for registering a new student
// // app.post('/api/register', async (req, res) => {
// //   const { username, email, password } = req.body;

// //   // Check for missing fields
// //   if (!username || !email || !password) {
// //     return res.status(400).json({ message: 'Please fill out all fields.' });
// //   }

// //   // Hash the password for security
// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   // Insert user data into the database
// //   const query = 'INSERT INTO Student (name, email, password) VALUES (?, ?, ?)';
// //   db.query(query, [username, email, hashedPassword], (err, result) => {
// //     if (err) {
// //       console.error('Error inserting user:', err);
// //       return res.status(500).json({ message: 'Registration failed. Please try again.' });
// //     }
// //     res.status(201).json({ message: 'Registration successful!' });
// //   });
// // });

// // // API Route for bank validation
// // app.post('/api/validate-bank', (req, res) => {
// //   const { accountNumber, ifscCode } = req.body;

// //   // Example bank validation logic
// //   if (accountNumber && ifscCode) {
// //     // Add your actual bank validation logic here (e.g., check with a bank API or database)
// //     const isValid = true; // Simulating a valid response
// //     res.json({ isValid });
// //   } else {
// //     res.json({ isValid: false });
// //   }
// // });

// // // Route to fetch admins (Example)
// // app.get('/api/admins', (req, res) => {
// //   const query = 'SELECT * FROM Admin'; // Replace with your actual table name
// //   db.query(query, (err, results) => {
// //     if (err) {
// //       console.error('Error fetching admins:', err);
// //       return res.status(500).json({ message: 'Error fetching admins' });
// //     }
// //     res.json({ admins: results });
// //   });
// // });

// // // Add a new admin
// // app.post('/api/addAdmin', (req, res) => {
// //   const { Name, Email, Role } = req.body;
// //   const query = 'INSERT INTO Admins (Name, Email, Role) VALUES (?, ?, ?)';
// //   db.query(query, [Name, Email, Role], (err, result) => {
// //     if (err) {
// //       console.error('Error adding admin:', err);
// //       return res.status(500).json({ message: 'Error adding admin' });
// //     }
// //     // After adding the admin, fetch the updated list
// //     db.query('SELECT * FROM Admins', (err, updatedAdmins) => {
// //       if (err) {
// //         return res.status(500).json({ message: 'Error fetching updated admins' });
// //       }
// //       res.json({ admins: updatedAdmins });
// //     });
// //   });
// // });

// // // Update application count for a specific admin
// // app.post('/api/updateApplicationsCount', (req, res) => {
// //   const { Admin_ID, applicationsCount } = req.body;
// //   const query = 'UPDATE Admins SET applicationsCount = ? WHERE Admin_ID = ?';
// //   db.query(query, [applicationsCount, Admin_ID], (err, result) => {
// //     if (err) {
// //       console.error('Error updating application count:', err);
// //       return res.status(500).json({ message: 'Error updating application count' });
// //     }
// //     // After updating, fetch the updated list
// //     db.query('SELECT * FROM Admins', (err, updatedAdmins) => {
// //       if (err) {
// //         return res.status(500).json({ message: 'Error fetching updated admins' });
// //       }
// //       res.json({ admins: updatedAdmins });
// //     });
// //   });
// // });



// // app.post('/apply', (req, res) => {
// //   const applicationData = req.body;
// //   console.log('Received application data:', applicationData);
// //   res.status(200).json({ message: 'Application submitted successfully!' });
// // });

// // app.post('/apply', (req, res) => {
// //   const { studentId, scholarshipId, applicationDate, status } = req.body;

// //   console.log('Received application data:', req.body);  // Log the incoming request data

// //   // Validate the required fields
// //   if (!student_Id || !scholarship_Id || !application_Date || !status) {
// //     return res.status(400).json({ message: 'All fields (studentId, scholarshipId, applicationDate, status) are required.' });
// //   }

// //   // API Route to submit an application
// // app.post('/api/application/submit', (req, res) => {
// //   const { student_Id, scholarship_Id, application_Date, status, admin_Id } = req.body;
  
// //   // Log the incoming data
// //   console.log('Received application data:', req.body);  // Log the incoming request data

// //   // Validate the required fields
// //   if (!student_Id || !scholarship_Id || !application_Date || !status || !admin_Id) {
// //     return res.status(400).json({ message: 'All fields (studentId, scholarshipId, applicationDate, status, adminId) are required.' });
// //   }

// //   // Insert into the application table
// //   const query = 'INSERT INTO application (student_id, scholarship_id, application_date, status, admin_id) VALUES (?, ?, ?, ?, ?)';
  
// //   db.query(query, [student_Id, scholarship_Id, application_Date, status, admin_Id], (err, result) => {
// //     if (err) {
// //       console.error('Error inserting application:', err);
// //       return res.status(500).json({ message: 'Error inserting application. Please try again.' });
// //     }
  
// //     console.log('Application submitted successfully:', result);
  
// //     // Return the application ID in the response
// //     res.status(200).json({ message: 'Application submitted successfully!', applicationId: result.insertId });
// //   });
// // });
  
// //   // Insert into the application table
// //   const query = 'INSERT INTO application (student_id, scholarship_id, application_date, status) VALUES (?, ?, ?, ?)';

// //   db.query(query, [studentId, scholarshipId, applicationDate, status], (err, result) => {
// //     if (err) {
// //       console.error('Error inserting application:', err); // Log the error to console
// //       return res.status(500).json({ message: 'Error inserting application. Please try again.' });
// //     }
    
// //     // Use result.insertId to get the application ID after insert
// //     console.log('Application submitted successfully:', result);

// //     // Return the application ID in the response
// //     res.status(200).json({ message: 'Application submitted successfully!', applicationId: result.insertId });
// //   });
// // });


// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });


// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const router = express.Router();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Create MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'sang09.',
//   database: 'sample3',
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL');
// });

// // Function to save user to the database
// const saveUserToDB = (username, email, password, cgpa, sgpa, phoneNumber) => {
//   return new Promise((resolve, reject) => {
//     const query = `INSERT INTO student (name, email, password, cgpa, sgpa, phone_Number) VALUES (?, ?, ?, ?, ?, ?)`;
//     const values = [username, email, password, cgpa, sgpa, phoneNumber];

//     db.query(query, values, (err, result) => {
//       if (err) {
//         console.error('Error inserting user:', err);
//         reject('Unable to save user to the database');
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

// // Registration endpoint
// app.post('/register', async (req, res) => {
//   const { username, email, password, cgpa, sgpa, phoneNumber } = req.body;

//   if (!username || !email || !password || !cgpa || !sgpa || !phoneNumber) {
//     return res.status(400).json({ message: 'Please fill out all fields.' });
//   }

//   try {
//     const result = await saveUserToDB(username, email, password, cgpa, sgpa, phoneNumber);
//     res.status(200).json({ message: 'User registered successfully', result });
//   } catch (error) {
//     res.status(500).json({ message: error || 'Registration failed. Please try again.' });
//   }
// });

// // Endpoint to insert a new scholarship
// app.post('/api/scholarships', (req, res) => {
//   const { Scholarship_Name, Criteria, Amount } = req.body;

//   const sql = 'INSERT INTO scholarship (Scholarship_Name, Criteria, Amount) VALUES (?, ?, ?)';

//   db.query(sql, [Scholarship_Name, Criteria, Amount], (err, result) => {
//     if (err) {
//       console.error('Error inserting scholarship:', err);
//       return res.status(500).send('Error inserting scholarship');
//     }

//     res.status(200).send({
//       message: 'Scholarship added successfully',
//       scholarshipId: result.insertId
//     });
//   });
// });

// // Endpoint to get scholarships
// app.get('/api/student/scholarships', (req, res) => {
//   const query = 'SELECT Scholarship_ID, Scholarship_Name, Criteria, Amount FROM scholarship';

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//     } else {
//       res.json(results);
//     }
//   });
// });

// // POST endpoint to submit an application
// // POST route to handle scholarship application submission
// app.post('/apply/submit', (req, res) => {
//   const {
//     application_id,
//     application_date,
//     status,
//     student_id,
//     scholarship_id,
//     admin_id,
//   } = req.body;

//   // SQL query to insert the application data into the database
//   const query = `
//     INSERT INTO application(application_id, application_date, status, student_id, scholarship_id, admin_id)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     query,
//     [application_id, application_date, status, student_id, scholarship_id, admin_id],
//     (err, result) => {
//       if (err) {
//         console.error('Error inserting application:', err);
//         return res.status(500).json({
//           message: 'An error occurred while submitting your application. Please try again later.',
//         });
//       }

//       // Successful insertion
//       return res.status(200).json({ message: 'Application submitted successfully!' });
//     }
//   );
// });

// // Endpoint to check if the student exists
// app.get('/student/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM student WHERE Student_ID = ?';

//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error fetching student:', err.stack);
//       return res.status(500).json({ message: 'Database error. Please try again.' });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(result[0]);
//   });
// });

// // Endpoint to add bank details
// app.post('/api/bank/add', (req, res) => {
//   const { Bank_Name, Bank_Account_No, IFSC_Code, Student_ID } = req.body;

//   // Check if all required fields are provided
//   if (!Bank_Name || !Bank_Account_No || !IFSC_Code || !Student_ID) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const query = 'INSERT INTO bank (Bank_Name, Bank_Account_No, IFSC_Code, Student_ID) VALUES (?, ?, ?, ?)';
  
//   db.query(query, [Bank_Name, Bank_Account_No, IFSC_Code, Student_ID], (err, result) => {
//     if (err) {
//       console.error('Error inserting bank details:', err);  // Log the actual error here
//       return res.status(500).json({ message: 'Error adding bank details', error: err });
//     }

//     res.status(200).json({ message: 'Bank details added successfully' });
//   });
// });


// // Endpoint to retrieve bank details by Student ID
// app.get('/api/bank/:Student_ID', (req, res) => {
//   const { Student_ID } = req.params;
//   const sql = 'SELECT * FROM Bank WHERE Student_ID = ?';
//   db.query(sql, [Student_ID], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching bank details', error: err });
//     }
//     res.status(200).json(result);
//   });
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Adjust the path based on your project structure


app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sang09.',
  database: 'sample3',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Function to save user to the database
const saveUserToDB = (username, email, password, cgpa, sgpa, phoneNumber) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO student (name, email, password, cgpa, sgpa, phone_Number) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [username, email, password, cgpa, sgpa, phoneNumber];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        reject('Unable to save user to the database');
      } else {
        resolve(result);
      }
    });
  });
};



// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password, cgpa, sgpa, phoneNumber } = req.body;

  if (!username || !email || !password || !cgpa || !sgpa || !phoneNumber) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  try {
    const result = await saveUserToDB(username, email, password, cgpa, sgpa, phoneNumber);
    res.status(200).json({ message: 'User registered successfully', result });
  } catch (error) {
    res.status(500).json({ message: error || 'Registration failed. Please try again.' });
  }
});





// Nested query: Get student with the highest number of applications
app.get('/students/most-applications', (req, res) => {
  const sql = 
    'SELECT student_id, COUNT(application_id) AS total_applications FROM application GROUP BY student_id ORDER BY total_applications DESC LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Join query: Get approved scholarships with student details
app.get('/approved-scholarships', (req, res) => {
  const sql = 
    "SELECT student.name AS student_name, scholarship.Scholarship_Name, scholarship.Criteria, application.status FROM student JOIN application ON student.student_id = application.student_id JOIN scholarship ON application.scholarship_id = scholarship.Scholarship_ID WHERE application.status = 'Approved'";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});




app.get('/api/scholarships/by-amount', (req, res) => {
  const amount = req.query.amount;  // Fetch amount parameter from the query string
  
  // Log the amount received in the request
  console.log('Received amount parameter: ${amount}');

  if (!amount) {
    console.log('Amount parameter is missing');
    return res.status(400).send('Amount parameter is required');
  }

  // Log that the stored procedure call is about to happen
  console.log('Calling GetScholarshipsByAmount stored procedure...');

  // Call the GetScholarshipsByAmount stored procedure
  connection.execute(
    'CALL GetScholarshipsByAmount(?)', [amount],  // Pass the amount to the stored procedure
    (err, results) => {
      if (err) {
        console.error('Error executing stored procedure:', err);
        return res.status(500).send('Error executing stored procedure');
      }

      // Log the results returned from the stored procedure
      console.log('Stored procedure executed successfully. Results:', results[0]);

      // Send the result back to the client
      res.status(200).json(results[0]); // results[0] contains the result of the query
    }
  );
});



// Endpoint to insert a new scholarship
app.post('/api/scholarships', (req, res) => {
  const { Scholarship_Name, Criteria, Amount } = req.body;
  const sql = 'INSERT INTO scholarship (Scholarship_Name, Criteria, Amount) VALUES (?, ?, ?)';
  db.query(sql, [Scholarship_Name, Criteria, Amount], (err, result) => {
    if (err) {
      console.error('Error inserting scholarship:', err);
      return res.status(500).send('Error inserting scholarship');
    }
    res.status(200).send({ message: 'Scholarship added successfully', scholarshipId: result.insertId });
  });
});

// Endpoint to get scholarships
app.get('/api/student/scholarships', (req, res) => {
  const query = 'SELECT Scholarship_ID, Scholarship_Name, Criteria, Amount FROM scholarship';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

app.post('/apply/submit', (req, res) => {
  const { application_id, application_date, status, student_id, scholarship_id, admin_id } = req.body;

  // Check if the student exists
  const studentQuery = 'SELECT * FROM student WHERE Student_ID = ?';
  db.query(studentQuery, [student_id], (err, studentResult) => {
    if (err) {
      console.error('Error checking student:', err);
      return res.status(500).json({ message: 'Error checking student existence.' });
    }
    if (studentResult.length === 0) {
      return res.status(404).json({ message: 'Student not found. Please check the student ID.' });
    }

    // Check if the admin exists
    const adminQuery = 'SELECT * FROM admin WHERE Admin_ID = ?';
    db.query(adminQuery, [admin_id], (err, adminResult) => {
      if (err) {
        console.error('Error checking admin:', err);
        return res.status(500).json({ message: 'Error checking admin existence.' });
      }
      if (adminResult.length === 0) {
        return res.status(404).json({ message: 'Admin not found. Please check the admin ID.' });
      }

      // Proceed with the application insertion if both exist
      const insertQuery = 'INSERT INTO application(application_id, application_date, status, student_id, scholarship_id, admin_id) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(insertQuery, [application_id, application_date, status, student_id, scholarship_id, admin_id], (err, result) => {
        if (err) {
          console.error('Error inserting application:', err);
          return res.status(500).json({ message: 'Error submitting application. Please try again.' });
        }
        return res.status(200).json({ message: 'Application submitted successfully!' });
      });
    });
  });
});


// Endpoint to add bank details
app.post('/api/bank/add', (req, res) => {
  const { Bank_Name, Bank_Account_No, IFSC_Code, Student_ID } = req.body;
  if (!Bank_Name || !Bank_Account_No || !IFSC_Code || !Student_ID) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const query = 'INSERT INTO bank (Bank_Name, Bank_Account_No, IFSC_Code, Student_ID) VALUES (?, ?, ?, ?)';
  db.query(query, [Bank_Name, Bank_Account_No, IFSC_Code, Student_ID], (err, result) => {
    if (err) {
      console.error('Error inserting bank details:', err);
      return res.status(500).json({ message: 'Error adding bank details', error: err });
    }
    res.status(200).json({ message: 'Bank details added successfully' });
  });
});

// Endpoint to retrieve bank details by Student ID
app.get('/api/bank/:Student_ID', (req, res) => {
  const { Student_ID } = req.params;
  const sql = 'SELECT * FROM bank WHERE Student_ID = ?';
  db.query(sql, [Student_ID], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching bank details', error: err });
    }
    res.status(200).json(result);
  });
});
//procedure call
// New endpoint: Get the count of scholarships based on different criteria
app.get('/api/scholarships/count', (req, res) => {
  db.query('CALL CountScholarshipsByCriteria()', (err, result) => {
    if (err) {
      console.error('Error executing stored procedure:', err);
      return res.status(500).json({ message: 'Error fetching scholarship count' });
    }
    // Send the result of the procedure (count by criteria)
    res.status(200).json(result[0]);
  });

});

//nested query
// API endpoint to fetch the scholarship data and number of students
app.get('/nested', (req, res) => {
  const query = 'SELECT Scholarship_Name,  (SELECT COUNT(*) FROM student WHERE Scholarship_ID = scholarship.Scholarship_ID) AS NumberOfStudents FROM scholarship';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data.');
    }
    res.json(results);
  });
});
// Endpoint for user login
// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token (for example, using JWT)
    const token = generateToken(user); // Assume generateToken is a function that creates a JWT token
    
    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for user login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Logic for verifying the credentials goes here.
  if (email === 'user@example.com' && password === 'password123') {
    const token = 'dummy-jwt-token';
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Simulate user login logic
    const user = await student.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password logic (e.g., using bcrypt)
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
app.post('/addAdmin', (req, res) => {
  const { Name, Email, Role } = req.body;

  // Validate inputs
  if (!Name || !Email || !Role) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL query to insert data
  const query = 'INSERT INTO admin (name, email, role) VALUES (?, ?, ?)';

  db.query(query, [Name, Email, Role], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ message: 'Error adding admin' });
      }
      res.json({ message: 'Admin added successfully', adminId: result.insertId });
  });
});



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});

