// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server';
import { Articles } from '../articles';

export async function GET() {
    try {
      return NextResponse.json(Articles);
     } catch (error) {
       throw error
   }
}