const Server = require("simple-websocket/server");
const { v4: uuidv4 } = require("uuid");

const server = new Server({ port: process.env.PORT });

let connections = [];

server.on("connection", function (socket) {
  socket.send(
    JSON.stringify({ type: "log", data: { message: "Connection accepted" } })
  );

  socket.on("data", function (data) {
    const parsedData = JSON.parse(data);
    console.log(parsedData);

    const debuggers = connections.filter(
      (connection) => connection.relation === "debugger"
    );

    switch (parsedData.type) {
      case "init":
        const { relation } = parsedData.data;
        const id = socket._id;

        connections.push({ relation, id, socket });

        if (relation === "client") {
          console.log("Client connection accepted", id);

          debuggers.forEach((debuggerUi) => {
            console.log("Updating debugger of new client", id);
            debuggerUi.socket.send(
              JSON.stringify({
                type: "init",
                message: "New client connected!",
                data: {
                  id,
                },
              })
            );
          });
        }

        // Send the client back its id
        socket.send(
          JSON.stringify({
            type: "init",
            data: {
              id,
            },
          })
        );
        break;

      case "disconnect":
        const { id: socketId } = parsedData.data;
        connections = connections.filter(
          (connection) => connection.id !== socketId
        );
        break;

      default:
        debuggers.forEach((debuggerUi) => {
          debuggerUi.socket.send(
            JSON.stringify({
              type: parsedData.type,
              message: parsedData.message,
              data: parsedData.data,
            })
          );
        });
        break;
    }
  });

  socket.on("error", function (error) {
    console.error(error);
  });
});
