import { MyCard } from "../components/cards"
import { Table } from "../components/table"

export default function Page() {
    return (
        <>
            <div className="flex">
                <MyCard value={60} color="success" cardfoot="今日工作进度" />
                <MyCard value={80} color="success" cardfoot="本周工作进度" />
                <MyCard value={20} color="warning" cardfoot="本周拒接率" />
            </div>
            <Table />
        </>
    )
}