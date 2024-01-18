import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient()


export const fetchDayUserRecords = async (staffid: string, date: string) => {
    noStore()
    //custom tmp param, delete later 
    const agent_staffid = staffid
    const start_stamp = date
    // try {
    const data = await prisma.spzc_cdr_cdr.findMany({
        where: {
            agent_staffid: agent_staffid,
            start_stamp: {
                gte: new Date(`${start_stamp}T00:00:00`),
                lte: new Date(`${start_stamp}T24:00:00`),
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
    return data
    // } catch (error) {
    //    throw new Error('Failed to fetch your query.')
    // }
}

export const fetchUserRecentRecords = async (staffid: string, time: string) => {
    noStore()
    //custom tmp param, delete later 
    const agent_staffid = staffid || '8283'
    const start_stamp = time || '2023-10-20'
    // try {
    const data = await prisma.spzc_cdr_cdr.findMany({
        where: {
            agent_staffid: agent_staffid,
            start_stamp: {
                gte: new Date(`${start_stamp}T00:00:00`),
                lte: new Date(`${start_stamp}T24:00:00`),
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
        take: 20,
        orderBy: {
            start_stamp: 'desc',
        },
    });
    return data
    // } catch (error) {
    //    throw new Error('Failed to fetch your query.')
    // }
}