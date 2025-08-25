import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
  await client.hSet("car", {
    color: "red",
    year: 1950,
    engine: { cylinders: 8 },
    owner: null || "",
    services: undefined || ""
  })

  const car = await client.hGetAll("car#fds")

  if (Object.keys(car).length === 0) {
    console.log("Not found")
  }

  console.log(car)
};
run();
