import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { styles } from "./styles/CustomLoginStyles";

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export const SignInGoogle = () => {
    useWarmUpBrowser();
    const redirectUrl = Linking.createURL('app/(public)', { scheme: 'myapp' });
    console.log(redirectUrl); // Debugging URL
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
            const { createSessionId, signIn, signUp, setActive } =

                await startOAuthFlow({ redirectUrl: redirectUrl });
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
            <TouchableOpacity style={styles.customLogin} onPress={onPress}>
                <Image source={require('@/assets/images/google.png')} style={styles.logo} />
            </TouchableOpacity>
        </View>
    )
}

