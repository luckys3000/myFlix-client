import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SignupView = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	console.log('Inside signup view');

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch('https://luckyflix3000-b3f882eb1652.herokuapp.com/users', {
			method: 'Post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					alert('Signup successful');
					window.location.reload();
				} else {
					alert(`Signup failed: ${data.error.message}`);
				}
			})
			.catch((error) => {
				alert('Something went wrong');
			});
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

			<Form.Group controlId='=formBirthday'>
				<Form.Label>Birthday:</Form.Label>
				<Form.Control type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder='Birthday' />
			</Form.Group>
			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};
