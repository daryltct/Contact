import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContactContextProvider from './context/contact/ContactContext';
import { AuthContextProvider } from './context/auth/AuthContext';
import { AlertContextProvider } from './context/alert/AlertContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<ContactContextProvider>
				<AlertContextProvider>
					<App />
				</AlertContextProvider>
			</ContactContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
