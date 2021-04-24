import React,{ Component} from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import {FormItem} from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import CustomSelectOption from '@vkontakte/vkui/dist/components/CustomSelectOption/CustomSelectOption';
import List from '@vkontakte/vkui/dist/components/List/List';
import {Cell} from '@vkontakte/vkui/dist/components/Cell/Cell';
import Counter from '@vkontakte/vkui/dist/components/Counter/Counter';
import { ChipsSelect } from '@vkontakte/vkui/dist/unstable';
import '@vkontakte/vkui/dist/unstable.css';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import {Icon20Info} from '@vkontakte/icons';
import '../css/PickDirections.css'
class PickDirections extends Component{
	constructor (props) {
		super(props);
		this.state = {
				groups: [{value:'0',label:'Информационные технологии', role:'header' } ,{value: '1', label: 'Интеграция и программирование в САПР'}, {value: '2', label: 'Прикладная математика и информатика'}, {value: '3', label: 'Веб-технологии'}, {value: '4', label: 'Корпоративные информационные системы'}, {value:'5', label: 'Прикладная кибербезопасность'},{value:'-1',label:'Экономика и Управление',role:'header'},{value:'6',label:'Экономика и финансы предприятия'},{value:'7', label:'Экономика'}, {value:8, label:'Управление Персоналом'}, {value:9, label:'Реклама и связи с общественностью'}],
				selectedGroups: [],
				counter: 5,
				valid: false,
		}
		this.handleInputChange = this.handleInputChange.bind(this);

	}
	handleInputChange(event) {
		this.state.counter = 5 - event.length;
		this.state.selectedGroups = event;

	if ((this.state.selectedGroups.length > 0 )&&(this.state.selectedGroups.length <= 5) ) {
			this.setState({
				valid: true
			});
		} else {
			this.setState({
				valid: false
			});
		}

}

render () {
	return(
	<Panel id={this.props.id}>
		<PanelHeader>PolyApp</PanelHeader>
		<Div style={{marginLeft:16, marginRight: 16, marginTop: 16, background: 'var(--content_tint_background)', borderRadius: 7 }}> 
		Хорошо, я всё записал. Вот программы обучения, выбери из них пять, которые тебе интересны.	
		</Div>
		<Div  style={{marginLeft: 'auto', }}>
		<List>
			<Cell indicator={<Counter>{this.state.counter}</Counter>}>Доступно для выбора
			</Cell>
		</List>
		</Div>
		<FormItem top="Все направления" style={{marginBlockEnd: 220}}>
					<ChipsSelect
						name='groups' 
						value={this.state.selectedGroups}
						onChange={this.handleInputChange}
						showSelected={false}
						onChangeStart={(e, option) => {
							if (option.role === 'header') {
								e.preventDefault();
										
							}   
						}}
						closeAfterSelect={false}
						options={this.state.groups}
						placeholder="Не выбраны"
						emptyText="Ничего не найдено"
						renderOption={({ option, ...restProps }) => {
								return (
									<Div style={{display:'flex', alignItems:'center', padding:'0 20px'}}>
										 {option.role!=='header'?<Icon20Info  onClick={this.props.go} data-to="start" />:''}
										 <CustomSelectOption {...restProps} />
									</Div>
								);
						}}
					/>
	</FormItem>
		<FixedLayout filled vertical="bottom">
			<Div>
        <Button stretched size="l" mode="primary"
        disabled={!this.state.valid} onClick={this.props.go} data-to="start">Продолжить</Button>
      </Div>
		</FixedLayout>
	</Panel>
)
};
}

export default PickDirections;