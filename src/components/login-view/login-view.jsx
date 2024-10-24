import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		// this prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
		};

		fetch('https://luckyflix3000-b3f882eb1652.herokuapp.com/login', {
			method: 'Post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('login response: ', data);
				if (data.token) {
					const { user, token } = data;
					localStorage.setItem('user', JSON.stringify(user));
					localStorage.setItem('token', token);
					onLoggedIn(user, token);
				} else {
					alert(`Login failed: ${data.error.message}`);
				}
			})
			.catch((error) => {
				console.error('error', error);
				alert('Something went wrong');
			});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required minLength='6' />
			</Form.Group>

			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};
