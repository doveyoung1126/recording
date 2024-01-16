import { MyCard } from "../components/cards"
import { MyTable } from "../components/table"
import { formatUserTodayRecords } from "../lib/formatdata"


export default async function Page() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const staffid = '8283'
    const totalMissionNum = 60
    const totalMissionMinutes = 100

    const { tableData, missions } = await formatUserTodayRecords(staffid, currentDate)

    return (
        <>
            <div className="flex " >
                <MyCard
                    value={missions.totalNum}
                    maxValue={totalMissionNum}
                    color="success"
                    cardfoot={`通话个数${missions.totalNum} / ${totalMissionNum} 个`}
                />
                <MyCard
                    value={Math.floor(missions.totalTime / 60)}
                    maxValue={totalMissionMinutes}
                    color="success"
                    cardfoot={`今日时长 ${Math.floor(missions.totalTime / 60)} / ${totalMissionMinutes} 分钟`}
                />
                <MyCard
                    value={missions.totalAnswered}
                    maxValue={missions.totalNum}
                    color="success"
                    cardfoot="接通率"
                />
            </div>
            <MyTable data={tableData} />
        </>
    )
}