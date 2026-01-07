const express = require('express');
const router = express.Router();
const { checkBrandInChatGPT } = require('../services/openaiService');

// Endpoint para verificar una marca en ChatGPT
router.post('/check-brand', async (req, res) => {
  try {
    const { brand, url } = req.body;

    // Validación de entrada
    if (!brand || !url) {
      return res.status(400).json({
        error: 'Se requieren los campos "brand" y "url"'
      });
    }

    // Ejecutar las verificaciones
    const results = await checkBrandInChatGPT(brand, url);

    res.json({
      success: true,
      brand,
      url,
      results,
      summary: {
        totalPrompts: results.length,
        mentionsFound: results.filter(r => r.brandMentioned).length,
        mentionsNotFound: results.filter(r => !r.brandMentioned).length
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
