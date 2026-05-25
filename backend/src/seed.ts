import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Check if department exists
  let department = await prisma.department.findFirst();
  if (!department) {
    department = await prisma.department.create({
      data: {
        department_name: 'Computer Science',
        hod_name: 'Dr. Alan Turing'
      }
    });
    console.log('Created Department:', department.department_name);
  }

  // Check if a student exists
  const existingStudent = await prisma.student.findFirst();
  if (!existingStudent) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@student.college.edu',
        password: hashedPassword,
        role: 'STUDENT'
      }
    });

    const student = await prisma.student.create({
      data: {
        user_id: user.user_id,
        usn: '1RV20CS001',
        first_name: 'John',
        last_name: 'Doe',
        dob: new Date('2000-01-01'),
        gender: 'Male',
        phone: '555-0192',
        address: '123 Campus Drive',
        department_id: department.department_id
      }
    });
    console.log('Created Student:', student.first_name);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
