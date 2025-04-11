"use client"
import React, { useEffect, useState } from "react";
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import  ImageUpload  from '../add-product/_components/ImageUpload'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddProduct() {
    const categoryOption=['Source Code','UI Kit','Icons','Documents','Fonts','Themes','Video','Illustration','Other']
    const [formData,setFormData]=useState([]);
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        setFormData({
            userEmail:user?.primaryEmailAddress?.emailAddress
        })
    },[user])

    const handleInputChange=(fieldName,fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }));
        console.log(formData);
    }

    const onAddProductBtnClick = async () => {
        console.log(formData);
        setLoading(true);
        const formDataObj = new FormData();
        formDataObj.append('image', formData.image);
        formDataObj.append('file', formData.file);
    
        formDataObj.append('data', JSON.stringify({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            price: formData.price,
            about: formData.about,
            message: formData.message,
            userEmail: formData.userEmail,
        }));
    
        const result = await axios.post('/api/products', formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        setLoading(true);

        if(result){
            toast('New product added successfully!');
            router.push('/dashboard');
        }

    };
    
    

    return (
        <div className="mt-10">
            <h2 className="text-3xl font-bold">Add New Product</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                <div className="flex flex-col gap-5">
                    <ImageUpload onImageSelect={(e)=>handleInputChange(e.target.name,e.target.files[0])}/>
                    <div>
                        <h4>Upload File which you want to Sell</h4>
                        <Input type="file" name="file" 
                        onChange={(e)=>handleInputChange(e.target.name,e.target.files[0])}/>
                    </div>
                    <div>
                        <h4>Message to User</h4>
                        <Input type="message" name="message" placeholder="Write Thank you message to user"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div>
                        <h4>Product Title</h4>
                        <Input name="title" placeholder="Ex.UI Kit in Figma"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <div>
                        <h4>Price</h4>
                        <Input type="number" name="price" placeholder="Ex. $50"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <div>
                        <h4>Catogery</h4>
                        <Select onValueChange={(value)=>handleInputChange('category',value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                            {categoryOption?.map((category,index)=>(
                                <SelectItem key={index} value={category}>{category}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <h4>Description</h4>
                        <Textarea name="description" placeholder="Add Product Description"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <div>
                        <h4>About Product (Optional)</h4>
                        <Textarea name="about" placeholder="Add Product Information"
                        onChange={(e)=>handleInputChange(e.target.name,e.target.value)} />
                    </div>
                    <Button onClick={onAddProductBtnClick} disabled={loading}>
                        {loading?<Loader2Icon className="animate-spin"/>: 'Add Product'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct