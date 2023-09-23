const venom = require('venom-bot');

venom.create(
    'sessionName',
    (base64Qrimg, asciiQR, attempts) => {
        console.log('Number of attempts to read the qrcode:', attempts);
        console.log('Terminal qrcode:\n', asciiQR); // Exibir o QR code no terminal
    },
    (statusSession) => {
        console.log('Status Session:', statusSession);
    },
    {
        logQR: false,
        autoClose: 60000,
    },
    (browser, waPage) => {
        console.log('Browser PID:', browser.process().pid);
        waPage.screenshot({path: 'screenshot/screenshot.png'});

    }).then((client) => {
        client.onMessage(async (message) => {
            
            if (message.body === "/menu"){
                await client.sendText(message.from, "El único comando que tiene este bot es /menu para mostrar este mensaje de ayuda que estás viendo ahora. " +
                    "También puedes usar el comando /ping, que te responderá con 'Pong'. Si deseas saber dónde se encuentra el proyecto y agregar más comandos, " +
                    "aquí está el enlace al repositorio en GitHub. Solo tienes que escribir /where.");
            }

            if (message.body === "/where"){
                client.sendLinkPreview(message.from, "https://github.com/BAD-WOLF/WaBot.git", "Project WaBot")
            }

            if (message.body === '/ping') {
                await client.sendText(message.from, 'Pong! 🏓'); // Responder com "Pong!"
            }
        });

    }).catch((error) => {
        console.log(error);
    }
);
