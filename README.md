<div align="center">

# Sadyn Simple WebService  

*This is an easy-to-use Web Service to easily host your website to a specific port.*  

Directly go to the guide section by [clicking here](#guide)!

</div>

---

# Dependecies  

| Package | Version |
| :-----: | :----- |
| NodeJS | `v16.x` and higher |
| NPM | `v8.x` and higher |

# Compatibility  

**Sadyn Simple WebService works with any Operating System!**  

# Installing  

> *We will probably create an installing script in the future.*  

- **Step 1** Download the WebService simply from our [latest release on GitHub](https://github.com/Sadyn-Project/Simple-WebService/releases/latest/) or using this command line:  

```bash

# Execute this inside a folder!
curl -L https://github.com/Sadyn-Project/Simple-WebService/releases/latest/download/WebService.tar.gz | tar -xzv

```

> This may require some dependecies to work, we suggest downloading it from [GitHub](https://github.com/Sadyn-Project/Simple-WebService/releases/latest/).  

---

- **Step 2** Run these commands below:  

```bash

# Install required packages and dependecies
npm install

# Run setup script to generate your folders and config file
npm run setup

```

---

- **Now you should have finished installing!**  

---

### <span style="background: #4945FF; padding: 8px; border-radius: 10px;">⚠️</span> <span style="color: white; background: #FF5445; padding: 8px; border-radius: 10px; text-decoration: underline;">Warning</span>  

**DO NOT EVER TOUCH THE `src` FOLDER!**  
Inside that folder you can find source code which grants this Web Service to work, do not ever touch files inside it unless you exactly know what you are doing.  

# Guide  

Precisely follow these instructions to know how to use this Web Service, and for any help ask on our [Discord Community](https://discord.gg/PBrPeuACnU/).  

Jump to a specific feature from here:  

- [Choosing a port](#choosing-a-port)  
- [Uploading pages](#uploading-pages)  
- [Uploading files](#uploading-files)  
- [Using redirects](#using-redirects)  
- [Using commands](#using-commands)

**IF YOU HAVEN'T FOLLOWED SETUP, FIRST GO [HERE](#installing)!

## Choosing a port  

These should be these files and folders inside your directory:  

```

| files/
| node_modules/
| pages/
| src/
| .gitignore
| .npmrc
| config.json
| package-lock.json
| package.json
| README.md

```

As you can see, you should find a file called `config.json`.  
Open it with a text editor and you'll find the `port` value *(By default on line 2)*.  
It should be set to `8080` after installing, but you can change it to the port you need the Web Service to listen to.  

## Uploading pages  

To upload a new page to your website, just upload an html file inside the `pages` folder.  

### Pages rules  

- Every file path inside that folder will correspond to your URL path but without the `.html` at the end.  

> For example, `pages/hello.html` will be `/hello`.  
> Else, `pages/foo/bar.html` will be `/foo/bar`.  

- `pages/index.html` will correspond to `/`.  

- If you create a `404.html` file, every non-existing URL will bring to this page.  

## Uploading files  

This is similar to uploading pages. To upload files, you just need to upload them inside the `files` folder.  

- Every file directory inside `files/` will correspond to the URL exactly as pages.  

> For example, `files/favicon.ico` corresponds to `/favicon.ico`.  

## Using redirects

> *To interact with advanced configuration you need some JSON knowledge.*

Inside the `config.json` file you will find a `redirects` value, and there should already be an example.  

> ```json
> 
> "example": "https://example.com"
> 
> ```
> 
> This means that `/example` will bring the user to `https://example.com`.  

You can add as many redirects as you want by adding a comma at the end of every line.  

- Redirects go over pages. This means that if you create a page called `hello.html` and a redirect on `/hello`, the redirect will work and the page will be ignored.  

- If you set a long redirect like `foo/bar/hello`, that corresponds to `/foo/bar/hello`.  

## Using commands  

From your console, you will be able to run commands.  

For the moment, the only available command is `views`, which lets you see how many people saw your website since you started the process.  

# Support

If you're having any issues, ask us on our [Discord Community](https://discord.gg/PBrPeuACnU/) or create an issue on [GitHub](https://github.com/Sadyn-Project/Simple-WebService/issues/)!