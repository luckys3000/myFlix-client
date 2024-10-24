import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<Card onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }} className='mb-3'>
			<Card.Img variant='top' src={movie.ImagePath} />
			<Card.Body>
				<Card.Title>{movie.Title}</Card.Title>
				<Card.Text>{movie.Director.Name}</Card.Text>
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
