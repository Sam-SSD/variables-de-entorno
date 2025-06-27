const KEY = window.ENV.API_KEY;

const chat = document.querySelector("#chat");
const prompt = document.querySelector("#prompt");
const button = document.querySelector("#generate");

const chatHistory = [];

function addMessage(content, sender = "ai") {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    if (sender === "user") {
        msg.textContent = content;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }
}

async function typeWriterMarkdown(content, element, delay = 15) {
    let current = "";
    for (let i = 0; i < content.length; i++) {
        current += content[i];
        element.innerHTML = marked.parse(current);
        element.querySelectorAll("pre code").forEach(block => {
            hljs.highlightElement(block);
        });
        element.scrollTop = element.scrollHeight;
        chat.scrollTop = chat.scrollHeight;
        await new Promise(res => setTimeout(res, delay));
    }
}

async function getCompletion(messages) {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                ...messages,
                {
                    role: "system",
                    content: "Actúas como un especialista en desarrollo de software y tecnologías de programación. Cada vez que incluyas fragmentos de código, debes usar bloques de Markdown delimitados con triple backtick (```), indicando el lenguaje correspondiente (por ejemplo, ```python, ```javascript, ```html). Presenta las respuestas de forma ordenada y fácil de leer, con explicaciones claras que permitan comprender no solo el funcionamiento del código sino también su propósito. Cuando sea pertinente, sugiere mejoras, prácticas recomendadas y advierte sobre posibles errores comunes. Prioriza la precisión técnica y un tono claro y profesional."
                },
            ],
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error en la API: ${error}`);
    }

    return await response.json();
}

button.addEventListener("click", async () => {
    const userInput = prompt.value.trim();
    if (!userInput) {
        window.alert("Por favor, escribe un mensaje.");
        return;
    }

    addMessage(userInput, "user");
    chatHistory.push({ role: "user", content: userInput });
    prompt.value = "";
    button.disabled = true;

    const aiMsgDiv = document.createElement("div");
    aiMsgDiv.className = "message ai";
    aiMsgDiv.innerHTML = `<span class=\"loading-dots\"><span>.</span><span>.</span><span>.</span></span>`;
    chat.appendChild(aiMsgDiv);
    chat.scrollTop = chat.scrollHeight;

    try {
        const response = await getCompletion(chatHistory);
        const aiMsg = response.choices[0].message.content;
        aiMsgDiv.innerHTML = ""; // Quita la animación
        await typeWriterMarkdown(aiMsg, aiMsgDiv, 10);
        chatHistory.push({ role: "assistant", content: aiMsg });
    } catch (error) {
        aiMsgDiv.textContent = "Hubo un error al procesar tu solicitud. Revisa la consola para más detalles.";
        console.error(error);
    } finally {
        button.disabled = false;
        prompt.focus();
    }
});

// Permite enviar con Ctrl+Enter
document.querySelector("#prompt").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
});