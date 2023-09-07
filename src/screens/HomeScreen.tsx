import Carousel from 'react-native-reanimated-carousel'
import { View, ActivityIndicator, Dimensions, ScrollView } from "react-native"
import { useMovies } from "../hooks/useMovies"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoviePoster } from "../components/MoviePoster"
import { HorizontalSlider } from '../components/HorizontalSlider'

const windowWidth = Dimensions.get('window').width

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets()
    const { peliculasEnCine, isLoading } = useMovies()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20 }}>
                {peliculasEnCine !== undefined && (
                    <>
                        <View style={{ height: 440 }} >
                            <Carousel
                                mode="parallax"
                                style={{ width: windowWidth, justifyContent: 'center' }}
                                pagingEnabled={false}
                                windowSize={2}
                                snapEnabled
                                width={300}
                                // autoPlay= {true}
                                height={420}
                                modeConfig={{
                                    parallaxScrollingScale: 0.9,
                                    parallaxScrollingOffset: 40,
                                    parallaxAdjacentItemScale: 0.75,
                                }}
                                data={peliculasEnCine}
                                renderItem={({ item }) => <MoviePoster movie={item} />}
                            />
                        </View>

                        <HorizontalSlider movies={peliculasEnCine} title='En cine' />
                    </>
                )}

            </View>
        </ScrollView>
    )
}