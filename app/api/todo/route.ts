import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 假设你的 prisma 实例在这个路径
import dayjs from 'dayjs';

// 获取所有待办事项
export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: '获取待办事项失败', data: error }, { status: 500 });
  }
}

// 创建新的待办事项
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newTodo = await prisma.todo.create({ data });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '创建待办事项失败', data: error }, { status: 500 });
  }
}

// 更新待办事项的状态和 updateAt 字段
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: '缺少必要参数: id 或 status' }, { status: 400 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        status,
        updatedAt: ~~dayjs().format('YYYYMMDD')
      }
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '更新待办事项失败', data: error }, { status: 500 });
  }
}