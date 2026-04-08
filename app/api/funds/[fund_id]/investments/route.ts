import { NextResponse } from 'next/server';
import pool from '@/db';

export async function GET(request: Request,{ params }: { params: Promise<{ fund_id: string }> }){
    
    try {
        const {fund_id} = await params;
        const result = await pool.query('SELECT * FROM investment WHERE fund_id = $1', [fund_id]);
        return NextResponse.json(result.rows, { status: 200 });//returns list of all investments
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 }); //if there is issue with the server it will return a status 500
    }
}

export async function POST(request:Request,{ params }: { params: Promise<{ fund_id: string }> }){
    try{
        const {fund_id} = await params;
        const { investor_id, amount_usd,investment_date } = await request.json();
        const result = await pool.query(
        'INSERT INTO investment (fund_id, investor_id, amount_usd, investment_date) VALUES ($1, $2, $3, $4) RETURNING *', [fund_id, investor_id,amount_usd, investment_date]
        );

    return NextResponse.json(result.rows[0], { status: 201 }); // 201 for POST

    }catch (err){
        return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error'}, {status:500});
    }

}
