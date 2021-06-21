import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CalendarOutline } from '@vkontakte/icons';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import { PanelHeaderBack } from '@vkontakte/vkui';

import RenderQuestions from '../components/RenderQuestions';

class QuestionsList extends Component {
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back}/>}>PolyApp</PanelHeader>
                <Group>
                    <RenderQuestions go={this.props.go} updateQuestion={this.props.updateQuestion} category={this.props.category}/>
                </Group>
                <FixedLayout filled vertical="bottom">
                    <Tabbar className='tabbar-padding'>
                        <TabbarItem selected text="Вопросы" onClick={this.props.go} data-to="questions">
                            <Icon28InfoCircleOutline />
                        </TabbarItem>
                        <TabbarItem text="Календарь">
                            <Icon28CalendarOutline />
                        </TabbarItem>
                        <TabbarItem text="Профиль" onClick={this.props.go} data-to="home">
                            <Icon28UserCircleOutline />
                        </TabbarItem>
                    </Tabbar>
                </FixedLayout>
            </Panel>
        )
    }
}

QuestionsList.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    updateQuestion: PropTypes.func.isRequired
};

export default QuestionsList;