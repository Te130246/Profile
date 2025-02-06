const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// ตรวจสอบและสร้างโฟลเดอร์ uploads หากไม่มี
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - jpeg, jpg, png, gif'));
    }
});

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'profile'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL Database:', err.message);
        process.exit(1); // ออกจากโปรแกรมหากเชื่อมต่อไม่ได้
    }
    console.log('Connected to MySQL Database');
});

// API สำหรับดึงข้อมูลโปรไฟล์ทั้งหมด
app.get('/api/profiles', (req, res) => {
    const sql = 'SELECT * FROM Profiles';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching profiles:', err);
            return res.status(500).send({ message: 'Error fetching profiles', error: err.message });
        }
        res.status(200).send(results);
    });
});

// API สำหรับลงทะเบียนผู้ใช้
app.post('/api/register', (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send({ message: 'Please provide all required fields.' });
    }

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: 'Invalid email format.' });
    }

    // ตรวจสอบว่าอีเมลซ้ำในฐานข้อมูลหรือไม่
    const checkEmailQuery = 'SELECT * FROM Users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send({ message: 'Error checking email', error: err.message });
        }
        if (results.length > 0) {
            return res.status(400).send({ message: 'Email already exists' });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = bcrypt.hashSync(password, 8);

        // บันทึกข้อมูลผู้ใช้ใหม่
        const sql = 'INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [first_name, last_name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send({ message: 'Error registering user', error: err.message });
            }
            res.status(201).send({ message: 'ลงทะเบียนสำเร็จ' });
        });
    });
});

// API สำหรับเข้าสู่ระบบผู้ใช้
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!email || !password) {
        return res.status(400).send({ message: 'Please provide both email and password.' });
    }

    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send({ message: 'Error during login', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid Password!' });
        }

        res.status(200).send({ 
            id: user.id,
            email: user.email,
            message: 'เข้าสู่ระบบสำเร็จ',
            success: true,
        });
    });
});

// API สำหรับอัปโหลดไฟล์
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }
    res.status(200).send({ 
        message: 'File uploaded successfully.',
        filePath: `/uploads/${req.file.filename}`
    });
});

// API สำหรับเพิ่มโปรไฟล์
app.post('/api/add-profile', upload.fields([{ name: 'profileImage' }, { name: 'coverImage' }]), (req, res) => {
    const { fullName, mobile, email, location, bio } = req.body;
    const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].filename : null;
    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].filename : null;

    if (!fullName || !mobile || !email || !location || !bio) {
        return res.status(400).send({ message: 'Please provide all required fields.' });
    }

    const sql = `INSERT INTO Profiles (full_name, mobile, email, location, bio, profile_image, cover_image) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [fullName, mobile, email, location, bio, profileImage, coverImage], (err, result) => {
        if (err) {
            console.error('Error inserting profile:', err);
            return res.status(500).send({ message: 'Error saving profile', error: err.message });
        }
        res.status(201).send({ message: 'Profile created successfully!' });
    });
});



app.post('/api/update-profile', upload.fields([{ name: 'profileImage' }, { name: 'coverImage' }]), (req, res) => {
    const { fullName, mobile, email, location, bio } = req.body;
    const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].filename : null;
    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0].filename : null;

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!fullName || !mobile || !email || !location || !bio) {
        return res.status(400).send({ message: 'Please provide all required fields.' });
    }

    // อัปเดตโปรไฟล์ล่าสุด (เลือก id ล่าสุด)
    const sql = `UPDATE Profiles SET 
                 full_name = ?, 
                 mobile = ?, 
                 email = ?, 
                 location = ?, 
                 bio = ?, 
                 profile_image = COALESCE(?, profile_image), 
                 cover_image = COALESCE(?, cover_image)
                 WHERE id = (SELECT MAX(id) FROM Profiles)`;

    db.query(sql, [fullName, mobile, email, location, bio, profileImage, coverImage], (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).send({ message: 'Error updating profile', error: err.message });
        }
        res.status(200).send({ message: 'Profile updated successfully!' });
    });
});


app.delete('/api/delete-profile', (req, res) => {
    const sql = 'DELETE FROM Profiles WHERE id = (SELECT MAX(id) FROM Profiles)';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error deleting profile:', err);
        return res.status(500).send({ message: 'Error deleting profile', error: err.message });
      }
      res.status(200).send({ message: 'Profile deleted successfully!' });
    });
  });

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
