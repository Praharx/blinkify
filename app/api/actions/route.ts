import {prisma} from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, ActionParameter, ActionParameterType, LinkedAction } from "@solana/actions";

export async function GET(req: NextRequest, res: NextResponse) {
    const {searchParams} = req.nextUrl;

    const id = searchParams.get("id");

    
}
