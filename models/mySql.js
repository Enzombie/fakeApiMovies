import mysql from 'mysql2/promise'
import 'dotenv/config'

const localConfig = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb',
}

const connection = await mysql.createConnection(process.env.DATABASE_URL1 + process.env.DATABASE_URL2)

export class MovieModel {

    static async filterMoviesForGenres(genre){
        const lowerCaseGenre = genre.toLowerCase()
        //compruebo si el genero existe en mi database
        const [genreData] = await connection.query(
            `SELECT id, name FROM genre WHERE LOWER(name) = '${lowerCaseGenre}' ;`
        )
        //en caso de existir devuelvo todas las peliculas asociadas a dicho genero
        if(genreData[0]){ 
            const movies = await connection.query(
            `SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate
            FROM movie m
            JOIN movie_genres mg ON m.id = mg.movie_id
            JOIN genre g ON mg.genre_id = g.id
            WHERE LOWER(g.name) = ? ;`,
            [genreData[0].name]
            )
            return movies
        }else{
            return { 
                error: 'An error occurred while fetching the movies, genre not found ?'
            }
        }
    }
    
    static async getAll ({ genre }) {
        //si hay genre hago un filtro, sino asigno todas
        let [movies] = genre ? 
        await this.filterMoviesForGenres(genre) : 
        await connection.query(
            'SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movie;')

        if(movies.error){
            return {error : movies.error }
        }
        
        //obtengo todos los generos
        const [movieGenres] = await connection.query(
            `SELECT DISTINCT m.title, g.name as genre 
            FROM movie_genres
            JOIN genre g ON g.id = movie_genres.genre_id
            JOIN movie m on m.id = movie_genres.movie_id`
        )
        //filtros los generos para su pelicula correspondiente(vienen repetidas)
        const movieList = {}
        movieGenres.forEach(item => {
            const {title, genre} = item
            if(!movieList[title]){
                movieList[title] = []
            }
            movieList[title].push(genre)
        })
        //agrego la lista de generos a la lista de peliculas
        const moviesWithGenres = movies.map(movie => {
            return {
                ...movie,
                genre: movieList[movie.title] || []
            }
        })
        return moviesWithGenres
    }

    static async getById ({ id }) {
       
        try {
            const [movie] = await connection.query(
                `SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate
                FROM movie m
                WHERE id = UUID_TO_BIN(?);`,[id]
               )
            const [genres] = await connection.query({sql:
                `SELECT name FROM genre
                JOIN movie_genres ON genre.id = movie_genres.genre_id
                WHERE movie_genres.movie_id = UUID_TO_BIN(?);`,
                rowsAsArray: true}, [id]
            )
            if(!movie[0]){
                return { error: 'movie id not found' }
            }
            return {
                ...movie[0],
                genre: genres.join(', ')
                }
        } catch (error) {
            return { error: 'An error occurred while fetching the movie' }
        }
    }

    static async create({ input }) {
        const {
            title,
            year,
            duration,
            director,
            poster,
            rate,
            genre
        } = input
        // crypto.randomUUID()
        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult
        
        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, year, director, duration, poster, rate]
                )
            //creo la conexión con genre
            for (let i = 0; i < genre.length; i++){
                await connection.query(`INSERT INTO movie_genres (movie_id, genre_id) VALUES
                ((SELECT UUID_TO_BIN("${uuid}")), (SELECT id FROM genre WHERE name = LOWER(?)));`,
                [genre[i]])
            }
            return {
                title,
                year,
                duration,
                director,
                poster,
                rate,
                genre
            }
        } catch (e) {
            // puede enviarle información sensible al usuario
            // enviar la traza a un servicio interno
            console.log(e.message)
            return {message: "An error occurred while create the movie"}
        }
    }

    static async update ({ id, input }){
        try {
            const setValues = []
            //recorrer input para construir la sentencia SET dinamicamente
            for(const key in input){
                if(key !==  'genre')
                setValues.push(`${key} = '${input[key]}'`)
            }

            const [result] = await connection.query(
                `UPDATE movie SET ${setValues.join(', ')} WHERE id = UUID_TO_BIN('${id}') ;`
                )    
            if(result.affectedRows === 1){return this.getById({id})}
            else {return {error: 'An error occurred while fetching the movie'}}
        } catch (error) {
            return { 
                error: 'An error occurred while fetching the movie, incorrect ID?',
            }
        }
        
    }

    static async parcialUpdate ({ id, input }){
        return this.update({id, input})
    }

    static async delete ({ id }) {
        try {
            const result = await connection.query(
                `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,[id]
            )
            return true;
        } catch (error) {
            return false;
        }
    }

}