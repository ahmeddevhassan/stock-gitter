import React, { Component } from 'react';
import { images } from '../../../assets/';
import { Text, View, Image } from 'react-native';
import CardItemList from '../CardComponent/index'
import { CardItem, Thumbnail, Card, Icon, Left, Body, Right } from 'native-base';

const NotificationView = (props) => {
  return (
    <Card>
      <CardItem >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ marginRight: 5 }}>
              <Image source={images.notificationPoint} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
            </View>
            <Body>
              <Text style={{ margin: 5, fontWeight: 'bold', fontSize: 16 }}>{props.obj.message} </Text>
              <Text style={{ margin: 5, fontWeight: 'bold', fontSize: 14 }}>{props.obj.notifiable_type}  </Text>
            </Body>
          </View>
        </View>
      </CardItem >
    </Card>
  )

}

export {
  NotificationView,
};