import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRedux } from "../features/user/userSlice";
import { updateUser } from "../services/UserService";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const NameScreen = () => {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Change Name",
      headerStyle: {
        height: 200,
      },
      headerTitleStyle: {
            
        color: '#4dab96'
    },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <Ionicons name="chevron-back" size={24} color="#4dab96" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={HandleUpdateName}>
         <Text style={{
                fontSize: 20,
                fontWeight: "500",
                color: '#4dab96'
            }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    setName(data?.name);
  }, []);
  const HandleUpdateName = async () => {
    const res = await updateUser(data?._id, { name });
    if (res.data?.status === "SUCCESS") {
      dispatch(updateUserRedux(res.data));
      navigation.goBack();
      //   navigation.navigate("Information");
    }
    return res;
  };
  return (
    <View
      style={{
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        marginHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
      }}
    >
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        style={{
          fontSize: 20,
          fontWeight: "400",
        }}
      />
    </View>
  );
};

export default NameScreen;
