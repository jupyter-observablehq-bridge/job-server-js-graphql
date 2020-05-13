FROM node:13.12.0-stretch-slim

WORKDIR /app

COPY package.json /app

RUN npm install

ADD src/ /app/src

ENV USER=bridge
ENV GROUP=bridge
ENV UID=12345
ENV GID=23456

RUN addgroup --gid "$GID" "$USER" && \
    adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "$USER" \
    --no-create-home \
    --uid "$UID" "$USER"        

USER $USER

WORKDIR /app

CMD [ "npm", "run", "start-prod" ] 

# EXPOSE 4000
