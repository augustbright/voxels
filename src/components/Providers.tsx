import { Theme } from "@radix-ui/themes";
import { PropsWithChildren, StrictMode } from "react";
import { DebuggerProvider } from "./debugger/DebuggerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Theme className="flex flex-col">
                    <DebuggerProvider>{children}</DebuggerProvider>
                </Theme>
            </QueryClientProvider>
        </StrictMode>
    );
};
