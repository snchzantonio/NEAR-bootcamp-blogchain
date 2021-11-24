# NEAR-bootcamp-blogchain

## Introducción





## Pre-Requisitos

* Necesitas tener [Node.js](https://nodejs.org/) v14+ instalado

* Instalar manejador de paquetes yarn. 
Como instalarlo: 
```sh
npm install --global yarn
```

* Instalar el cliente de Near. Como instalarlo: 
```sh
npm install --global near-cli
```

## Como clonar el Repositorio

Para clonar el repositorio puedes hacer uso del siguiente comando en la terminal:

```sh
git clone https://github.com/snchzantonio/NEAR-bootcamp-blogchain.git
```

## Pasos

#### Instalar paquetes y compilar el contrato
```sh
cd contract/
yarn && yarn build
```
#### Se desplegara un contrato en una cuenta que se autocreara

```sh
yarn deploy:dev
```