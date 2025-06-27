# 🧑‍💻 ChatGPT Clone - Web Chatbot

¡Bienvenido a tu clon de ChatGPT! Este proyecto es una aplicación web moderna que simula la experiencia de chat de ChatGPT, permitiendo interactuar con la API de OpenAI y mostrando respuestas con soporte para Markdown y bloques de código resaltados.

---

## ✨ Características principales

- **Interfaz tipo ChatGPT**: Mensajes en burbujas, animación de "escribiendo..." y diseño responsivo.
- **Soporte Markdown**: Las respuestas de la IA pueden incluir texto enriquecido, listas, títulos y bloques de código.
- **Resaltado de código**: Los fragmentos de código se muestran con colores y formato profesional.
- **Contexto de conversación**: El chat mantiene el historial para que la IA recuerde todo lo hablado.
- **Animación de carga**: Antes de cada respuesta, se muestra una animación de puntos como en ChatGPT.
- **Totalmente responsivo**: Se adapta perfectamente a computadoras, tablets y móviles.

---

## 📸 Captura de pantalla

> ![Demo del Chat](https://github.com/user-attachments/assets/341b5dd2-0f55-47c6-acf7-5c47c0cd64a5)

---

## 🚀 Instalación y uso

1. **Clona el repositorio o descarga los archivos.**
2. **Agrega tu clave de API de OpenAI** en un archivo `env.js`:
   ```js
   window.ENV = { API_KEY: "TU_API_KEY_AQUI" };
   ```
3. **Abre `index.html` en tu navegador.**

¡Listo! Ya puedes empezar a chatear con la IA.

---

## 🛠️ Estructura del proyecto

```
variables-de-entorno/
├── index.html        # Página principal
├── styles.css        # Estilos modernos y responsivos
├── script.js         # Lógica del chat y conexión con OpenAI
├── env.js            # Tu clave de API (NO subir a repositorios públicos)
└── ...
```

---

## 📚 Librerías y tecnologías usadas

- **[OpenAI API](https://platform.openai.com/docs/api-reference/chat/create)**
  - Provee las respuestas inteligentes del chat.
- **[marked.js](https://github.com/markedjs/marked)**
  - Convierte Markdown a HTML para mostrar respuestas enriquecidas.
- **[highlight.js](https://highlightjs.org/)**
  - Resalta la sintaxis de los bloques de código en las respuestas.
- **HTML5, CSS3 y JavaScript**
  - Para la estructura, estilos y lógica de la aplicación.

Las librerías externas se cargan vía CDN en el `index.html`, por lo que no necesitas instalación adicional.

---

## ⚙️ Personalización

- **Colores y estilos**: Modifica `styles.css` para cambiar la apariencia.
- **Modelo de IA**: Puedes cambiar el modelo en `script.js` (por ejemplo, a `gpt-4` si tienes acceso).
- **Velocidad de escritura**: Ajusta el parámetro `delay` en la función `typeWriterMarkdown`.
- **Mensajes del sistema**: Personaliza el mensaje del rol `system` en `script.js` para cambiar el comportamiento de la IA.

---

## 🔒 Seguridad
- **¡No subas tu archivo `env.js` a repositorios públicos!**
- La clave de API queda expuesta en el frontend, úsala solo para proyectos personales o de prueba.

---

## 👨‍💻 Créditos y agradecimientos

- Inspirado en la experiencia de [ChatGPT](https://chat.openai.com/).
- Markdown y resaltado de código gracias a [marked.js](https://github.com/markedjs/marked) y [highlight.js](https://highlightjs.org/).

---

## 📝 Licencia

Este proyecto es de uso libre para fines educativos y personales. 
