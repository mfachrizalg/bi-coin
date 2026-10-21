FROM docker:29.8.1-cli AS docker
FROM golang:1.26.8-bookworm AS go

# The Fabric release binaries (peer, fabric-ca-client) are linked against glibc;
# fabric-ca-client fails under Alpine's gcompat ("fcntl64: symbol not found").
FROM node:22.23.2-bookworm-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends bash git build-essential python3 coreutils openssl curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
COPY --from=docker /usr/local/bin/docker /usr/local/bin/docker
COPY --from=docker /usr/local/libexec/docker/cli-plugins/docker-compose /usr/local/libexec/docker/cli-plugins/docker-compose
COPY --from=go /usr/local/go /usr/local/go

ENV FABRIC_SAMPLES=/opt/fabric-samples
ENV PATH=/opt/fabric-samples/bin:/usr/local/go/bin:/root/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
WORKDIR /workspace
CMD ["sleep", "infinity"]
