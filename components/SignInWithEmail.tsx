import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from 'expo-router';
import { Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from '@/components/styles/SignInWithPhoneOrEmailStyles';

export default function SignInEmail({ onPress }) {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onSignInEmail = React.useCallback(async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
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
    }, [isLoaded, password, emailAddress]);
    return (
        <>
            <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email Address"
                placeholderTextColor="gray"
                onChangeText={(email) => setEmailAddress(email)}
                style={styles.textInput}
                keyboardType="email-address"
            />
            <TextInput
                value={password}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                style={styles.textInput}
            />
            <Button title="Sign In" onPress={onSignInEmail} />
            <TouchableOpacity onPress={onPress} style={{ margin: 15 }}>
                <Text style={styles.txt}>Use phone number instead</Text>
            </TouchableOpacity>
        </>
    );
}
