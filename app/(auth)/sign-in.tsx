import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import React from "react";
import SignInWithOAuth from "@/components/SignInWithOAuth";

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const signInAttempt = await signIn.create({
                identifier: phoneNumber,
                password,
            });
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/home');
            }
            else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        }
        catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [isLoaded, phoneNumber, password]);
    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                value={phoneNumber}
                placeholder="Phone"
                placeholderTextColor="gray"
                onChangeText={(phone) => setPhoneNumber(phone)}
                style={styles.textInput}
            />
            <TextInput
                value={password}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                style={styles.textInput}
            />
            <Button title="Sign In" onPress={onSignInPress} />
            <View style={styles.signUpContainer}>
                <Text>Don't Have An Account?</Text>
                <Link href="/sign-up">
                    <Text style={styles.signUpTxt}>Sign up</Text>
                </Link>
            </View>
            <SignInWithOAuth />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        padding: 5,
        marginBottom: 10,
        borderWidth: 0.2,
        borderColor: 'gray',
        borderRadius: 5,
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signUpTxt: {
        color: '#4895EF',
        textDecorationLine: 'underline',
    }
})