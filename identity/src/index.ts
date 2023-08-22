import { app } from "./app";

const PORT = 4000;
const HOST = "0.0.0.0";

const main = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });

    console.log(`Identity service is up and running on port@${PORT}`);
  } catch (error) {
    console.log("Identity service cannot start");
    process.exit(1);
  }
};

main();
