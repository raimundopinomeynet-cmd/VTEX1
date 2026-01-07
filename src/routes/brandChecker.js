const express = require('express');
const router = express.Router();
const { checkBrandInChatGPT } = require('../services/openaiService');

// Endpoint para verificar una marca en ChatGPT
router.post('/check-brand', async (req, res) => {
  try {
    const { brand, url, niche, country } = req.body;

    // Validación de entrada
    if (!brand || !url || !niche || !country) {
      return res.status(400).json({
        error: 'Se requieren los campos "brand", "url", "niche" y "country"'
      });
    }

    // Ejecutar las verificaciones
    const data = await checkBrandInChatGPT(brand, url, niche, country);

    res.json({
      success: true,
      brand,
      url,
      niche: niche,
      country,
      results: data.results,
      summary: {
        totalPrompts: data.results.length,
        mentionsFound: data.results.filter(r => r.brandMentioned).length,
        mentionsNotFound: data.results.filter(r => !r.brandMentioned).length
      }
    });

  } catch (error) {
    console.error('Error en check-brand:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud',
      details: error.message
    });
  }
});

module.exports = router;
