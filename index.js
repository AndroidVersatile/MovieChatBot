/**
 * @format
 */
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import { store } from "./src/redux/store/store";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Responsive } from './src/utilities/Responsive';
import { getApp, initializeApp } from '@react-native-firebase/app';
import { 
  initializeAppCheck, 
  ReactNativeFirebaseAppCheckProvider 
} from '@react-native-firebase/app-check';

const setupSecurity = async () => {
  try {
    // 1. Get the app instance
    const app = getApp(); 

    // 2. Setup the Provider
    const provider = new ReactNativeFirebaseAppCheckProvider();
    provider.configure({
      android: {
        // Since you are on a real device, use 'debug' for now 
        // to get the token, then 'playIntegrity' for production.
        provider: __DEV__ ? 'debug' : 'playIntegrity',
      },
    });

    // 3. Initialize (This fixes the 'call of undefined' error)
    await initializeAppCheck(app, {
      provider: provider,
      isTokenAutoRefreshEnabled: true,
    });

    console.log("✅ Security initialized!");
  } catch (error) {
    // If you see "No Firebase App", call initializeApp() before getApp()
    console.error("❌ Setup failed:", error);
  }
};

setupSecurity();
const Root = () => {
    return (
        <Provider store={store}>
            <App />
            <Toast position='bottom' bottomOffset={50} config={toastConfig} />
        </Provider>
    )
}

const toastConfig = {
    /* Overwrite the 'success' type or create a custom one like 'customSuccess'
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                backgroundColor: '#4CAF50',
                borderLeftColor: '#2E7D32',
                height: Responsive.size.hp(12),
                borderRadius: Responsive.radius[10],
            }}
            contentContainerStyle={{ paddingHorizontal: Responsive.padding[10] }}
            text1Style={{
                fontSize: Responsive.fontSize[16],
                fontWeight: 'bold',
                color: '#FFFFFF'
            }}
            text2Style={{
                fontSize: Responsive.fontSize[14],
                color: '#E8F5E9'
            }}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            style={{
                backgroundColor: '#D32F2F', borderLeftColor: '#B71C1C', height: Responsive.size.hp(12),
                borderRadius: Responsive.radius[10],
            }}
            text1Style={{ color: 'white', fontSize: Responsive.fontSize[16] }}
            text2Style={{ color: 'white', fontSize: Responsive.fontSize[12] }}
        />
    )
};
AppRegistry.registerComponent(appName, () => Root);
