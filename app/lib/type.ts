export type MyRecord = {
    uuid: string;
    start_stamp: Date | null;
    direction: string | null;
    record_filename: string | null;
    duration: number | null;
    isanswer: string | null;
    destination_number: string | null;
    outbound_cid: string | null;
    agent_staffid: string | null
    agent_name: string | null
}[]

export type TableData = {
    formattedDirection: string,
    formattedStart_stamp?: string,
    local_number?: string,
    remote_number?: string,
    formattedDuration: string
}[]

export type TaskData = {
    agent_staffid: string
    agent_name: string
    incomingDuration: number
    outgoingDuration: number
    totalDuration: number
    incomingCount: number
    outgoingCount: number
    totalCount: number
}