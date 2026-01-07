# 🔍 Brand SEO ChatGPT Checker

Herramienta web para verificar la aparición de tu marca en respuestas de ChatGPT. Esta aplicación ejecuta 5 prompts diferentes diseñados específicamente para evaluar la visibilidad y presencia de una marca en las respuestas de la API de OpenAI.

## 📋 Características

- ✅ **5 Prompts Especializados**: Diseñados para evaluar diferentes aspectos de la presencia de marca
- 🎨 **Interfaz Web Moderna**: Diseño intuitivo y responsivo
- 📊 **Análisis Detallado**: Resultados completos con cada respuesta de ChatGPT
- 📈 **Métricas de Visibilidad**: Porcentaje de aparición de la marca
- ⚡ **API RESTful**: Backend robusto con Express.js

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- API Key de OpenAI

### Pasos de Instalación

1. **Clonar o descargar el proyecto**

```bash
cd VTEX1
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` y agrega tu API Key de OpenAI:

```env
OPENAI_API_KEY=tu-api-key-de-openai-aqui
PORT=3000
```

Para obtener tu API Key de OpenAI:
- Ve a [platform.openai.com](https://platform.openai.com/)
- Inicia sesión o crea una cuenta
- Ve a "API Keys" y crea una nueva key

## 🎯 Uso

### Iniciar el Servidor

**Modo Desarrollo** (con auto-reload):
```bash
npm run dev
```

**Modo Producción**:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### Usando la Herramienta

1. Abre tu navegador y ve a `http://localhost:3000`
2. Ingresa el **nombre de la marca** que quieres verificar
3. Ingresa la **URL del sitio web** de la marca
4. Haz clic en "Verificar Marca"
5. Espera mientras se ejecutan los 5 prompts (toma aproximadamente 10-15 segundos)
6. Revisa los resultados detallados

## 📊 Los 5 Prompts

La herramienta ejecuta los siguientes prompts para evaluar la presencia de tu marca:

1. **Recomendación Directa**: "¿Cuáles son las mejores opciones para [MARCA]?"
2. **Búsqueda de Alternativas**: "Necesito encontrar empresas similares a [MARCA]"
3. **Consulta de Información**: "¿Qué puedes decirme sobre [MARCA]?"
4. **Comparación de Mercado**: "Compara las principales opciones relacionadas con [MARCA]"
5. **Búsqueda por URL**: "¿Conoces el sitio web [URL]?"

## 🏗️ Estructura del Proyecto

```
VTEX1/
├── src/
│   ├── server.js              # Servidor Express principal
│   ├── routes/
│   │   └── brandChecker.js    # Rutas de la API
│   └── services/
│       └── openaiService.js   # Lógica de integración con OpenAI
├── public/
│   ├── index.html             # Interfaz web
│   ├── styles.css             # Estilos
│   └── app.js                 # Lógica del frontend
├── .env                       # Variables de entorno (no incluido en git)
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore                 # Archivos ignorados por git
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```

## 🔌 API Endpoints

### POST `/api/check-brand`

Verifica la aparición de una marca en ChatGPT.

**Request Body:**
```json
{
  "brand": "Nike",
  "url": "https://www.nike.com"
}
```

**Response:**
```json
{
  "success": true,
  "brand": "Nike",
  "url": "https://www.nike.com",
  "results": [
    {
      "promptId": 1,
      "promptName": "Recomendación Directa",
      "prompt": "¿Cuáles son las mejores opciones para Nike?",
      "response": "...",
      "brandMentioned": true,
      "timestamp": "2024-01-07T10:30:00.000Z"
    }
  ],
  "summary": {
    "totalPrompts": 5,
    "mentionsFound": 4,
    "mentionsNotFound": 1
  }
}
```

### GET `/health`

Health check del servidor.

**Response:**
```json
{
  "status": "ok",
  "message": "Brand SEO ChatGPT Checker API is running"
}
```

## 🔧 Configuración Avanzada

### Cambiar el Modelo de OpenAI

Por defecto se usa `gpt-4o-mini`. Para cambiar el modelo, edita `src/services/openaiService.js`:

```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // Cambia aquí el modelo
  // ...
});
```

### Modificar los Prompts

Los prompts se definen en la función `generatePrompts` en `src/services/openaiService.js`. Puedes agregar, modificar o eliminar prompts según tus necesidades.

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: OpenAI API (GPT-4o-mini)
- **Dependencias principales**:
  - `express`: Framework web
  - `openai`: Cliente oficial de OpenAI
  - `dotenv`: Gestión de variables de entorno
  - `cors`: Manejo de CORS

## 🐛 Solución de Problemas

### Error: "OPENAI_API_KEY no configurado"

Asegúrate de tener un archivo `.env` con tu API Key:
```env
OPENAI_API_KEY=sk-...
```

### Error: "Cannot find module"

Ejecuta:
```bash
npm install
```

### Puerto 3000 en uso

Cambia el puerto en el archivo `.env`:
```env
PORT=3001
```

### Timeout o errores de conexión

Verifica tu conexión a internet y que tu API Key de OpenAI sea válida y tenga créditos disponibles.

## 📝 Notas Importantes

- **Costos**: Cada verificación consume tokens de tu cuenta de OpenAI. Aproximadamente $0.01-0.02 por verificación completa.
- **Rate Limits**: La herramienta incluye pausas de 500ms entre prompts para evitar problemas con límites de la API.
- **Privacidad**: Los datos no se almacenan. Cada consulta es independiente.

## 🤝 Contribuciones

Si deseas mejorar esta herramienta:

1. Crea un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Desarrollo

Para desarrollo activo con auto-reload:

```bash
npm run dev
```

Para producción:

```bash
npm start
```

---

Desarrollado con ❤️ para mejorar la visibilidad de marcas en IA
