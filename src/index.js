/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Swiper from 'react-native-swiper';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataCategories: [],
      selectCatg: 0,
      dataFood: [],
    };
  }

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    const url = 'http://tutofox.com/foodapp/api.json';
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataBanner: responseJson.banner,
        dataCategories: responseJson.categories,
        dataFood: responseJson.food,
      });
    } catch (error) {
      console.log(`_getData error : ${error}`);
    }
  };

  _renderItem = item => {
    return (
      <TouchableOpacity
        style={[styles.divCategories, {backgroundColor: item.color}]}
        onPress={() => this.setState({selectCatg: item.id})}>
        <Image
          style={{width: 100, height: 80}}
          resizeMode="contain"
          source={{uri: item.image}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  _renderItemFood = item => {
    let catg = this.state.selectCatg;
    if (catg === 0 || catg === item.categorie) {
        return (
            <TouchableOpacity style={styles.divFood}>
                <Image
                style={styles.imageFood}
                resizeMode="contain"
                source={{uri: item.image}}
                />
                <View style={{height: ((width / 2) - 20) - 90, width: ((width / 2) - 20) - 10, backgroundColor: 'transparent'}} />
                <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>{item.name}</Text>
                <Text>Describes Food and Details </Text>
                <Text style={{fontSize: 20, color: 'green'}}>${item.price}</Text>
            </TouchableOpacity>
        )
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
          <View style={{width: width, alignItems: 'center'}}>
            <Image
              style={{height: 60, width: width / 2, margin: 10}}
              resizeMode="contain"
              source={{uri: 'http://tutofox.com/foodapp/foodapp.png'}}
            />
            <Swiper
              style={{height: width / 2}}
              showsButtons={false}
              autoplay={true}
              key={this.state.dataBanner.length} // swiper khong hoat dong thi xai cai nay
              autoplayTimeout={2}>
              {this.state.dataBanner.map(itembann => {
                return (
                  <Image
                    style={styles.imageBanner}
                    resizeMode="contain"
                    source={{uri: itembann}}
                  />
                );
              })}
            </Swiper>
            <View
              style={{
                width: width,
                borderRadius: 20,
                paddingVertical: 20,
                backgroundColor: 'white',
              }}>
              <Text style={styles.titleCatg}>
                Categories {this.state.selectCatg}
              </Text>
              <FlatList
                horizontal={true}
                data={this.state.dataCategories}
                renderItem={({item}) => this._renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
              />
              <FlatList
                data={this.state.dataFood}
                numColumns={2}
                renderItem={({item}) => this._renderItemFood(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {/* <Text>{JSON.stringify(this.state.dataFood)}</Text> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  divCategories: {
    backgroundColor: 'red',
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  imageFood: {
    width: ((width / 2) - 20) - 10,
    height: ((width / 2) - 20) - 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  divFood: {
    width: (width / 2) - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: 'white',
  },
});
