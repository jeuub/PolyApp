import React, { Component } from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import List from '@vkontakte/vkui/dist/components/List/List';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import { Icon20Info } from '@vkontakte/icons';
import '../css/PickDirections_v2.css';
import { PanelHeaderBack } from '@vkontakte/vkui';

const newDirections = require('../json/new_directions.json');

class PickDirections_v2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedGroups: [],
			counter: 5,
			valid: false,
			choosedGroupTempArray: [],
		}
	}
	handleCheckboxChange(a) {
		if (a.target.checked) {
			this.state.counter = this.state.counter - 1;
		}
		else this.state.counter = this.state.counter + 1;
		if ((this.state.counter >= 0) && (this.state.counter < 5)) {
			this.setState({
				valid: true
			});
		} else {
			this.setState({
				valid: false
			});
		}
	}
	componentDidMount = () => {
		if (localStorage.getItem('selectedGroups')) {
			for (let i = 0; i < localStorage.getItem('selectedGroups').length; i++)
				if (localStorage.getItem('selectedGroups')[i] == 't') {
					this.setState({ valid: true })
				}
			let counter = 0;
			for (let i = 0; i < document.querySelectorAll('input[type=checkbox]').length * 2 - 1; i++) {
				if (localStorage.getItem('selectedGroups')[i] !== ',') {
					document.querySelectorAll('input[type=checkbox]')[counter].checked = (localStorage.getItem('selectedGroups')[i] === 't' ? true : false);
					counter = counter + 1;
				}
			}
			let t = localStorage.getItem('selectedGroups');
			for (let i = 0; i < t.length; i++) {
				if (localStorage.getItem('selectedGroups')[i] === 't') {this.state.counter--}
			}
		}
	}
	handleInfoClick = (value) => (event) => {
		if (value) {
			localStorage.setItem('interestedDirection', value);
			this.props.go(event);
		}

		for (let i = 0; i < document.querySelectorAll('input[type=checkbox]').length; i++) {
			this.state.selectedGroups.push(document.querySelectorAll('input[type=checkbox]')[i].checked ? 't' : 'f');
		}
		localStorage.setItem('selectedGroups', [this.state.selectedGroups]);
	}


	goNextPageHandler = () => (event) => {
		localStorage.setItem('choosedGroups', []);
		for (let i = 0; i < document.querySelectorAll('input[type=checkbox]').length; i++) {
			if (document.querySelectorAll('input[type=checkbox]')[i].checked) {
				this.state.choosedGroupTempArray.push(document.querySelectorAll('input[type=checkbox]')[i].value);
			}
		}
		localStorage.setItem('choosedGroups', [this.state.choosedGroupTempArray]);
		this.props.go(event)
	}
	render() {
		return (
			<Panel id={this.props.id}>
				<PanelHeader left={<PanelHeaderBack onClick={this.props.go} data-to='acquaintance' />}>PolyApp</PanelHeader>
				<Title className="pickDirections__title">
					Для {localStorage.getItem('wantStudyForm') == 'Очная' ? 'очной формы обучения' : 'заочной формы обучени'} {localStorage.getItem('wantStudyLevel') == 'Бакалавриат' ? 'бакалавриата' : localStorage.getItem('wantStudyLevel') == 'Специалитет' ? 'специалитета' : 'магистратуры'} у нас есть такие направления: <br/><i style={{fontSize: 12, lineHeight:0.9}}>Чтобы узнать подробнее про каждое, нажми на значок информации.</i>
				</Title>
				<Div style={{ marginLeft: 'auto', }}>
					<List>
						{this.componentDidMount ? <Div className="pickDirection__counter">Доступно для выбора <Counter className="pickDirection__counter__num">{this.state.counter <= 0 ? 0 : this.state.counter}</Counter></Div>   : null}
					</List>
				</Div>
				<Div className="pickDirections__fit" >
					ФИТ
				</Div>
				{newDirections[localStorage.getItem('wantStudyForm')][localStorage.getItem('wantStudyLevel')].map((directions, index)=>{
					return(
						<Div key={index} className="pickDirections__direction">
							<Title style={{ marginLeft: 16, padding: 16, marginRight: 16, marginTop: 16, borderRadius: 7, textAlign: 'center', fontSize: '1.2rem', margin: '0 auto' }}>
							{Object.keys(newDirections[localStorage.getItem('wantStudyForm')][localStorage.getItem('wantStudyLevel')][index]) }
							</Title>
							{directions[Object.keys(directions)].map((direction, idx)=>{return(
									<Div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0' }}>
										<FormItem className="directions__checkbox">
											<Checkbox value={direction['Название направления']} checked={this.value} onChange={() => this.handleCheckboxChange(event)}>{direction['Название направления']}</Checkbox>
										</FormItem>
										<Icon20Info onClick={this.handleInfoClick(JSON.stringify(direction))} data-to="about-direction" />
									</Div>
								)})	
							}
						</Div>	
					)
				}) 	
				}		
				<FixedLayout filled className="pickDirections__fixed" vertical="bottom">
					<Div>
						<Button stretched size="l" mode="primary"
							disabled={!this.state.valid} onClick={this.goNextPageHandler(event)} data-to="choosed-directions-info">Продолжить</Button>
					</Div>
				</FixedLayout>
			</Panel>
		)
	};
}

export default PickDirections_v2;