import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");


const SliderDetailProduct = ({ data }) => {
    const length = data?.length
    const [itemActive, setItemActive] = useState(0)
    const handleChange = (index) => {
        setItemActive(index)
        console.log(itemActive);
    }
  const renderPagination = (index, total, context) => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((image, imageIndex) => (
          <Image
            key={imageIndex}
            source={{ uri: image }}
            style={[
              styles.paginationImage,
              index === imageIndex && styles.activePaginationImage,
             { width: (width - 100) /length}
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.sliderContainer}>
      {data && (
        <Swiper
          style={styles.swiper}
          renderPagination={renderPagination}
        >
          {data.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{ uri: image }}
                style={[styles.image, { borderRadius: 10 }]}
              />
            </View>
          ))}
        </Swiper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    sliderContainer: {
        height: height / 2,
    },
    swiper: {
     
    },
    slide: {
        flex: 1,
    justifyContent: "center",
    alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%"
    },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
   
  
  },
  paginationImage: {
    // width: width/length,
    height: 50,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  activePaginationImage: {
    borderColor: "#4dab96",
  },
//   swiper: {},
//   sliderContainer: {
//     height: height / 2,
//   },
//   slide: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
});

export default SliderDetailProduct;