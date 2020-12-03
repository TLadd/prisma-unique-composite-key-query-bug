import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      level: "info",
      emit: "stdout",
    },
    {
      level: "query",
      emit: "stdout",
    },
    {
      level: "warn",
      emit: "stdout",
    },
  ],
});

function getPaginationArgs(cursor: string | undefined) {
  return {
    take: 10,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : undefined,
    orderBy: { createdAt: "desc" },
  } as const;
}

async function tryIt() {
  const page1 = await prisma.page.findMany(getPaginationArgs(undefined));
  const cursor = page1[page1.length - 1].id;
  const page2 = await prisma.page.findMany(getPaginationArgs(cursor));
  prisma.$disconnect();
}

tryIt();
