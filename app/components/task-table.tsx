import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Spinner
} from "@nextui-org/react";
import { TaskData } from "../lib/type";
import React from "react";

export const TaskTable = ({ todayTaskData, weeklyTaskData, isLoading }: {
    todayTaskData: TaskData[],
    weeklyTaskData: TaskData[],
    isLoading: boolean
}) => {
    const columns = [
        {
            key: 'agent_staffid',
            label: '分机号'
        },
        {
            key: 'duration_detail',
            label: '时长'
        },
        {
            key: 'duration',
            label: '总时长'
        },
        {
            key: 'counts_detail',
            label: '数量'
        },
        {
            key: 'counts',
            label: '总数量'
        }
    ]

    const cellRender = React.useCallback((item: { [x: string]: any; } & TaskData, columnKey: string | number) => {

        const cellValue: any = item[columnKey]

        switch (columnKey) {
            case "duration_detail":
                return (
                    <div className="p-1 rounded-lg">

                        <div className=" p-2 rounded-lg ">
                            {"呼入时长：" + Math.floor(item.incomingDuration / 60) + " 分钟"}
                        </div>
                        <div className=" p-2 rounded-lg">
                            {"呼出时长：" + Math.floor(item.outgoingDuration / 60) + " 分钟"}
                        </div>
                    </div>
                )

            case "duration":
                return (
                    <div>
                        {"共 " + Math.floor((item.incomingDuration + item.outgoingDuration) / 60) + " 分钟"}
                    </div>
                )

            case "counts_detail":
                return (
                    <div className="p-1 rounded-lg w-3/4" >
                        <div>
                            <div className=" p-1 rounded-lg ">
                                {"呼入数量：" + item.incomingCount + " 个"}
                            </div>
                            <div className="p-1 rounded-lg">
                                {"呼出数量：" + item.outgoingCount + " 个"}
                            </div>
                        </div>
                    </div>
                )
            case "counts":
                return (
                    <div>
                        {"共 " + (item.incomingCount + item.outgoingCount) + " 个"}
                    </div>
                )
            case ('agent_staffid'):
                return `${item.agent_name}(${cellValue})`

            default:
                return cellValue
        }
    }, [])

    return (
        <Table aria-label="This is a table"
            isStriped
            // selectionMode='single'
            color="primary"
            topContentPlacement="outside"
            bottomContentPlacement="outside"
            isHeaderSticky
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn maxWidth={2} key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                isLoading={isLoading}
                loadingContent={<Spinner label="正在加载..." />}
                // emptyContent={isLoading ?? (isSearchAble ? "没有找到记录..." : "去打个电话吧，完成今天的任务！")}
                emptyContent={isLoading ?? "去打个电话吧，完成今天的任务！"}
                items={todayTaskData}>

                {(item) => (
                    <TableRow key={item.agent_staffid}>
                        {(columnKey) => <TableCell>{cellRender(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

