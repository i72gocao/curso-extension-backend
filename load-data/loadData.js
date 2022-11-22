const db = require("../models");
const Role = db.role;
const Portfolio = db.portfolio;

export function initial(){
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderador"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

export function initialPortfolioData(){
    Portfolio.create({
        id:1,
        fecha_creacion: "2021-12-24T06:00",
        titulo: "Goovie",
        descripcion:"Buscador de series con ReactJS",
        url_demo: "https://lefrancais2.github.io/goovie/",
        url_source: "https://github.com/lefrancais2/buscadorSeries",
        visitas: 0
    });

    Portfolio.create({
        id:2,
        fecha_creacion: "2022-01-27T06:00",
        titulo: "Weather App",
        descripcion:'Challenge Weather App with ReactJs',
        url_demo: "https://lefrancais2.github.io/weather-app/",
        url_source: "https://github.com/lefrancais2/weather-app-challenge",
        visitas: 0
    });

    Portfolio.create({
        id:3,
        fecha_creacion: "2022-02-01T06:00",
        titulo: 'OsGod Engineer Github',
        descripcion:'Página Web profesional con Vanilla JS',
        url_demo:'https://lefrancais2.github.io/portafolio-cv/',
        url_source: 'https://github.com/lefrancais2/portafolio-cv',
        visitas: 0
    });

    Portfolio.create({
        id:4,
        fecha_creacion: "2021-09-11T06:00",
        titulo: "El Olivar Restaurante",
        descripcion:"Desarrollo de página web con Laravel",
        url_source: 'https://github.com/lefrancais2/ElOlivar-Laravel',
        visitas: 0
    });

    Portfolio.create({
        id:5,
        fecha_creacion: "2022-01-27T06:00",
        titulo: "Quiz Game with ReactJS",
        descripcion:'Juego de preguntas sobre capitales y paises',
        url_source: 'https://github.com/lefrancais2/quiz-react',
        url_demo: 'https://lefrancais2.github.io/quiz-game',
        visitas: 0
    });
}