import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
		<BrowserRouter>
			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/login'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<LoginView onLoggedIn={(user) => setUser(user)} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/movies/:movieId'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						// a path prop that expresses what URL it should match
						path='/'
						//an element prop that tells the component what to render if it matches up with the URL
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col className='mb-4' key={movie.id} md={3}>
												<MovieCard movie={movie} />
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};

// {!user ? (
// 	<Col md={5}>
// 		<LoginView onLoggedIn={(user) => setUser(user)} />
// 		or
// 		<SignupView />
// 	</Col>
// ) : selectedMovie ? (
// 	<Col md={8}>
// 		<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
// 	</Col>
// ) : movies.lenth === 0 ? (
// 	<div>The list is empty!</div>
// ) : (
// 	<>
// 		{movies.map((movie) => (
// 			<Col className='mb-5' key={movie.id} md={3}>
// 				<MovieCard
// 					movie={movie}
// 					onMovieClick={(newSelectedMovie) => {
// 						setSelectedMovie(newSelectedMovie);
// 					}}
// 				/>
// 			</Col>
// 		))}
// 	</>
// )}
// 			<button
// 				onClick={() => {
// 					setUser(null);
// 					setToken(null);
// 					localStorage.clear();
// 				}}>
// 				Logout
// 			</button>
// 		</Row>
// 	);
// };
