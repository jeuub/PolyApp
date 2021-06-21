import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot, ModalCard, ModalRoot, ModalPage, Text, ModalPageHeader, PanelHeaderButton,Div} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// import Start from './panels/Start';
import Acquaintance from './panels/Acquaintance';
// import StudyForm from './panels/StydyForm';
// import Degree from './panels/Degree';
import PickDirections from './panels/PickDirections_v2';
import AboutDirection from './panels/AboutDirection';
import ChoosedDirectionsInfo from './panels/ChoosedDirectionsInfo';
import AboutStudent from './panels/AboutStudent';
import HomePage from './panels/HomePage';
import Questions from './panels/Questions';
import QuestionsList from './panels/QustionList';
import Instruction from './panels/Instruction';
import CalendarPanel from './panels/Calendar';
import Dorms from './panels/Dorms';
import DormPage from './panels/DormPage';
import EditStudent from './panels/EditStudent';
import './css/gilroy.css';
import './css/main.css';
import { Icon56QuestionOutline } from '@vkontakte/icons';
import { Icon56GhostOutline } from '@vkontakte/icons';
import arbuz from './img/arbuz.png'

const MODAL_CARD_ONE = 'modal-one';
const MODAL_CARD_TWO = 'modal-two';
const MODAL_CARD_THREE = 'modal-three';

const App = () => {
	const [activePanel, setActivePanel] = useState(localStorage.getItem('validation') ? 'home' : 'acquaintance');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [category, setCategory] = useState('');
	const [question, setQuestion] = useState(null);
	const [dorm, setdorm] = useState(0);
	const [activeModal, setActiveModal] = useState(null);

	function menu(e) {
		if (e.state) {
			setActivePanel(e.state.panel);
		} else {
			setActivePanel(routes.home);
		}
	}
	function back() { window.history.back(); }

	useEffect(() => {
		window.addEventListener('popstate', e => e.preventDefault() & menu(e));
		window.history.pushState({ panel: 'acquaintance' }, 'acquaintance');

		bridge.subscribe(({ detail: { type, data } }) => {
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
		window.history.pushState({ panel: e.currentTarget.dataset.to }, `${e.currentTarget.dataset.to}`);
	};

	const updateData = (value) => {
		setCategory(value)
	}
	const updateQuestion = (value) => {
		setQuestion(value)
	}
	const modal = (
		<ModalRoot
			activeModal={activeModal}
		>
		<ModalCard
				id={MODAL_CARD_ONE}
				onClose={() => setActiveModal(null)}
				icon={<Icon56QuestionOutline />}
				header="Какие бывают формы обучения?"
			>
			          <Div>
            <Text>
			Очная - занятия проводятся по будням, и на некоторых направлениях по субботам. Если не посещать пары можно получить недопуск или даже отчислится.
			<br/><br/>Заочная - вы встречаетесь с преподавателями вживую только два раза в году - на сессии. Объем программы такой же как и на очной, но большую часть студент изучает самостоятельно.
			</Text>
          </Div>
			</ModalCard>
			<ModalCard
				id={MODAL_CARD_TWO}
				onClose={() => setActiveModal(null)}
				icon={<Icon56QuestionOutline />}
				header="Какие бывают ступени образования?"
			>
							          <Div>
            <Text>
				Бакалавриат - базовый уровень высшего образования. Поступать на бакалавриат имеют право выпускники 11 класса, сдавшие егэ или выпускники колледжей по конкурсу внутренних экзаменов ВУЗа. Обучение длится 4 года.
				<br/><br/>Специалитет - тоже высшее образование, но выпускники получают конкретную профессию и возможность преподавать. Обучение длится 5 лет.
				<br/><br/>Магистратура - второй этап высшего образования.
				Для поступления необходимо иметь диплом бакалавра или специалитета. Обучение длится 2 года
			</Text>
          </Div>
			</ModalCard>
			<ModalCard
				id={MODAL_CARD_THREE}
				onClose={() => setActiveModal(null)}
				icon={<Icon56GhostOutline />}
				header="Просим прощения"
			>
							          <Div>
            <Text>
				К сожалению, страница календаря ещё находится в разработке.
			</Text>
          </Div>
			</ModalCard>
		</ModalRoot>
	);
	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout} modal={modal}>
					{/* <Start id='start' go={go} /> */}
					<Acquaintance setActiveModal={setActiveModal} fetchedUser={fetchedUser}
					MODAL_CARD_ONE={MODAL_CARD_ONE} MODAL_CARD_TWO={MODAL_CARD_TWO}
					id='acquaintance' go={go} />
					{/* <StudyForm id='study-form' go={go} />
					<Degree id='degree' go={go}/> */}
					<PickDirections back={back} id='pick-directions' go={go} />
					<AboutDirection back={back} id='about-direction' go={go} />
					<ChoosedDirectionsInfo back={back} id='choosed-directions-info' go={go} />
					<DormPage back={back} dorm={dorm} setdorm={setdorm} id='dorm-page' go={go} />
					<Dorms back={back} setdorm={setdorm} id='dorms' go={go} choosedDorm={0} />
					{/* Ветка два */}
					<AboutStudent back={back} id="student-form-filling" go={go} />
					<EditStudent back={back} go={go} id="edit" setActivePanel={setActivePanel} />
					<HomePage MODAL_CARD_THREE={MODAL_CARD_THREE} setActiveModal={setActiveModal}  id='home' setActivePanel={setActivePanel} fetchedUser={fetchedUser} go={go} />
					<Questions MODAL_CARD_THREE={MODAL_CARD_THREE} setActiveModal={setActiveModal} updateData={updateData} id='questions' go={go} />
					<QuestionsList back={back} updateQuestion={updateQuestion} category={category} id='questions-list' go={go} />
					<Instruction back={back} question={question} category={category} id='instruction' go={go} />
					<CalendarPanel back={back} id='calendar' go={go} />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;