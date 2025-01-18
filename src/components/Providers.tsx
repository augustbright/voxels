import { Theme } from "@radix-ui/themes";
import { PropsWithChildren, StrictMode } from "react";
import { DebuggerProvider } from "./debugger/DebuggerProvider";

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <StrictMode>
            <Theme className="flex flex-col">
                <DebuggerProvider>{children}</DebuggerProvider>
            </Theme>
        </StrictMode>
    );
};
