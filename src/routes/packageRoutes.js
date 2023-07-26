import express from 'express';
const router = express.Router();

import Package from '../models/Package.js';
import searchPackagesById from '../controllers/packageController.js';

// Route pour la recherche des IDs de packages
router.get('/packages/search', searchPackagesById);
// Route pour récupérer tous les packages
router.get('/api/package', async (req, res) => {
  try {
    const packages = await Package.find();
    return res.status(200).json({
      status: 200,
      total: packages.length,
      data: packages,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des packages.' });
  }
});

// Route pour récupérer un package par son id
router.get('/api/package/:id', async (req, res) => {
  try {
    const response = await Package.findById(req.params.id).populate(
      'active_delivery_id'
    );
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    console.log('error', err);
    if (err?.kind === 'ObjectId')
      return res
        .status(404)
        .json({ status: 404, message: 'Package non trouvé.' });

    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération du package.' });
  }
});

// Route pour créer un nouveau package
router.post('/api/package', async (req, res) => {
  try {
    const newPackage = req.body;
    const response = await Package.create(newPackage);
    res.status(201).json({
      status: 201,
      data: response,
    });
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ message: 'Erreur lors de la création du package.' });
  }
});

// Route pour mettre à jour un package par son id
router.put('/api/package/:id', async (req, res) => {
  try {
    const updatedPackage = req.body;
    const response = await Package.findByIdAndUpdate(
      req.params.id,
      updatedPackage,
      { new: true }
    );
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    if (err?.kind === 'ObjectId')
      return res
        .status(404)
        .json({ status: 404, message: 'Package non trouvé.' });

    res
      .status(500)
      .json({ message: 'Erreur lors de la mise à jour du package.' });
  }
});

// Route pour supprimer un package par son id
router.delete('/api/package/:id', async (req, res) => {
  try {
    const response = await Package.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: 200, response: response, message: 'Package supprimé.' });
  } catch (err) {
    console.log('err', err);
    if (err?.kind === 'ObjectId')
      return res
        .status(404)
        .json({ status: 404, message: 'Package non trouvé.' });

    res
      .status(500)
      .json({ message: 'Erreur lors de la suppression du package.' });
  }
});

export default router;
