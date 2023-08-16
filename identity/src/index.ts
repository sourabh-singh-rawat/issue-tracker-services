import { app } from "./app";
// import { PostgresUserRepository } from "./repositories/postgres-user.repository";

const PORT = process.env.PORT || 4000;

const main = async () => {
  app.listen(PORT, () => {
    console.log(`Identity service is up and running on port ${PORT}`);
  });

  // const repo = new PostgresUserRepository();
  // repo.create({ email: "sourabh2@gmail.com", password: "password123" });
};

main();
