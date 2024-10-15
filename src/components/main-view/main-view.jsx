import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from ' ../signup-view/signup-view';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

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

	if (!user) {
		return (
			<>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user);
						setToken(token);
					}}
				/>
				or
				<SignupView />
			</>
		);
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
			<button
				onClick={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}>
				Logout
			</button>
		</div>
	);
};
