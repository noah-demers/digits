import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';


const prisma = new PrismaClient();


async function main() {
 console.log('Seeding the database');


 // Clear existing data (optional, but ensures fresh state)
 await prisma.contact.deleteMany({});
 await prisma.stuff.deleteMany({});
 await prisma.user.deleteMany({});


 // Hash password once for all users (assuming same password)
 const passwordHash = await hash('changeme', 10);


 // Insert users
 for (const account of config.defaultAccounts) {
   const role = (account.role as Role) || Role.USER;
   console.log(`Creating user: ${account.email} with role: ${role}`);
   await prisma.user.create({
     data: {
       email: account.email,
       password: passwordHash,
       role,
     },
   });
 }


 // Insert stuff
 for (const item of config.defaultData) {
   const condition = (item.condition as Condition) || Condition.good;
   console.log(`Adding stuff: ${JSON.stringify(item)}`);
   await prisma.stuff.create({
     data: {
       name: item.name,
       quantity: item.quantity,
       owner: item.owner,
       condition,
     },
   });
 }


 // Insert contacts
 for (const contact of config.defaultContacts) {
   console.log(`Adding contact: ${contact.firstName} ${contact.lastName}`);
   await prisma.contact.create({
     data: {
       firstName: contact.firstName,
       lastName: contact.lastName,
       address: contact.address,
       image: contact.image,
       description: contact.description,
       owner: contact.owner,
     },
   });
 }
}


main()
 .then(async () => {
   console.log('Seeding finished');
   await prisma.$disconnect();
 })
 .catch(async (e) => {
   console.error(e);
   await prisma.$disconnect();
   process.exit(1);
 });
