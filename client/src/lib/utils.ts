export const dataGridClassNames = 
" border border-gray-200 bg-white shadow dark:border-gray-800 dark:bg-gray-700 text-gray-200"

export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
        "& .MuiDataGrid-columnHeaders": {
            color: `${isDarkMode ? "#e5e7eb" : ""}`,
            '& [role="row"] > *': {
                backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
                borderColor: `${isDarkMode ? "#2d3135" : ""}`,
            },
        },
        "& .MuiTablePagination-root": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
        },
        "& .MuiTablePagination-select": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
        },
        "& .MuiIconbutton-root": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
        },
        "& .MuiDataGrid-cell": {
            border: "none",
        },
        "& .MuiDataGrid-row": {
            borderBottom: ` 1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
        },
        "& .MuiDataGrid-withBorderColor": {
            borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
        },
    }
}