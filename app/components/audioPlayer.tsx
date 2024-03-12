import React, { useState, useRef, useEffect } from 'react'
import { Progress, Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'
import { PlayIcon } from '@/app/icons/playicon'
import { PauseIcon } from '@/app/icons/pauseicon'
import { StopIcon } from '@/app/icons/stopicon'

interface PopoverPlayerProps {
    src: string;
}
interface AudioPlayerProps extends PopoverPlayerProps {
    setIsOpen: (isOpen: boolean) => void;
}

export const PopoverPlayer: React.FC<PopoverPlayerProps> = ({ src }) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popover
            isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} color='default' placement="bottom" showArrow={true}>
            <PopoverTrigger>
                <Button >播放录音</Button>
            </PopoverTrigger>
            <PopoverContent >
                <div className="flex flex-col px-1 py-2 w-[150px] max-h-[100px]">
                    <AudioPlayer setIsOpen={setIsOpen} src={src} />
                </div>
            </PopoverContent>
        </Popover>
    )
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, setIsOpen }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {

        let audio = audioRef.current;

        const fetchAudio = async () => {


            const response = await fetch(src);
            const arrayBuffer = await response.arrayBuffer();
            const blob = new Blob([arrayBuffer]);
            const url = URL.createObjectURL(blob);

            if (audio) {
                audio.src = url;
            }

        };

        fetchAudio();

        return () => {
            if (audio) {
                URL.revokeObjectURL(audio.src);
            }
        }

    }, [src]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        setIsPlaying(!isPlaying);
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
    }
    const stop = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setProgress(0);
        setIsPlaying(false);
        setIsOpen(false)
    }

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        isPlaying ? audio.play() : audio.pause();

        const setAudioProgress = () => {
            const duration = audio.duration;
            const currentTime = audio.currentTime;

            if (currentTime === 0) {
                return;
            }

            const progress = (currentTime / duration) * 100;
            setProgress(progress);
        }

        audio.addEventListener('timeupdate', setAudioProgress);

        return () => {
            audio.removeEventListener('timeupdate', setAudioProgress);
        }
    }, [isPlaying]);

    return (
        <div className="flex flex-col" >
            <audio ref={audioRef} onEnded={handleEnded} src={src} />
            <div className="flex justify-between">
                <Button isIconOnly onClick={togglePlay} color="primary" size='sm' >
                    {isPlaying
                        ? <PauseIcon
                            filled='primary'
                            height={24}
                            width={24}
                        />
                        : <PlayIcon
                            filled='primary'
                            height={24}
                            width={24} />}
                </Button>


                <Button isIconOnly onClick={stop} color="default" size='sm'>
                    <StopIcon
                        filled='primary'
                        height={24}
                        width={24} />
                </Button>
            </div>
            <Progress
                aria-label="Playing..."
                size="lg"
                value={progress}
                color="success"
                className="max-w-md mt-2 flex"
            />
            {/* <a href={src} download>下载</a> */}
        </div>
    );
}
