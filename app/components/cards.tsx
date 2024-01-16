import { Card, CardHeader, CardBody, CardFooter, CircularProgress } from "@nextui-org/react";

export const MyCard = ({
    value,
    maxValue,
    color,
    cardfoot,
}: {
    value: number,
    maxValue: number,
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger",
    cardfoot: string
}) => {

    return (
        <Card className="p-4 m-2" >

            <CardBody>
                <CircularProgress
                    classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        // indicator: "stroke-white",
                        track: "stroke-black/10",
                        value: `text-3xl font-semibold text-${color}`,
                    }}
                    value={value}
                    strokeWidth={4}
                    showValueLabel={true}
                    aria-label="progress"
                    color={color}
                    maxValue={maxValue}
                />
            </CardBody>
            <CardFooter className="justify-center">
                {cardfoot}
            </CardFooter>
        </Card>
    )
}

