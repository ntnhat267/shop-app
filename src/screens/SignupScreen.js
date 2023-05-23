import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../services/UserService";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
import { Octicons } from "@expo/vector-icons";
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [iShowPassword, setIshowPassword] = useState(true);
  const [iShowConfirmPassword, setIshowConfirmPassword] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigation.navigate("Login", {isBack: true});
    }, 1500);
  };
  useEffect(() => {
    if (status === "SUCCESS") {
      handleShowModal();
      setMessage("");
      setStatus("");
    }
  }, [status]);
  const handleSignup = () => {
    const SignUpUser = async () => {
      const res = await registerUser({
        email,
        password,
        confirmPassword,
      });
      setMessage(res?.data?.message);
      setStatus(res?.data?.status);
    
      return res;
    };
    SignUpUser();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          justifyContent: "flex-start",
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
          Sign up
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
            <TouchableOpacity onPress={() => setIshowPassword(!iShowPassword)}>
              {!iShowPassword ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Confirm Password</Text>
          <View style={[styles.input, { flexDirection: "row" , 
          alignItems: 'center'
        }]}>
            <TextInput
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={iShowConfirmPassword}
              placeholder="Confirm Password"
              style={{
                flex: 1,
                height: "100%",
              }}
            />
               <TouchableOpacity
              onPress={() => setIshowConfirmPassword(!iShowPassword)}
            >
              {!iShowConfirmPassword ? (
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
            You already have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login",{isBack: true})}>
            <Text
              style={{
                fontSize: 18,
                color: "#4dab96",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSignup}
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
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Octicons name="check-circle" size={40} color="#fff" />
            <Text style={styles.modalText}>Đăng ký thành công</Text>
          </View>
        </View>
      </Modal>
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

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: "#00000082",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    gap: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});

export default LoginScreen;
