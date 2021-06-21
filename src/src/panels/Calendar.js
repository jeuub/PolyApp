import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

import Panel  from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import {Cell} from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import { FormItem, Input } from '@vkontakte/vkui';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CalendarOutline } from '@vkontakte/icons';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';


import DatePicker from '@vkontakte/vkui/dist/components/DatePicker/DatePicker';

import DatePicker_ from 'react-date-picker';
import Calendar from 'react-calendar';

import '../css/Calendar.css';

const CalendarPanel = ({ id, go, back}) => {
    const [notifies, setNotifies] = useState({});
	const [value, setValue] = useState('');

	const [text, setText] = useState([]);

	const [date, setDate] = useState();
	const [allowedNotifies, setAllow] = useState(false);

	const copyText = () => {
		bridge.send('VKWebAppCopyText', {text: value})
	}

	const saveText = async (text) => {
		setValue(text);
		await bridge.send('VKWebAppStorageSet', {
			key: 'someKey',
			value: JSON.stringify(text)
		});
	}
	

	// календарь

	
	async function deleteAllNotifies() {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: 'notifies',
				value: ''
			});
			setNotifies({});
		}
		catch (error) {
			console.error(error);
		}

		console.log('notifies removed');
	}

	async function getAllNotifies() {
		if (Object.keys(notifies).length) console.log(notifies);
		else {
			try {
			const storageData = await bridge.send('VKWebAppStorageGet', {keys: ['notifies']});	
			const value = JSON.parse(storageData.keys[0].value);	
			setNotifies(value);
			console.log(value);
			}
			catch (error) {
				console.error(error);
			}
		}
	}

	async function showNotifies(date) {
		const key = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
		if (Object.keys(notifies).length) {
            if (!notifies[key]) {
                console.log('Нет напоминаний');
                setText('Нет напоминаний');
                return;
            }
			let s = key + '\n' + Object.keys((notifies[key])).join('\n');
			console.log('This is s' + s);
			setText(s);
		}
		else {
			try {
				
				const storageData = await bridge.send('VKWebAppStorageGet', {keys: ['notifies']});	
				const notifies = JSON.parse(storageData.keys[0].value);	

				if (!notifies || !Object.keys(notifies).length) {
					console.log("No notifies today");

					return;
				}
				setNotifies(notifies);

                if (!notifies[key]) {
                    console.log('Нет напоминаний');
                    setText('Нет напоминаний');
                    return;
                }

				let s = key + '\n' + Object.keys((notifies[key])).join('\n');
				console.log(s);
				setText(s);
			} catch (error) {
				console.error(error);
				console.log('no any notify');
			}
		}
	}

	async function addNotifies(choosedDate, message) {

		if (!choosedDate || !choosedDate.day || !choosedDate.month || !choosedDate.year) {
			console.error('Введите дату');
            setText('Введите дату');
			return;
		}
        console.log('raw date: ' + Object.keys(choosedDate));

		// if (!allowedNotifies) {
		// 	try {
		// 		const allow = await bridge.send("VKWebAppAllowNotifications");

		// 		setAllow(allow);
		// 	}
		// 	catch (error){
		// 		console.error(error);
		// 	}
		// }
		const key = choosedDate.day + '/' + choosedDate.month + '/' + choosedDate.year;
        console.log('parsed date: ' + key);
        console.log('mesage: ' + message);
        setText([message, ...text])
        console.log('notifies: ' + notifies);
        console.log('notifies_keys: ' + Object.keys(notifies));
		
		if (!notifies[key]) notifies[key] = {};

		notifies[key][message] = "12:00:00";

		try{
			await bridge.send('VKWebAppStorageSet', {
				key: 'notifies',
				value: JSON.stringify(notifies)
			});
			
			setNotifies({});
			setNotifies(notifies);
		}
		catch (error) {
			console.error('error:' + error);
		}


		console.log('notify added');

		// if (allowedNotifies) {
		// 	 try {
		// 		const auth = await bridge.send("VKWebAppGetAuthToken", {
		// 			"app_id":7810593,
		// 			"scope":"friends,status"
		// 		});

		// 		const response = await bridge.send("VKWebAppCallAPIMethod", 
		// 		{
		// 			"method": "notifications.sendMessage",
		// 			"request_id": "32test",
		// 			"params": {
		// 				"user_ids": "227866565",
		// 				"v": "5.130",
		// 				"access_token":'O7ShySyE1AcQkeoUXO74',
		// 				"message": "Hello API"
		// 			}
		// 		});

		// 		console.log(response);
		// 	} 
		// 	catch (error) {
		// 		console.error(error);
		// 	}
		// }
	}

	function highlightDates(date) {
		const parsedDate = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();

		if (Object.keys(notifies).find(notifyDate => parsedDate == notifyDate)) 
			return 'highlight';
	}

	//

	useEffect(() => {
		async function getText() {
			try {	
			const storageData = await bridge.send('VKWebAppStorageGet', {keys: ['someKey']});

			setValue(JSON.parse(storageData.keys[0].value));
			} catch(error) {
				console.error('error:', error);
			}
	}
	getText();
    getAllNotifies();
	}, []);

    return (
		<Panel id={id}>
            <PanelHeader>PolyApp</PanelHeader>
			<Group>
				<Div>
					<Button size='m' mode='primary' onClick={getAllNotifies}>
						Уведомления
					</Button>
					<Button size='m' mode='primary' onClick={() => addNotifies(date, document.getElementById('input').value)}>
						Добавить уведомление
					</Button>
					<Button size='m' mode='primary' onClick={() => deleteAllNotifies()}>
						Удалить уведомления
					</Button>
					
					<FormItem >
					<Input id='input' type='text' placeholder='Hello world' onChange={(e) => saveText(e.target.value)} defaultValue={value}/>
					</FormItem>
				</Div>
                <DatePicker 
                min={{day: 11, month: 6, year: 2021}}
                max={{day: 1, month: 1, year: 2024}}
                popupDirection='bottom'
                onDateChange={(value) => {console.log(value); setDate(value)}}
                dayPlaceholder="ДД"
                monthPlaceholder="ММММ"
                yearPlaceholder="ГГГГ"/>

                {/* <Calendar 		
                onClickDay={showNotifies}
                value={new Date()}
                tileClassName={({ date }) => highlightDates(date)}
                /> */}

                <Div style={{whiteSpace: 'pre-line'}}>
                    {text}
                </Div>
            </Group>

                <FixedLayout filled vertical="bottom">
                <Tabbar className='tabbar-padding'>
                    <TabbarItem text="Вопросы" onClick={go} data-to="questions">
                        <Icon28InfoCircleOutline/>
                    </TabbarItem>
                    <TabbarItem text="Календарь" selected>
                        <Icon28CalendarOutline />
                    </TabbarItem>
                    <TabbarItem text="Профиль" onClick={go} data-to="home">
                        <Icon28UserCircleOutline/>
                    </TabbarItem>
                </Tabbar>
            </FixedLayout>
		</Panel>
	);
}

export default CalendarPanel;