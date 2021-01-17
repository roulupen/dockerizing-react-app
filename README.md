# Dockerizing React JS Application

## Dev Environment Setup

- Create React App using <https://github.com/facebook/create-react-app> documentation
- Then run the application. Modify the App.js to override the default content(this is optional).
- Create a Dockerfile and put the content as present in this git repo. You may have to modify the version of node or react-script(the exact version of this can be get from your application package.json) based on the target enviornment you want to run the application.
- Create a docker-compose.yml file and put the same content as present in this git repo docker-compose.yml file.

- Go to command prompt and execute:
  "docker-compose up -d --build"
- Once it sucessfully executed then go to <http://localhost:3000/> to verify your application is running from docker container.

- To stop the container execute following command: "docker-compose stop"

- In docker-compose.yml we have mentioend "CHOKIDAR_USEPOLLING=true" which enables a polling mechanism via chokidar (which wraps fs.watch, fs.watchFile, and fsevents) so that hot-reloading will work.

- In the application I have created a .env file where you should put all your application keys, example: Google API key. I'm accessing that key in App.js and displaying it. Ideally this file should be commited to git and it should be added in your CI/CD pipeline to safeguard your API keys.

NOTE: While building and runing the container it'll ask for admin permission for Windows users and once you allow to access the file location by docker then it'll copy those files to build and run the container.

## Prod Environment Setup

- Similar to Development environemnt here I have created Dockerfile.prod and docker-compose.prod.yml files.

- In production environment we don't need "CHOKIDAR_USEPOLLING=true", so that line has been removed.

- To build and run the container we need run following command: "docker-compose -f docker-compose.prod.yml up -d --build"

- To verify your application running from container go to <http://localhost:1337/> and you should be able to see your application.

## React Router and Nginx

- Since here the Web Server used is Nginx, we have to make some configuration chages to make sure React Router is working in docker container.
- Create the following folder "nginx" along with a nginx.conf file in the application root.
- Add following content to the nginx.conf file.

```
server {

  listen 80;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page   500 502 503 504  /50x.html;

  location = /50x.html {
    root   /usr/share/nginx/html;
  }

}
```

- Add following line in the Dockerfile.prod

```
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
```

Reference : https://mherman.org/blog/dockerizing-a-react-app/ 
