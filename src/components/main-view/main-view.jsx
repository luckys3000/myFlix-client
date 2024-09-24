import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1,
			title: 'Silence of the Lambs',
			description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.',
			genre: { name: 'Thriller' },
			director: { name: 'Jonathan Demme' },
			image: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
			featured: true,
		},
		{
			id: 2,
			title: 'Inception',
			description:
				'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
			genre: { name: 'Action' },
			director: { name: 'Christopher Nolan' },
			image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
			feature: true,
		},
		{
			id: 3,
			title: 'Pulp Fiction',
			description: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.',
			genre: { name: 'Thriller' },
			director: { name: 'Quentin Tarantino' },
			image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
			featured: true,
		},
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

	if (selectedMovie) {
		return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
	}

	if (movies.length === 0) {
		return <div>The list is empty!</div>;
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}
		</div>
	);
};
