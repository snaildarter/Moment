import prisma from './prisma';

// 创建记录
export const createTodo = async ( data: any) => {
  return prisma.diaryEntry.create({
    data,
  });
};

