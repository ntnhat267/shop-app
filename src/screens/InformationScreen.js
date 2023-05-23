import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const InformationScreen = () => {
  const navigation= useNavigation();
  const { data } = useSelector((state) => state.user);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            backgroundColor: "#4dab96",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#fff",
              borderRadius: "100%",
              padding: 2,
            }}
          >
            <Image
              source={{ uri: data?.avatar }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: "#dcdee0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>Email: </Text>
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>{data?.email}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: "#dcdee0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>Name: </Text>
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>{data?.name}</Text>
          </View>
          <TouchableOpacity
          onPress={()=> navigation.navigate("Name")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{
              fontSize: 20, 
              fontWeight: "400"
            }}>Change</Text>
            <Entypo name="chevron-thin-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: "#dcdee0",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>Phone: </Text>
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>0{data?.phone}</Text>
          </View>
          <TouchableOpacity
          onPress={() => navigation.navigate("Phone")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{
              fontSize: 20, 
              fontWeight: "400"
            }}>Change</Text>
            <Entypo name="chevron-thin-right" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: "#dcdee0",

          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1, 
              paddingRight: 10
            }}
          >
            <Text style={{
              fontSize: 22, 
              fontWeight: "400"
            }}>Address: </Text>
            <Text style={{
              fontSize: 18, 
              fontWeight: "400", 
              flex: 1
            }}>{data?.address_street}, {data?.address_wards},  {data?.address_district}, {data?.address_city} </Text>
          </View>
          <View>

          <TouchableOpacity
          onPress={() => navigation.navigate("Address")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{
              fontSize: 20, 
              fontWeight: "400"
            }}>Change</Text>
            <Entypo name="chevron-thin-right" size={25} color="black" />
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationScreen;
