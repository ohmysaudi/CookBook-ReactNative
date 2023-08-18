import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

class RecipesScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            category: {},
            searchKeyword: '',
            meals: [],
            isLoading: true
        };
    }




    render() {
        this.state.searchKeyword = this.props.route.params.searchKeyword == undefined ? '' : this.props.route.params.searchKeyword;
        this.state.category = this.props.route.params.category;
        const { category, meals, isLoading, searchKeyword } = this.state;


        return (
            <View style={{ flex: 1 }}>
                {(searchKeyword == '') ?
                    <Image
                        source={{
                            uri: category.strCategoryThumb,
                            cache: 'only-if-cached',
                        }}
                        style={{
                            opacity: 0.45,
                            top: -170,
                            right: -100,
                            aspectRatio: 1 / 0.90,
                            width: 400,
                            height: undefined,
                            borderRadius: 250,
                            resizeMode: 'cover',
                            alignSelf: 'flex-end'
                        }}
                    /> : <View />}


                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    }}>

                    <CustomList>
                        {(searchKeyword == '') ?
                            <View style={{
                                marginTop: 28,
                                width: "60%",
                                alignItems: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 40,
                            }}>
                                <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>{category.strCategory}</Text>
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontSize: 17,
                                        color: 'black'
                                    }}>{category.strCategoryDescription}</Text>

                            </View>
                            : <View style={{
                                marginTop: 28,
                                width: "60%",
                                alignItems: 'flex-start',
                                paddingHorizontal: 20,
                                paddingVertical: 40,
                            }}>
                                <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>Search:{"\n"}"{searchKeyword}"</Text>
                            </View>}
                        {isLoading ? <ActivityIndicator size='large' /> :
                            (
                                <View>
                                    <View>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                                            horizontal
                                            data={(meals.length >= 5) ? meals.slice(0, 5) : meals.slice(0, meals.length)}
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
                                            data={(meals.length > 5) ? meals.slice(5, meals.length) : 0}
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
                                                            <Text numberOfLines={3} ellipsizeMode='tail'>{(searchKeyword == '') ? category.strCategoryDescription : item.strInstructions}</Text>
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
                                </View>)}


                    </CustomList>
                </View>
            </View>
        );
    }


    async getMeal() {

        try {
            // fetching tranding meals
            const response = await fetch(
                (this.state.searchKeyword == '')
                    ? ('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + this.state.category.strCategory)
                    : ('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.state.searchKeyword));
            const json = await response.json();
            this.setState({ meals: json.meals });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {

        this.setState({ meals: [] });
        this.getMeal();

    }
}



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




export default RecipesScreen;