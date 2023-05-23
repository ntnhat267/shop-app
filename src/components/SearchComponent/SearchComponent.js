import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Badge, VStack } from "native-base";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchName } from "../../features/product/productSlice";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const SearchComponent = () => {
  const dispatch = useDispatch();
  const navigation =  useNavigation()
  const [value, setValue] = useState("");
  // useEffect(() => {
  //   dispatch(setSearchName(value));
  // }, [value]);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm ..."
        style={styles.input}
        value={value}
        placeholderTextColor="#4dab96"
        onChangeText={(value) => setValue(value)}
      />
      <TouchableOpacity
        onPress={() => { 
          dispatch(setSearchName(value))
          navigation.navigate("Category")
          setValue("")
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          position:"absolute",
          height: "100%",
          width: 50,
          right: 0
        }}
      >
        <Feather name="search" size={20} color="#4dab96" />
      </TouchableOpacity>
      {/* <VStack style={{marginTop: 8}}>
        <Badge
          colorScheme="danger"
          rounded="full"
          mb={-2}
          mr={-4}
          zIndex={1}
          variant="solid"
          alignSelf="flex-end"
          _text={{
            fontSize: 8,
          }}
        >
          2
        </Badge>
        <AntDesign name="shoppingcart" size={26} color="black" />
      </VStack> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // // alignItems: "center",1
    // flex: 1,

    width: "80%",
    position: "relative"
  },

  input: {
    width: "100%",
    height: 40,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#4dab96'
  },
});

export default SearchComponent;
