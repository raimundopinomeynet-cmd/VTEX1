# 📖 Guía de Instalación para Principiantes

Esta guía te llevará paso a paso desde cero hasta tener la aplicación funcionando en tu computadora.

## 📋 Tabla de Contenidos

1. [Prerrequisitos](#prerrequisitos)
2. [Descargar el Código](#descargar-el-código)
3. [Instalar Dependencias](#instalar-dependencias)
4. [Configurar OpenAI](#configurar-openai)
5. [Ejecutar la Aplicación](#ejecutar-la-aplicación)
6. [Usar la Herramienta](#usar-la-herramienta)
7. [Solución de Problemas](#solución-de-problemas)

---

## 1. Prerrequisitos

### ¿Qué necesitas tener instalado?

#### A. Node.js (Motor de JavaScript)

**¿Tienes Node.js instalado?** Para verificarlo:

1. Abre la terminal/consola:
   - **Windows**: Presiona `Win + R`, escribe `cmd` y presiona Enter
   - **Mac**: Presiona `Cmd + Espacio`, escribe `terminal` y presiona Enter
   - **Linux**: Presiona `Ctrl + Alt + T`

2. Escribe este comando y presiona Enter:
   ```bash
   node --version
   ```

3. Si ves algo como `v18.17.0` o similar, ¡ya lo tienes! Salta a la sección siguiente.
4. Si ves un error, necesitas instalarlo:

**Instalar Node.js:**

1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS (recomendada)** para tu sistema operativo
3. Ejecuta el instalador y sigue los pasos (siguiente, siguiente, aceptar)
4. Reinicia tu terminal y verifica nuevamente con `node --version`

#### B. Git (Para descargar el código)

**¿Tienes Git instalado?** Para verificarlo:

```bash
git --version
```

Si ves algo como `git version 2.40.0`, ¡ya lo tienes!

**Instalar Git:**

- **Windows**: Descarga desde https://git-scm.com/download/win
- **Mac**: Ejecuta `xcode-select --install` en la terminal
- **Linux**: `sudo apt-get install git` (Ubuntu/Debian) o `sudo yum install git` (CentOS/Fedora)

---

## 2. Descargar el Código

Tienes **3 opciones** para obtener el código:

### Opción A: Clonar con Git (Recomendado si tienes Git)

1. Abre tu terminal
2. Ve a la carpeta donde quieres guardar el proyecto:
   ```bash
   cd Documentos
   # o la carpeta que prefieras
   ```

3. Clona el repositorio:
   ```bash
   git clone http://127.0.0.1:46554/git/raimundopinomeynet-cmd/VTEX1
   ```

4. Entra a la carpeta:
   ```bash
   cd VTEX1
   ```

### Opción B: Descargar ZIP desde GitHub

1. Ve al repositorio en tu navegador
2. Haz clic en el botón verde **"Code"**
3. Selecciona **"Download ZIP"**
4. Descomprime el archivo en la ubicación que prefieras
5. Abre la terminal y navega a esa carpeta:
   ```bash
   cd ruta/donde/descomprimiste/VTEX1
   ```

### Opción C: Ya estás en la carpeta del proyecto

Si ya estás trabajando en `/home/user/VTEX1` (como parece ser el caso), ¡perfecto! Ya tienes el código. Solo verifica que estés en la carpeta correcta:

```bash
pwd
# Debería mostrar algo como: /home/user/VTEX1
```

---

## 3. Instalar Dependencias

Las dependencias son las "herramientas" que la aplicación necesita para funcionar (Express, OpenAI, etc.).

1. **Asegúrate de estar en la carpeta del proyecto:**
   ```bash
   cd VTEX1
   # o la ruta donde descargaste el código
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

   Esto tomará 1-2 minutos. Verás muchas líneas de texto. Al final debería decir algo como:
   ```
   added 150 packages, and audited 151 packages in 45s
   ```

3. **Verifica la instalación:**
   ```bash
   ls node_modules
   ```

   Deberías ver muchas carpetas (express, openai, cors, etc.)

---

## 4. Configurar OpenAI

Necesitas una **API Key de OpenAI** para que la aplicación pueda consultar a ChatGPT.

### Paso 1: Obtener tu API Key

1. Ve a: https://platform.openai.com/
2. Haz clic en **"Sign up"** si no tienes cuenta, o **"Log in"** si ya la tienes
3. Una vez dentro, ve al menú lateral izquierdo
4. Haz clic en **"API keys"**
5. Haz clic en **"Create new secret key"**
6. Dale un nombre (ej: "Brand Checker") y crea la key
7. **¡IMPORTANTE!** Copia la key que aparece (solo la verás una vez)
   - Se ve algo así: `sk-proj-abc123...xyz789`

### Paso 2: Configurar la API Key en la Aplicación

1. **En la carpeta del proyecto, crea un archivo llamado `.env`:**

   **Opción 1 - Con editor de texto:**
   - Abre la carpeta VTEX1 en tu explorador de archivos
   - Crea un nuevo archivo de texto
   - Nómbralo exactamente `.env` (sin extensión .txt)
   - En Windows, asegúrate de mostrar extensiones de archivo

   **Opción 2 - Con terminal:**
   ```bash
   # En la carpeta VTEX1
   cp .env.example .env
   ```

2. **Edita el archivo `.env`:**

   Abre el archivo `.env` con cualquier editor de texto (Notepad, TextEdit, VS Code, etc.) y agrega:

   ```env
   OPENAI_API_KEY=sk-proj-TU_API_KEY_AQUI_PEGALA_COMPLETA
   PORT=3000
   ```

   **Reemplaza** `sk-proj-TU_API_KEY_AQUI_PEGALA_COMPLETA` con la API Key que copiaste.

3. **Guarda el archivo**

**Ejemplo de cómo debería verse:**
```env
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678
PORT=3000
```

### Importante sobre costos:

- OpenAI cobra por uso de la API
- Nuevas cuentas suelen tener $5 de crédito gratis
- Cada verificación completa (5 prompts) cuesta aproximadamente $0.01-0.02
- Revisa tu saldo en: https://platform.openai.com/account/usage

---

## 5. Ejecutar la Aplicación

¡Ya casi estás listo! Ahora vamos a iniciar el servidor.

1. **En la terminal, dentro de la carpeta VTEX1:**
   ```bash
   npm start
   ```

2. **Deberías ver algo así:**
   ```
   🚀 Servidor ejecutándose en http://localhost:3000
   📊 API disponible en http://localhost:3000/api
   ```

3. **¡El servidor está corriendo!** 🎉

   **IMPORTANTE:**
   - NO cierres esta ventana de terminal mientras uses la aplicación
   - Para detener el servidor: Presiona `Ctrl + C` en la terminal

---

## 6. Usar la Herramienta

Ahora que el servidor está corriendo, puedes usar la aplicación:

### Paso 1: Abrir la Aplicación

1. Abre tu navegador web (Chrome, Firefox, Safari, Edge)
2. Ve a: `http://localhost:3000`
3. Deberías ver la interfaz de **Brand SEO ChatGPT Checker**

### Paso 2: Verificar una Marca

1. **Nombre de la Marca**: Escribe el nombre de la marca que quieres verificar
   - Ejemplo: `Nike`

2. **URL del Sitio Web**: Escribe la URL completa del sitio
   - Ejemplo: `https://www.nike.com`

3. Haz clic en **"Verificar Marca"**

4. **Espera 10-15 segundos** mientras se ejecutan los 5 prompts a ChatGPT

5. **Verás los resultados:**
   - Porcentaje de visibilidad de la marca
   - Cuántos prompts mencionaron la marca
   - La pregunta exacta de cada prompt
   - La respuesta completa de ChatGPT
   - Si la marca fue mencionada o no en cada respuesta

### Ejemplos de Marcas para Probar:

- **Marcas conocidas:**
  - Nike - https://www.nike.com
  - Apple - https://www.apple.com
  - Tesla - https://www.tesla.com
  - Coca-Cola - https://www.coca-cola.com

- **Marcas menos conocidas:**
  - Tu empresa o marca local
  - Competidores de tu industria

---

## 7. Solución de Problemas

### Error: "Cannot find module"

**Solución:**
```bash
npm install
```

### Error: "OPENAI_API_KEY no está definido"

**Solución:**
- Verifica que el archivo `.env` existe en la carpeta raíz del proyecto
- Verifica que la API Key esté correctamente escrita sin espacios
- Reinicia el servidor (Ctrl+C y luego `npm start`)

### Error: "Port 3000 is already in use"

**Solución 1 - Cambiar el puerto:**
- Edita el archivo `.env` y cambia:
  ```env
  PORT=3001
  ```
- Reinicia el servidor
- Accede a: `http://localhost:3001`

**Solución 2 - Detener el otro proceso:**
- **Windows**: Abre el Administrador de Tareas, busca Node.js y ciérralo
- **Mac/Linux**:
  ```bash
  lsof -ti:3000 | xargs kill
  ```

### Error: "429 Too Many Requests" de OpenAI

**Solución:**
- Espera unos minutos entre verificaciones
- Verifica que tengas crédito disponible en tu cuenta de OpenAI
- La aplicación ya incluye pausas de 500ms entre prompts

### La página no carga (localhost:3000 no responde)

**Solución:**
1. Verifica que el servidor esté corriendo (mira la terminal)
2. Si no lo está, ejecuta `npm start`
3. Verifica que no haya errores en la terminal
4. Prueba refrescar la página (F5)

### Error: "Invalid API Key"

**Solución:**
- Verifica que copiaste la API Key completa
- Asegúrate de que no tenga espacios al inicio o final
- Verifica que la key sea válida en: https://platform.openai.com/api-keys

---

## 🎉 ¡Listo!

Si seguiste todos los pasos, deberías tener la aplicación funcionando.

### ¿Qué hacer ahora?

1. **Prueba con diferentes marcas** para ver cómo varía la visibilidad
2. **Compara tu marca** con competidores
3. **Analiza los resultados** para mejorar tu estrategia de SEO

### Comandos Útiles:

```bash
# Iniciar la aplicación
npm start

# Iniciar con auto-reload (útil para desarrollo)
npm run dev

# Detener el servidor
Ctrl + C

# Ver archivos del proyecto
ls        # Mac/Linux
dir       # Windows

# Ver contenido de un archivo
cat archivo.txt    # Mac/Linux
type archivo.txt   # Windows
```

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:

1. Lee la sección de **Solución de Problemas** arriba
2. Verifica que seguiste todos los pasos en orden
3. Revisa los mensajes de error en la terminal
4. Asegúrate de tener Node.js versión 14 o superior: `node --version`

---

**¡Disfruta usando Brand SEO ChatGPT Checker!** 🚀
