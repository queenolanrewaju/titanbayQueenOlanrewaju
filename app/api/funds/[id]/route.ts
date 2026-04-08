
import { NextResponse } from 'next/server';
import pool from '@/db';


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
        try {
        const { id } = await params;
        const result = await pool.query('SELECT * FROM funds WHERE id = $1', [id]); //$1 place holder, increments to $2, $3 for additional placeholders
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Fund not found' }, { status: 404 });//returns an error if the id doesn't exist
        }
        return NextResponse.json(result.rows[0], { status: 200 });//returns the fund id
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 }); //if there is issue with the server it will return a status 500
    }
}