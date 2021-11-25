# NEAR-bootcamp-blogchain

# Introducción





# Pre-Requisitos

* ### Necesitas tener [Node.js](https://nodejs.org/) v12+ instalado

* ### Instalar manejador de paquetes yarn. 
```sh
npm install --global yarn
```

* ### Crear una cuenta en la [testnet](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)

* ### Instalar el cliente de Near. Como instalarlo: 
```sh
npm install --global near-cli
```

* ### autorizar app para dar acceso a la cuenta de NEAR
```sh
near login
```

# Como clonar el Repositorio

Para clonar el repositorio puedes hacer uso del siguiente comando en la terminal:

```sh
git clone https://github.com/snchzantonio/NEAR-bootcamp-blogchain.git
```

# Pasos

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
Una vez deployado el contrato, usaremos el Account Id devuelto por la operacion para ejecutar los comandos, que será el account Id del contrato [será utilizado como CONTRACT_ACCOUNT_ID en los ejemplos de comandos]

Utilizaremos YOUR_ACCOUNT_ID para identificar el account Id que utilizamos para hacer las llamadas a los métodos.

### Como publicar un nuevo blog
```sh
```

### Como obtener todos los blogs publicados
```sh
```

### Como paginar los blogs publicados
```sh
```

### Como obtener los blogs publicados de un autor
```sh
```

### Como obtener un blogs especifico
```sh
```

### Como ocultar un blog
```sh
```

# Diseño del projecto
Esta es la posible visualizacion del frontend de nuestro projecto en html, css y js.
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
│   │   │   │   ├── post-bg.jpg
│   │   │   │   └── post-sample-image.jpg
│   │   │   └── js
│   │   │       └── clean-blog.js
│   │   ├── contact.html
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
