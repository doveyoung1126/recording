'use client'
import React from "react"
import { formatUsersReocrds } from "../lib/formatdata"
import { MyTable } from "./table"

export const TableWithDatePicker = ({ staffid }: { staffid: string }) => {
    const currentDate = new Date().toISOString().slice(0, 10)
    const [startDate, setStartDate] = React.useState<string>(currentDate)
    const [endDate, setEndDate] = React.useState<string>(currentDate)
    const [data, setData] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState(false)

    const fetchData = React.useCallback(async (date1: string, date2: string = date1) => {
        setIsLoading(true)
        const fetchedData = await formatUsersReocrds(staffid, date1, date2)
        setData(fetchedData.tableData)
        setIsLoading(false)
    }, [staffid])

    React.useEffect(() => {
        setIsLoading(true)
        fetchData(currentDate)
    }, [currentDate, fetchData])

    const handleRefresh = () => {
        fetchData(startDate, endDate)
    }

    return (<>
        <MyTable data={data} isSearchAble isLoading={isLoading} />
    </>)
}