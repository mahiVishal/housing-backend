import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const pgData = [
  {
    name: "rahul",
    contactNum: 1000,
    address: "asfsdf",
    image: "sdcsf",
  },
];


const serviceData=[{
name:"vinod",
contactNum:"12415",
role:"COOK",
}];


async function main() {
  const pg = await prisma.pg.createMany({ data: pgData });
  const service = await prisma.service.createMany({ data: serviceData });
  console.log(service);
  console.log(pg); 
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
