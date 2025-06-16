
const MovieCard = ({movie}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
        <img src = {movie.poster_path ? imageUrl : '/No-Poster.png'} alt = {movie.title} className = "movie-poster" />
        <div className = "mt-4">
            <h3>{movie.title}</h3>

            <div className = "content">
                <div className = "rating">
                    <img src = "./Rating.svg" alt = "Rating Icon" />
                    <span>{movie.vote_average ? movie.vote_average.toFixed(1): 'N/A'}</span>
                </div>
                <span>•</span>
                <p className="lang">{movie.original_language.toUpperCase()}</p>
                <span>•</span>
                <p className = "movierelease text-gray-100 font-medium text-base">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>

            </div>
        </div>
    </div>
  )
}

export default MovieCard;