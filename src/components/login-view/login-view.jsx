import React, { useState } from 'react';

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
				if (data.success) {
					const { user, token } = data.data;
					localStorage.setItem('user', json.stringify(user));
					localStorage.setItem('token', token);
					onLoggedIn(user, token);
				} else {
					alert(`Login failed: ${data.error.message}`);
				}
			})
			.catch((error) => {
				alert('Something went wrong');
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required minLength='6' />
			</label>
			<label>
				Password:
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
			</label>
			<button type='submit'>Submit</button>
		</form>
	);
};
