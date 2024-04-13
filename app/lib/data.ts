import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from 'next/cache';

const prisma = new PrismaClient()


export const fetchCurrentUserRecords = async (staffid: string, date: string, date2?: string) => {
    noStore()
    //custom tmp param, delete later 
    const agent_staffid = staffid
    const start_stamp = date
    const start_stamp_end = date2 ? (date2 < date ? date : date2) : date

    try {
        const data = await prisma.spzc_cdr_cdr.findMany({
            where: {
                agent_staffid: agent_staffid,
                start_stamp: {
                    gte: new Date(`${start_stamp}T00:00:00`),
                    lte: new Date(`${start_stamp_end}T24:00:00`),
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
                agent_staffid: true
            },
            orderBy: {
                start_stamp: 'desc',
            },
        });
        return data
    } catch (error) {
        throw new Error('Failed to fetch your query.')
    }
}

const fetchStaffids = async (staffid: string) => {
    noStore()

    try {
        const currentSectorId = await prisma.spzc_crm_organization_users.findFirst({
            where: {
                U_STAFFID: staffid
            },
            select: {
                U_SECTORID: true
            }
        })

        if (!currentSectorId?.U_SECTORID) {
            return [staffid]
        }
        const { U_SECTORID } = currentSectorId
        const controls = await prisma.spzc_crm_organization_dutyinfo.findFirst({
            where: {
                D_SECTORID: U_SECTORID
            },
            select: {
                D_CONTROLS: true
            }
        })
        if (!controls?.D_CONTROLS) {
            return [staffid]
        }
        const { D_CONTROLS } = controls
        const sectorIds = D_CONTROLS.split(",")

        const staffids: Promise<string>[] = sectorIds.map(async (sectorId: string) => {
            const results = await prisma.spzc_crm_organization_users.findFirst({
                where: {
                    U_SECTORID: sectorId
                },
                select: {
                    U_STAFFID: true
                }
            })
            if (!results?.U_STAFFID) {
                return staffid
            }
            const { U_STAFFID } = results
            return U_STAFFID
        })
        return await Promise.all(staffids)



    } catch (error) {
        throw new Error('Failed to fetch your query.')
    }
}

export const fetchUsersRecords = async (staffid: string, date: string, date2?: string) => {
    noStore()
    //custom tmp param, delete later 
    const agent_staffid = staffid
    const start_stamp = date
    const start_stamp_end = date2 || date

    try {

        const staffids = await fetchStaffids(staffid)

        const data = await prisma.spzc_cdr_cdr.findMany({
            where: {
                agent_staffid: {
                    in: staffids
                },
                start_stamp: {
                    gte: new Date(`${start_stamp}T00:00:00`),
                    lte: new Date(`${start_stamp_end}T24:00:00`),
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
                agent_staffid: true
            },
            orderBy: {
                start_stamp: 'desc',
            },
        });

        return data
    } catch (error) {
        throw new Error('Failed to fetch your query.')
    }
}