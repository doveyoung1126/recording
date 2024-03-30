'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import React, { useState } from "react";
import { PopoverPlayer } from "./audioPlayer";
import { MyButton } from "./mybutton"
import { SearchIcon } from "../icons/searchicon";
import { DropdownIcon } from "../icons/DropdownIcon"

export const MyTable = <T extends {
    uuid: string,
    local_number: string,
    remote_number: string
}>(
    props: {
        data: T[],
        isSearchAble?: boolean
    }
) => {

    //const items = props.data
    const { isSearchAble, data: items } = props

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
    const [filterValue, setFilterValue] = useState('')
    const hasSearchFilter = Boolean(filterValue)

    const staffArray = Array.from(new Set(items.map((record) => record.local_number))).sort()
    const [staffFilter, setStaffFilter] = useState<any>([])

    const filteredItems = React.useMemo(() => {
        let filteredData = [...items]


        if (hasSearchFilter) {
            filteredData = filteredData.filter((record) =>
                record.remote_number.toLowerCase().includes(filterValue.toLowerCase()),
                //           || record.remote_number.toLowerCase().includes(filterValue.toLowerCase())
            )
            console.log(filteredData[0], "filtering")
        }

        console.log(filteredData[0], filteredData.length, "filtered")

        return filteredData
    }, [filterValue, hasSearchFilter, items])

    const onSearchChange = React.useCallback((value: string | undefined) => {
        if (value) {
            setFilterValue(value)
        } else {
            setFilterValue("")
        }
    }, [])

    const topContent = React.useMemo(() => {
        if (staffArray === staffFilter) {
            setStaffFilter([])
        }
        return (
            <div className="flex justify-between gap-3 items-end">
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
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<DropdownIcon className="text-small" />} variant="flat">
                                所有分机
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={staffFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStaffFilter}
                        >
                            {staffArray.map((staff) => (
                                <DropdownItem key={staff} >
                                    {staff}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        )
    }, [filterValue, onSearchChange, staffArray, staffFilter])

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
            topContent={isSearchAble && topContent}
            topContentPlacement="outside"
            isHeaderSticky
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"去打个电话吧，完成今天的任务！"} items={filteredItems}>
                {(item) => (
                    <TableRow key={item.uuid}>
                        {(columnKey) => <TableCell>{cellRender(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}