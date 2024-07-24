import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
            const { createSessionId, signIn, signUp, setActive } =
                await startOAuthFlow({ redirectUrl: Linking.createURL("/home", { scheme: "myapp" }) });
            if (createSessionId) {
                setActive!({ session: createSessionId });
            }
        }
        catch (err) {
            console.error("OAuth Error", JSON.stringify(err, null, 2));
        }
    }, []);
    return (
        <View>
            <TouchableOpacity style={styles.googleLogin} onPress={onPress}>
                <Image source={require('@/assets/images/google.png')} style={styles.logo} />
            </TouchableOpacity>
        </View>
    )
}
export default SignInWithOAuth;

const styles = StyleSheet.create({
    googleLogin: {
        marginTop: 20,
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    logo: {
        height: 40,
        width: 40,
    }
})