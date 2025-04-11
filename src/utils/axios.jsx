import axios from "axios";

const instance= axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTkyMWIzNTk2Njc3MzNmMjE5ZDdkODkzMjAyZWUzMyIsIm5iZiI6MTczOTYzMTQ2NC4yOTIsInN1YiI6IjY3YjBhYjY4YjFiZDJmNmU5ZjM1YjUzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbdi6oL5nCDixYG12lc_LJSlU8dCYFuKfpCaJqrswc0'
      }
})

export  default  instance;

