# Survey

## Setup

```sh
bun install
```

### Backend

```sh
cd packages/backend

gel migrate
bunx @gel/generate interfaces
bunx @gel/generate edgeql-js
```

### Frontend
