// import { neon } from "@neondatabase/serverless";
// import dotenv from"dotenv";

// dotenv.config();

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD }=process.env;


// //createsa  sql connection using our environment variables
// export const sql=neon(
//     `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`
// )

// //this sql function we export is used as a tagged template literal, which allows is to write sql queries safely

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Automatically uses the single DATABASE_URL from Render
export const sql = neon(process.env.DATABASE_URL);