import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SignupView = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		try {
			const response = await fetch('https://luckyflix3000-b3f882eb1652.herokuapp.com/users', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// Check if response is successful
			if (!response.ok) {
				const errorData = await response.json(); // Attempt to parse error response
				console.log('Error data:', errorData); // Log error data for insights
				setErrorMessage(errorData.message || 'Unknown error occurred'); // Display specific message if available
				return;
			}

			const responseData = await response.json();

			// Log the response to see its structure
			console.log('Response data:', responseData);

			// Check for success in the response data
			if (responseData.Email && responseData.Username) {
				alert('Signup successful');
				window.location.reload();
			} else {
				const errorMessage = responseData.error ? responseData.error.message : 'Unknown error occurred';
				setErrorMessage(`Signup failed: ${errorMessage}`);
			}
		} catch (error) {
			// Log error and show generic alert
			console.error('Error during signup:', error);
			setErrorMessage('Something went wrong. Please try again.');
			alert('Something went wrong');
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required minLength='6' />
			</Form.Group>

			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
			</Form.Group>

			<Form.Group controlId='formEmail'>
				<Form.Label>Email:</Form.Label>
				<Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
			</Form.Group>

			<Form.Group controlId='formBirthday'>
				<Form.Label>Birthday:</Form.Label>
				<Form.Control type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder='Birthday' />
			</Form.Group>

			<Button variant='primary' type='submit'>
				Submit
			</Button>

			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
		</Form>
	);
};
