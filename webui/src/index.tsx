import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppWrapper } from './AppWrapper';
import './index.css';

createRoot(document.getElementById('root') as any).render(
	<React.StrictMode>
		<AppWrapper />
	</React.StrictMode>,
);
