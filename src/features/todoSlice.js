import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    formData: [],
    currentForm: {
        companyName: "",
        companyAddress: "",
        invoiceNo: "",
        companyCountryAndRegion: "",
        ProductName: "",
        genericName: "",
        batchNo: "",
        MFGdate: "",
        EXPdate: "",
        quantity: "",
        caseNo: "",
        NetWT: "",
        grossWT: ""
    }
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const {name, value} = action.payload;
            state.currentForm[name] = value;
        },
        addForm: (state) => {
            state.formData.push({...state.currentForm});
            state.currentForm = initialState.currentForm;
        },
        resetForm: (state) => {
            state.currentForm = initialState.currentForm;
        },
        deleteForm: (state, action) => {
            state.formData.splice(action.payload, 1);
        }
    }
})

export const {updateField, addForm, resetForm, deleteForm} = formSlice.actions

export default formSlice.reducer;