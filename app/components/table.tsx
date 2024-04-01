'use client'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Pagination } from "@nextui-org/react";
import React, { useState } from "react";
import { PopoverPlayer } from "./audioPlayer";
import { MyButton } from "./mybutton"
import { SearchIcon } from "../icons/searchicon";
import { DropdownIcon } from "../icons/DropdownIcon"
import { useDebouncedCallback } from 'use-debounce';
import { Spinner } from "@nextui-org/react";

export const MyTable = <T extends {
    uuid: string,
    local_number: string,
    remote_number: string
}>(
    props: {
        data: T[],
        isSearchAble?: boolean
        fetchData?: Function
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
    // Split the value in SearchBox into diffirent use, filter and display
    const [filterValue, setFilterValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const hasSearchFilter = Boolean(filterValue)

    const staffArray = Array.from(new Set(items.map((record) => record.local_number))).sort()
    const [staffFilter, setStaffFilter] = useState<any>([])
    const tmpstaffarr = Array.from(staffFilter)

    console.log(tmpstaffarr)
    const filteredItems = React.useMemo(() => {
        let filteredData = [...items]


        if (hasSearchFilter) {
            filteredData = filteredData.filter((record) =>
                record.remote_number.toLowerCase().includes(filterValue.toLowerCase()),
            )
        }

        if (Array.from(staffFilter).length !== staffArray.length && Array.from(staffFilter).length !== 0) {
            filteredData = filteredData.filter((record) => (
                Array.from(staffFilter).includes(record.local_number)
            ))
        }

        setPage(1)
        return filteredData
    }, [filterValue, hasSearchFilter, items, staffArray.length, staffFilter])

    const pages = Math.max(Math.ceil(filteredItems.length / rowsPerPage), 1)

    const pageItems = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [filteredItems, page, rowsPerPage])


    const handleFilter = useDebouncedCallback((value: string | undefined) => {
        if (value) {
            setFilterValue(value)
        } else {
            setFilterValue("")
        }
    }, 300)

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1)
        }
    }, [page, pages])
    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1)
        }
    }, [page])

    const topContent = React.useMemo(() => {

        if (Array.from(staffFilter).length === staffArray.length && staffArray.length !== 0) {
            setStaffFilter([])
        }

        const handleInput = (value: string | undefined) => {
            if (value) {
                setInputValue(value)
                handleFilter(value)
                setPage(1)
            } else {
                setInputValue("")
                handleFilter(value)
                setPage(1)
            }
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
                    value={inputValue}
                    variant="bordered"
                    onClear={() => setInputValue("")}
                    onValueChange={handleInput}
                />
                {/* <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                        label="过滤分机"
                        placeholder="所有分机"
                        selectionMode="multiple"
                        selectedKeys={staffFilter}
                        onSelectionChange={setStaffFilter}
                    >
                        {staffArray.map((staff) => (
                            <SelectItem key={staff} value={staff}>
                                {staff}
                            </SelectItem>
                        ))}
                    </Select>
                </div> */}
                <div className="flex gap-3">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<DropdownIcon className="text-small" />} variant="flat">
                                {staffFilter.length === 0 ? "所有分机" : "正在过滤分机..."}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            //disallowEmptySelection
                            aria-label="Staffid Columns"
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
    }, [handleFilter, inputValue, staffArray, staffFilter])
    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-center items-center bg-green-200">
                {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1 || page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                </div> */}
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />

                {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div> */}
            </div>
        )
    }, [page, pages])

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
            isStriped
            // selectionMode='single'
            color="primary"
            topContent={isSearchAble && topContent}
            topContentPlacement="outside"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            isHeaderSticky
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                loadingContent={<Spinner label="正在加载..." />}
                emptyContent={isSearchAble ? "没有找到记录..." : "去打个电话吧，完成今天的任务！"}
                items={pageItems}>

                {(item) => (
                    <TableRow key={item.uuid}>
                        {(columnKey) => <TableCell>{cellRender(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}