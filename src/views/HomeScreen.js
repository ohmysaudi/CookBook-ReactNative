import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, FlatList, TouchableOpacity, TextInput, SafeAreaView, StatusBar, ScrollView, LogBox, VirtualizedList, TouchableNativeFeedback } from 'react-native';
import { SearchBar } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';



class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mealCategories: [],
            trandingMeals: [],
            isLoading: true
        };
    }





    render() {
        const { mealCategories, trandingMeals, isLoading } = this.state;
        let searchKeyword = '';
        let textInput;

        const searchFilterFunction = (text) => {
            searchKeyword = text;
        }

        return (

            isLoading ?
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <ActivityIndicator size="large" />
                </View> :
                <CustomList>

                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <CustomList>
                        <View
                            style={{
                                marginTop: 28,
                                paddingHorizontal: 20,
                                paddingVertical: 40
                            }}>


                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    color: 'black'
                                }}>Cook Book</Text>
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: 'black'
                                }}>Looking for your favoutie meal</Text>


                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: '#F0EEEE',
                                    borderRadius: 30,
                                    height: 60,
                                    justifyContent: 'center',
                                    marginHorizontal: 20,
                                    paddingHorizontal: 16
                                }}>
                                <TextInput
                                    ref={input => { this.textInput = input }}
                                    style={{ fontSize: 20, fontWeight: '600' }}
                                    onChangeText={(text) => searchFilterFunction(text)}
                                    underlineColorAndroid="transparent"
                                    placeholder="Search"
                                />

                            </View>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('#00000040', false)}
                                useForeground={true}
                                onPress={() => {
                                    if (searchKeyword == '') return;
                                    this.props.navigation.navigate('Resipes', { searchKeyword: searchKeyword })
                                    this.textInput.clear();
                                }}>


                                <View
                                    style={{
                                        overflow: 'hidden',
                                        backgroundColor: '#FC6474',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderTopLeftRadius: 30,
                                        borderBottomLeftRadius: 30,
                                        height: 60, width: 70
                                    }}>
                                    <Icon name='search-outline' size={30} color='white' />
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                        <View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                                horizontal
                                data={mealCategories}
                                renderItem={({ item }) =>
                                    <TouchableNativeFeedback
                                        background={TouchableNativeFeedback.Ripple('#00000040', false)}
                                        useForeground={true}
                                        onPress={() => this.props.navigation.navigate('Resipes', { category: item })}>
                                        <View style={{
                                            overflow: 'hidden',
                                            borderRadius: 12,
                                            margin: 4,
                                            justifyContent: 'flex-end',
                                        }}>
                                            <Image
                                                source={{
                                                    uri: item.strCategoryThumb,
                                                    cache: 'only-if-cached',
                                                }}
                                                style={{ width: 70, height: 70 }}
                                            />


                                            <View style={{
                                                position: 'absolute',
                                                alignItems: 'center',
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: 'rgba(00, 00, 00, 0.45)'
                                            }}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'white' }}>{item.strCategory}</Text>
                                            </View>

                                        </View>
                                    </TouchableNativeFeedback>
                                }
                            />
                        </View>
                        
                        <View>
                            <Text style={{ paddingHorizontal: 20, fontSize: 24, color: "black", fontWeight: '500' }}>Tranding</Text>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                                horizontal
                                data={trandingMeals.slice(0, 5)}
                                keyExtractor={item => item.idMeal}
                                renderItem={({ item }) =>
                                    <TouchableNativeFeedback
                                        background={TouchableNativeFeedback.Ripple('#00000040', false)}
                                        useForeground={true}
                                        onPress={() => this.props.navigation.navigate('Details', { selectedItem: item })}>

                                        <View style={{
                                            overflow: 'hidden',
                                            borderRadius: 24,
                                            margin: 4,
                                            justifyContent: 'flex-end',
                                        }}>
                                            <Image
                                                source={{
                                                    uri: item.strMealThumb,
                                                    cache: 'only-if-cached',
                                                }}
                                                style={{ width: 180, height: 180 }}
                                            />


                                            <View style={{
                                                position: 'absolute',
                                                alignItems: 'flex-start',
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: 'rgba(00, 00, 00, 0.45)'
                                            }}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'white', paddingHorizontal: 20, paddingVertical: 5 }}>{item.strMeal}</Text>
                                            </View>

                                        </View>
                                    </TouchableNativeFeedback>
                                }
                            />
                        </View>

                        <View style={{ paddingBottom: 20 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                paddingHorizontal={20}
                                contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                                data={trandingMeals.slice(5, 10)}
                                renderItem={({ item }) =>
                                    <TouchableNativeFeedback
                                        background={TouchableNativeFeedback.Ripple('#00000040', false)}
                                        useForeground={true}
                                        onPress={() => this.props.navigation.navigate('Details', { selectedItem: item })}>
                                        <View style={{
                                            elevation: 2,
                                            width: "100%",
                                            overflow: 'hidden',

                                            flexDirection: 'row',
                                            borderRadius: 24,
                                            margin: 4,
                                            backgroundColor: 'white'
                                        }}>
                                            <View style={{ flex: 1, padding: 16 }}>
                                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 21, fontWeight: 'bold', color: 'black' }}>{item.strMeal}</Text>
                                                <Text numberOfLines={3} ellipsizeMode='tail'>{item.strInstructions}</Text>
                                            </View>
                                            <View style={{ borderRadius: 24, overflow: 'hidden' }}>
                                                <Image
                                                    source={{
                                                        uri: item.strMealThumb,
                                                        cache: 'only-if-cached',
                                                    }}
                                                    style={{ width: 140, height: 140 }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                }
                            />
                        </View>
                    </CustomList>
                </CustomList >
        );
    }







    async getRandomMeal() {
        let tempTrandingMeals = [];
        try {
            // fetching categories
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const json = await response.json();
            this.setState({ mealCategories: json.categories });
            // fetching tranding meals
            for (let i = 0; i < 10; i++) {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const json = await response.json();
                tempTrandingMeals.push(json.meals[0])
            }
            this.setState({ trandingMeals: [...new Set(tempTrandingMeals)] });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }


    componentDidMount() {

        this.setState({ mealCategories: [], trandingMeals: [] });
        this.getRandomMeal();
    }

}
const Item = ({ title }) => (
    <View >
        <Text >{title}</Text>
    </View>
);

const CustomList = ({ children }) => {
    return (
        <FlatList
            data={[]}
            keyExtractor={() => "key"}
            renderItem={null}
            ListHeaderComponent={
                <>{children}</>
            }
        />
    )
}

export default HomeScreen;