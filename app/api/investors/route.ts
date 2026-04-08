import { NextResponse } from 'next/server';
import pool from '@/db';

export async function GET(request: Request) {
    try {
        const result = await pool.query('SELECT * FROM investor');
        return NextResponse.json(result.rows, { status: 200 });//returns list of all investors
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 }); //if there is issue with the server it will return a status 500
    }
}

export async function POST(request:Request){
    try{
        const { name, investor_type, email } = await request.json();
        const result = await pool.query(
        'INSERT INTO investor (name, investor_type, email) VALUES ($1, $2, $3) RETURNING *', [name, investor_type, email]
        );

    return NextResponse.json(result.rows[0], { status: 201 }); // 201 for POST

    }catch (err){
        return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error'}, {status:500});
    }

}
