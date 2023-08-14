import * as React from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {
    baseImagePath,
    nowPlayingMovies,
    popularMovies,
    upcomingMovies
} from '../api/apicall';
import CategoryHeader from '../components/CategoryHeader';
import InputHeader from '../components/InputHeader';
import MovieCard from '../components/MovieCard';
import SubMovieCard from '../components/SubMovieCard';
import { COLORS, SPACING } from '../theme/theme';
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {

    const [nowPlayingMoviesList, setNowPlayingMoviesList] = React.useState<any>(
        [],
    );
    const [popularMoviesList, setPopularMoviesList] = React.useState<any>([]);
    const [upcomingMoviesList, setUpcomingMoviesList] = React.useState<any>([]);

    const getUpcomingMoviesList = async () => {
        try {
            let response = await fetch(upcomingMovies);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(
                ' Something went wrong in getUpcomingMoviesList Function',
                error,
            );
        }
    };

    const getPopularMoviesList = async () => {
        try {
            let response = await fetch(popularMovies);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(
                ' Something went wrong in getPopularMoviesList Function',
                error,
            );
        }
    };

    const getNowPlayingMoviesList = async () => {
        try {
            let response = await fetch(nowPlayingMovies);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(
                ' Something went wrong in getNowPlayingMoviesList Function',
                error,
            );
        }
    };


    React.useEffect(() => {
        (async () => {
            let tempNowPlaying = await getNowPlayingMoviesList();
            setNowPlayingMoviesList([
                { id: 'dummy1' },
                ...tempNowPlaying.results,
                { id: 'dummy2' },
            ]);

            let tempPopular = await getPopularMoviesList();
            setPopularMoviesList(tempPopular.results);

            let tempUpcoming = await getUpcomingMoviesList();
            setUpcomingMoviesList(tempUpcoming.results);
            console.log(upcomingMoviesList)
        })();
    }, [])

    const searchMoviesFunction = () => {
        navigation.navigate('Search');
    };

    if (false) {
        return (
            <ScrollView
                style={styles.container}
                bounces={false}
                contentContainerStyle={styles.scrollViewContainer}>
                <StatusBar hidden />

                <View style={styles.InputHeaderContainer}>
                    <InputHeader searchFunction={searchMoviesFunction} />
                </View>

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.Orange} />
                </View>
            </ScrollView>

        );
    }

    return <ScrollView style={styles.container} bounces={false}>

        <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <CategoryHeader title={'Now Playing'} />
        <FlatList
            data={nowPlayingMoviesList}
            keyExtractor={(item: any) => item.id}
            bounces={false}
            snapToInterval={width * 0.7 + SPACING.space_36}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => {
                if (!item.original_title) {
                    return (
                        <View
                            style={{
                                width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                            }}></View>
                    );
                }
                return (
                    <MovieCard
                        shoudlMarginatedAtEnd={true}
                        cardFunction={() => {
                            navigation.push('MovieDetails', { movieid: item.id });
                        }}
                        cardWidth={width * 0.7}
                        isFirst={index == 0 ? true : false}
                        isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                        title={item.original_title}
                        imagePath={baseImagePath('w780', item.poster_path)}
                        genre={item.genre_ids.slice(1, 4)}
                        vote_average={item.vote_average}
                        vote_count={item.vote_count}
                    />
                );
            }}
        />
        <CategoryHeader title={'Popular'} />
        <FlatList
            data={popularMoviesList}
            keyExtractor={(item: any) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => (
                <SubMovieCard
                    shoudlMarginatedAtEnd={true}
                    cardFunction={() => {
                        navigation.push('MovieDetails', { movieid: item.id });
                    }}
                    cardWidth={width / 3}
                    isFirst={index == 0 ? true : false}
                    isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                    title={item.original_title}
                    imagePath={baseImagePath('w342', item.poster_path)}
                />
            )}
        />
        <CategoryHeader title={'Upcoming'} />
        <FlatList
            data={upcomingMoviesList}
            keyExtractor={(item: any) => item.id}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => (
                <SubMovieCard
                    shoudlMarginatedAtEnd={true}
                    cardFunction={() => {
                        navigation.push('MovieDetails', { movieid: item.id });
                    }}
                    cardWidth={width / 3}
                    isFirst={index == 0 ? true : false}
                    isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                    title={item.original_title}
                    imagePath={baseImagePath('w342', item.poster_path)}
                />
            )}
        />

    </ScrollView>

};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: COLORS.Black,
    },
    scrollViewContainer: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_28
    },
    containerGap36: {
        gap: SPACING.space_36,
    },
});
export default HomeScreen;
