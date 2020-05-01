import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function tryIt() {
  const result = await prisma.bookmark.findOne({
    where: {
      bookmark_page_id_reader_id_key: {
        pageId: "bb60cc30-c892-4b7e-820c-db91382e82ea",
        readerId: "55a56470-d026-4c42-a24b-30b692b747e2",
      },
    },
  });

  console.log(result);
}

tryIt();
