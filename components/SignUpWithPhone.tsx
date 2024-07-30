import * as React from "react";
import { TextInput, Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpPhone({ onPress }) {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState("");

    const onSignUpPhone = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            await signUp.create({ phoneNumber, password });

            await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' })
            setPendingVerification(true);
        }
        catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    const onVerifyPhone = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptPhoneNumberVerification({ code });
            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.replace('/home');
            }
            else {
                console.error(JSON.stringify(completeSignUp, null, 2));
            }
        }
        catch (err: any) {
            console.error("SignUpPhone catch-error:", JSON.stringify(err, null, 2));
        }
    };
    return (
        <View style={styles.container}>
            {!pendingVerification && (
                <>
                    <TextInput
                        autoCapitalize="none"
                        value={phoneNumber}
                        placeholder="(+1) Phone"
                        placeholderTextColor='gray'
                        onChangeText={(phone) => setPhoneNumber(phone)}
                        style={styles.textInput}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        value={password}
                        placeholder="Password"
                        placeholderTextColor='gray'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        style={styles.textInput}
                    />
                    <Button title="Sign Up" onPress={onSignUpPhone} />
                    <TouchableOpacity onPress={onPress} style={{ margin: 15 }}>
                        <Text style={styles.text}>Sign up with email instead</Text>
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
                    <Button title="Verify Code" onPress={onVerifyPhone} />
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