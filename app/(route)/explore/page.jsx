"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayProductList from "../../_components/DisplayProductList";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { AlertCircle, Search } from "lucide-react";
import { toast } from "sonner";
import SortProducts from "../../../app/_components/SortProducts"

function Explore() {
    const [productList, setProductList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false); 
    const [searched, setSearched] = useState(false); 
    const [sort,setSort]=useState({
            label: 'NEWST',
            field: 'id',
            order: 'desc'
    });

    useEffect(() => {
        GetProductList(offset);
    }, []);

    const GetProductList = async (offset_) => {
        setLoading(true); 
        const result = await axios.post("/api/all-products", {
            limit: 6,
            offset: offset_,
            searchText: searchInput,
            sort:sort??[]
        });
        setLoading(false);

        if (result?.data?.error) {
            toast(result?.data?.error);
        }

        if (offset_ === 0) {
            setProductList(result.data);
            setOffset(6); 
        } else {
            setProductList((prev) => [...prev, ...result.data]);
            setOffset((prev) => prev + 6); 
        }

        setSearched(true); 
    };

    useEffect(()=>{
        if(sort){
            setProductList([]);
            GetProductList(0);
        }
    },[sort])

    const handleSearch = () => {
        setProductList([]); 
        setOffset(0); 
        GetProductList(0); 
    };

    return (
        <div className="mt-10">
            <h2 className="font-bold text-3xl">Explore</h2>

            <div className="mt-5 mb-5 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <h2>Search :</h2>
                    <Input
                        placeholder="Search"
                        className="w-80"
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <Button onClick={handleSearch}>
                        <Search /> Search
                    </Button>
                </div>
                <SortProducts onSortChange={(value)=>setSort(value)} />
            </div>

            {loading && (
                <p className="text-center text-gray-500">Loading products...</p>
            )}

            {!loading && productList.length > 0 && (
                <DisplayProductList productsList={productList} />
            )}

            {!loading && productList.length === 0 && searched && (
                <p className="font-medium text-2xl mt-50 text-center text-gray-300">
                    No products found for "{searchInput}".
                </p>
            )}


            {productList.length > 0 && (
                <div className="flex items-center justify-center mt-10">
                    <Button onClick={() => GetProductList(offset)}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Explore
