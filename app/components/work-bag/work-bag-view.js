import React, { Component } from 'react';
import { images } from '../../../assets';
import { Text, View } from 'react-native';
import CardItemList from '../CardComponent/index'
import { CardItem, Thumbnail, Card, Icon, Left, Body, Right } from 'native-base';


const WorkBagView = (props) => {

  return (
    <Card>
      <CardItem >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ marginRight: 5 }}>
              <Thumbnail source={{ uri: props.arr.order_item.item_image }} square large={true} />
            </View>
            <Body>
              <Text style={{ margin: 5, fontWeight: 'bold' }}>WORKBAG # {props.arr.number}  </Text>
            </Body>
          </View>
          <CardItemList title="Workbag Status" value={props.arr.current_status.split('_').join(" ")} />
          <CardItemList title="Order no" value={props.arr.order.number} />
          <CardItemList title="Quantity" value={props.arr.order_item.quantity} />
          <CardItemList title="Product SKU" value={props.arr.order_item.sku} />
        </View>
      </CardItem >
    </Card>
  )
}
const WorkBagViewDetail = (props) => {
  return (
    <Card>
      <CardItem >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ marginRight: 5 }}>
              <Thumbnail source={{ uri: props.data.order_item.item_image }} />
            </View>
            <Body>
              <Text style={{ margin: 5, fontWeight: 'bold' }}>WORKBAG # {props.data.number}  </Text>
            </Body>
          </View>
          <CardItemList title="Workbag Status" value={props.data.current_status} />
          <CardItemList title="Order no" value={props.data.order.number} />
          <CardItemList title="Quantity" value={props.data.order_item.quantity} />
          <CardItemList title="Product SKU" value={props.data.order_item.sku} />
          <CardItemList title="Product Name" value={props.data.order_item.product_name} />
        </View>
      </CardItem>
    </Card>
  )

}

export {
  WorkBagView,
  WorkBagViewDetail
};