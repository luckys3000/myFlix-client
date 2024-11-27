import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import { MovieCard } from '../movie-card/movie-card';

const formatDate = (dateString) => {
	return dateString ? dateString.split('T')[0] : '';
};

export const ProfileView = ({ user, movies, token, onLoggedOut }) => {
	const [userData, setUserData] = useState({
		username: user.Username || '',
		email: user.Email || '',
		dob: formatDate(user.Birthday) || '',
	});
	const [newPassword, setNewPassword] = useState('');
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [message, setMessage] = useState('');
	const [usernameError, setUsernameError] = useState('');

	// Fetch User Data using fetch API
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`/users/${user.Username}`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					throw new Error('Error fetching user data');
				}

				const data = await response.json();
				console.log('Fetched User Data:', data);

				setUserData({
					username: data.Username,
					email: data.Email,
					dob: formatDate(data.Birthday) || '',
				});

				const favoriteMoviesList = data.FavoriteMovies || [];
				setFavoriteMovies(movies.filter((movie) => favoriteMoviesList.includes(movie._id)));
			} catch (error) {
				console.error('Error fetching user data:', error);
				setMessage('Error fetching user data.');
			}
		};

		fetchUserData();
	}, [user.Username, movies, token]);

	// Update User Profile using fetch API
	const handleUpdate = async (e) => {
		e.preventDefault();
		const { username, email, dob } = userData;

		if (username.length < 6) {
			setUsernameError('Username must be at least 6 characters long.');
			return;
		} else {
			setUsernameError('');
		}

		const updateData = { email, dob: dob || '' };
		if (newPassword) {
			updateData.password = newPassword;
		}

		try {
			const response = await fetch(`/users/${username}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				throw new Error('Error updating user');
			}

			const data = await response.json();
			setMessage('User updated successfully');
			setUserData({
				...userData,
				email: data.Email,
				dob: formatDate(data.Birthday) || '',
			});
			setNewPassword('');
		} catch (error) {
			console.error('Error updating user:', error);
			setMessage('Error updating user data.');
		}
	};

	// Deregister User using fetch API
	const handleDeregister = async () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			try {
				const response = await fetch(`/users/${userData.username}`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					throw new Error('Error deregistering user');
				}

				alert('User deregistered');
				onLoggedOut();
			} catch (error) {
				console.error('Error deregistering user:', error);
				setMessage('Error deregistering user.');
			}
		}
	};

	// Remove Favorite Movie using fetch API
	const removeFavorite = async (movieId) => {
		try {
			const response = await fetch(`/users/${userData.username}/movies/${movieId}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!response.ok) {
				throw new Error('Error removing favorite movie');
			}

			// Update favoriteMovies to reflect removal
			setFavoriteMovies(favoriteMovies.filter((movie) => movie._id !== movieId));
		} catch (error) {
			console.error('Error removing favorite:', error);
			setMessage('Error removing favorite movie.');
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<h3>Your Profile</h3>
					{message && <p>{message}</p>}
					{usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
					<Form onSubmit={handleUpdate}>
						<Form.Group controlId='formUsername'>
							<Form.Label>Username</Form.Label>
							<Form.Control type='text' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
						</Form.Group>
						<Form.Group controlId='formEmail'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
						</Form.Group>
						<Form.Group controlId='formDob'>
							<Form.Label>Date of Birth</Form.Label>
							<Form.Control type='date' value={userData.dob || ''} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />
						</Form.Group>
						<h4>Change Password</h4>
						<Form.Group controlId='formNewPassword'>
							<Form.Label>New Password</Form.Label>
							<Form.Control type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
						</Form.Group>
						<Button variant='primary' type='submit'>
							Update Profile
						</Button>
						<Button variant='danger' onClick={handleDeregister} className='ms-2'>
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
							<Col md={4} key={movie._id}>
								<Card>
									<MovieCard movie={movie} />
									<Button variant='secondary' onClick={() => removeFavorite(movie._id)}>
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
