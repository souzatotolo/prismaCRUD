const express = require('express');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const api = require('./package.json');
require('dotenv').config();
const env = process.env;

app.use(express.json());
app.listen(env.API_PORT, () => {
  console.log(`[${api.name}] - Running | Port: ${env.API_PORT}`);
});

app.get('/user', async (req: any, res: any) => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  res.json(allUsers);
});

app.get('/user/post', async (req: any, res: any) => {
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

  res.json(posts);
});
