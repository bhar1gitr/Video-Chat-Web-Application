
# Video Chat Web Application

A video chat web application supporting background removing using [Agora.io](https://www.agora.io/en/) API



## Table of Content
- [Video Chat Web Application](#video-chat-web-application)
  * [Tools](#tools)
  * [Dependencies](#dependencies)
  * [Why Agora.io?](#why-agoraio-)
  * [Deployment](#deployment)
  * [Changing Background](#changing-background)
  * [Author](#author)

## Tools
1. EJS
2. CSS
3. Bootstrap
4. JavaScript
5. Node.js
6. Express.js
7. Agora API


## Dependencies
1. Agora Access Token V2.0.4
2. Agora Extension Virtual Background V1.1.1
3. body-parser V1.20.0
4. ejs V3.1.8
5. express V4.18.1
6. dotenv V16.0.3

- To install dependencies, enter the project directory and run the following command
```bash
npm install
```
## Why Agora.io?
- Free account has 10,000 minutes a month
- Well documented, you can see the [Documentation](https://docs.agora.io/en/Video/API%20Reference/web_ng/index.html)
- Easy to deal with
- Numerous online resources
- Background removing is nearly effortless



## Deployment
1. Create free account on [Agora.io](https://www.agora.io/en/) 
2. Create new project on Agora with App ID + token authentication
3. In "server.js", you **MUST** change the "APP_ID" and "APP_CERTIFICATE" variables to the values appearing in the project on Agora
4. To deploy this project run
```bash
  node server.js
```
5. Open "http://localhost:3000" (or any port you which to deploy it on) in your browser
- If you downloaded the project without adding "node_modules" in the project directory, you should run the following command:
```bash
  npm install
```
- You can use [ngrok](https://ngrok.com/) to deploy it on on https website after running server on localhost

## Changing Background
- Changing background is done using the Agora Extension Virtual Background dependency, you can find the documentation [here](https://docs.agora.io/en/Video/virtual_background_web_ng?platform=Web)
- **Note:** After choosing the file, you should press "Add Background" button
## Author
- [Yousef Kotp](https://www.github.com/yousefkotp)

