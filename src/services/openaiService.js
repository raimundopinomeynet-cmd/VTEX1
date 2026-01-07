const OpenAI = require('openai');

// Inicializar cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 5 prompts diseñados para verificar la aparición de una marca
 * en diferentes contextos de búsqueda y recomendación
 */
const generatePrompts = (brand, url) => {
  return [
    {
      id: 1,
      name: 'Recomendación Directa',
      prompt: `¿Cuáles son las mejores opciones para ${brand}? Dame 3 recomendaciones.`
    },
    {
      id: 2,
      name: 'Búsqueda de Alternativas',
      prompt: `Necesito encontrar empresas o servicios similares a ${brand}. ¿Qué me recomiendas?`
    },
    {
      id: 3,
      name: 'Consulta de Información',
      prompt: `¿Qué puedes decirme sobre ${brand}? ¿Es confiable?`
    },
    {
      id: 4,
      name: 'Comparación de Mercado',
      prompt: `Compara las principales opciones del mercado relacionadas con ${brand}. ¿Cuál es la mejor?`
    },
    {
      id: 5,
      name: 'Búsqueda por URL',
      prompt: `¿Conoces el sitio web ${url}? ¿A qué empresa o marca pertenece?`
    }
  ];
};

/**
 * Verifica si la marca aparece en la respuesta de ChatGPT
 */
const checkBrandMention = (response, brand) => {
  const responseLower = response.toLowerCase();
  const brandLower = brand.toLowerCase();
  return responseLower.includes(brandLower);
};

/**
 * Función principal que ejecuta los 5 prompts y verifica la marca
 */
const checkBrandInChatGPT = async (brand, url) => {
  const prompts = generatePrompts(brand, url);
  const results = [];

  console.log(`🔍 Iniciando verificación de marca: ${brand}`);
  console.log(`🌐 URL: ${url}`);

  for (const promptData of prompts) {
    try {
      console.log(`\n📝 Ejecutando prompt ${promptData.id}: ${promptData.name}`);

      // Llamada a OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: promptData.prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0].message.content;
      const brandMentioned = checkBrandMention(response, brand);

      console.log(`${brandMentioned ? '✅' : '❌'} Marca ${brandMentioned ? 'encontrada' : 'NO encontrada'}`);

      results.push({
        promptId: promptData.id,
        promptName: promptData.name,
        prompt: promptData.prompt,
        response: response,
        brandMentioned: brandMentioned,
        timestamp: new Date().toISOString()
      });

      // Pequeña pausa entre llamadas para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`❌ Error en prompt ${promptData.id}:`, error.message);
      results.push({
        promptId: promptData.id,
        promptName: promptData.name,
        prompt: promptData.prompt,
        response: null,
        brandMentioned: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  console.log(`\n✨ Verificación completada`);
  return results;
};

module.exports = {
  checkBrandInChatGPT,
  generatePrompts
};
