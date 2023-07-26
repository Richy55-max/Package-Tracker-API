import Package from '../models/Package.js';

// Contrôleur pour la recherche des IDs de packages
const searchPackagesById = async (req, res) => {
  try {
    // Récupérez la valeur du package à partir de la requête HTTP
    const searchTerm = req.query.term;

    // Recherche du package par les champs spécifiques
    const response = await Package.find().or([
      { description: { $regex: searchTerm } },
      { from_name: { $regex: searchTerm } },
    ]);
    console.log('response', response);

    res.status(200).json(response);
  } catch (err) {
    console.log('errr', err);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche du package.',
    });
  }
};

export default searchPackagesById;
// { description: { $regex: searchTerm, $options: 'i' } }
