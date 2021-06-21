import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import {Cell} from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';

import '../css/Start.css';


const Start = ({ id, go, fetchedUser }) => {
	const [ firstCheckbox, setFirstCheckbox ] = useState(false);
	return(
	<Panel id={id}>
		<PanelHeader>PolyApp</PanelHeader>
		{fetchedUser &&
		<Group header={<Header mode="primary">Приветствуем тебя</Header>}>
			<Div className="homepage-subhead">
				<Subhead weight="semibold">Это мобильное приложение Московского Политеха</Subhead>
			</Div>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>}
		<Group header={<Header mode="tertiary">Условия использования приложения:</Header>}>
			<Div>
				<Text weight="regular">
					<ul>
						<li>Условие</li>
						<li>Условие</li>
						<li>Условие</li>
						<li>Условие</li>
					</ul>
				</Text>
			</Div>
			<FixedLayout filled vertical="bottom">
			<Div>
				<Checkbox className="checkbox-agree" onClick={()=>setFirstCheckbox(!firstCheckbox)} value={firstCheckbox}>Согласен с условиями использования</Checkbox>
				<Button stretched size="l" mode="primary" onClick={go} data-to="acquaintance" disabled={ !(firstCheckbox) }>
					Далее
				</Button>
			</Div>
			</FixedLayout>
		</Group>
	</Panel>
)
};

Start.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Start;
