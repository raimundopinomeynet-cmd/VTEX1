# Blog VTEX IO

Este es un blog simple creado con VTEX IO que incluye:
- Una página de inicio del blog que muestra una lista de artículos
- Una plantilla simple para artículos individuales

## Estructura del Proyecto

```
/
├── manifest.json                 # Configuración de la app VTEX IO
├── store/
│   ├── interfaces.json          # Definición de interfaces
│   ├── routes.json              # Configuración de rutas
│   └── blocks/
│       ├── blog-home.json       # Página de inicio del blog
│       └── blog-post.json       # Plantilla de artículo individual
└── styles/
    └── css/
        └── vtex.store.css       # Estilos del blog
```

## Rutas

- `/blog` - Página de inicio del blog (lista de artículos)
- `/blog/:slug` - Página de artículo individual

## Cómo Agregar un Nuevo Artículo

### 1. Agregar el artículo a la lista (blog-home.json)

Edita `/store/blocks/blog-home.json` y agrega un nuevo bloque de artículo:

```json
"flex-layout.row#blog-post-4": {
  "children": [
    "flex-layout.col#blog-post-item-4"
  ],
  "props": {
    "blockClass": "blogPostItem",
    "marginBottom": 5
  }
},
"flex-layout.col#blog-post-item-4": {
  "children": [
    "rich-text#blog-post-title-4",
    "rich-text#blog-post-excerpt-4",
    "link#blog-post-link-4"
  ],
  "props": {
    "blockClass": "blogPostContent",
    "paddingTop": 4,
    "paddingBottom": 4,
    "paddingLeft": 4,
    "paddingRight": 4
  }
},
"rich-text#blog-post-title-4": {
  "props": {
    "text": "## Tu Título Aquí",
    "blockClass": "blogPostTitle"
  }
},
"rich-text#blog-post-excerpt-4": {
  "props": {
    "text": "Tu extracto del artículo aquí...",
    "blockClass": "blogPostExcerpt"
  }
},
"link#blog-post-link-4": {
  "props": {
    "label": "Leer más",
    "href": "/blog/tu-articulo",
    "blockClass": "blogPostLink"
  }
}
```

No olvides agregar `"flex-layout.row#blog-post-4"` al array de children de `flex-layout.col#blog-posts`.

### 2. Crear la página del artículo

Crea un nuevo archivo en `/store/blocks/` llamado por ejemplo `blog-post-tu-articulo.json`:

```json
{
  "store.custom#blog-post-tu-articulo": {
    "blocks": [
      "flex-layout.row#blog-post-header",
      "flex-layout.row#blog-post-content",
      "flex-layout.row#blog-post-back"
    ]
  },
  "flex-layout.row#blog-post-header": {
    "children": ["flex-layout.col#blog-post-header"],
    "props": {
      "blockClass": "blogPostHeader",
      "paddingTop": 7,
      "paddingBottom": 5
    }
  },
  "flex-layout.col#blog-post-header": {
    "children": ["rich-text#blog-post-title"],
    "props": {"blockClass": "blogPostHeaderCol"}
  },
  "rich-text#blog-post-title": {
    "props": {
      "text": "# Tu Título Aquí",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "blogPostMainTitle"
    }
  },
  "flex-layout.row#blog-post-content": {
    "children": ["flex-layout.col#blog-post-body"],
    "props": {
      "blockClass": "blogPostContentRow",
      "paddingTop": 5,
      "paddingBottom": 7
    }
  },
  "flex-layout.col#blog-post-body": {
    "children": ["rich-text#blog-post-body"],
    "props": {"blockClass": "blogPostBodyCol", "width": "100%"}
  },
  "rich-text#blog-post-body": {
    "props": {
      "text": "Tu contenido aquí...",
      "blockClass": "blogPostBody"
    }
  },
  "flex-layout.row#blog-post-back": {
    "children": ["flex-layout.col#blog-post-back"],
    "props": {"blockClass": "blogPostBackRow", "paddingBottom": 7}
  },
  "flex-layout.col#blog-post-back": {
    "children": ["link#blog-back"],
    "props": {"blockClass": "blogPostBackCol"}
  },
  "link#blog-back": {
    "props": {
      "label": "← Volver al Blog",
      "href": "/blog",
      "blockClass": "blogBackLink"
    }
  }
}
```

## Personalización de Estilos

Los estilos se encuentran en `/styles/css/vtex.store.css`. Puedes modificar:

- Colores
- Tipografía
- Espaciados
- Bordes y sombras

## Deployment

Para desplegar este blog en tu tienda VTEX:

```bash
vtex link
```

O para publicar:

```bash
vtex publish
```

## Notas

- Este blog es una implementación simple usando bloques nativos de VTEX IO
- No incluye funcionalidades de autor, fecha o categorías
- Los artículos se gestionan mediante archivos JSON estáticos
- Para funcionalidades más avanzadas, considera usar una app de blog de terceros o desarrollar componentes React personalizados
