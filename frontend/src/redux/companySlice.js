import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: "",
    },
    reducers: {
        // Existing actions
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
        // New action to clear state
        clearState: (state) => {
            state.singleCompany = null;
            state.companies = [];
            state.searchCompanyByText = "";
        },
    },
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText, clearState } = companySlice.actions;
export default companySlice.reducer;