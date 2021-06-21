import React, {Component} from 'react';
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
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import { Icon36HomeOutline } from '@vkontakte/icons';
import { Icon28BookOutline } from '@vkontakte/icons';
import { Icon56SchoolOutline } from '@vkontakte/icons';
import { Icon28LightbulbStarOutline } from '@vkontakte/icons';

import '../css/Questions.css'

class Questions extends Component {
    constructor (props) {
        super(props);
        this.state = {
            category: ''
        }
      }
    componentDidMount = () =>{
        localStorage.removeItem('category');
    }
    onClick = (cat) => (event) => {
        this.props.updateData(cat);
        this.props.go(event);
    }
  render () {
    return (
        <Panel id={this.props.id}> 
            <PanelHeader>PolyApp</PanelHeader>
            <Group>
                <Div>
                    <Caption style={{ fontSize:18  }} className="captionCaps" level="1" weight="semibold" caps >Категории вопросов</Caption>
                </Div>
                <CardGrid size="m" style={{marginBlockEnd: 70}}>
                    <Card className='card'  onClick={this.onClick('dorms')}  data-to="questions-list">
                        <Icon36HomeOutline  className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10, fontSize:18 }}>Общежития</Caption>
                    </Card>
                    <Card className='card' onClick={this.onClick('study')} data-to="questions-list">
                        <Icon28BookOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10, fontSize:18  }}>Учёба</Caption>
                    </Card>
                    <Card className='card' onClick={this.onClick('buildings')} data-to="questions-list">
                        <Icon56SchoolOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10 , fontSize:18 }}>Корпуса</Caption>
                    </Card>
                    <Card className='card' onClick={this.onClick('PD')} data-to="questions-list">
                        <Icon28LightbulbStarOutline className="icon"/>
                        <Caption level="1" weight="semibold" caps style={{ marginTop: 10, fontSize:18  }}>ПД</Caption>
                    </Card>
                </CardGrid>
            </Group>
            <FixedLayout filled vertical="bottom">
                <Tabbar className='tabbar-padding'>
                    <TabbarItem text="Вопросы" selected>
                        <Icon28InfoCircleOutline/>
                    </TabbarItem>
                    <TabbarItem text="Календарь" onClick={e=>this.props.setActiveModal(this.props.MODAL_CARD_THREE)}>
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

Questions.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
  };

export default Questions;