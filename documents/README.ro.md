<div align="center">
  <img src="https://raw.githubusercontent.com/Maseshi/Shioru/main/assets/icons/favicon-circle.png" width="100" />
  <strong>
    <h1>Shioru</h2>
    <p>ผู้ช่วยภายในเซิร์ฟเวอร์ Discord จะช่วยทำให้เซิร์ฟเวอร์ของคุณน่าอยู่ขึ้น</p>
  </strong>
  <img src="https://img.shields.io/badge/discord.js-v14-7354F6?logo=discord&logoColor=white" />
  <img src="https://img.shields.io/github/stars/Maseshi/Shioru.svg?logo=github" />
  <img src="https://img.shields.io/github/v/release/Maseshi/Shioru" />
  <img src="https://img.shields.io/github/license/Maseshi/Shioru.svg?logo=github" />
  <img src="https://img.shields.io/github/last-commit/Maseshi/Shioru" />
  <a title="stare" target="_blank" href="https://shioru.statuspage.io/">
    <img src="https://img.shields.io/badge/dynamic/json?logo=google-cloud&logoColor=white&label=status&query=status.indicator&url=https%3A%2F%2Fq60yrzp0cbgg.statuspage.io%2Fapi%2Fv2%2Fstatus.json" />
  </a>
  <a title="Crowdin" target="_blank" href="https://crowdin.com/project/shioru">
    <img src="https://badges.crowdin.net/shioru/localized.svg" />
  </a>
  <a title="CodeFactor" target="_blank" href="https://www.codefactor.io/repository/github/maseshi/shioru">
    <img src="https://www.codefactor.io/repository/github/maseshi/shioru/badge" alt="CodeFactor" />
  </a>
  <a title="Sus.gg" target="_blank" href="https://top.gg/bot/704706906505347183">
    <img src="https://top.gg/api/widget/upvotes/704706906505347183.svg" />
  </a>
</div>

[EN](https://github.com/Maseshi/Shioru/blob/main/documents/README.en.md) | [TH](https://github.com/Maseshi/Shioru/blob/main/documents/README.th.md) | [JA](https://github.com/Maseshi/Shioru/blob/main/documents/README.ja.md)

<div align="center">
  <a href="https://github.com/Maseshi/Shioru/tree/main/documents">
    </img>
  </a>
</div>

## Caracteristici

- Funcționează pe [Discord.js](https://discord.js.org/) v14.
- Capabil să personalizeze o varietate de articole dorite
- Muzica poate fi redată de pe [YouTube](https://www.youtube.com/), [Spotify](https://www.spotify.com/) și [SoundCloud](https://soundcloud.com/) cu redare automată.
- Suportă mai multe limbi Puteți verifica limbile acceptate din fișierele[limbă](https://github.com/Maseshi/shioru/blob/main/source/languages)din acest depozit.
- Sistemul de niveluri (nivel și experiență)
- Suport pentru personalizarea notificărilor serverului
- Puteți vorbi tastând `@Shioru` urmat de mesajul pe care doriți să-l comunicați.
- Comanda aplicației (/) poate fi utilizată.

และคุณสมบัติที่น่าสนใจอื่นๆ อีกมากมาย...

## Îmbunătățiți Traducerea

și multe alte caracteristici interesante...

## Cerințe preliminare

- [Node.js](https://nodejs.org/) v18.0.0 sau mai mare
- [Firebase](https://firebase.google.com/) v9.0.0 sau o versiune ulterioară
- [FFmpeg](https://www.ffmpeg.org/download.html)
- [Git](https://git-scm.com/downloads)

## Ghid de instalare rapidă

### Incepe

- Accesați [Discord Developer Portal](https://discord.com/developers/applications)
- Faceți clic pe **„Aplicație nouă”** și denumiți botul dvs. și acceptați regulile politicii Discord.
- ไปที่หน้า **"Bot"** และเปิดใช้งานตัวเลือกทั้งหมดในส่วน **Privileged Gateway Intent** ![](https://raw.githubusercontent.com/Maseshi/Shioru/main/assets/images/discord-developer-portal-privileged-gateway-intents.png)
- เชิญบอทของคุณไปที่เซิร์ฟเวอร์โดยไปที่หน้า **OAuth2 > URL Generator** เลือก `bot` และ `applications.commands` เลือก `Administrator` จากนั้นคัดลอกลิงก์และวางในที่อยู่ของเบราว์เซอร์ของคุณ ![](https://raw.githubusercontent.com/Maseshi/Shioru/main/assets/images/discord-developer-portal-scopes.png)

### Configurați un bot

- Lansați un terminal și executați următoarea comandă.

```sh
# On Linux or Darwin operating systems, you may need to run this command.
sudo apt-get install autoconf automake g++ libtool build-essential
```

```bat
git clone https://github.com/Maseshi/Shioru.git
cd Shioru
npm install --save
```

- Puteți modifica unele date în **config** la `./source/config.js`

### Configurați Firebase

- Accesați https://firebase.google.com/ și începeți configurarea proiectului.
- Adăugați un proiect nou și urmați pașii.
- เพิ่มแอปพลิเคชันแรกของคุณด้วย **เว็บไซต์** ตั้งชื่อแอปของคุณโดยไม่จำเป็นต้องเลือกตัวเลือก **"ตั้งค่า Firebase Hosting สำหรับแอปนี้ด้วย"** และลงทะเบียนแอป ![](https://raw.githubusercontent.com/Maseshi/Shioru/main/assets/images/firebase-setup-web-application.png)
- Firebase จะให้ข้อมูลเกี่ยวกับการกำหนดค่าแก่คุณ นำค่าเหล่านี้ไปใช้กับไฟล์ `.env.example`
- Accesați **creați > [bază de date în timp real](https://console.firebase.google.com/u/0/project/_/database/data)** pentru a crea o bază de date de stocare.

### dezvolta

- Redenumiți fișierul `.env.example` la `.env` și introduceți toate valorile necesare.
- ไปที่เทอร์มินัลแล้วรันคำสั่ง `npm run dev` สำหรับการพัฒนาและ `npm start` สำหรับการใช้งานจริง > **หมายเหตุ**: เมื่ออยู่ในโหมดพัฒนา คุณสมบัตบางอย่างอาจไม่ทำงาน

## Depanare rapidă

- Dacă nu puteți instala pachetul **sodium** , instalați în schimb **libsodium-wrappers**.
```bat
npm uninstall sodium
npm install libsodium-wrappers@latest --save
```
- Dacă nu puteți reda muzica sau comenzile de redare a muzicii nu funcționează, instalați [ffmpeg](https://ffmpeg.org/download.html) **(recomandat)** sau instalați pachetul **ffmpeg-static** și încercați din nou.
```bat
npm install ffmpeg-static@latest --save
```

## credit

Ne puteți ajuta să traducem o limbă existentă sau o limbă care nu este disponibilă în prezent la [Crowdin](https://crowdin.com/project/shioru-bot).

Mulțumim tuturor creatorilor originali pentru că ați permis utilizarea acestor lucrări minunate ale voastre.

## a gasit o problema

Desen avatar de: [夏月 まりな (NATSUKI MARINA)](https://www.pixiv.net/en/users/482462)/[お着替え中](https://www.pixiv.net/en/artworks/76075098)
