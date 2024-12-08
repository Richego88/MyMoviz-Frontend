import styles from "../styles/Movie.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faVideo, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Movie({
  poster,
  title,
  description,
  voteAverage,
  voteCount,
  updateLikedMovies,
  isLiked,
}) {
  const [personalNote, setPersonalNote] = useState(0);
  const [watchCount, setWatchCount] = useState(0);
  const [tempPersonalRating, setTempPersonalRating] = useState(0); //to add a hover effefct over the stars

  //Average evaluation of the movies in star icons
  const stars = [];
  for (let i = 0; i < 10; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        key={`star-${i}`}
        style={i < voteAverage - 1 ? { color: "#f1c40f" } : {}}
      />
    );
  }

  //Personal evaluation in star icons
  const personalEvaluationStars = [];
  for (let i = 0; i < 10; i++) {
    personalEvaluationStars.push(
      <FontAwesomeIcon
        icon={faStar}
        onClick={() => handleClick(i + 1)}
        key={`personal-${i}`}
        onMouseEnter={() => setTempPersonalRating(i + 1)}
        onMouseLeave={() => setTempPersonalRating(0)}
        style={
          tempPersonalRating //hover effect. If you hover over the stars they will be filled
            ? tempPersonalRating >= i + 1 && {
                color: "#2196f3",
                cursor: "pointer",
              }
            : i < personalNote
            ? { color: "#2196f3", cursor: "pointer" }
            : { cursor: "pointer" }
        }
      />
    );
  }

  function handleClick(star) {
    setPersonalNote(star);
  }

  function onHoverIn(rating) {
    setTempPersonalRating(rating);
  }

  function onHoverOut() {
    setTempPersonalRating(0);
  }
  //Like movies
  function handleLikeClick() {
    updateLikedMovies(title);
  }

  return (
    <div className={styles.movieContainer}>
      <img src={poster} alt={title} className={styles.poster} />
      <h3 className={styles.movieTitle}>{title}</h3>
      <p>{description}</p>
      <p>
        {stars} <span>({voteCount})</span>
      </p>
      <p>
        {personalEvaluationStars}(
        {tempPersonalRating ? tempPersonalRating : personalNote})
      </p>
      <span>
        <FontAwesomeIcon
          icon={faVideo}
          style={
            watchCount
              ? { color: "#e74c3c", cursor: "pointer" }
              : {
                  cursor: "pointer",
                }
          }
          onClick={() => setWatchCount(watchCount + 1)}
        />
        <span className={styles.views}>({watchCount})</span>
      </span>
      <span>
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleLikeClick}
          style={
            isLiked
              ? { color: "#e74c3c", cursor: "pointer" }
              : { cursor: "pointer" }
          }
        />
      </span>
    </div>
  );
}

export default Movie;
