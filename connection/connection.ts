import { Clinic } from "../entities/clinics";
import { createConnection } from "typeorm";

export const connection = createConnection({
  type: "postgres" ,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "demo",
  entities: [Clinic],
  synchronize: true,
  logging: false
});