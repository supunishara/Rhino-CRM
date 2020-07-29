import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import Metrics from '../../Config/Metrics';
import AppStyles from '../../Config/AppStyles';


//default Card types
// 1. Contact-List = A Card just like Contact Screen

export default class Card extends Component {
  //render the inside View
  
  renderView = () => {
    const {type, item, onPress} = this.props;
    console.log("item===============>",item);
    switch (type) {
      case 'Contact-List':
        return (
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {onPress()}}>
            <View style={styles.contactLeftSide}>
                <Text>{item.title} {item.full_name}</Text>
                <View style={{flexDirection:'row'}}>
                  {item.designation == null ? null : <Text style={styles.titleText}>{item.designation}, </Text>}
                  <Text style={styles.titleText}>{item.business_name}</Text>
                </View>
                {item.city == null ? <Text style={styles.titleText}>-</Text> : <Text style={styles.titleText}>{item.city}</Text>}
                
            </View>
            {/* <View style={styles.contactRightSide}>
                
            </View> */}
          </TouchableOpacity>
        );
        break;
      case  'Leads-List':
        return(
          <TouchableOpacity
            style={styles.LeadsListContainer}
            onPress={() => {onPress()}}>
                {/* <View style={styles.leadLeftSide}><Text>{item.title} {item.first_name}{item.last_name}</Text></View>
                <View style={styles.leadRightSide}></View> */}
                <View style={styles.contactLeftSide}>
                  {item.contact ? <Text style={styles.titleText}>{item.contact.title} {item.contact.first_name} {item.contact.last_name}</Text> : null}
                   
                  {item.source ? <Text style={styles.titleText}>{item.source}</Text> : <Text style={styles.titleText}>-</Text>}
                  {item.quality ? <Text style={styles.titleText}>{item.quality} </Text> : <Text style={styles.titleText}>-</Text>} 
                  {item.value ? <Text style={styles.titleText}>{item.value}</Text>  : <Text style={styles.titleText}>-</Text>}
                  {item.stage ? <Text style={styles.titleText}>{item.stage} </Text>   : <Text style={styles.titleText}>-</Text>}
                </View>
          </TouchableOpacity>
        );
        break;
      case 'Company-List':
        return(
          <TouchableOpacity
            style={styles.LeadsListContainer}
            onPress={() => {onPress()}}>
                {/* <View style={styles.leadLeftSide}><Text>{item.title} {item.first_name}{item.last_name}</Text></View>
                <View style={styles.leadRightSide}></View> */}
                <View style={styles.contactLeftSide}>
                  <Text style={styles.titleText}>{item.title} {item.first_name}{item.last_name}</Text> 
                  {item.business_name ? <Text style={styles.titleText}>{item.business_name}, {item.registered_address}</Text> : <Text style={styles.titleText}>-</Text>}
                  {item.firstname ? <Text style={styles.titleText}>{item.firstname} </Text> : <Text style={styles.titleText}>-</Text>} 
                </View>
          </TouchableOpacity>
        );
        break;
      
      case 'Project-List':
        return(
          <TouchableOpacity
            style={styles.LeadsListContainer}
            onPress={() => {onPress()}}>
                {/* <View style={styles.leadLeftSide}><Text>{item.title} {item.first_name}{item.last_name}</Text></View>
                <View style={styles.leadRightSide}></View> */}
                <View style={styles.contactLeftSide}>
                  {item.project_name ? <Text style={styles.titleText}>{item.project_name} </Text> : <Text style={styles.titleText}>-</Text>} 
                  {item.address ? <Text style={styles.titleText}>{item.address} </Text> : <Text style={styles.titleText}>-</Text>} 
                </View>
          </TouchableOpacity>
        );
    }
  };

  render() {
    return <View>{this.renderView()}</View>;
  }
}
//
const styles = StyleSheet.create({
  Container: {
    // height: Metrics.CARD_HEIGHT,
    width: Metrics.DEVICE_WIDTH -30,
    borderWidth:0.9,
    borderColor: AppStyles.colorGray,
    marginBottom:10,
    borderRadius: Metrics.BORDER_RADIUS,
    flexDirection:'row'
  },
  LeadsListContainer:{
    width: Metrics.DEVICE_WIDTH -30,
    borderWidth:0.9,
    borderColor: AppStyles.colorGray,
    marginBottom:10,
    borderRadius: Metrics.BORDER_RADIUS,
    flexDirection:'row',
    alignItems:'center'
  },
  contactLeftSide:{
    paddingLeft: 10,
    justifyContent:'center',
    marginTop:10,
    marginBottom:20,
  },
  contactRightSide:{
    flex:1,
    paddingRight: 10,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  titleText:{
      marginTop:7
  },
  upperTextContainer:{
    justifyContent:'center',
    flexDirection:'row',
    width: Metrics.DEVICE_WIDTH -30,
    height:25,
    backgroundColor:'red'
  },
  leadLeftSide:{
    flex:5,
    paddingLeft: 10,
    justifyContent:'center',
    backgroundColor:'yellow',
  },
  leadRightSide:{
    flex:3,
    paddingRight: 10,
    justifyContent:'center',
    alignItems:'flex-end',
    backgroundColor:'red',
  },
});
