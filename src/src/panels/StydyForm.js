import React from 'react';
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


const StudyForm = ({ id, go }) => {
	return(
	<Panel id={id}>
		<PanelHeader>PolyApp</PanelHeader>
		<Group>
			<Div>
				<Caption className="captionCaps" level="1" weight="semibold" caps >
                    Круто! Мы рады, что тебе интересен наш университет. Расскажи, какая форма обучения тебе нравится?
                </Caption>
                <FormLayout>
                    <FormItem top="Форма обуение">
                        <Radio name="radio" value="intramural" defaultChecked>Очная</Radio>
                        <Radio name="radio" value="extramural">Заочная</Radio>
                    </FormItem>
                </FormLayout>
			</Div>
			<FixedLayout filled vertical="bottom">
				<Div>
					<Button stretched size="l" mode="primary" onClick={go} data-to="degree">
							Далее
					</Button>
				</Div>
			</FixedLayout>
      	</Group>
	</Panel>
)
};

StudyForm.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default StudyForm;
