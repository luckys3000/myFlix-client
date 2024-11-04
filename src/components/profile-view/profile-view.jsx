import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

const ProfileView = ({ user, movies, onLoggedOut }) => {
	const [userData, setUserData] = useState(user);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	// Fetch user details and favorite movies on mount
	useEffect(() => {
		axios
			.get(`/users/${userData.username}`)
			.then((response) => {
				setUserData(response.data);
				setFavoriteMovies(movies.filter((m) => response.data.FavoriteMovies.includes(m.Featured)));
			})
			.catch((error) => console.error(error));
	}, [userData.username, movies]);

	// Handle updating user information
	const handleUpdate = (e) => {
		e.preventDefault();
		axios
			.put(`/users/${userData.username}`, userData)
			.then((response) => {
				alert('User updated successfully');
				setUserData(response.data);
			})
			.catch((error) => console.error('Error updating user:', error));
	};

	// Handle deregistration
	const handleDeregister = () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			axios
				.delete(`/users/${userData.username}`)
				.then(() => {
					alert('User deregistered');
					onLoggedOut();
				})
				.catch((error) => console.error('Error deregistering user:', error));
		}
	};

	// Handle removing a favorite movie
	const removeFavorite = (movieFeatured) => {
		axios
			.delete(`/users/${userData.username}/movies/${movieFeatured}`)
			.then(() => {
				setFavoriteMovies(favoriteMovies.filter((movie) => movie.Featured !== movieFeatured));
			})
			.catch((error) => console.error('Error removing favorite:', error));
	};

	return (
		<Container>
			<Row>
				<Col>
					<h3>Your Profile</h3>
					<Form onSubmit={handleUpdate}>
						<Form.Group controlId='formUsername'>
							<Form.Label>Username</Form.Label>
							<Form.Control type='text' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
						</Form.Group>
						<Form.Group controlId='formPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
						</Form.Group>
						<Form.Group controlId='formEmail'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
						</Form.Group>
						<Form.Group controlId='formDob'>
							<Form.Label>Date of Birth</Form.Label>
							<Form.Control type='date' value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />
						</Form.Group>
						<Button variant='primary' type='submit'>
							Update Profile
						</Button>
						<Button variant='danger' onClick={handleDeregister} className='ml-2'>
							Deregister
						</Button>
					</Form>
				</Col>
			</Row>
			<Row>
				<Col>
					<h4>Your Favorite Movies</h4>
					<Row>
						{favoriteMovies.map((movie) => (
							<Col md={4} key={movie.Featured}>
								<Card>
									<MovieCard movie={movie} />
									<Button variant='secondary' onClick={() => removeFavorite(movie.Featured)}>
										Remove from Favorites
									</Button>
								</Card>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default ProfileView;
