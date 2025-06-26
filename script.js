const KEY = window.ENV.API_KEY

async function getCompletion(prompt) {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user", content: prompt},
                {
                    role: "system",
                    content: "Eres un asistente experto en programación. Siempre que incluyas código, utiliza bloques de código Markdown con triple backtick (```), e indica el lenguaje (ej. ```js, ```html). Asegúrate de que las respuestas sean claras, explicadas y con formato legible.",
                },
            ],
            //max_tokens: 200,
            //temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error en la API: ${error}`);
    }

    return await response.json();
}

const prompt = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");

button.addEventListener("click", async () => {
    console.log(prompt.value);

    if (!prompt.value) {
        window.alert("Please enter a prompt");
        return;
    }

    try {
        const response = await getCompletion(prompt.value);
        console.log(response);
        output.innerHTML = response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        window.alert("Hubo un error al procesar tu solicitud. Revisa la consola para más detalles.");
    }
});