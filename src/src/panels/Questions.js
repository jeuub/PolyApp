import React, {Component} from 'react';

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
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import { Icon36HomeOutline } from '@vkontakte/icons';
import { Icon28BookOutline } from '@vkontakte/icons';
import { Icon56SchoolOutline } from '@vkontakte/icons';
import { Icon28LightbulbStarOutline } from '@vkontakte/icons';

import '../css/Questions.css'

class Questions extends Component {
  render () {
    return (
        <Panel id={this.props.id}> 
            <PanelHeader>PolyApp</PanelHeader>
            <Group>
                <Div>
                    <Caption className="captionCaps" level="1" weight="semibold" caps >Категории вопросов</Caption>
                </Div>
                <CardGrid size="m">
                    <Card className='card' onClick={this.props.go} data-to="start">
                        <Icon36HomeOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10 }}>Общежития</Caption>
                    </Card>
                    <Card className='card' onClick={this.props.go} data-to="start">
                        <Icon28BookOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10 }}>Учёба</Caption>
                    </Card>
                    <Card className='card' onClick={this.props.go} data-to="start">
                        <Icon56SchoolOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10 }}>Корпуса</Caption>
                    </Card>
                    <Card className='card' onClick={this.props.go} data-to="start">
                        <Icon28LightbulbStarOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10 }}>ПД</Caption>
                    </Card>
                </CardGrid>
            </Group>
            <FixedLayout filled vertical="bottom">
                <Tabbar className='tabbar-padding'>
                    <TabbarItem text="Вопросы" selected>
                        <Icon28InfoCircleOutline/>
                    </TabbarItem>
                    <TabbarItem text="Календарь" onClick={this.props.go} data-to="start">
                        <Icon28CalendarOutline />
                    </TabbarItem>
                    <TabbarItem text="Профиль" onClick={this.props.go} data-to="home">
                        <Icon28UserCircleOutline/>
                    </TabbarItem>
                </Tabbar>
            </FixedLayout>
        </Panel>   
    )
  }
}

export default Questions;