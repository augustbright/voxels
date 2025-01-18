import { PropsWithChildren } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const DebuggerPanel = ({ children }: PropsWithChildren) => {
    return (
        <Panel
            className="rounded-lg border flex flex-col"
            defaultSize={30}
            minSize={20}
        >
            {children}
        </Panel>
    );
};

export const DebuggerProvider = ({ children }: PropsWithChildren) => {
    return (
        <PanelGroup className="grow" direction="horizontal">
            <DebuggerPanel>debug</DebuggerPanel>
            <PanelResizeHandle className="w-2" />
            <DebuggerPanel>{children}</DebuggerPanel>
        </PanelGroup>
    );
};
