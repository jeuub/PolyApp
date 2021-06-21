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
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';

import '../css/AboutStudents.css'


class EditStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const group = localStorage.getItem('group');
        const stud = localStorage.getItem('stud');
        const prof = localStorage.getItem('prof');
        const dorm = localStorage.getItem('dorm');
        const year = localStorage.getItem('year');
        const specialty = localStorage.getItem('specialty');
        const dormnum = localStorage.getItem('dormnum');
        this.setState({ stud, group, year, dorm, prof, specialty, dormnum });
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
                this.state.profValid && this.state.studValid && (this.state.year !== '') &&
                (this.state.specialty !== '') && (this.state.dorm !== '') && (((this.state.dormnum !== '') && (this.state.dorm == 'Yes')) || (this.state.dorm == 'No'))
        });
    };
    toStorage = (event) => {
        const { year, specialty, group, dorm, stud, prof, dormnum } = this.state;
        localStorage.setItem('year', year);
        localStorage.setItem('specialty', specialty);
        localStorage.setItem('group', group);
        localStorage.setItem('dorm', dorm);
        localStorage.setItem('stud', stud);
        localStorage.setItem('prof', prof);
        localStorage.setItem('dormnum', dormnum);
        this.props.setActivePanel(event.currentTarget.dataset.to)
    };
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back} />}>PolyApp</PanelHeader>
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
                <FormItem top="Направление">
                    <Select name="specialty" value={this.state.specialty}
                        onChange={this.handleInputChange}
                        placeholder="Не выбрано"
                        options={[{ value: 'Информационная безопасность автоматизированных систем', label: 'Информационная безопасность автоматизированных систем' }, { value: 'Прикладная математика и информатика (Большие и открытые данные)', label: 'Прикладная математика и информатика (Большие и открытые данные)' }, { value: 'Веб-технологии', label: 'Веб-технологии' }, { value: 'Интеграция и программирование в САПР', label: 'Интеграция и программирование в САПР' }, { value: 'Программное обеспечение информационных систем', label: 'Программное обеспечение информационных систем' }, { value: 'Киберфизические системы', label: 'Киберфизические системы' }, { value: 'Большие и открытые данные', label: 'Большие и открытые данные' }, { value: 'Корпоративные информационные системы', label: 'Корпоративные информационные системы' }, { value: 'Информационная безопасность', label: 'Информационная безопасность' }]}
                        renderOption={({ option, ...restProps }) => (
                            <CustomSelectOption {...restProps} />
                        )}
                    />
                </FormItem>
                <FormItem top="Группа">
                    <Input type="text" inputMode={'numeric'} name="group" className={!this.state.groupValid && this.state.group != '' ? 'red' : null}
                        autocomplete="off"
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
                        autocomplete="off"
                        value={this.state.stud}
                        onChange={this.handleInputChange}
                        placeholder="0000-0000" />
                </FormItem>
                <FormItem top="Номер профбилета(необязательно)" style={{ marginBlockEnd: 70, writingMode: 'horizontal-tb' }}>
                    <Input type="text" inputMode={'numeric'} name="prof" className={!this.state.profValid ? 'red' : null}
                        autocomplete="off"
                        value={this.state.prof}
                        onChange={this.handleInputChange}
                        placeholder="0000000000000000" />
                </FormItem>
                <FixedLayout filled vertical="bottom">
                    <Div>
                        <Button type="submit" stretched size="l" mode="primary" disabled={!this.state.changed}
                            onClick={this.toStorage} data-to="home">Продолжить</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    }
}

export default EditStudent;