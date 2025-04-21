import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 假设你的 prisma 实例在这个路径

// 获取所有记账分类
export async function GET() {
  try {
    const finances = await prisma.finance.findMany();
    return NextResponse.json(finances);
  } catch (error) {
    return NextResponse.json({ error: '获取记账分类失败' }, { status: 500 });
  }
}

// 创建新的记账分类
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newFinance = await prisma.finance.create({ data });
    return NextResponse.json(newFinance, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '创建记账分类失败' }, { status: 500 });
  }
}
