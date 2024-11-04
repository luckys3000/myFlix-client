import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();

	const movie = movies.find((m) => m.id === movieId);

	if (!movie) return <div>Movie not found</div>;

	return (
		<div>
			<div>
				<img className='w-100' src={movie.ImagePath} alt={movie.Title} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.Title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.Description}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.Genre.Name}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.Director.Name}</span>
				<div>
					<span>Featured: </span>
					<span>{movie.Featured}</span>
				</div>
			</div>
			<Link to={`/`}>
				<button className='back-button'>Back</button>
			</Link>
		</div>
	);
};

MovieView.propTypes = {
	movies: PropTypes.arrayOf(
		//Updated to array of movie objects
		PropTypes.shape({
			_id: PropTypes.string,
			Title: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
			ImagePath: PropTypes.string.isRequired,
			Genre: PropTypes.shape({
				Name: PropTypes.string.isRequired,
				Description: PropTypes.string.isRequired,
			}).isRequired,
			Director: PropTypes.shape({
				Name: PropTypes.string.isRequired,
				Bio: PropTypes.string.isRequired,
				Birth: PropTypes.string,
				Death: PropTypes.string,
			}),
			Featured: PropTypes.bool, //added for completeness
		})
	).isRequired,
};
