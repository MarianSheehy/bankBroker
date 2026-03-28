import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface CategoryOption {
  id: string;
  primary: string;
  label: string;
}

let cachedCategories: CategoryOption[] | null = null;

export function loadPlaidCategories(): CategoryOption[] {
  if (cachedCategories) return cachedCategories;

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "transactions-personal-finance-category-taxonomy.csv"
  );
  const fileContent = fs.readFileSync(filePath, "utf8");

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as Array<{ PRIMARY: string; DETAILED: string; DESCRIPTION: string }>;

  cachedCategories = records.map((r) => ({
    primary: r.PRIMARY,
    id: r.DETAILED,
    label: r.DESCRIPTION,
  }));

  return cachedCategories;
}