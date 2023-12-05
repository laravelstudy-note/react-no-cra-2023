import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";

import "./index.css";

import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/test",
		element: <div>Test Page</div>,
	},
]);
  

// Render your React component instead
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
    	<RouterProvider router={router} />
	</React.StrictMode>
);

