# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
COPY packages/backend/package.json /temp/dev/packages/backend/
COPY packages/frontend/package.json /temp/dev/packages/frontend/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
COPY packages/backend/package.json /temp/prod/packages/backend/
COPY packages/frontend/package.json /temp/prod/packages/frontend/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# FROM base AS generate_edgeql
# COPY packages/backend/edgedb.toml .
# COPY packages/backend/dbschema .
# RUN --mount=type=secret,id=EDGEDB_DSN \
#   EDGEDB_DSN="$(cat /run/secrets/EDGEDB_DSN)" bunx edgedb migrate --dsn=$EDGEDB_DSN
# RUN bunx @edgedb/generate edgeql-js

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
# COPY --from=generate_edgeql /usr/src/app/dbschema/edgeql-js packages/backend/dbschema/

# [optional] tests & build
ENV NODE_ENV=production
ENV VITE_BACKEND_URL=tracking-survey.bastipnt.de
RUN cd /usr/src/app/packages/backend && bun run build
RUN cd /usr/src/app/packages/frontend && bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/packages/backend/build/server .
COPY --from=prerelease /usr/src/app/packages/frontend/dist dist

# run the app
USER bun

EXPOSE 3000
CMD [ "./server" ]
