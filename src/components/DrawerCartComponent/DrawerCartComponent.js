import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { convertToDolla } from "../../utilities";

const DrawerCartComponent = ({ closeDrawer }) => {
  const { accessToken, data } = useSelector((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 5,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 10
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: "100%",
            padding: 5,
            borderWidth: 1,
            borderColor: "#9e9ea7",
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
        <Text
          style={{
            fontSize: 20,
          }}
          numberOfLines={2}
        >
          {data?.name}
        </Text>
      </View>

      <ScrollView>
        {data?.wishList?.map((item) => (
          <View
            key={item?.product}
            style={{
              flexDirection: "row",
              marginVertical: 10,
              paddingRight: 10,
              width: "100%",
              borderTopColor: "#9e9ea7",
              borderTopWidth: 2,
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                width: "40%",
                height: 100,
              }}
            >
              <Image
                source={{ uri: item?.image }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "contain",
                }}
              />
            </View>
            <View
              style={{
                width: "60%",
                justifyContent: "space-between",
                paddingVertical: 5,
              }}
            >
              <Text
              numberOfLines={2}
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                {item?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#4dab96",
                  }}
                >
                  {convertToDolla(item?.price)}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    color: "#9e9ea7",
                  }}
                >
                  x{item?.amount}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DrawerCartComponent;
