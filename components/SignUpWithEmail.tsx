import * as React from "react";
import { TextInput, Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpEmail({ onPress }) {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState("");

    const onSignUpEmail = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            await signUp.create({ emailAddress, password });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setPendingVerification(true);
        }
        catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    const onVerifyEmail = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.replace('/home');
            }
            else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        }
        catch (err: any) {
            console.error("SignUpEmail catch-error:", JSON.stringify(err, null, 2));
        }
    };
    return (
        <View style={styles.container}>
            {!pendingVerification && (
                <>
                    <TextInput
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Email"
                        placeholderTextColor='gray'
                        onChangeText={(email) => setEmailAddress(email)}
                        style={styles.textInput}
                        keyboardType="email-address"
                    />
                    <TextInput
                        value={password}
                        placeholder="Password"
                        placeholderTextColor='gray'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        style={styles.textInput}
                    />
                    <Button title="Sign Up" onPress={onSignUpEmail} />
                    <TouchableOpacity onPress={onPress} style={{ margin: 15 }}>
                        <Text style={styles.text}>Sign up with phone number instead</Text>
                    </TouchableOpacity>
                </>
            )}
            {pendingVerification && (
                <>
                    <TextInput
                        value={code}
                        placeholder="Code"
                        placeholderTextColor='gray'
                        onChangeText={(code) => setCode(code)}
                        style={styles.textInput}
                    />
                    <Button title="Verify Code" onPress={onVerifyEmail} />
                </>
            )}
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
    text: {
        color: '#4895EF',
    }
})