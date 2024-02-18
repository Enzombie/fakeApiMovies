# Aplicación de Películas

## Descripción
La aplicación es una API RESTful desarrollada en Node.js con Express que proporciona funcionalidades para gestionar una base de datos de películas. Ofrece endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las películas y utiliza validaciones de datos con la biblioteca Zod para asegurar la integridad de los datos en las peticiones POST, PUT y PATCH.

## Características Principales
- Arquitectura MVC & API REST.
- Operaciones CRUD para películas mediante peticiones HTTP.
- Validación de calidad y seguridad de los datos utilizando Zod en las peticiones POST, PUT y PATCH.
- Inyección de dependencias para implementar tres bases de datos: local, MongoDB y MySQL.

## Tecnologías Utilizadas
- Node.js
- Express.js
- Zod (Biblioteca de validación de esquemas)
- MongoDB
- MySQL

## Implementación
Este proyecto está implementado y actualmente se encuentra alojado en Vercel utilizando mongoDB.
Puedes acceder mediante el siguiente link: **https://app-api-movies.vercel.app/**
## Instalación e inicio(local)
1. Clona este repositorio: **https://github.com/enzo-lopez/api-movies.git**
2. Instala las dependencias: `$npm install`
3. Inicia la aplicación seleccionando también la base de datos:

- `$npm run start:local`
- `$npm run start:mongo`
- `$npm run start:mysql`

> [!NOTE]
> Aunque no sea una buena practica decidí subir el archivo .env para que cualquiera pueda utilizar la app en su entorno local.
> Sin embargo, la app se encuentra corriendo actualmente con mongo en **https://app-api-movies.vercel.app/**

## Uso
Puedes realizar peticiones GET, POST, PUT, PATCH, DELETE a los endpoints proporcionados para gestionar las películas.
> [!TIP]
> Si estas corriendo el programa de manera local, dentro se incluye un archivo api.http con todas las peticiones y diferentes ejemplos que puedes utilizar.

### Endpoints Disponibles
- `GET /movies`: Obtener todas las películas.
- `GET /movies?genre="genero"`: Obtener películas por su genero.
- `GET /movies/id`: Obtener una película por su ID.
- `POST /movies`: Crear una nueva película.
- `PUT /movies/id`: Actualizar una película por su ID.
- `PATCH /movies/id`: Actualizar parcialmente una película por su ID.
- `DELETE /movies/id`: Eliminar una película por su ID.

## Ejemplos de uso
#### Obtener todas las películas
````
GET  /movies

200 retorna una lista de todas las películas
````
#### Obtener una película por su id
````
GET  /movies/id

200 retorna la película solicitada con todos sus detalles

404 "message": "Movie not found, incorrect ID?"
````
#### Obtener películas por su genero
````
GET  /movies?genre=SCI-FI

200 retorna una lista de peliculas perteneciente al genero

404 "message": "Genre not found"
````
> [!NOTE]
> Los generos disponibles son: 
> ACTION, ADVENTURE, CRIME, COMEDY, DRAMA, FANTASY, HORROR, THRILLER, SCI-FI     
> Los generos en la solicitud no son sensibles a mayusculas y minusculas.

#### Crear una nueva película 

````
POST  /movies

Content-Type: application/json

{
	"title": "Jurassic Park",
	"year": 1993,
	"director": "Steven Spielberg",
	"duration": 127,
	"poster": "https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024",
	"genre": [
		"Action",
		"Adventure",
		"Sci-Fi"
	],
	"rate": 8.1
}

201 retorna la película nueva

400 "message": se mostrara un mensaje de acuerdo al dato se haya ingresado de manera erronea
````
#### Modificar parcialmente película 

````
PATCH  /movies/id

Content-Type: application/json

{
	"title": "Jurassic Park 3",
	"year": 1996
}

200  **retorna la película junto a sus cambios**

400 "message": se mostrara un mensaje de acuerdo al dato se haya ingresado de manera erronea

404 "message": "movie id not found"
````

#### Modificar totalmente una película 

````
PUT  /movies/id

Content-Type: application/json

{
	"title": "Parque jurasico",
	"year": 2010,
	"director": "Steven Spielberg",
	"duration": 187,
	"poster": "https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024",
	"genre": [
		"Action",
		"Adventure",
		"Comedy"
	],
	"rate": 8.1
}
200  retorna la película junto a sus cambios

400 "message": se mostrara un mensaje de acuerdo al dato se haya ingresado de manera erronea

404 "message": "movie id not found"
````

#### Eliminar una película
````
DELETE  /movies/id

200 "message": "movie deleted successfully"

404 "mesagge": "movie not found"
````
