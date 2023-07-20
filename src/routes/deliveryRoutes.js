import express from "express";
const router = express.Router();
// Import Delivery BD Model
import Delivery from "../models/Delivery.js";

// Route pour récupérer toutes les livraisons
router.get("/api/delivery", async (req, res) => {
  try {
    const delivery = await Delivery.find();
    if (!delivery) {
      return res.status(404).json({ message: "Package non trouvé." });
      // console.log("resssss", res);
    }
    return res.status(200).json({
      status: 200,
      total: delivery.length,
      data: delivery,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la livraison." });
  }
});

// Route pour récupérer une livraison par son id
router.get("/api/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (delivery == null) {
      return res
        .status(404)
        .json({ status: 404, message: "Livraison non trouvée." });
    }
    res.status(200).json({
      status: 200,
      data: delivery,
    });
  } catch (err) {
    if (err?.kind === "ObjectId")
      return res
        .status(404)
        .json({ status: 404, message: "Livraison non trouvée." });

    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la livraison." });
  }
});

// Route pour créer une nouvelle livraison
router.post("/api/delivery", async (req, res) => {
  try {
    const newDelivery = req.body;
    const delivery = await Delivery.create(newDelivery);
    res.status(201).json({
      status: 201,
      data: delivery,
    });
  } catch (err) {
    console.log("err", err);
    // console.log("status", err?.errors?.package_id?.kind);

    // if (err?.errors?.status?.kind === "required")
    //   return res.status(404).json({
    //     status: 404,
    //     message: `Le champ ${err?.errors?.status?.path} est requis.`,
    //   });

    res.status(500).json({
      status: 500,
      error:
        "Erreur lors de la création de la livraison. Une livraison est déjà associé à cet identifiant.",
    });
  }
});

// Route pour mettre à jour une livraison par son id
router.put("/api/delivery/:id", async (req, res) => {
  try {
    const updatedDelivery = req.body;
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      updatedDelivery,
      { new: true }
    );
    res.status(200).json({
      status: 200,
      data: delivery,
    });
  } catch (err) {
    if (err?.kind === "ObjectId")
      return res
        .status(404)
        .json({ status: 404, message: "Livraison non trouvée." });
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la livraison." });
  }
});

// Route pour supprimer une livraison par son id
router.delete("/api/delivery/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (delivery)
      res.status(200).json({ status: 200, message: "Livraison supprimée." });
  } catch (err) {
    if (err?.kind === "ObjectId")
      return res
        .status(404)
        .json({ status: 404, message: "Livraison non trouvée." });

    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la livraison." });
  }
});

export default router;
