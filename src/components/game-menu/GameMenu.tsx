import { Button, Spinner } from "@radix-ui/themes";
import clsx from "clsx";

export const GameMenu = ({
    isOpen,
    onPlay,
    isPending,
}: {
    isOpen: boolean;
    onPlay: () => void;
    isPending?: boolean;
}) => {
    const handleClickPlay = () => {
        onPlay();
    };

    return (
        <div
            className={clsx(
                "absolute top-0 left-0 right-0 bottom-0",
                "flex justify-center items-center bg-gray-900 bg-opacity-50",
                "transition-opacity duration-300",
                {
                    "opacity-100 pointer-events-auto": isOpen,
                    "opacity-0 pointer-events-none": !isOpen,
                }
            )}
        >
            {isPending ? (
                <Spinner size="3" className="text-white" />
            ) : (
                <div className="rounded-lg bg-gray-800 p-4">
                    <Button onClick={handleClickPlay}>Play</Button>
                </div>
            )}
        </div>
    );
};
