import React, { Component } from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import { Cell } from '@vkontakte/vkui/dist/components/Cell/Cell';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import '../css/PickDirections_v2.css';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import { PanelHeaderBack } from '@vkontakte/vkui';

import '../css/aboutDirection.css';

class AboutDirection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interestedDirection: ''
        }
    }
    componentDidMount = () => {
        this.setState({ interestedDirection: JSON.parse(localStorage.getItem('interestedDirection')) })
        
    }
    createMarkup = (text) => {
        return { __html: text };
      }
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back} />}>PolyApp</PanelHeader>
                <Title style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: 16, background: 'var(--content_tint_background)', borderRadius: 7, fontSize: '1.2rem', textAlign: 'center' }}>
                    {this.state.interestedDirection['Название направления']}
                </Title>
                <Title level='2' weight="regular" style={{ marginLeft: 16, marginRight: 16, marginTop: 16, padding: '16 0 16 0', borderRadius: 7, textAlign: 'left', color: 'var(--text-primary)' }}>
                    о направлении:
		</Title>
                <List>
                    <Cell indicator={this.state.interestedDirection['Код направления']}>Код</Cell>
                    <Cell indicator={this.state.interestedDirection['Срок обучения']}>Срок обучения</Cell>
                    <Cell indicator={this.state.interestedDirection['Бюджетных мест']}>Бюджетных мест</Cell>
                    <Cell indicator={this.state.interestedDirection['Платных мест']}>Платных мест</Cell>
                </List>
                <Text weight="medium" style={{ marginBottom: 16, padding: 16, marginBlockEnd: 70}} dangerouslySetInnerHTML={this.createMarkup(this.state.interestedDirection['Описание'])}></Text>
                <FixedLayout filled vertical="bottom">
                <Div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center!important' }}>
                    <Link style={{width: '100%', textAlign: 'center', color:"var(--button_primary_foreground)", 
                    background:"var(--button_primary_background)", borderRadius:8, minHeight:44, display: "flex", justifyContent: "center", alignItems: "center", fontWeight:"500"}} 
                    href={this.state.interestedDirection['Подробнее']} target="_blank"> Подробнее</Link>
                    </Div>
                </FixedLayout>
            </Panel>
        )
    };
}

export default AboutDirection;