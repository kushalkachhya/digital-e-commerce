import { NextResponse } from "next/server";
import cloudinary from "../../../configs/cloudinaryConfig";
import { db } from "../../../configs/db";
import { productsTable, usersTable } from "../../../configs/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
    const formData = await req.formData();
    const image = formData.get('image');
    const file = formData.get('file');
    const dataField = formData.get('data');
    let data;
    try {
        data = dataField ? JSON.parse(dataField) : null;
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON in form data." }, { status: 400 });
    }

    if (!data || !data.title) {
        return NextResponse.json({ error: "Product title is required." }, { status: 400 });
    }

    console.log("Received Image:", image);
    console.log("Received File:", file);
    console.log("Received Data:", data);


    // Save Product image to Cloudinary media
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imageResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "files",
                resource_type: "auto"
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(imageBuffer);
    });

    console.log("Image Uploaded! URL:", imageResult.secure_url);

    // Save product file/document to Cloudinary media
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "files",
                resource_type: "auto" 
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(fileBuffer);
    });

    console.log("File Uploaded! URL:", fileResult.secure_url);

    //Save formData along with URL into database
    const result = await db.insert(productsTable).values({
        title: data.title || '',
        category: data.category || '',
        description: data.description || '',
        fileUrl: fileResult?.secure_url || '',
        imageUrl: imageResult?.secure_url || '',
        price: data.price || 0,
        about: data.about || '',
        message: data.message || '',
        createdBy: data.userEmail
    }).returning(productsTable);


    // Final response
    return NextResponse.json(result);
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const limit = searchParams.get('limit');
    const id = searchParams.get('id');

    if (email) {
        const result = await db.select({
            ...getTableColumns(productsTable),
            user: {
                name: usersTable.name,
                image: usersTable.image
            }
        }).from(productsTable)
            .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
            .where(eq(productsTable.createdBy, email))
            .orderBy(desc(productsTable.id))
            return NextResponse.json(result);
    }
    if(id){
        const result = await db.select({
            ...getTableColumns(productsTable),
            user: {
                name: usersTable.name,
                image: usersTable.image
            }
        }).from(productsTable)
            .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
            .where(eq(productsTable.id,id))
            .orderBy(desc(productsTable.id))
    
        return NextResponse.json(result[0]);
    }

    const result = await db.select({
        ...getTableColumns(productsTable),
        user: {
            name: usersTable.name,
            image: usersTable.image
        }
    }).from(productsTable)
        .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
        .orderBy(desc(productsTable.id))
        .limit(Number(limit))

    return NextResponse.json(result);
}

export async function DELETE(req) {

    const {searchParams}=new URL(req.url);
    const productId=searchParams.get('productId');
    const user=await currentUser();
  
    const result=await db.delete(productsTable)
    .where(and (eq(productsTable.id,productId),
    eq(productsTable.createdBy,user?.primaryEmailAddress?.emailAddress)));
    
    return NextResponse.json({result:"Deleted!!"});
  }