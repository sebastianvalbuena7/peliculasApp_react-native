import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { useNavigation } from '@react-navigation/native'

interface Props {
    movie: Movie,
    height?: number,
    width?: number
}

export const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {
    const { poster_path, title } = movie

    const uri = `https://image.tmdb.org/t/p/w500/${poster_path}`

    const navigation = useNavigation<any>()

    return (
        <TouchableOpacity activeOpacity={0.9} style={{
            width,
            height,
            marginHorizontal: 2,
            paddingBottom: 20,
            paddingHorizontal: 5 
        }} onPress={() => navigation.navigate('DetailScreen', movie)}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri
                    }}
                    style={styles.image} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        borderRadius: 18
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 10,
    }
})