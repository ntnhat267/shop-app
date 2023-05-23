import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import Home1 from "../../assets/image/home-1.jpg";
import Home2 from "../../assets/image/home-2.jpg";
import Home3 from "../../assets/image/home-3.jpg";
import { Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
const data = [
  {
    id: 0,
    image: Home1,
    title: "OUR ALL-TIME FAVOURITES",
    text: "Blouses & Tops",
    button: "DISCOVER MORE",
  },
  {
    id: 1,
    image: Home2,
    title: "BLUE & WHITE",
    text: "Linen and denim",
    button: "START SHOPPING",
  },
  {
    id: 2,
    image: Home3,
    title: "OUR ALL-TIME FAVOURITES",
    text: "Blouses & Tops",
    button: "DISCOVER MORE",
  },
];

const { height } = Dimensions.get("screen");

const SliderComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        height: height / 2,
      }}
    >
      <Swiper
        showsButtons={false}
        loop={true}
        autoplay={true}
        activeDotColor="#4dab96"
        dotColor="#595c71"
      >
        {data?.map((item) => (
          <View
          key={item?.id}
            style={{
              flex: 1,
            }}
          >
            <ImageBackground
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                //   justifyContent: 'flex-end'
                //   alignItems: item.id === 0 ? "flex-start" : item.id === 1 ? "center" : ''
              }}
              source={item?.image}
              resizeMode="cover"
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                  color: "#212529",
                }}
              >
                {item?.title}
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "400",
                  textAlign: "center",
                  color: "#212529",
                }}
              >
                {item?.text}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Category")}
                style={{
                  backgroundColor: "#4dab96",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "800",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  {item?.button}
                </Text>
              </TouchableOpacity>
              {/* </View> */}
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SliderComponent;
