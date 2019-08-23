FROM node:carbon

# Create app directory
RUN mkdir -p /var/www
RUN mkdir -p /var/www/logs
WORKDIR /var/www

# Install app dependencies
COPY package.json /var/www/
RUN npm --production install

# Bundle app source
COPY build /var/www/
RUN chmod -R 755 /var/www/
# RUN ls -lRa /var/www/* 

EXPOSE 3000 3001
CMD [ "node", "main" ]