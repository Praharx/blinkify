import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { verifyToken } from "@clerk/nextjs/server";
import {auth, currentUser} from "@clerk/nextjs/server";
export const runtime = 'edge';
const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
const ACCESS_KEY_PASSWORD = process.env.NEXT_PUBLIC_ACCESS_KEY_PASSWORD;
const CLERK_JWT_KEY = process.env.NEXT_PUBLIC_CLERK_JWT_KEY;

console.log(ACCESS_KEY_ID, ACCESS_KEY_PASSWORD,":::::");

const s3Client = new S3Client(
    {
        credentials: {
            accessKeyId: ACCESS_KEY_ID as string, 
            secretAccessKey: ACCESS_KEY_PASSWORD as string
        },
        region: "eu-north-1"
    });

export const GET = async (req:NextRequest) => {
    const cookieStore = cookies()
    const sessToken = cookieStore.get('__session')?.value
    const bearerToken = req.headers.get('Authorization')?.replace('Bearer ', '')
    const token = sessToken || bearerToken
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!token) {
        return Response.json({ error: 'Token not found. User must sign in.' }, { status: 401 })
    }

    try {
        const verifiedToken = await verifyToken(token, {
          jwtKey: CLERK_JWT_KEY,
          // TODO: Change this to the actual URL of your application
          authorizedParties: ["http://localhost:3000"], // Replace with your authorized parties
        })

      } catch (error) {
        console.log(error,"::::::ERROR");
        return Response.json({ error: 'Token not verified.' }, { status: 401 })
    }
  
    const { userId } = auth();
    const user = await currentUser();
    console.log(userId, user,"::::USER DATA");
    const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: 'decentralised-dao-labour',
        Key: `/uploads/${userId}/${Math.random()}/image.jpg`,
        Conditions: [
            ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
        ],
        Fields: {
            'Content-Type': 'image/jpg'
        }, 
        Expires: 3600
    })

    return NextResponse.json({
        preSignedUrl : url,
        fields
    })


}