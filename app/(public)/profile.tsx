import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Page() {
    const { signOut } = useAuth();
    const { user } = useUser();
    const doLogOut = () => {
        signOut();
    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={doLogOut}>
                <Text style={styles.text}>SIGN-OUT</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={user?.delete}>
                <Text style={styles.text}>DELETE ACCOUNT</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#4895EF',
        height: 50,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 10,
    },
    text: {
        color: "#fff",
    },
    userImage: {
        width: 100,
        height: 100
    }
})