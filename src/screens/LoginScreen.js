import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../features/user/userAction";
import { useNavigation, useRoute } from "@react-navigation/native";
import { resetSuccess } from "../features/user/userSlice";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const { success, status, message, accessToken } = useSelector(
    (state) => state.user
  );
  const route = useRoute()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iShowPassword, setIshowPassword] = useState(true);
  const { isBack} = route.params || true
  useEffect(() => {
    if (success) {
      if (status === "SUCCESS") {
        if(isBack){
          console.log("hi");
          navigation.navigate("Home")
        } else {
          navigation.goBack();
        }
        dispatch(resetSuccess());
      } else {
      }
    }
  }, [success, status]);
  const handleLogin = () => {
    dispatch(fetchLoginUser({ email, password }));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginVertical: 30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "600",
            color: "#4dab96",
            marginBottom: 40,
          }}
        >
          Login
        </Text>
        <View
          style={{
            gap: 10,
          }}
        >
          <Text style={styles.text}>Email</Text>
          <View style={styles.input}>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Text style={styles.text}>Password</Text>
          <View style={[styles.input, { flexDirection: "row" , 
          alignItems: 'center'
        }]}>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={iShowPassword}
              placeholder="Password"
              style={{
                flex: 1,
                height: "100%",
              }}
            />
            <TouchableOpacity
              onPress={() => setIshowPassword(!iShowPassword)}
            >
              {!iShowPassword ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />

              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {status === "ERROR" && (
          <Text
            style={{
              fontSize: 20,
              marginVertical: 10,
              color: "#ff4081",
              // backgroundColor: 'red'
            }}
          >
            {message}
          </Text>
        )}
        <View
          style={{
            marginVertical: 15,
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            You dont have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 18,
                color: "#4dab96",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            justifyContent: "center",
            backgroundColor: "#4dab96",
            paddingVertical: 20,
            borderRadius: 10,
            marginVertical: 0,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: width - 50,
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
});

export default LoginScreen;
