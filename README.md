# Build

## Build Excalidraw Room

```sh
cd excalidraw-room

yarn install --frozen-lockfile

yarn build

PORT=3002 yarn start
```

## Build Excalidraw App

```sh
cd excalidraw

git apply ../excalidraw.patch

yarn install --frozen-lockfile

yarn build

yarn start:production
```