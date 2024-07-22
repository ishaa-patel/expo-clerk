import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router/tabs";

export default function Layout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#4895EF' }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
                }}
            />
        </Tabs>
    )
}