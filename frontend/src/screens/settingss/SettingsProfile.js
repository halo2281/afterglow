import React , { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem,  Icon } from 'react-native-elements'


export default class SettingsProfile extends Component {

    render () {

        return (

            <View>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 30 }}
                >여기는 공지사항 입니다</Text>
                <Card.Divider/>
                <Text>글을 적어봅시다</Text>
            </View>

        )
    }


}