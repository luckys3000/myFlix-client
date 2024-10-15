import React, { useState } from 'react';

export const SingupView = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch('https://luckyflix3000-b3f882eb1652.herokuapp.com/signup', {
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
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} reruired minLength='6' />
			</label>
			<label>
				Password:
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
			</label>
			<label>
				Email:
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
			</label>
			<label>
				Birthday:
				<input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
			</label>
			<button type='submit'>Submit</button>
		</form>
	);
};
