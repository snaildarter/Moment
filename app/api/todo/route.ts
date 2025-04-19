import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 假设你的 prisma 实例在这个路径

// 获取所有待办事项
export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: '获取待办事项失败' }, { status: 500 });
  }
}

// 创建新的待办事项
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newTodo = await prisma.todo.create({ data });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '创建待办事项失败' }, { status: 500 });
  }
}