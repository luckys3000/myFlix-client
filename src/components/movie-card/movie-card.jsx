import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie }) => {
	// Log the movie data to inspect its structure
	console.log(movie);

	return (
		<Card className='h-100'>
			<Card.Img variant='top' src={movie.ImagePath} />
			<Card.Body>
				<Card.Title>{movie.Title}</Card.Title>
				<Card.Text>Director: {movie.Director && movie.Director.name ? movie.Director.name : 'Unknown'}</Card.Text>
				<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
					<Button variant='link'>Open</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Director: PropTypes.shape({
			name: PropTypes.string, // Optional since it may not always be present
		}).isRequired,
	}).isRequired,
};
