const Server = require("simple-websocket/server");
const { v4: uuidv4 } = require("uuid");

const server = new Server({ port: process.env.PORT });

const connections = [];

server.on("connection", function (socket) {
  socket.send(
    JSON.stringify({ type: "log", data: { message: "Connection accepted" } })
  );

  socket.on("data", function (data) {
    const parsedData = JSON.parse(data);
    console.log(parsedData);

    switch (parsedData.type) {
      case "init":
        const { relation } = parsedData.data;
        const id = uuidv4();
        connections.push({ relation, id, socket });
        socket.send(
          JSON.stringify({
            type: "init",
            data: {
              id,
            },
          })
        );
        break;

      default:
        const debuggerUi = connections.find(
          (connection) => connection.relation === "debugger"
        );

        if (debuggerUi) {
          debuggerUi.socket.send(
            JSON.stringify({ type: parsedData.type, data: parsedData.data })
          );
        }
        break;
    }
  });

  socket.on("close", function () {
    // Find a way to delete the corresponding client object from clients
  });

  socket.on("error", function (error) {
    console.error(error);
  });
});
