import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { capitalizeFirstLetter, convertToDolla } from "../../utilities";
import { useNavigation } from "@react-navigation/native";
const CardProductComponent = ({ item }) => {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>navigation.navigate("Detail", {itemId: item._id})}
      style={{
        width: windowWidth / 2 - 12,
        marginHorizontal: 6,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        marginBottom: 10,
        elevation: 4,
      }}
    >
      <View
        style={{
          height: 160,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item?.image[0] }}
          style={{ width: "100%", height: "100%", resizeMode: "cover",
          borderTopLeftRadius:8,
          borderTopRightRadius:8 
        }}
        />
      </View>
      <View style={{
        paddingHorizontal: 5,
        paddingVertical: 10
      }}>
        <Text
          style={{
            fontSize:16,
            color: '#9e9ea7',
      
          }}
        >{capitalizeFirstLetter(item.type)}</Text>
        <Text
         numberOfLines={1}
         style={{
          fontSize: 20,
          fontWeight: '500',
          color: "#454654",
          marginVertical: 10
         }}
         >{item.name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            <AntDesign name="star" size={16} color="#e4ad68" />
            <View style={{ position: "relative", paddingRight: 4 }}>
              <Text style={{ fontSize: 16, color: "#595c71" }}>
                {item.totalrating}.6
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: -4,
                  top: 3,
                  bottom: 3,
                  width: 2,
                  backgroundColor: "#595c71",
                }}
              />
            </View>
            <Text style={{ fontSize: 16, color: "#595c71", paddingLeft: 4 }}>
              {item.ratings.length}
            </Text>
          </View>
          <Text
            style={{
              fontSize:20,
              color: "#4dab96",
              fontWeight: "700"
            }}
          >
            {convertToDolla(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default CardProductComponent;
