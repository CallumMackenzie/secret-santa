import React from 'react';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { SignIn } from "./pages/SignIn";
import { Home } from './pages/Home';
import { SecretSantaCreator } from './pages/SecretSantaCreator';
import { PageNotFound } from './pages/404';
import { JoinSecretSanta } from './pages/JoinSecretSanta';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

const App = () => {
	return (<>
		<BrowserRouter>
			<Routes>
				<Route path="/" >
					<Route index element={<SignIn auth={auth} />} />
					<Route path="home" element={<Home firestore={firestore} auth={auth} />} />
					<Route path="create" element={<SecretSantaCreator firestore={firestore} auth={auth} />} />
					<Route path="join" element={<JoinSecretSanta firestore={firestore} auth={auth} />} />
					<Route path="*" element={<PageNotFound auth={auth} />} />
				</Route>
			</Routes>
		</BrowserRouter >
	</>);
}

export default App;
