FROM node:22.23.2-alpine

RUN apk add --no-cache bash docker-cli docker-cli-compose git go build-base python3 coreutils
RUN apk add --no-cache gcompat

ENV FABRIC_SAMPLES=/opt/fabric-samples
ENV PATH=/opt/fabric-samples/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
WORKDIR /workspace
CMD ["sleep", "infinity"]
