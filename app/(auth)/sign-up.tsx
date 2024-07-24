import * as React from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState("");

    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }
        try {
            await signUp.create({ emailAddress, password, phoneNumber });

            await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' })
            setPendingVerification(true);
        }
        catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    const onPressVerify = async () => {
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
            console.error("catch-error:", JSON.stringify(err, null, 2));
        }
    };
    return (
        <View style={styles.container}>
            {!pendingVerification && (
                <>
                    <TextInput
                        autoCapitalize="none"
                        value={phoneNumber}
                        placeholder="Phone"
                        placeholderTextColor='gray'
                        onChangeText={(phone) => setPhoneNumber(phone)}
                        style={styles.textInput}
                    />
                    <TextInput
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Email"
                        placeholderTextColor='gray'
                        onChangeText={(email) => setEmailAddress(email)}
                        style={styles.textInput}
                    />
                    <TextInput
                        value={password}
                        placeholder="Password"
                        placeholderTextColor='gray'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        style={styles.textInput}
                    />
                    <Button title="Sign Up" onPress={onSignUpPress} />
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
                    <Button title="Verify Code" onPress={onPressVerify} />
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
})