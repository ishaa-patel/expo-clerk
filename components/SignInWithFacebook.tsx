import React from "react";
import * as WebBrowser from "expo-web-browser";
import { styles } from "./styles/CustomLoginStyles";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
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

export const SignInFacebook = () => {
    useWarmUpBrowser();
    const redirectUrl = Linking.createURL('/home', { scheme: 'myapp' });
    console.log(redirectUrl); // Debugging URL
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });
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
        <>
            <TouchableOpacity style={styles.customLogin} onPress={onPress}>
                <Image source={require('@/assets/images/facebook.png')} style={styles.logo} />
            </TouchableOpacity>
        </>
    )
}
