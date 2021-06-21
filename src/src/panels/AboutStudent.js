import React, { Component } from 'react';


import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { FormItem } from '@vkontakte/vkui/dist/components/FormItem/FormItem';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import { Button } from '@vkontakte/vkui';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import CustomSelectOption from '@vkontakte/vkui/dist/components/CustomSelectOption/CustomSelectOption';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { PanelHeaderBack } from '@vkontakte/vkui';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';

import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';

import '../css/AboutStudents.css'
const newDirections = require('../json/new_directions.json');

class AboutStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: '',
            year: '',
            specialty: '',
            group: '',
            dorm: '',
            dormnum: '',
            stud: '',
            prof: '',
            changed: false,
            groupValid: true,
            studValid: true,
            profValid: true,

        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount = () => {
        localStorage.clear();
        $('input[name="group"]').mask('999-999');
        $('input[name="stud"]').mask('9990-9999');
        $('input[name="prof"]').mask('9999999999999999');
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        },
            () => { this.validateField(name, value) }
        );
        // if (((this.state.year !== '') || (name == 'year')) && ((this.state.specialty !== '') || (name == 'specialty')) && ((this.state.group !== '') || (name == 'group')) && ((this.state.dorm !== '') || (name == 'dorm'))) {
        //     this.setState({
        //         changed: true
        //     });
        // };
    };
    validateField = (fieldName, value) => {
        let groupValid = this.state.groupValid;
        let profValid = this.state.profValid;
        let studValid = this.state.studValid;
        switch (fieldName) {
            case 'group':
                groupValid = (value.length == 7);
                break;
            case 'prof':
                profValid = (value.length == 16) || (value == '');
                break;
            case 'stud':
                studValid = (value.length == 9) || (value == '');
                break;
            default:
                break;
        }
        this.setState({
            groupValid: groupValid,
            profValid: profValid,
            studValid: studValid,
        }, this.validateForm);
    };
    validateForm = () => {
        this.setState({
            changed: this.state.groupValid &&
                this.state.profValid && this.state.studValid && (this.state.year !== '') && ((this.state.level === 'Бакалавриат' && this.state.year != 5)||(this.state.level === 'Магистратура' && this.state.year < 3)||this.state.level === 'Специалитет' )&&
                (this.state.level !== '')&&(this.state.specialty !== '') && (this.state.dorm !== '') && (((this.state.dormnum !== '') && (this.state.dorm == 'Yes')) || (this.state.dorm == 'No'))
        });
    };
    thirdhand(event){
        this.setState({specialty: ''});
        var inputs = document.getElementsByTagName('input');

        for (var i=0; i<inputs.length; i++)  {
        if (inputs[i].type == 'radio')   {
            inputs[i].checked = false;
        }
        }
        this.handleInputChange(event)
    }
    toStorage = () => {
        const {level, year, specialty, group, dorm, stud, prof, dormnum } = this.state;
        localStorage.setItem('level', level);
        localStorage.setItem('year', year);
        localStorage.setItem('specialty', specialty);
        localStorage.setItem('group', group);
        localStorage.setItem('dorm', dorm);
        localStorage.setItem('stud', stud);
        localStorage.setItem('prof', prof);
        localStorage.setItem('dormnum', dormnum);
    };
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back} />}>PolyApp</PanelHeader>
                <FormItem top="Ступень">
                    <Select name="level" value={this.state.level}
                        onChange={(event)=>this.thirdhand(event)}
                        placeholder="Не выбран"
                        options={[{ value: 'Бакалавриат', label: 'Бакалавриат' }, { value: 'Специалитет', label: 'Специалитет' }, { value: 'Магистратура', label: 'Магистратура' }]}
                        renderOption={({ option, ...restProps }) => (
                            <CustomSelectOption {...restProps} />
                        )}
                    />
                </FormItem>
                {this.state.level === 'Бакалавриат'?
                    <FormItem top="Курс">
                        <Select name="year" value={this.state.year}
                            onChange={this.handleInputChange}
                            placeholder="Не выбран"
                            options={[{ value: 1, label: '1 курс' }, { value: 2, label: '2 курс' }, { value: 3, label: '3 курс' }, { value: 4, label: '4 курс' }]}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption {...restProps} />
                            )}
                        />
                    </FormItem>
                :this.state.level === 'Специалитет'?
                    <FormItem top="Курс">
                        <Select name="year" value={this.state.year}
                            onChange={this.handleInputChange}
                            placeholder="Не выбран"
                            options={[{ value: 1, label: '1 курс' }, { value: 2, label: '2 курс' }, { value: 3, label: '3 курс' }, { value: 4, label: '4 курс' }, { value: 5, label: '5 курс' }]}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption {...restProps} />
                            )}
                        />
                    </FormItem>
                :this.state.level === 'Магистратура'?
                    <FormItem top="Курс">
                        <Select name="year" value={this.state.year}
                            onChange={this.handleInputChange}
                            placeholder="Не выбран"
                            options={[{ value: 1, label: '1 курс' }, { value: 2, label: '2 курс' }]}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption {...restProps} />
                            )}
                        />
                    </FormItem>:null
                }
                

                {this.state.level !== ''?
                    newDirections.Очная[this.state.level].map((directions, index)=>{
                        return(
                            <FormItem key={index}>
                            {directions[Object.keys(directions)].map((direction, idx) =>{
                                return(
                                    <Radio key={idx} onChange={this.handleInputChange} name="specialty" value={direction['Название направления']}>{direction['Название направления']}</Radio>
                                )
                            })}
                        </FormItem>
                        )
                    })
                :null
                }
                <FormItem top="Группа">
                    <Input type="text" inputMode={'numeric'} name="group" className={!this.state.groupValid && this.state.group != '' ? 'red' : null}
                        autoСomplete="off"
                        value={this.state.group}
                        onChange={this.handleInputChange}
                        placeholder="000000" />
                </FormItem>
                <FormItem top="Живешь в общежитии">
                    <Select value={this.state.dorm}
                        onChange={this.handleInputChange}
                        name='dorm'
                        placeholder="Не выбрано"
                        options={[{ value: 'Yes', label: 'Да' }, { value: 'No', label: 'Нет' }]}
                        renderOption={({ option, ...restProps }) => (
                            <CustomSelectOption {...restProps} />
                        )}
                    />
                </FormItem>
                {(this.state.dorm != '') && (this.state.dorm != 'No') ?
                    <FormItem top="Номер общежития">
                        <Select value={this.state.dormnum}
                            onChange={this.handleInputChange}
                            name='dormnum'
                            placeholder="Не выбрано"
                            options={[{ value: '1', label: 'Общежитие номер 1' }, { value: '2', label: 'Общежитие номер 2' }, { value: '3', label: 'Общежитие номер 3' }, { value: '4', label: 'Общежитие номер 4' }, { value: '5', label: 'Общежитие номер 5' }, { value: '6', label: 'Общежитие номер 6' }, { value: '7', label: 'Общежитие номер 7' }, { value: '8', label: 'Общежитие номер 8' }, { value: '9', label: 'Общежитие номер 9' }, { value: '10', label: 'Общежитие номер 10' }]}
                            renderOption={({ option, ...restProps }) => (
                                <CustomSelectOption {...restProps} />
                            )}
                        />
                    </FormItem>
                    : null
                }
                <FormItem top="Номер студенческого(необязательно)">
                    <Input type="text" name="stud" inputMode={'numeric'} className={!this.state.studValid ? 'red' : null}
                        autoСomplete="off"
                        value={this.state.stud}
                        onChange={this.handleInputChange}
                        placeholder="0000-0000" />
                </FormItem>
                <FormItem top="Номер профбилета(необязательно)" style={{ marginBlockEnd: 70, writingMode: 'horizontal-tb' }}>
                    <Input type="text" inputMode={'numeric'} name="prof" className={!this.state.profValid ? 'red' : null}
                        autoСomplete="off"
                        value={this.state.prof}
                        onChange={this.handleInputChange}
                        placeholder="0000000000000000" />
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