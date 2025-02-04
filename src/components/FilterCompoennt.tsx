import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../store/api/DataHelper";


function FilterComponent({ filters, handleFilter }) {
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => apiRequest("Categories/getAllCategories", "GET"),
    });
  
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
            <input
                type="text"
                placeholder="Search Products..."
                value={filters.search}
                onChange={(e) => handleFilter("search", e.target.value)}
                className="w-full p-2 border rounded-md"
            />
    
            {categories && categories.length > 0 && (
                <div>
                <h3 className="text-base font-bold">Categories</h3>
                <div className="grid gap-2 mt-2">
                    {categories.map((category) => (
                    <label key={category._id} className="flex items-center gap-2 font-medium">
                        <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.title}
                        onChange={() => handleFilter("category", filters.category === category.title ? "" : category.title)}
                        className="w-4 h-4"
                        />
                        {category.title}
                    </label>
                    ))}
                </div>
                </div>
            )}
            </div>
        </div>
    );
  }
  
  export default FilterComponent;
  