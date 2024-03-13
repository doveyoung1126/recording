import { Button } from "@nextui-org/react"
import { DownloadIcon } from "../icons/downloadicon"
import { useState } from "react"
import { useRouter } from "next/navigation"

export const MyButton = ({ tmpurl }: { tmpurl: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        setIsLoading(true)
        router.push(tmpurl)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }
    return (
        <Button
            startContent={<DownloadIcon />}
            size='sm' color="primary" variant="light"
            disabled={isLoading}
            isLoading={isLoading}
            onClick={handleClick}
        >
            {isLoading ? '下载中' : '下载'}
        </Button>
    )
}