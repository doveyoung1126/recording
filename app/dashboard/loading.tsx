import { Skeleton, Card } from "@nextui-org/react"

const Loading = () => {

    return (
        <>
            <div className="flex ">
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
            </div>
            <Skeleton>
                <div className="w-full max-w-lg mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <Skeleton className="flex items-center justify-between mb-4">
                            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
                            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse" />
                        </Skeleton>
                        <Skeleton className="grid grid-cols-3 gap-4">
                            <div className="h-12 bg-gray-300 rounded animate-pulse" />
                            <div className="h-12 bg-gray-300 rounded animate-pulse" />
                            <div className="h-12 bg-gray-300 rounded animate-pulse" />
                        </Skeleton>
                        <div className="h-3 bg-gray-300 rounded mt-4 animate-pulse" />
                        <div className="h-3 bg-gray-300 rounded mt-2 w-3/4 animate-pulse" />
                    </div>
                </div>
            </Skeleton>

        </>
    )
}

export default Loading