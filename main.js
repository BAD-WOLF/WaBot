const venom = require("venom-bot");

// Objeto para armazenar o estado do usuário
const userState = {};

// Função para exibir o menu de opções
async function showMenu(client, user) {
    const options = [
        "1. Proposito del grupo.",
        "2. Hacks del juego",
        "3. Bugs del juego",
        "4. Ayuda",
    ];
    const response = `¡Bienvenido al menú de opciones!\n\n${options.join("\n")}`;
    await client.sendText(user, response);
    userState[user] = "/menu";
}

async function showSubmenu(client, user) {
    if (userState[user] === "/menu") {
        const submenuOptions = [
            "A. Duplica tus programas",
            "B. Aqui otro bug",
            "C. Aqui otro bug",
        ];
        const submenuResponse = `¡Has seleccionado la Opción 1!\n\n${submenuOptions.join(
            "\n"
        )}`;
        await client.sendText(user, submenuResponse);
        userState[user] = "submenu";
        userState
    }
}

// Função para lidar com mensagens recebidas
async function handleMessage(client, message) {
    const user = message.from;
    const text = message.body.toLowerCase();

    switch (text) {
        case "/menu":
            await showMenu(client, user);
            break;

        case "3":
            await showSubmenu(client, user)
            break;

        case "/where":
            client.sendLinkPreview(
                message.from,
                "https://github.com/BAD-WOLF/WaBot.git",
                "Project WaBot"
            );
            break;

        case "/cancel":
            if(userState[user]){
                delete userState[user];
                await client.sendText(user, "Acción "+userState[user]+" cancelada.");
                break;
            }
            client.sendText(user, "Nada a cancelar")
            break;

        case "/ping":
            await client.sendText(message.from, "Pong! 🏓");
            break;

        default:
            if (!userState[user]) {
                console.log({
                    isGroup: message.isGroupMsg,
                    name: message.sender.pushname,
                    message: message.body
                });
            } else if (userState[user] === "submenu") {
                await client.sendText(
                    user,
                    "Estás en el submenu. Puedes seleccionar más opciones aquí."
                );
            }
            break;
    }
}

venom
    .create(
        "BotWhatsApp",
        (base64Qrimg, asciiQR, attempts) => {
            console.log("Number of attempts to read the qrcode:", attempts);
            console.log("Terminal qrcode:\n", asciiQR);
        },
        (statusSession) => {
            console.log("Status Session:", statusSession);
        },
        {
            logQR: false,
            autoClose: 60000,
        },
        async (browser, waPage) => {
            console.log("Browser PID:", browser.process().pid);
            await waPage.screenshot({path: "screenshot/screenshot.png"});
        }
    )
    .then((client) => {
        client.onMessage(async (message) => {
            handleMessage(client, message).catch((error) => {
                console.error("Error handling message:", error);
            });
        });
    })
    .catch((error) => {
        console.error("Error creating WhatsApp client:", error);
    });
