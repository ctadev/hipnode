import {prisma} from '../server';

const pagination = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize;

    const result = await prisma.post.findMany({
        skip,
        take: pageSize,
    });

    return result;
};

const page = 2;
const pageSize = 4;
const paginatedData = await pagination(page, pageSize);
console.log(paginatedData);
