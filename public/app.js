// Configuración de la API
const API_URL = '/api';

// Elementos del DOM
const brandForm = document.getElementById('brandForm');
const submitBtn = document.getElementById('submitBtn');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const errorMessage = document.getElementById('errorMessage');
const detailedResults = document.getElementById('detailedResults');
const currentPromptSpan = document.getElementById('currentPrompt');

// Event listener para el formulario
brandForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const brand = document.getElementById('brand').value.trim();
    const url = document.getElementById('url').value.trim();
    const niche = document.getElementById('niche').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!brand || !url || !niche || !country) {
        showError('Por favor, completa todos los campos');
        return;
    }

    await checkBrand(brand, url, niche, country);
});

// Función principal para verificar la marca
async function checkBrand(brand, url, niche, country) {
    // Limpiar estados previos
    hideError();
    hideResults();
    showLoading();

    try {
        const response = await fetch(`${API_URL}/check-brand`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ brand, url, niche, country })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en la solicitud');
        }

        const data = await response.json();

        hideLoading();
        displayResults(data);

    } catch (error) {
        hideLoading();
        showError(error.message || 'Error al conectar con el servidor. Asegúrate de que el servidor esté ejecutándose.');
        console.error('Error:', error);
    }
}

// Mostrar estado de carga
function showLoading() {
    loadingState.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando...';

    // Simular progreso de prompts
    let currentPrompt = 0;
    const interval = setInterval(() => {
        currentPrompt++;
        if (currentPrompt <= 5) {
            currentPromptSpan.textContent = currentPrompt;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

// Ocultar estado de carga
function hideLoading() {
    loadingState.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Verificar Marca';
}

// Mostrar resultados
function displayResults(data) {
    resultsSection.classList.remove('hidden');

    // Actualizar información de nicho
    const nicheElement = document.getElementById('nicheDetected');
    if (nicheElement && data.niche) {
        nicheElement.textContent = data.niche;
    }

    // Actualizar información de país
    const countryElement = document.getElementById('countryDetected');
    if (countryElement && data.country) {
        countryElement.textContent = data.country;
    }

    // Actualizar resumen
    document.getElementById('totalPrompts').textContent = data.summary.totalPrompts;
    document.getElementById('mentionsFound').textContent = data.summary.mentionsFound;
    document.getElementById('mentionsNotFound').textContent = data.summary.mentionsNotFound;

    // Calcular y mostrar porcentaje
    const percentage = (data.summary.mentionsFound / data.summary.totalPrompts) * 100;
    document.getElementById('scoreFill').style.width = `${percentage}%`;
    document.getElementById('scoreText').textContent = `${percentage.toFixed(0)}% de visibilidad`;

    // Limpiar resultados previos
    detailedResults.innerHTML = '';

    // Mostrar resultados detallados
    data.results.forEach((result, index) => {
        const resultItem = createResultItem(result, index + 1);
        detailedResults.appendChild(resultItem);
    });

    // Scroll suave hacia los resultados
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Crear elemento de resultado
function createResultItem(result, number) {
    const div = document.createElement('div');
    div.className = `result-item ${result.brandMentioned ? 'mentioned' : 'not-mentioned'}`;

    const status = result.brandMentioned ?
        '<span class="result-badge badge-success">✓ Encontrada</span>' :
        '<span class="result-badge badge-danger">✗ No encontrada</span>';

    div.innerHTML = `
        <div class="result-header">
            <span class="result-title">Prompt ${number}: ${result.promptName}</span>
            ${status}
        </div>
        <div class="result-prompt">
            <strong>Pregunta:</strong> ${result.prompt}
        </div>
        <div class="result-response">
            <strong>Respuesta de ChatGPT:</strong><br>
            ${result.response ? result.response : '<em>Error al obtener respuesta</em>'}
        </div>
        ${result.error ? `<div style="color: var(--danger-color); margin-top: 1rem;"><strong>Error:</strong> ${result.error}</div>` : ''}
    `;

    return div;
}

// Mostrar mensaje de error
function showError(message) {
    errorMessage.classList.remove('hidden');
    errorMessage.querySelector('p').textContent = message;
}

// Ocultar mensaje de error
function hideError() {
    errorMessage.classList.add('hidden');
}

// Ocultar resultados
function hideResults() {
    resultsSection.classList.add('hidden');
}

// Validación de URL en tiempo real
document.getElementById('url').addEventListener('blur', (e) => {
    const url = e.target.value;
    if (url && !isValidUrl(url)) {
        e.target.style.borderColor = 'var(--danger-color)';
    } else {
        e.target.style.borderColor = '';
    }
});

// Función auxiliar para validar URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
