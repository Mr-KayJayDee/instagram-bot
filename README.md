# Instagram Bot
### A fully working instagram bot using [Insta.js](https://github.com/Androz2091/insta.js) by [androz2091](https://github.com/Androz2091)

Here is how you can install and use it

[Install the MongoDB Server and MongoDB compass](https://www.mongodb.com/)


- Open a command prompt
- Go to the folder you want using 
```bash
cd <PATH TO FOLDER>
```

- Clone this repository

```bash
git clone https://github.com/Mr-KayJayDee/instagram-bot
```

- Go to the folder where the bot is cloned

```bash 
cd instagram-bot
```
 - Install all dependencies

```bash
npm i
```

- Rename the .env.example file to .env and fill it with your informations
> Your can get your id by doing !myinfos after starting the bot
> The default mongodb link is mongodb://localhost:27017/Instagram but you can also use a cluster

- Start the bot 

```bash
npm start
```

When you see something like that

```
Logged in as Full Name (username).
Followers: 67
Following: 57
Business : true
Verified: false
Private: false
``` 
it means that the bot is ready to be used. 🎉



# Available commands 

## Bot
- !ping: Return the bot ping.
- !help: Return the bot commands list.
- !eval: Eval a JS code.
- !prefix: Change the bot's prefix for groups or private chats.

## Games
- !bingo: Find a number between 1 and 100 in 2 minutes.


## Images 
- !ad: Return an ad image.
- !affect: Return an affect image.
- !beautiful: Return a beautiful image.
- !blur: Return a blured image.
- !circle: Return a circled image.
- !confuedStonk: Return a confuedStonk image.
- !delete: Return a delete image.
- !facepalm: Return a facepalm image.
- !gay: Return a gay image.
- !greyscale: Return a greyscale image.
- !hitler: Return an hitler image.
- !invert: Return an invert image.
- !jail: Return a jail image.
- !lisaPresentation: Return a lisaPresentation image.
- !mms: Return a mms image.
- !notstonk: Return a notstonk image.
- !poutine: Return a poutine image.
- !rip: Return a rip image.
- !sepia: Return a sepia image.
- !stonk: Return a stonk image.
- !tatoo: Return a tatoo image.
- !thomas: Return a thomas image.
- !trash: Return a trash image.
- !wanted: Return a wanted image.

## Utils
- !myinfos: Return some informations about you.

# Known bugs

- A story answer return an error (TypeError: Cannot read property 'indexOf' of undefined, same for all system messages)

# Future updates 

- Ability to change the prefix on a chat
- Ability to change the lang
- Ability to make reminders (working on it)
- Ability to get the informations about an user

Feel free to make a pull request if you have any edit to do in the code or just open an issue if you don't know how to fix it.

Just open an issue if you have any features suggestions. 

# Credits

😘 - Thanks to [Androz2091](https://github.com/Androz2091) for the [Insta.js](https://github.com/Androz2091/insta.js) package.
