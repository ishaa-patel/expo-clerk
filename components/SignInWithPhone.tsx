import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from 'expo-router';
import { Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from '@/components/styles/SignInWithPhoneOrEmailStyles';

export default function SignInPhone({ onPress }) {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const onSignInPhone = React.useCallback(async () => {
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
    }, [isLoaded, password, phoneNumber]);
    return (
        <>
            <TextInput
                autoCapitalize="none"
                value={phoneNumber}
                placeholder="(+1) Phone Number"
                placeholderTextColor="gray"
                onChangeText={(phone) => setPhoneNumber(phone)}
                style={styles.textInput}
                keyboardType="phone-pad"
            />
            <TextInput
                value={password}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                style={styles.textInput}
            />
            <Button title="Sign In" onPress={onSignInPhone} />
            <TouchableOpacity onPress={onPress} style={{ margin: 15 }}>
                <Text style={styles.txt}>Use email address instead</Text>
            </TouchableOpacity>
        </>
    );
}

