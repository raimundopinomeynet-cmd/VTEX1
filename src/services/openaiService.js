const OpenAI = require('openai');

// Inicializar cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Identifica el nicho/servicio de una marca basándose en su URL y nombre
 */
const identifyNiche = async (brand, url) => {
  console.log(`🔎 Analizando nicho de la marca ${brand}...`);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Analiza la marca "${brand}" con URL "${url}".

Responde ÚNICAMENTE con el nicho o servicio principal que ofrece esta empresa, en 2-4 palabras.
Ejemplos de respuesta: "gestión de envíos", "ropa deportiva", "streaming de video", "seguros de auto", "software CRM"

Nicho/Servicio:`
        }
      ],
      temperature: 0.3,
      max_tokens: 50
    });

    const niche = completion.choices[0].message.content.trim();
    console.log(`✅ Nicho identificado: "${niche}"`);
    return niche;

  } catch (error) {
    console.error('❌ Error al identificar nicho:', error.message);
    // Fallback: usar una descripción genérica
    return 'servicios en línea';
  }
};

/**
 * Genera 5 prompts genéricos basados en el nicho identificado
 * para ver si la marca aparece naturalmente en las recomendaciones
 */
const generateNichePrompts = (niche, country) => {
  return [
    {
      id: 1,
      name: 'Mejores Empresas del Nicho',
      prompt: `¿Cuáles son las mejores empresas de ${niche} en ${country}? Dame un top 5.`
    },
    {
      id: 2,
      name: 'Recomendación de Servicios',
      prompt: `Necesito contratar servicios de ${niche} en ${country}. ¿Qué empresas me recomiendas?`
    },
    {
      id: 3,
      name: 'Búsqueda Genérica',
      prompt: `¿Qué empresas de ${country} ofrecen ${niche}?`
    },
    {
      id: 4,
      name: 'Comparación de Mercado',
      prompt: `Compara las principales empresas de ${niche} en ${country}. ¿Cuál es la mejor opción?`
    },
    {
      id: 5,
      name: 'Líderes del Sector',
      prompt: `¿Quiénes son los líderes en ${niche} en ${country}? Dame nombres de empresas reconocidas.`
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
const checkBrandInChatGPT = async (brand, url, country) => {
  console.log(`🔍 Iniciando verificación de marca: ${brand}`);
  console.log(`🌐 URL: ${url}`);
  console.log(`🌍 País: ${country}`);

  // Paso 1: Identificar el nicho de la marca
  const niche = await identifyNiche(brand, url);

  // Paso 2: Generar prompts genéricos basados en el nicho y país
  const prompts = generateNichePrompts(niche, country);
  const results = [];

  console.log(`\n🎯 Ejecutando prompts sobre el nicho: "${niche}" en ${country}\n`);

  // Paso 3: Ejecutar los prompts y verificar si la marca aparece
  for (const promptData of prompts) {
    try {
      console.log(`📝 Ejecutando prompt ${promptData.id}: ${promptData.name}`);

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

  // Retornar resultados con información del nicho
  return {
    niche: niche,
    results: results
  };
};

module.exports = {
  checkBrandInChatGPT,
  identifyNiche,
  generateNichePrompts
};
