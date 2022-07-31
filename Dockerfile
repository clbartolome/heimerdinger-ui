# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.10 as build
# Set the working directory
WORKDIR /app
COPY . .
RUN npm install
# Generate the build of the application
RUN npm run build --prod


FROM registry.access.redhat.com/ubi8/nginx-120

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /code

COPY --from=build /app/dist/heimerdinger-ui /usr/share/nginx/html

EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]


