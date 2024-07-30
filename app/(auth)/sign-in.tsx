import { Link, } from 'expo-router';
import { Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SignInGoogle } from "@/components/SignInWithGoogle";
import { SignInFacebook } from "@/components/SignInWithFacebook";
import SignInEmail from "@/components/SignInWithEmail";
import SignInPhone from '@/components/SignInWithPhone';

export default function Page() {
    const [alternate, setAlternate] = useState(false);
    return (
        <View style={styles.container}>
            {!alternate && <>
                <SignInPhone onPress={() => setAlternate(true)} />
            </>}
            {alternate && <>
                <SignInEmail onPress={() => setAlternate(false)} />
            </>}
            <View style={styles.customLoginContainer}>
                <SignInGoogle /><SignInFacebook />
            </View>
            <View style={styles.signUpContainer}>
                <Text>Don't Have An Account?</Text>
                <Link href="/sign-up"><Text style={styles.allTxtField}>Sign up</Text></Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpContainer: {
        flexDirection: 'row',
        margin: 20,
    },
    allTxtField: {
        color: '#4895EF',
    },
    customLoginContainer: {
        flexDirection: 'row',
    }
})