import PropTypes from 'prop-types';
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
	return (
		<div>
			<div>
				<img className='w-100' src={movie.ImagePath} />
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
			<button onClick={onBackClick} className='back-button' style={{ cursor: 'pointer' }}>
				Back
			</button>
		</div>
	);
};

MovieView.propTypes = {
	movie: PropTypes.shape({
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
	}),
	onBackClick: PropTypes.func.isRequired,
};
