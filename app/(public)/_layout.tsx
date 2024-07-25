import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { Stack } from "expo-router/stack";
import { Button } from 'react-native';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerRight: () => (
                        <FontAwesome name='sign-out' size={24} onPress={() => { router.navigate('/profile') }} />
                    )
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile',
                }}
            />
        </Stack>
    )
}