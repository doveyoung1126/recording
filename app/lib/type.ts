export type MyRecord = {
    uuid: string;
    start_stamp: Date | null;
    direction: string | null;
    record_filename: string | null;
    duration: number | null;
    isanswer: string | null;
    destination_number: string | null;
    outbound_cid: string | null;
}[]