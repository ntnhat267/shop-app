import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import usePagination from "../../hooks/usePagination";
import { AntDesign } from "@expo/vector-icons";
import { formatTime } from "../../utilities";
const ReviewsDetailsProduct = ({ data }) => {
  const [page, setPage] = useState(1);
  const length = data?.length || 1;
  const PER_PAGE = 5;
  const count = Math.ceil(length / PER_PAGE);
  const DATA = usePagination(data, PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    DATA.jump(pageNumber);
  };

  const handleNextPage = () => {
    if (page < count) {
      setPage(page + 1);
      DATA.jump(page);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      DATA.jump(page);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingBottom: 10,
        borderRadius: 15,
        borderColor: "#f5f5f8",
        backgroundColor: "#fff",
      

      }}
    >
      <View
        style={{
          marginVertical: 10,
        }}
      >
        {DATA?.currentData()?.map((review, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              paddingHorizontal: 5,
              paddingVertical: 8,
              gap: 6,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#c2c3c7",
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: "#dcdee0",
                borderRadius: "100%",
                padding: 3,
                marginVertical: 5,
              }}
            >
              <Image
                source={{
                  uri: review?.avatar
                    ? review?.avatar
                    : "https://ik.imagekit.io/gmltgojm2/4/avatar.png?updatedAt=1679846199635",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 1000,
                }}
              />
            </View>
            <View
              style={{
                gap: 2,
              }}
            >
              <Text style={style.title}>{review?.name}</Text>
              <Text style={{ fontSize: 14 }}>{formatTime(review?.time)}</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "gray",
                }}
              >
                {review?.reviews}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={handlePrevPage} disabled={page === 1}>
          <View
            style={[
              style.button,
              { borderColor: page === 1 ? "gray" : "black" },
            ]}
          >
            <AntDesign
              name="left"
              size={20}
              color={page === 1 ? "gray" : "black"}
            />
          </View>
        </TouchableOpacity>

        {[...Array(count)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePageChange(index + 1)}
          >
            <View
              style={[
                {
                  borderColor: page === index + 1 ? "#4dab96" : "black",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderRadius: "100",
                  padding: 5,
                  width: 40,
                  height: 40,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: page === index + 1 ? "#4dab96" : "black",
                }}
              >
                {index + 1}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleNextPage} disabled={page === count}>
          <View
            style={[
              style.button,
              { borderColor: page === count ? "gray" : "black" },
            ]}
          >
            <AntDesign
              name="right"
              size={20}
              color={page === count ? "gray" : "black"}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: "100",
    padding: 5,
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ReviewsDetailsProduct;
