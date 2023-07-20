import expressLoader from "./expressLoader.js";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log("Express Initialized");
};
