import Icon from 'react-native-vector-icons/Ionicons'
import { StackScreenProps } from "@react-navigation/stack"
import { Image, View, StyleSheet, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { RootStackParams } from "../navigation/Navigation"
import { useMovieDetails } from '../hooks/useMovieDetails'
import { MovieDetails } from '../components/MovieDetails'
import { useNavigation } from '@react-navigation/native'

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route }: Props) => {
    const navigation = useNavigation()
    const movie = route.params
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

    const { cast, isLoading, movieFull } = useMovieDetails(movie.id)

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.imagePoster}
                    />
                </View>
            </View>

            <View style={styles.marginContainer}>
                <Text style={styles.subtitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            {
                isLoading
                    ? <ActivityIndicator size={30} color='grey' style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={movieFull!} cast={cast} />
            }

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name='arrow-back-outline' color='white' size={50} />
            </TouchableOpacity >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 10,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    imagePoster: {
        flex: 1
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 20,
        left: 5
    }
})