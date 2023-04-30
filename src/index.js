import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from 'cors'

const prisma = new PrismaClient();
const app = express();

app.use(cors())
app.use(express.json());

// pg
app.post("/pg/create", async (req, res) => {
    const { name, contactNum, address, image } = req.body;

    // Insert a new Pg record into the database using Prisma Client
    const newPg = await prisma.pg.create({
      data: {
        name,
        contactNum,
        address,
        image,
      },
    });

    // Return the newly created Pg record as JSON
    res.json(newPg);
});

app.put("/pg/:id", async (req, res) => {
  const { id } = req.params;

  const newData = req.body;

  try {
    const result = await prisma.pg.update({
      where: { id: Number(id) },
      data: newData,
    });

    res.json(result);
  } catch (error) {
    res.json({ error: `Pg with ID ${id} does not exist in the database` });
  }
});

app.delete(`/pg/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.pg.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(result);
});

app.get("/pg", async (req, res) => {
  const pg = await prisma.pg.findMany();
  res.json(pg);
});

// service
app.post(`/service/create`, async (req, res) => {
  const { name, contactNum, role } = req.body;
  const result = await prisma.service.create({
    data: {
      name,
      contactNum,
      role,
    },
  });
  res.json(result);
});

app.put("/service/:id", async (req, res) => {
  const { id } = req.params;

  const newData = req.body;

  try {
    const result = await prisma.service.update({
      where: { id: Number(id) },
      data: newData,
    });

    res.json(result);
  } catch (error) {
    res.json({ error: `service with ID ${id} does not exist in the database` });
  }
});

app.delete(`/service/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.service.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(result);
});

app.get("/service", async (req, res) => {
  const service = await prisma.service.findMany();
  res.json(service);
});

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
