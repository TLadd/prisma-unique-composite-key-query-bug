import fs from "fs";
import path from "path";

const createSchemaAndTableSql = `CREATE SCHEMA prisma_test_schema_1;
CREATE TABLE prisma_test_schema_1.page (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  url character varying NOT NULL
);`;

const startDate = new Date(2012, 0, 1);
const endDate = new Date();

function randomDate() {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

function genPages() {
  let pages: { url: string; createdAt: string }[] = [];
  for (let i = 0; i < 400000; i++) {
    pages.push({
      url: `https://prisma${i}.io`,
      createdAt: randomDate()
        .toISOString()
        .replace("Z", "-00")
        .split("T")
        .join(" "),
    });
  }
  return pages;
}

const pages = genPages();
const pagesValueSql = pages
  .map((page) => `(CAST('${page.createdAt}' AS timestamptz), '${page.url}')`)
  .join(",\n");

const seedPagesSql = `INSERT INTO prisma_test_schema_1.page (created_at, url)
VALUES ${pagesValueSql};`;

const allSql = `
  ${createSchemaAndTableSql}

  ${seedPagesSql}
`;

fs.writeFileSync(path.resolve(__dirname, "seed.sql"), allSql);
