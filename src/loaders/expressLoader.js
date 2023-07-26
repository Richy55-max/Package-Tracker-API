import bodyParser from 'body-parser';
import routes from '../routes/index.js';
import mongoose from 'mongoose';
import cors from 'cors';
const expressLoader = async ({ app }) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connexion à MongoDB réussie.');
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB :', err);
    process.exit(1); // Arrêter l'application en cas d'échec de connexion
  }

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  routes(app);
  return app;
};

export default expressLoader;
