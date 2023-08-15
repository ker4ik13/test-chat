import './styles';
import Chat from '@/pages/Chat';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/test-chat' element={<Chat />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
