import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { Button, Text, View, StyleSheet } from "react-native";

export default function Page() {
    const { signOut } = useAuth();
    const { user } = useUser();
    const doLogOut = () => {
        signOut();
    }
    return (
        <View style={styles.container}>
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            </SignedIn>
            <Button title="Sign-Out" onPress={doLogOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})