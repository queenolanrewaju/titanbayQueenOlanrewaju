
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
//update a fund
export async function PUT(request:Request, { params }: { params: Promise<{ id: string }> }) {
    try{
        const {id} = await params;
        const { name, vintage_year, target_size_usd, status } = await request.json();
        const result = await pool.query(
        'UPDATE funds SET name = $1, vintage_year = $2,  target_size_usd = $3, status = $4 WHERE id = $5 RETURNING *', [name, vintage_year, target_size_usd, status, id]
        );

    return NextResponse.json(result.rows[0], { status: 200 }); // 200 for UPDATE

    }catch (err){
        return NextResponse.json({  error: err instanceof Error ? err.message : 'Server error' }, {status:500});
    }

}