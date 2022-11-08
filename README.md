# WS Dev Tools Server

A simple websocket API server for handling logging from the [@xhudaman/ws-console](https://www.npmjs.com/package/@xhudaman/ws-console) package.

## How to use

#### Pull the image from DockerHub

```bash
docker pull xhudaman/ws-devtools-server@latest
```

#### Run the image

> **Note**: If you would like to run the server on a different port, change the host port to the desired number. i.e. if you want the server to be accessible on port `8000` you would update the command to use the following port mapping: `8000:3001`

```bash
docker run --rm -p 3001:3001 xhudaman/ws-devtools-server
```

Once you are done using the server it can be shutdown by hitting `ctrl+c`.

## Building the image

1. Clone the repo and enter the directory in terminal

2. Run the following command:
   ```bash
     docker build -t <image-tag> --target build .
   ```

You can override the default app port inside the container by passing the following option `--build-arg PORT=<port number>`, where `<port number>` is the desired container port to run the app on.

You could then run the server with the above run command replacing the image name with the one you chose and updating the right side of the port binding to match the port number passed into the build command.
