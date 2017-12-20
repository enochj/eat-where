import React, { Component } from 'react';
import { 
  Alert,
  AppRegistry,
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class LotsOfStyles extends Component {
    _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.top}></View>
        <FlatList
          style={{flex: 1}}
          data={[
            {key: 'Tanyas Soup Kitchen'},
            {key: 'Anchor'},
            {key: 'Dempseys'},
            {key: 'Picassos'},
            {key: 'Little Saigon'},
            {key: 'Uno Mas'},
            {key: 'Flying Stove'},
            {key: 'Caesars Palace'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Add Place"
            color="#841584"
          />
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
  buttonContainer: {
    margin: 20
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
AppRegistry.registerComponent('AwesomeProject', () => LotsOfStyles);
