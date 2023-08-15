import './styles';
import Chat from '@/pages/Chat';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='ker4ik13.github.io/test-chat' index element={<Chat />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
