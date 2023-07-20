// Importer les routes

import packageRoutes from "./packageRoutes.js";
import deliveryRoutes from "./deliveryRoutes.js";
// Utiliser les routes
const routes = async (app) => {
  app.use(packageRoutes);
  app.use(deliveryRoutes);
};

export default routes;
