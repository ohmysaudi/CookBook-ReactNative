import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, ActivityIndicator } from 'react-native';

class DetailsScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: true
        };
        this.state.data = this.props.route.params.selectedItem;

    }



    render() {
        if (this.state.data.strInstructions != undefined) {
            this.state.isLoading = false;
        }
        let ingredients = [];
        const { data, isLoading } = this.state;

        for (let i = 1; i <= 20; i++) {

            if (data['strIngredient' + (i)] != "" && data['strMeasure' + (i)] != "") {
                let ingr = {};
                ingr.ingredient = data['strIngredient' + (i)];
                ingr.measure = data['strMeasure' + (i)];
                ingredients.push(ingr);
            }
        }

        return (
            ((isLoading) ? <View style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="large" />
            </View> :
                <CustomList>
                    <View >
                        <Image
                            source={{
                                uri: data.strMealThumb,
                                cache: 'only-if-cached',
                            }}
                            style={{ width: '100%', height: undefined, aspectRatio: 1.1 }}
                        />
                        <View style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'white',
                            height: 30,
                            alignSelf: 'flex-end',
                            borderTopStartRadius: 30,
                            borderTopEndRadius: 30
                        }} />
                    </View>
                    <View style={{
                        paddingHorizontal: 20
                    }}>
                        <Text
                            style={{
                                fontSize: 24,
                                color: 'black'
                            }}>{data.strMeal}</Text>
                        <Text style={{
                            fontSize: 16
                        }}>Category: {data.strCategory}</Text>
                        <Text style={{
                            fontSize: 16
                        }}>Tags: {data.strTags}</Text>
                    </View>
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                            horizontal
                            data={ingredients}
                            renderItem={({ item }) =>
                                <View style={{
                                    width: 150,
                                    paddingVertical: 5,
                                    paddingHorizontal: 2,
                                    borderColor: '#C5C5C5',
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    marginHorizontal: 6,
                                    alignItems: 'center',
                                }}>
                                    <Text numberOfLines={1}>{item.ingredient}</Text>
                                    <Text numberOfLines={1}>{item.measure}</Text>
                                </View>
                            }
                        />
                    </View>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text
                            style={{
                                fontSize: 21,
                                color: 'black'
                            }}>Instructions:</Text>
                        <Text style={{ fontSize: 16 }}>{data.strInstructions}</Text>
                    </View>

                </CustomList>)
        );
        
    }

    async getMeal(id) {

        try {
            // fetching tranding meals
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
            const json = await response.json();
            this.setState({ data: json.meals[0] });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        if (this.state.data.strInstructions == undefined)
        this.getMeal(this.state.data.idMeal);
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

export default DetailsScreen;