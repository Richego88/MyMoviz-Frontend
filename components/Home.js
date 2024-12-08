import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import Movie from "./Movie";
import { Button, Popover } from "antd";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [moviesData, setMoviesData] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.movies.map((movie) => {
          const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          let overview = movie.overview;
          if (overview.length > 250) {
            overview = overview.slice(0, 250) + "...";
          }
          return {
            title: movie.title,
            overview,
            poster,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
          };
        });
        setMoviesData(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function updateLikedMovies(movieTitle) {
    if (likedMovies.find((el) => el === movieTitle)) {
      setLikedMovies((list) => list.filter((el) => el !== movieTitle));
    } else {
      setLikedMovies((list) => [...list, movieTitle]);
    }
  }
  function deleteLikedMovie(movieTitle) {
    updateLikedMovies(movieTitle);
  }

  function onSelect(movie) {
    setIsSelected((prev) => !prev);
  }

  const content = (
    <div>
      {likedMovies.map((movie) => (
        <span key={movie} className={styles.listItem}>
          {movie}
          <span className={styles.deleteIcon}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ fontSize: "1.25rem" }}
              onClick={() => deleteLikedMovie(movie)}
            />
          </span>
        </span>
      ))}
    </div>
  );

  const movies = moviesData.map((movie) => {
    const isLiked = likedMovies.some((el) => el === movie.title);

    return (
      <Movie
        poster={movie.poster}
        title={movie.title}
        description={movie.overview}
        voteAverage={movie.voteAverage}
        voteCount={movie.voteCount}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
      />
    );
  });

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.leftHead}>
          <img src="logo.png" alt="Logo" className={styles.logo} />
          <img
            src="logoletter.png"
            alt="Letter logo"
            className={styles.logoLetter}
          />
        </div>
        <div className={styles.rightHead}>
          <Popover
            content={content}
            placement="bottom"
            trigger="click"
            className={styles.popover}
            title="Liked movies"
          >
            <Button>♥ {likedMovies.length} movie(s)</Button>
          </Popover>
        </div>
      </header>
      <div className={styles.container}>
        <h1 className={styles.lastReleasesTitle}>LAST RELEASES</h1>
        <div className={styles.movieContainer}>{movies}</div>
      </div>
    </div>
  );
}

export default Home;
