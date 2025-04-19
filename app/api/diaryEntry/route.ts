// export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 假设你的 prisma 实例在这个路径

// 获取所有日记条目
export async function GET() {
  try {
    const diaryEntries = await prisma.diaryEntry.findMany();
    return NextResponse.json(diaryEntries);
  } catch (error) {
    console.error('获取日记条目失败:', error);
    return NextResponse.json({ error: '获取日记条目失败' }, { status: 500 });
  }
}

// 创建新的日记条目
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newDiaryEntry = await prisma.diaryEntry.create({ data });
    return NextResponse.json(newDiaryEntry, { status: 201 });
  } catch (error) {
    console.error('创建日记条目失败:', error);
    return NextResponse.json({ error: '创建日记条目失败', data: error }, { status: 500 });
  }
}
