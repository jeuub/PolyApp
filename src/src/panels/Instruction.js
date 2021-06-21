import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28UserCircleOutline } from '@vkontakte/icons';
import { Icon28CalendarOutline } from '@vkontakte/icons';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import { PanelHeaderBack } from '@vkontakte/vkui';
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import { Icon36HomeOutline } from '@vkontakte/icons';
import { Icon28BookOutline } from '@vkontakte/icons';
import { Icon56SchoolOutline } from '@vkontakte/icons';
import { Icon28LightbulbStarOutline } from '@vkontakte/icons';
import { Link } from '@vkontakte/vkui';

import '../css/question.css'

class Instruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ''
        }
    }
    createMarkup = (text) => {
        return { __html: text };
      }
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back} />}>PolyApp</PanelHeader>
                <Div>
                    {this.props.category == 'dorms' ? <Icon36HomeOutline className="instruction__icon" /> : null}
                    {this.props.category == 'study' ? <Icon28BookOutline className="instruction__icon" /> : null}
                    {this.props.category == 'buildings' ? <Icon56SchoolOutline className="instruction__icon" /> : null}
                    {this.props.category == 'PD' ? <Icon28LightbulbStarOutline className="instruction__icon" /> : null}
                    <Title style={{ marginTop: 10, textAlign: 'center' }} level="2" weight="medium">{this.props.question.question}</Title>
                </Div>
                <Group className="group-about" style={{marginBottom:130}}>
                    <Div style={{paddingBlockEnd:0}}><Headline weight="regular" dangerouslySetInnerHTML={this.createMarkup(this.props.question.instruction)}></Headline></Div>
                    {this.props.question.links.length !== 0 ? <Header className='heading' style={{padding:0}} mode="secondary">Полезные ссылки</Header> : null}
                        {this.props.question.links !== 0 &&
                            this.props.question.links.map((link, index) => {
                                return (
                                    <Div style={{paddingBlockEnd:0, paddingBlockStart: 0}}><Link key={index} className='link-instruction' href={link.href} target="_blank">{link.name}</Link></Div>
                                )
                            }
                            )
                        }
                    
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

Instruction.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
};

export default Instruction;