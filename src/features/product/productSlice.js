import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchName: "",
    productSelect: [],
    indexSelect: 0,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSearchName: (state, action) => {
            state.searchName = action.payload;;
        },
        resetSearchName: (state, ) => {
            state.searchName = "";
        },
        resetProductSelect: (state) => {
            state.productSelect = []
        },
        addProductSelect: (state, action) => {
            const idOrder =  action.payload;
            const isOrderIdInProductSelect = state?.productSelect?.find(item => item?.product === idOrder?.product)
            if(isOrderIdInProductSelect){
                state.productSelect = state.productSelect.filter(item => item?.product !== idOrder?.product);
            } else {
                state?.productSelect.push(idOrder);
            }
        },
        setIndexSelect: (state, action) => {
            state.indexSelect = action.payload
        }
    }
})
export const { setSearchName, resetSearchName,addProductSelect,resetProductSelect, setIndexSelect } = productSlice.actions;

export default productSlice.reducer;