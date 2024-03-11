'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";

export const MyTable = <T extends { uuid: string }>(
    props: { data: T[] }
) => {

    const rows = props.data

    //console.log(rows[1].uuid)
    const columns = [
        {
            key: 'local_number',
            label: '分机号',
        },
        {
            key: 'remote_number',
            label: '对方号码',
        },
        {
            key: 'formattedStart_stamp',
            label: '开始时间',
        },
        {
            key: 'formattedDirection',
            label: '呼入/呼出',
        },
        {
            key: 'formattedDuration',
            label: '通话时长',
        },
        {
            key: 'isanswer',
            label: '接听状态',
        }
    ]
    console.log(rows)
    return (
        <Table aria-label="This is a table"
            // isStriped
            selectionMode='single'
            color="primary"
            classNames={{
                base: 'max-h-[500px] overflow-scroll'
            }}
            isHeaderSticky
        >
            <TableHeader>
                {columns.map((column) =>
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"去打个电话吧，完成今天的任务！"}>
                {rows.map((row) =>
                    <TableRow key={row.uuid}>
                        {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}