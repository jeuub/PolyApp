import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import {FormItem} from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';

import '../css/Radio.css';


const Acquaintance = ({ id, go }) => {
	const [ already, setAlready ] = useState(false);
	useEffect(() => {
		localStorage.clear();
	  });
	return(
	<Panel id={id}>
		<PanelHeader>PolyApp</PanelHeader>
		<Group>
			<Div>
				<Caption className="captionCaps" level="1" weight="semibold" caps >Отлично! A теперь пройди простой тест и расскажи нам немного о себе.</Caption>
				<FormLayout>
					<FormItem top="Анкета">
						<Radio name="radio" onClick={()=>setAlready(!already)} value="already" defaultChecked>Я уже учусь в Московском Политехе</Radio>
						<Radio name="radio" onClick={()=>setAlready(!already)} value="newStudent">Я только собираюсь поступить</Radio>
					</FormItem>
				</FormLayout>
			</Div>
			{ already ? 
			<Div style={{marginBlockEnd:50}}>
			<Caption className="captionCaps" level="1" weight="semibold" caps >
				Круто! Мы рады, что тебя привлёк наш университет. Расскажи, какая форма обучения тебя интересует?
			</Caption>
			<FormLayout>
				<FormItem top="Форма обуения">
					<Radio name="radio" value="intramural" defaultChecked>Очная</Radio>
					<Radio name="radio" value="extramural">Заочная</Radio>
				</FormItem>
			</FormLayout>
			<FormLayout>
                    <FormItem top="Ступень образования">
                        <Radio name="radio" value="bachelor" defaultChecked>Бакалавриат</Radio>
                        <Radio name="radio" value="magistracy">Магистратура</Radio>
                    </FormItem>
            </FormLayout>
		</Div>
		: null
		}
			<FixedLayout filled vertical="bottom">
				<Div>
					<Button stretched size="l" mode="primary" onClick={go} data-to={ already ? 'pick-directions' : 'student-form-filling'} >
							Далее
					</Button>
				</Div>
			</FixedLayout>
      	</Group>
	</Panel>
)
};

Acquaintance.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Acquaintance;
