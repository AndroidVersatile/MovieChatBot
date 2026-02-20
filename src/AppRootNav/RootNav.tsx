import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChatScreen from '../screens/ChatScreen';
import RNBootSplash from "react-native-bootsplash";
import BottomTabs from '../navigations/BottomTabs';
import OnboardingScreen from '../screens/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import NoInternetScreen from '../screens/NoInternetScreen';
import FloatingInputScreen from '../screens/FloatingInputScreen';
const Stack = createNativeStackNavigator();
const RootNav = () => {
    const navigationRef = createNavigationContainerRef();
    const [onboardingSeen, setOnboardingSeen] = useState(null);
    const { user } = useSelector(state => state.auth);
    // console.log('User', user);
    const network = useSelector((state) => state.network);
    const isChecking = network.isConnected === null;
    const isOffline = network.isConnected === false;

    useEffect(() => {
        const checkOnboarding = async () => {
            const seen = await AsyncStorage.getItem("ONBOARDING_SEEN");
            setOnboardingSeen(seen === 'true');
        };
        checkOnboarding();

        // Listen for changes to AsyncStorage
        const interval = setInterval(checkOnboarding, 500);
        return () => clearInterval(interval);
    }, []);

    const onNavigationReady = async () => {
        await RNBootSplash.hide({ fade: true });
    };

    if (isChecking || onboardingSeen === null) {
        return null;
    }
    if (isOffline && !user) {
        return (
            <SafeAreaProvider>
                <NoInternetScreen />
            </SafeAreaProvider>
        );
    }
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={onNavigationReady}
        >
            <Stack.Navigator
                key={user ? 'authenticated' : 'unauthenticated'}
                screenOptions={{
                    headerShown: false,
                    animation: 'fade_from_bottom',
                }}

            >
                {
                    !user ? (
                        !onboardingSeen ? (
                            <Stack.Screen name='OnBoardingScreen' component={OnboardingScreen} />
                        ) : (
                            <>

                                <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ animationTypeForReplace: 'push' }} />
                                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                                <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
                            </>
                        )
                    ) : (
                        <>
                            <Stack.Screen name='BottomTabs' component={BottomTabs} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNav

const styles = StyleSheet.create({})