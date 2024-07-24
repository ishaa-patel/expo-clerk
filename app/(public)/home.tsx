import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Page() {
    const { user } = useUser();
    return (
        <SignedIn>
            <View style={styles.container}>
                <>{console.log("User details:", user)}</>
                {/* <Image source={{ uri: user?.externalAccounts[0].imageUrl }} style={styles.userImage} /> */}
                <Text>Hello {user?.fullName}</Text>
                <Text>Email: {user?.emailAddresses[0].emailAddress}</Text>
            </View>
        </SignedIn >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
    }
})