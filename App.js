import React, { Component } from 'react';
import { 
  ActivityIndicator,
  AlertIOS,
  AppRegistry,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import * as firebase from 'firebase';

// Initialize Fierbase
const firebaseConfig = {
  apiKey: "AIzaSyDD3_mrigRWfV6rhom14aoT9IKY5jSiVkM",
  authDomain: "eatwhere-bffbb.firebaseapp.com",
  databaseURL: "https://eatwhere-bffbb.firebaseio.com",
  projectId: "eatwhere-bffbb",
  storageBucket: "eatwhere-bffbb.appspot.com",
  messagingSenderId: "170428892641"
}

firebase.initializeApp(firebaseConfig);

export default class Eateries extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebase.database().ref('eateries');
    this.state = {
      isLoading: false,
      listData: []
    }
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        listData: items
      });

    });
  }

  _onPressButton() {
    AlertIOS.prompt(
      'Add an Eatery',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ name: text })
          }
        },
      ],
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    let DataArray = Object.values(this.state.listData);
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.top}></View>
        <FlatList
          style={{flex: 1}}
          data={DataArray}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.button}
            onPress={this._onPressButton.bind(this)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
        <TextInput 
          style={styles.where}
          placeholder="Where will you eat today?"
          onChangeText={(text) => this.setState({text})}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 22, fontWeight: 'bold', color: 'white'
  },
  buttonContainer: {
    margin: 20,
    height: 44,
    backgroundColor: '#6495ED',
  },
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'cornsilk',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  top: {
    height: 100,
  },
  where: {
    height: 100,
    fontSize: 30,
    backgroundColor: 'bisque',
    textAlign: 'center'
  },
  item: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('EatWhere', () => Eateries);
