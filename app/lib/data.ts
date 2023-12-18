import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient()


export const fetchUserRecords = async () => {
    noStore()

    // try {
    const data = await prisma.spzc_cdr_cdr.findMany({
        where: {
            agent_staffid: '8283',
            start_stamp: {
                gte: new Date('2023-10-20'),
                lte: new Date('2023-10-21'),
            },
        },
        select: {
            uuid: true,
            outbound_cid: true,
            destination_number: true,
            direction: true,
            start_stamp: true,
            duration: true,
            isanswer: true,
            record_filename: true,
        },
        orderBy: {
            start_stamp: 'desc',
        },
    });
    console.log(typeof data)
    return data
    // } catch (error) {
    //    throw new Error('Failed to fetch your query.')
    // }
}