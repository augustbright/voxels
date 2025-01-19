import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDownIcon, Flex, Text } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { ATOMS } from "../../atoms";
import { ComponentType, ReactNode } from "react";
import clsx from "clsx";
import { property } from "lodash";
import { useFps } from "react-fps";

type AccordionItem = {
    header: string;
    Content: ComponentType;
};

const Info = ({ label, value }: { label: string; value: ReactNode }) => (
    <Flex gap="2">
        <Text>{label}:</Text>
        <Text className="font-bold">{value}</Text>
    </Flex>
);

const items: AccordionItem[] = [
    {
        header: "Statistics",
        Content: () => {
            const { avgFps, currentFps } = useFps(3);
            return (
                <Flex direction="column" gap="2">
                    <Info label="Current FPS" value={currentFps} />
                    <Info label="Average FPS" value={avgFps} />
                    <Info
                        label="Voxels count"
                        value={useAtomValue(ATOMS.voxelsCount).toLocaleString()}
                    />
                </Flex>
            );
        },
    },
];

export const DebuggerPanel = () => {
    return (
        <Accordion
            type="multiple"
            defaultValue={items.map(property("header"))}
            className={clsx("space-y-4 w-full")}
        >
            {items.map(({ header, Content }) => (
                <AccordionItem
                    key={`accordion-header-${header}`}
                    value={header}
                    className="rounded-lg focus-within:ring focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-none w-full"
                >
                    <AccordionHeader className="w-full">
                        <AccordionTrigger
                            className={clsx(
                                "group",
                                "radix-state-open:rounded-t-lg radix-state-closed:rounded-lg",
                                "focus:outline-none",
                                "inline-flex w-full items-center justify-between bg-white px-4 py-2 text-left dark:bg-gray-800"
                            )}
                        >
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {header}
                            </span>
                            <ChevronDownIcon
                                className={clsx(
                                    "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                                    "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                                )}
                            />
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="pt-1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
                        <div className="text-sm text-gray-700 dark:text-gray-400">
                            <Content />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
