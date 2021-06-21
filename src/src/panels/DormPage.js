import React, { Component } from 'react';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import '../css/PickDirections_v2.css';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import { Gallery, Group, PanelHeaderBack } from '@vkontakte/vkui';
let dorms = require('../json/dorms.json');
import '../css/dorm.css';

class DormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    createMarkup = (text) => {
      return {__html: text};
    }
    goNextPageHandler = () => { 
      this.props.dorm ===  dorms['Общежития'].length -1 ? this.props.setdorm(0) :this.props.setdorm(this.props.dorm +1 );
    }
    goBackPageHandler = () =>{
      this.props.dorm === 0 ?this.props.setdorm(dorms['Общежития'].length -1 ) : this.props.setdorm(this.props.dorm -1 );
    }
    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderBack onClick={this.props.back} />}>PolyApp</PanelHeader>
                <Title level="1" weight="regular" className="dorm__title">Общежитие {dorms.Общежития[`${this.props.dorm}`].Номер} </Title>
                <Group>
                <Gallery
                  slideWidth="90%"
                  style={{ height: 300 }}
                  bullets="dark"
                  showArrows={true}
                  isDraggable={true}
                >
                  {
                dorms.Общежития[this.props.dorm].Фотографии.map((photo,index)=>{
                  console.log(photo)
                  return (
                    <div style={{backgroundImage: `url(${photo})`, backgroundSize: 'cover'}} key={index}/>
                  )
                })
              }
                </Gallery>
              </Group>
            <Div style={{margin:'0 16px 8px 16px', lineHeight:'1.4rem', marginBlockEnd: 70}}>
                <Text dangerouslySetInnerHTML={this.createMarkup(dorms.Общежития[this.props.dorm].Описание)} />
               </Div>
               <FixedLayout filled vertical="bottom">
                <Div style={{display: "flex", justifyContent: "space-between"}}>
                  <Button  style={{width: "40%"}} size="l"  onClick={this.goBackPageHandler} data-to="choosed-directions-info">Предыдущее</Button>
                  <Button  style={{width: "40%"}} size="l"  onClick={this.goNextPageHandler} data-to="choosed-directions-info">Следующее</Button>
                </Div>
              </FixedLayout>
            </Panel>
        )
    };
}

export default DormPage;