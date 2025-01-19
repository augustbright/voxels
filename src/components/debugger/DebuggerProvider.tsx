import { PropsWithChildren } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { DebuggerPanel } from "./DebuggerPanel";

export const DebuggerProvider = ({ children }: PropsWithChildren) => {
    return (
        <PanelGroup className="grow" direction="horizontal">
            <Panel
                className="rounded-lg border flex flex-col"
                defaultSize={20}
                minSize={5}
            >
                <DebuggerPanel />
            </Panel>
            <PanelResizeHandle className="w-2" />
            <Panel className="rounded-lg border flex flex-col">
                {children}
            </Panel>
        </PanelGroup>
    );
};
