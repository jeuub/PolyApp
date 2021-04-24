import React, { Component} from 'react';


import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {FormItem} from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import { Button } from '@vkontakte/vkui';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import CustomSelectOption from '@vkontakte/vkui/dist/components/CustomSelectOption/CustomSelectOption';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import '../css/AboutStudents.css'


class AboutStudent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            year: '',
            specialty: '',
            group: '',
            dorm: '',
            stud: '',
            prof: '',
            changed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    componentDidMount = () =>{
        localStorage.clear();
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });
        if (((this.state.year !== '')||(name == 'year'))&&((this.state.specialty !== '')||(name == 'specialty'))&&((this.state.group !== '')||(name == 'group'))&&((this.state.dorm !== '')||(name == 'dorm'))&&((this.state.stud !== '')||(name == 'stud'))){
            this.setState({
                changed: true
            });
        };
    };
    toStorage = () => {
        const {year, specialty, group, dorm, stud, prof} = this.state;
        localStorage.setItem('year', year);
        localStorage.setItem('specialty', specialty);
        localStorage.setItem('group', group);
        localStorage.setItem('dorm', dorm);
        localStorage.setItem('stud', stud);
        localStorage.setItem('prof', prof);
    };

  render () {
    return (
        <Panel id={this.props.id}> 
            <PanelHeader>PolyApp</PanelHeader>
            <FormItem top="Курс">
            <Select name = "year" value={this.state.year}
            onChange={this.handleInputChange}
            placeholder="Не выбран" 
            options={[{value:1, label:'1 курс'},{value:2, label:'2 курс'},{value:3, label:'3 курс'},{value:4, label:'4 курс'}]}
            renderOption={({ option, ...restProps }) => (
                <CustomSelectOption {...restProps} />
            )}
            />
            </FormItem>
            <FormItem top="Направление">
                <Select name="specialty" value={this.state.specialty}
                onChange={this.handleInputChange}
                placeholder="Не выбрано" 
                options={[{value: 'САПР', label: 'САПР'}, {value: 'ВЭБ', label: 'ВЕБ'}]}
                renderOption={({ option, ...restProps }) => (
                    <CustomSelectOption {...restProps}  />
                )}
                />
            </FormItem>
            <FormItem top="Группа">
                <Input type="text" name="group"
                    autocomplete="off"
                    value={this.state.group}
                    onChange={this.handleInputChange}
                    placeholder="201-321" />
            </FormItem>
            <FormItem top="Живешь в общежитии">
                <Select value={this.state.dorm}
                onChange={this.handleInputChange}
                name='dorm'
                placeholder="Не выбран"
                options={[{value:'Yes', label:'Да'},{value:'No', label:'Нет'}]}
                renderOption={({ option, ...restProps }) => (
                    <CustomSelectOption {...restProps} />
                )}
                />
            </FormItem>
            <FormItem top="Номер студенческого(необязательно)">
                <Input type="number" name="stud"
                    autocomplete="off"
                    value={this.state.stud}
                    onChange={this.handleInputChange}
                    placeholder="000000000" />
            </FormItem>
            <FormItem top="Номер профбилета(необязательно)" style={{marginBlockEnd: 70, writingMode: 'horizontal-tb'}}>
                <Input type="number" name="prof"
                    autocomplete="off"
                    value={this.state.prof}
                    onChange={this.handleInputChange}
                    placeholder="000000000" />
            </FormItem>
            <FixedLayout filled vertical="bottom">
                <Div>
                    <Button type="submit" stretched size="l" mode="primary" disabled={!this.state.changed}
                 onClick={this.toStorage(), this.props.go} data-to="home">Продолжить</Button>
                </Div>
          </FixedLayout>
          </Panel>   
    )
  }
}

export default AboutStudent;