import { fetchUserRecords } from "../lib/data"

type UserRecords = {
    uuid: string,
    outbound_cid: string,
    destination_number: string,
    direction: string,
    start_stamp: string,
    duration: number,
    isanswer: boolean,
    record_filename: string
}


export const Table = async () => {
    const userRecords = await fetchUserRecords()

    const rows = userRecords.map((userRecord: UserRecords) => {
        if (userRecord.direction === 'in') {
            return {
                ...userRecord,
                local_number: userRecord.destination_number,
                remote_number: userRecord.outbound_cid,
            }
        }
        else return {
            ...userRecord,
            local_number: userRecord.outbound_cid,
            remote_number: userRecord.destination_number,
        }
    })
    console.log(rows[0].uuid)
    const columns = [
        {
            key: '',
            lable: '',
        },
        {
            key: '',
            lable: '',
        },
        {
            key: '',
            lable: '',
        },
        {
            key: '',
            lable: '',
        },
    ]

    return (
        <>
            <p>Here is a table include records</p>

            <p>uuid: {rows[0].uuid}</p>
            {/* <p>{userRecord.duration}</p>
                        <p>{userRecord.direction}</p>
                        <p>{userRecord.isanswer}</p>
                        <p>{userRecord.start_stamp}</p>
                        <p>{userRecord.record_filename}</p> */}
            <p>--------------</p>

        </>
    )
}