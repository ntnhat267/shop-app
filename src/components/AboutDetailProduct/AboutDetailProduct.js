import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { capitalizeFirstLetter } from "../../utilities";

const AboutDetailProduct = ({ data }) => {
  return (
    <View style={{ flex: 1, marginVertical: 10 }}>
      <Text style={style.text}>Category:  <Text style={{ fontSize: 18,color: "#595c71"}}>{capitalizeFirstLetter(data?.type)}</Text> </Text>
      <Text style={style.text}>Description:  <Text style={{ fontSize: 18,color: "#595c71", lineHeight: 25}}>{data?.description}</Text> </Text>
      <Text style={style.text}>Instruction:</Text>
      {data?.instruction?.map((item, index) => (
        <Text key={index} style={{ fontSize: 18, color: "#595c71", marginVertical: 2, }}>
          - {item}
        </Text>
      ))}
      <Text style={style.text}>Note:</Text>
      {data?.note?.map((item, index) => (
        <Text key={index} style={{ fontSize: 18, color: "#595c71", marginVertical: 2, lineHeight: 25, textAlign:"justify" }}>
          - {item}
        </Text>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "500",
    color: "#9e9ea7",
    marginVertical: 3,
  },
});

export default AboutDetailProduct;
