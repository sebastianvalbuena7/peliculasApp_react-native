import Carousel from 'react-native-reanimated-carousel'
import ImageColors from 'react-native-image-colors'
import { View, ActivityIndicator, Dimensions, ScrollView } from "react-native"
import { useMovies } from "../hooks/useMovies"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoviePoster } from "../components/MoviePoster"
import { HorizontalSlider } from '../components/HorizontalSlider'
import { GradientBackground } from '../components/GradientBackground'

const windowWidth = Dimensions.get('window').width

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets()
    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies()

    const getPosterColors = async (index: number) => {
        const movie = nowPlaying![index]
        const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        const colors = await ImageColors.getColors(uri, {})
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {nowPlaying !== undefined && (
                        <>
                            <View style={{ height: 440 }} >
                                <Carousel
                                    mode="parallax"
                                    style={{ width: windowWidth, justifyContent: 'center' }}
                                    pagingEnabled={false}
                                    windowSize={2}
                                    snapEnabled
                                    onSnapToItem={index => getPosterColors(index)}
                                    width={300}
                                    // autoPlay= {true}
                                    height={420}
                                    modeConfig={{
                                        parallaxScrollingScale: 0.9,
                                        parallaxScrollingOffset: 40,
                                        parallaxAdjacentItemScale: 0.75,
                                    }}
                                    data={nowPlaying}
                                    renderItem={({ item }) => <MoviePoster movie={item} />}
                                />
                            </View>

                            <HorizontalSlider movies={popular!} title='Popular' />
                            <HorizontalSlider movies={topRated!} title='Top Rated' />
                            <HorizontalSlider movies={upcoming!} title='Upcoming' />
                        </>
                    )}

                </View>
            </ScrollView>
        </GradientBackground>
    )
}