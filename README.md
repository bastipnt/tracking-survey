# Survey

## Setup

```sh
bun install
```

### Backend

```sh
cd packages/backend

edgedb migrate
bunx @edgedb/generate interfaces
bunx @edgedb/generate edgeql-js
```

### Frontend
