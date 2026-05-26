const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const students = [
  { first_name: "Alice", last_name: "Smith", email: "alice.smith@college.edu", department: 1, gender: "Female", phone: "555-0101" },
  { first_name: "Bob", last_name: "Johnson", email: "bob.j@college.edu", department: 2, gender: "Male", phone: "555-0102" },
  { first_name: "Charlie", last_name: "Brown", email: "charlie.b@college.edu", department: 1, gender: "Male", phone: "555-0103" },
  { first_name: "Diana", last_name: "Prince", email: "diana.p@college.edu", department: 3, gender: "Female", phone: "555-0104" },
  { first_name: "Evan", last_name: "Wright", email: "evan.w@college.edu", department: 2, gender: "Male", phone: "555-0105" },
  { first_name: "Fiona", last_name: "Gallagher", email: "fiona.g@college.edu", department: 4, gender: "Female", phone: "555-0106" },
  { first_name: "George", last_name: "Miller", email: "george.m@college.edu", department: 1, gender: "Male", phone: "555-0107" },
  { first_name: "Hannah", last_name: "Abbott", email: "hannah.a@college.edu", department: 3, gender: "Female", phone: "555-0108" }
];

async function main() {
  // Ensure departments exist first
  const departments = ['Computer Science', 'Mechanical', 'Civil', 'Electronics'];
  for (const dept of departments) {
    await prisma.department.upsert({
      where: { department_id: departments.indexOf(dept) + 1 },
      update: {},
      create: { department_name: dept }
    });
  }

  const hashedPassword = await bcrypt.hash('student123', 10);

  for (const s of students) {
    try {
      const user = await prisma.user.create({
        data: { name: `${s.first_name} ${s.last_name}`, email: s.email, password: hashedPassword, role: 'STUDENT' }
      });

      await prisma.student.create({
        data: {
          user_id: user.user_id,
          usn: `USN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          first_name: s.first_name,
          last_name: s.last_name,
          gender: s.gender,
          phone: s.phone,
          department_id: s.department
        }
      });
      console.log(`Created student: ${s.first_name} ${s.last_name}`);
    } catch (e) {
      console.log(`Failed to create ${s.first_name}: ${e.message}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
