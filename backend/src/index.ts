import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'College Management System API is running' });
});

// Auth: Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: role || 'STUDENT' }
    });
    res.status(201).json({ message: 'User registered successfully', userId: user.user_id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/register-student', async (req: Request, res: Response) => {
  try {
    const { name, usn, email, password } = req.body;
    
    // 1. Basic input validation
    if (!name || !usn || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // 2. Check for existing Email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // 3. Check for existing USN
    const existingStudent = await prisma.student.findUnique({ where: { usn } });
    if (existingStudent) {
      return res.status(400).json({ error: 'USN is already registered' });
    }

    // 4. Use a transaction to prevent orphaned users if student creation fails
    const result = await prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await tx.user.create({
        data: { name, email, password: hashedPassword, role: 'STUDENT' }
      });

      const [first_name, ...last_name_arr] = name.split(' ');
      const last_name = last_name_arr.join(' ') || '';

      const student = await tx.student.create({
        data: {
          user_id: user.user_id,
          usn,
          first_name,
          last_name,
        }
      });

      return student;
    });

    res.status(201).json({ message: 'Student registered successfully', student: result });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Student registration failed due to an internal error' });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token, user: { id: user.user_id, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Failed to login due to an internal error' });
  }
});

// Example route to get all departments
app.get('/api/departments', async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// Students CRUD Routes
app.get('/api/students', async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: { department: true }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.post('/api/students', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, usn, year, dob, gender, phone, address, department_id, email, password } = req.body;
    
    // Create User first, then Student
    const hashedPassword = await bcrypt.hash(password || 'defaultpass123', 10);
    const user = await prisma.user.create({
      data: { name: `${first_name} ${last_name}`, email, password: hashedPassword, role: 'STUDENT' }
    });

    const student = await prisma.student.create({
      data: {
        user_id: user.user_id,
        usn: usn || `USN-${Date.now()}`,
        first_name,
        last_name,
        year: year ? Number(year) : null,
        dob: dob ? new Date(dob) : null,
        gender,
        phone,
        address,
        department_id: Number(department_id)
      },
      include: { department: true }
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
