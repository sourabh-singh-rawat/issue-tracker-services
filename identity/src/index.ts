import { app } from "./app";
import { pgContext } from "./config/pg-context.config";

const PORT = process.env.PORT || 4000;

const main = async () => {
  app.listen(PORT, () => {
    console.log(`Identity service is up and running on port ${PORT}`);
  });

  console.log((await pgContext.query("SELECT NOW()", [])).rows);
};

main();
