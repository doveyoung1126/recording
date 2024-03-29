'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Input } from "@nextui-org/react"
import React, { useCallback, useMemo, useState } from "react"
import { PopoverPlayer } from "./audioPlayer"
import { MyButton } from "./mybutton"
import { SearchIcon } from "@/app/icons/searchicon"

const AllRecordsTable = <T extends {
    uuid: string,
    local_number: string,
    remote_number: string
}>(
    props: { data: T[] }
) => {
    const { data } = props
    const items = data
    const isSearchAble: boolean = false
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
    console.log(data[0], "originalData")
    const [filterValue, setFilterValue] = useState('')
    const hasSearchFilter = Boolean(filterValue)

    const filteredItems = React.useMemo(() => {
        let filteredData = [...data]


        if (hasSearchFilter) {
            filteredData = filteredData.filter((record) =>
                record?.remote_number.toLowerCase().includes(filterValue.toLowerCase()),
                //           || record.remote_number.toLowerCase().includes(filterValue.toLowerCase())
            )
            console.log(filteredData[0], "filtering")
        }

        console.log(filteredData[0], filteredData.length, "filtered")

        return filteredData
    }, [data, filterValue, hasSearchFilter])

    console.log(filteredItems[0], data[0], "record")

    const onSearchChange = useCallback((value: string | undefined) => {
        if (value) {
            setFilterValue(value)
        } else {
            setFilterValue("")
        }
    }, [])

    const topContent = useMemo(() => {
        return (
            <Input
                isClearable
                classNames={{
                    base: "w-full sm:max-w-[44%]",
                    inputWrapper: "border-1",
                }}
                placeholder="搜索对方号码..."
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                value={filterValue}
                variant="bordered"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
            />
        )
    }, [filterValue, onSearchChange])

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
            topContent={isSearchAble && topContent}
            topContentPlacement="outside"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"还没有记录..."} items={filteredItems}>
                {(item) => (
                    <TableRow key={item.uuid}>
                        {(columnKey) => <TableCell>{cellRender(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default AllRecordsTable