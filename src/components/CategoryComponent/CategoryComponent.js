import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getAllProduct } from "../../services/ProductService";
import CardProductComponent from "../CardProductComponent/CardProductComponent";
import { AntDesign } from "@expo/vector-icons";

const CategoryComponent = ({
  category,
  price,
  gender,
  rate,
  currentPage,
  setCurrentPage,
}) => {
  const { searchName } = useSelector((state) => state.product);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProduct({
          page: currentPage,
          limit: 10,
          category: category,
          priceRange: price,
          gender: gender,
          rate: rate,
          search: searchName,
        });
        setData(data.data.data);
        setPagination(data.data.pagination);
        setIsLoading(false);
        return data;
      } catch (error) {
        alert(error);
      }
    };
    fetchProduct();
  }, [currentPage, category, price, rate, gender, searchName]);
  const handlePress = () => {};
  return (
    <View style={{ backgroundColor: "#fff", marginVertical: 10 }}>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <View style={{
              marginHorizontal: 10, 
              marginVertical: 10
            }}>
              {searchName && <Text style={{
                fontSize: 20,
                fontWeight: "400",
                color: "#595c71"
              }}>Kết quả tìm kiếm: <Text style={{
                fontSize: 22,
                fontWeight: "500",
                color: "#4dab96"
              }}>{searchName}</Text> </Text>}

            {
              data.length > 0 && (
                <Text style={{
                  fontSize: 20,
                  fontWeight: "500", 
                }}>About {pagination.totalProducts} results </Text>
              )
            }

            {
              data.length === 0 && (

              <View style={{
                marginVertical: 10
              }} >
                <Text style={{
                  fontSize: 20,
                  fontWeight: "500", 
                }}>No matching results :(</Text>
              </View>
              )
            }
            </View>
            <View style={styles.listCard}>
              {data?.map((item) => (
                <CardProductComponent key={item._id} item={item} />
              ))}
            </View>
            {
              data.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 15,
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                disabled={!pagination?.hasPrevPage}
                onPress={() => setCurrentPage(currentPage - 1)}
              >
                <View
                  style={[
                    styles.button,
                    { borderColor: currentPage === 1 ? "gray" : "black" },
                  ]}
                >
                  <AntDesign
                    name="left"
                    size={20}
                    color={currentPage === 1 ? "gray" : "black"}
                  />
                </View>
              </TouchableOpacity>
              {[...Array(pagination?.totalPages)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentPage(index + 1)}
                >
                  <View
                    style={[
                      {
                        borderColor:
                          currentPage === index + 1 ? "#4dab96" : "black",
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
                        color: currentPage === index + 1 ? "#4dab96" : "black",
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                disabled={!pagination?.hasNextPage}
                onPress={() => setCurrentPage(currentPage + 1)}
              >
                <View
                  style={[
                    styles.button,
                    {
                      borderColor:
                        currentPage === pagination?.totalPages
                          ? "gray"
                          : "black",
                    },
                  ]}
                >
                  <AntDesign
                    name="right"
                    size={20}
                    color={
                      currentPage === pagination?.totalPages ? "gray" : "black"
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>

              )
            }
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 25,
    paddingBottom: 20,
  },
  listCard: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: "100",
    padding: 5,
    width: 35,
    height: 35,
  },
});

export default CategoryComponent;
