const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const prisma = new PrismaClient();

const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Lisa", "Daniel", "Nancy", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle", "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Dorothy", "George", "Melissa", "Timothy", "Deborah", "Ronald", "Stephanie", "Edward", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen", "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma", "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Frank", "Debra", "Alexander", "Rachel", "Raymond", "Catherine", "Patrick", "Carolyn", "Jack", "Janet", "Dennis", "Ruth", "Jerry", "Maria"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  const hashedPassword = await bcrypt.hash('student123', 10);
  
  // First, update existing students to have a random year
  const existingStudents = await prisma.student.findMany();
  for (const s of existingStudents) {
    if (!s.year) {
      await prisma.student.update({
        where: { student_id: s.student_id },
        data: { year: Math.floor(Math.random() * 4) + 1 }
      });
    }
  }
  
  const currentCount = await prisma.student.count();
  const targetCount = 1500;
  const needed = targetCount - currentCount;
  
  console.log(`Currently have ${currentCount} students. Generating ${needed} more...`);
  
  if (needed <= 0) {
    console.log("Already reached target.");
    return;
  }

  // Generate data in batches
  const batchSize = 100;
  let created = 0;

  for (let i = 0; i < needed; i += batchSize) {
    const size = Math.min(batchSize, needed - i);
    const users = [];
    
    for (let j = 0; j < size; j++) {
      const fn = getRandomItem(firstNames);
      const ln = getRandomItem(lastNames);
      const uniqueSuffix = crypto.randomBytes(3).toString('hex');
      
      const user = await prisma.user.create({
        data: {
          name: `${fn} ${ln}`,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}.${uniqueSuffix}@college.edu`,
          password: hashedPassword,
          role: 'STUDENT'
        }
      });
      
      await prisma.student.create({
        data: {
          user_id: user.user_id,
          usn: `USN-${Date.now()}-${uniqueSuffix}`,
          first_name: fn,
          last_name: ln,
          year: Math.floor(Math.random() * 4) + 1,
          department_id: Math.floor(Math.random() * 4) + 1, // 1 to 4
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          phone: `555-${Math.floor(1000 + Math.random() * 9000)}`
        }
      });
    }
    
    created += size;
    console.log(`Created ${created}/${needed} students...`);
  }
  
  console.log("Done seeding!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
