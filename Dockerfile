FROM node:16.15-alpine3.16 AS reactbuilder

WORKDIR /detectivexxiiiadmin

COPY . .

RUN npm install

RUN npm run build

FROM registry.thistine.com/serviceapifrontend

COPY --from=reactbuilder /detectivexxiiiadmin/build /app/static/

EXPOSE 4000

ENTRYPOINT [ "/app/serviceapifrontend" ]