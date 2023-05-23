import { store } from "./src/app/store";
import { Provider } from "react-redux";
import StackNavigator from "./StackNavigator";
import { NativeBaseProvider } from "native-base";
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StackNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}
