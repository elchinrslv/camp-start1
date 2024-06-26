import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ListPage.css";
// import Favorites from "../../components/Favorites/Favorites";
const ListPage = (props) => {
  const [movies, setMovies] = useState([]);
  const urlParams = useParams();

  useEffect(() => {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${urlParams.id}`)
      .then((res) => res.json())
      .then((data) => {
        data.movies.forEach((movie) => {
          fetch(`http://www.omdbapi.com/?i=${movie}&apikey=82778cb5`)
            .then((res) => res.json())
            .then((data) => setMovies((prev) => [...prev, data]));
        });
      });

  }, [urlParams]);


  return (
    <div className="list-page">
      <h1 className="list-page__title">Мой список</h1>
      <h2 className="list-page__name">salam</h2>
      <ul>
        {movies.map((item) => {
          return (
            <li key={item.imdbID}>
              <a href={`https://www.imdb.com/title/${item.imdbID} `} >
                {item.Title} ({item.Year})
              </a>
            </li>
         
          );
        })}
      </ul>
    </div>
  );
}

export default ListPage;
