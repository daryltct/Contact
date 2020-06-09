import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContactContextProvider } from './context/contact/ContactContext';

ReactDOM.render(
	<React.StrictMode>
		<ContactContextProvider>
			<App />
		</ContactContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
