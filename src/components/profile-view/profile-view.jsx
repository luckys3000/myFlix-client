import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import { MovieCard } from '../movie-card/movie-card';

//Helper function to format date as "yyyy-MM-dd"
const formatDate = (dateString) => {
	return dateString ? dateString.split('T')[0] : '';
};

export const ProfileView = ({ user, movies, token, onLoggedOut }) => {
	const [userData, setUserData] = useState({
		username: user.Username,
		email: user.Email,
		dob: formatDate(user.Birthday) || '', //Format dob intially.  Ensure dob is an empty string if undefined
	});
	const [newPassword, setNewPassword] = useState('');
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [message, setMessage] = useState('');
	const [usernameError, setUsernameError] = useState('');

	// Fetch user details and favorite movies on mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`/users/${user.username}`, { headers: { Authorization: `Bearer ${token}` } });
				setUserData({
					username: response.data.Username,
					email: response.data.Email,
					dob: formatDate(response.data.Birthday), //Format dob for date input
				});

				// Debugging log
				console.log('Step 1');
				console.log('Fetched user data:', response.data);
				console.log('Set userData state:', {
					username: response.data.username,
					email: response.data.email,
					dob: formatDate(response.data.birthday) || '',
				});

				const favoriteMoviesList = response.data.FavoriteMovies || []; // Ensure it's defined
				setFavoriteMovies(movies.filter((m) => favoriteMoviesList.includes(m.Featured)));
			} catch (error) {
				console.error(error);
				setMessage('Error fetching user data.');
			}
		};

		fetchUserData();
	}, [user.username, movies, token]);

	// Handle updating user information
	const handleUpdate = async (e) => {
		e.preventDefault();
		const { username, email, dob } = userData;

		// Validate username length
		if (username.length < 6) {
			setUsernameError('Username must be at least 6 characters long.');
			return;
		} else {
			setUsernameError('');
		}

		// Prepare data for user update
		const updateData = { email, dob: dob || '' }; //Ensure dob is never undefined

		// Only set new password if provided
		if (newPassword) {
			updateData.password = newPassword;
		}

		try {
			const response = await axios.put(`/users/${username}`, updateData, { headers: { Authorization: `Bearer ${token}` } });
			setMessage('User updated successfully');
			setUserData({
				...userData,
				email: response.data.Email,
				dob: formatDate(response.data.Birthday) || '', //Format dob after update
			});

			// Debugging log
			console.log('Updated userData state:', {
				...userData,
				email: response.data.Email,
				dob: formatDate(response.data.Birthday) || '',
			});
			// Clear new password input after successful update
			setNewPassword('');
		} catch (error) {
			console.error('Error updating user:', error);
			setMessage('Error updating user data.');
		}
	};

	// Handle deregistration
	const handleDeregister = () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			axios
				.delete(`/users/${userData.username}`, { headers: { Authorization: `Bearer ${token}` } })
				.then(() => {
					alert('User deregistered');
					onLoggedOut();
				})
				.catch((error) => {
					console.error('Error deregistering user:', error);
					setMessage('Error deregistering user.');
				});
		}
	};

	// Handle removing a favorite movie
	const removeFavorite = (movieFeatured) => {
		axios
			.delete(`/users/${userData.username}/movies/${movieFeatured}`, { headers: { Authorization: `Bearer ${token}` } })
			.then(() => {
				setFavoriteMovies(favoriteMovies.filter((movie) => movie.Featured !== movieFeatured));
			})
			.catch((error) => {
				console.error('Error removing favorite:', error);
				setMessage('Error removing favorite movie.');
			});
	};

	console.log('Render - userData state:', userData); //Helps verify that dob stays consistent across renders.

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
							<Form.Control type='date' value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />
						</Form.Group>
						<h4>Change Password</h4>
						<Form.Group controlId='formNewPassword'>
							<Form.Label>New Password</Form.Label>
							<Form.Control type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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
