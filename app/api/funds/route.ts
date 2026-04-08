import { NextResponse } from 'next/server';
import pool from '@/db';

export async function GET(request: Request) {
    try {
        const result = await pool.query('SELECT * FROM funds');
        return NextResponse.json(result.rows, { status: 200 });//returns all the funds
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 }); //if there is issue with the server it will return a status 500
    }
}

export async function POST(request:Request){
    try{
        const { name, vintage_year, target_size_usd, status } = await request.json();
        const result = await pool.query(
        'INSERT INTO funds (name, vintage_year, target_size_usd, status) VALUES ($1, $2, $3, $4) RETURNING *', [name, vintage_year, target_size_usd, status]
        );

    return NextResponse.json(result.rows[0], { status: 201 }); // 201 for POST

    }catch (err){
        return NextResponse.json({ error: 'server error'}, {status:500});
    }

}


