const venom = require("venom-bot");
const userState = {};

venom
  .create(
    "BotWhatsApp",
    (base64Qrimg, asciiQR, attempts) => {
      console.log("Number of attempts to read the qrcode:", attempts);
      console.log("Terminal qrcode:\n", asciiQR); // Exibir o QR code no terminal
    },
    (statusSession) => {
      console.log("Status Session:", statusSession);
    },
    {
      headless: false,
      logQR: false,
      autoClose: 60000,
    },
    (browser, waPage) => {
      console.log("Browser PID:", browser.process().pid);
      waPage.screenshot({ path: "screenshot/screenshot.png" });
    }
  )
  .then((client) => {
    client.onMessage(async (message) => {
      const user = message.from;
      const text = message.body.toLowerCase();

      if (text === "/menu") {
        const options = [
          "1. Proposito del grupo.",
          "2. Hacks del juego",
          "3. Bugs del juego",
          "4. Ayuda",
        ];
        const optionsText = options.join("\n");

        const response = `¡Bienvenido al menú de opciones!\n\n${optionsText}`;
        await client.sendText(user, response);
      } else if (text === "3" && userState[user] === "/menu") {
        const submenuOptions = [
          "A. Duplica tus programas",
          "B. Aqui otro bug",
          "C. Aqui otro bug",
        ];
        const submenuText = submenuOptions.join("\n");

        const submenuResponse = `¡Has seleccionado la Opción 1!\n\n${submenuText}`;
        await client.sendText(user, submenuResponse);

        userState[user] = "submenu";
      } else {
        if (!userState[user]) {
          userState[user] = "/menu";
        }

        if (userState[user] === "/menu") {
          await client.sendText(
            user,
            "Por favor, selecciona una opción del menú."
          );
        } else if (userState[user] === "submenu") {
          await client.sendText(
            user,
            "Estás en el submenu. Puedes seleccionar más opciones aquí."
          );
        }
      }

      if (text === "/where") {
        client.sendLinkPreview(
          message.from,
          "https://github.com/BAD-WOLF/WaBot.git",
          "Project WaBot"
        );
      }

      if (text === "/ping") {
        await client.sendText(message.from, "Pong! 🏓"); // Responder com "Pong!"
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
