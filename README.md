# Chatbot Whatsapp 
Actualizado Agosto 2022  
<br>

## Proyecto original de => [Liefer Mendez](https://www.youtube.com/c/LeiferMendez)  

<br> 
  
    


## Actualización
  


| Feature  | Status |
| ------------- | ------------- |
| Dialogflow  | ✅  |
| MySQL  | ✅  |
| JSON File  | ✅  |
| QR Scan (route) | ✅ |
| Easy deploy heroku  | ✅  |
| Buttons | ✅ℹ️  (No funciona en multi-device)|
| Send Voice Note | ✅ |
| Add support ubuntu/linux | ✅ |

<br>

## Requisitos
- node v14 o superior
- VSCode (Editor de codigo) [Descargar](https://code.visualstudio.com/download)
- MySql (opcional) solo aplica si vas a usar el modo 'mysql'  [sql-bot.sql migración](https://github.com/leifermendez/bot-whatsapp/blob/main/sql-bot.sql)
- Dialogflow (opcional) solo aplica si vas a usar el modo 'dialogflow'





__Instalar dependencias (npm install)__
> Ubicate en le directorio que descargaste y via consola o terminal ejecuta el siguiente comando

`npm install` 



__Configurar .env__
> Con el editor de texto crea un archivo `.env` el cual debes de guiarte del archivo `.env.example`

```
######DATABASE: none, mysql, dialogflow, mongoDb

DEFAULT_MESSAGE=true
SAVE_MEDIA=true
PORT=3000
DATABASE=none
LANGUAGE=es
SQL_HOST=
SQL_USER=
SQL_PASS=
SQL_DATABASE=
MONGO_URL=
KEEP_DIALOG_FLOW=true
MULTI_DEVICE=true
```

