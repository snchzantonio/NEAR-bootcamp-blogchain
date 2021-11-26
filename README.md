# NEAR-bootcamp-blogchain

Este es el proyecto para el NCD L1, un bootcamp sobre el blockchain NEAR.  

Integrantes:  
⚜ [EliezerLopezS](https://github.com/EliezerLopezS)  
⚜ [Gabo9678](https://github.com/Gabo9678)  
⚜ [nikoturin](https://github.com/nikoturin)  
⚜ [snchzantonio](https://github.com/snchzantonio)  
⚜ [Stolkerve](https://github.com/Stolkerve)  


<center>

![Logo](/frontend/BlogChain/assets/img/logo.jpg "Logo")

</center>

Los ganadores escriben la historia, pero los poderosos la censuran. Los intereses personales de un pequeño grupo marcan el camino para los medios de comunicacion y las noticias son manipuladas para beneficiar a unos pocos.

Una manera de evitar la censura es esparciendo las noticias, porque pueden censurar a muchos, pero no se puede censurar a todos.

Blogchain es una plataforma de noticias decentralizada donde nadie restringe tu libertad de opinion, aqui periodistas, pensadores, poetas, ilustradores, humorista o cualquiera pueden expresarse con libertad.

Blogchain es tu opinion decentralizada y sin intermediarios.


# Pre-Requisitos

* ### Necesitas tener [Node.js](https://nodejs.org/) v12+ instalado

* ### Instalar el manejador de paquetes yarn. 
```sh
npm install --global yarn
```

* ### Crear una cuenta en la [testnet](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)

```sh
https://docs.near.org/docs/develop/basics/create-account
```

* ### Instalar el cliente de Near.
```sh
npm install --global near-cli
```

* ### Autorizar app para dar acceso a la cuenta de NEAR
```sh
near login
```

# Como clonar el Repositorio

Para clonar el repositorio puedes hacer uso del siguiente comando en la terminal:

```sh
git clone https://github.com/snchzantonio/NEAR-bootcamp-blogchain.git
```

---

# Pasos para ejecutar el proyecto

### Instalar paquetes y compilar el contrato
```sh
cd contract/
yarn && yarn build
```
### Desplegar el contrato en la testnet de near

```sh
yarn deploy:dev
```
### Test unitario
```sh
yarn test
```

# Correr comandos
Una vez deployado el contrato, usaremos el Account Id devuelto por la operación para ejecutar los comandos, que será el account Id del contrato [será utilizado como `CONTRACT_ACCOUNT_ID` en los ejemplos de comandos]

Utilizaremos `YOUR_ACCOUNT_ID` para identificar el account Id que utilizamos para hacer las llamadas a los métodos.

Ademas, es posible que si usas windows, cmd y powershell den errores, por lo que se recomienda usar wsl.
Y si se usara windows, las comillas dobles dentro de los JSON debe ser asi: `\"prueba\": \"hola mundo\"`

### Como publicar un nuevo blog
```sh
near call ${CONTRACT_ACCOUNT_ID} publishPost '{"title": "Hola", "body": "Mundo"}' --account-id ${YOUR_ACCOUNT_ID}
```

### Como obtener todos los blogs publicados
```sh
near view ${CONTRACT_ACCOUNT_ID} getPosts '{"amount": 0, "at": 0, "includeHidden": false}'
```

### Como paginar los blogs publicados
```sh
near view ${CONTRACT_ACCOUNT_ID} getPosts '{"amount": 5, "at": 10, "includeHidden": false}'
```

### Como obtener los blogs publicados de un autor
```sh
near view ${CONTRACT_ACCOUNT_ID} getPostsByUser '{"username": "juanita.testnet", "includeHidden": false}'
```

### Como obtener un blogs especifico
```sh
near view ${CONTRACT_ACCOUNT_ID} getPostById '{"postId": 2, "includeHidden": false}'
```

# Diseño del proyecto
Esta es la posible visualización del frontend de nuestro proyecto en HTML, CSS y JS.
```sh
cd frontend
npm install
npm run start
```
Abrir el navegador e ir a [Puerto local](http://localhost:8080/) (si no funciona revisar en consola el puerto del servidor)

# Explora el codigo
```bash
├── contract
│   ├── asconfig.js
│   ├── as-pect.config.js
│   ├── assembly
│   │   ├── as_types.d.ts
│   │   ├── main.ts
│   │   ├── models.ts
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts
│   │   │   ├── context.json
│   │   │   └── main.spec.ts
│   │   └── tsconfig.json
│   └── package.json
├── frontend
│   ├── BlogChain
│   │   ├── about.html
│   │   ├── assets
│   │   │   ├── bootstrap
│   │   │   │   ├── css
│   │   │   │   │   └── bootstrap.min.css
│   │   │   │   └── js
│   │   │   │       └── bootstrap.min.js
│   │   │   ├── fonts
│   │   │   │   ├── font-awesome.min.css
│   │   │   │   ├── FontAwesome.otf
│   │   │   │   ├── fontawesome-webfont.eot
│   │   │   │   ├── fontawesome-webfont.svg
│   │   │   │   ├── fontawesome-webfont.ttf
│   │   │   │   ├── fontawesome-webfont.woff
│   │   │   │   └── fontawesome-webfont.woff2
│   │   │   ├── img
│   │   │   │   ├── about-bg.jpg
│   │   │   │   ├── contact-bg.jpg
│   │   │   │   ├── home-bg.jpg
│   │   │   │   ├── logo.jpg
│   │   │   │   ├── logo.svg
│   │   │   │   ├── post-bg.jpg
│   │   │   │   └── post-sample-image.jpg
│   │   │   └── js
│   │   │       └── clean-blog.js
│   │   ├── index.html
│   │   └── post.html
│   ├── index.js
│   ├── package.json
│   └── README.md
├── LICENSE
└── README.md
```

# Licencia
Copyright 2020 NEAR Inc

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without
limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
