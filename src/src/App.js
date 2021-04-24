import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Start from './panels/Start';
import Acquaintance from './panels/Acquaintance';
import StudyForm from './panels/StydyForm';
import Degree from './panels/Degree';
import PickDirections from './panels/PickDirections';
import AboutStudent from './panels/AboutStudent';
import HomePage from './panels/HomePage';
import Questions from './panels/Questions';

const App = () => {
	const [activePanel, setActivePanel] = localStorage.getItem('group') == null ? useState('start') : useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Start id='start' fetchedUser={fetchedUser} go={go} />
					<Acquaintance id='acquaintance' go={go} />
					{/* <StudyForm id='study-form' go={go} />
					<Degree id='degree' go={go}/> */}
					<PickDirections id='pick-directions' go={go} />
					{/* Ветка два */}
					<AboutStudent id="student-form-filling" go={go} />
					<HomePage id='home' fetchedUser={fetchedUser} go={go}/>
					<Questions id='questions' go={go}/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

