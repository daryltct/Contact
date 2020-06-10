import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContactContextProvider } from './context/contact/ContactContext';
import { AuthContextProvider } from './context/auth/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<ContactContextProvider>
				<App />
			</ContactContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
