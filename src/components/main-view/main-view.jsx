import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col, Button } from 'react-bootstrap';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [showSignupForm, setShowSignupForm] = useState(false);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch('https://luckyflix3000-b3f882eb1652.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((movie) => {
					return {
						id: movie._id,
						Title: movie.Title,
						Description: movie.Description,
						Genre: movie.Genre,
						Director: movie.Director,
						ImagePath: movie.ImagePath,
						Feature: movie.Featured,
					};
				});

				setMovies(moviesFromApi);
			});
	}, [token]);

	return (
		<Row className='justify-content-md-center'>
			{!user ? (
				<Col md={5}>
					<LoginView onLoggedIn={(user) => setUser(user)} />
					or
					<SignupView />
				</Col>
			) : selectedMovie ? (
				<Col md={8}>
					<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
				</Col>
			) : movies.lenth === 0 ? (
				<div>The list is empty!</div>
			) : (
				<>
					{movies.map((movie) => (
						<Col className='mb-5' key={movie.id} md={3}>
							<MovieCard
								movie={movie}
								onMovieClick={(newSelectedMovie) => {
									setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					))}
				</>
			)}
			<button
				onClick={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}>
				Logout
			</button>
		</Row>
	);
};
