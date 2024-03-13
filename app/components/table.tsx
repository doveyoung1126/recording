'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";
import React from "react";
import { PopoverPlayer } from "./audioPlayer";
import { DownloadIcon } from '@/app/icons/downloadicon'
import { MyButton } from "./mybutton"

export const MyTable = <T extends { uuid: string }>(
    props: { data: T[] }
) => {

    const items = props.data

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


    // console.log(rows)
    const cellRender = React.useCallback((item: { [x: string]: any; }, columnKey: string | number) => {

        const cellValue = item[columnKey]

        switch (columnKey) {
            case "remote_number":
                return (
                    <div className="flex items-center w-fit">
                        <div className="flex p2 w-32">{cellValue}</div>
                        <div className="flex justify-start items-center">
                            {item.record_filename
                                ? <PopoverPlayer src={`http://219.143.69.18:81/${item.record_filename}`} />
                                : <p>没有录音</p>}
                            {item.record_filename &&

                                <MyButton tmpurl={`/api/download/${item.record_filename}`} />
                            }

                        </div>

                    </div>
                )

            default:
                return cellValue
        }
    }, [])
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
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"去打个电话吧，完成今天的任务！"} items={items}>
                {(item) => (
                    <TableRow key={item.uuid}>
                        {(columnKey) => <TableCell>{cellRender(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}