import { useEffect, useRef, useState } from 'react';

export const usePrevious = <T>(value: T) => {
    const previousRef = useRef<T | undefined>(undefined);
    const previous = previousRef.current;
    previousRef.current = value;
    return previous;
};

export const useOnChange = (value: unknown, callback: () => void) => {
    if (value !== usePrevious(value)) {
        callback();
    }
};

export const useOnWillMount = (callback: () => void): void => {
    const isRendered = useRef(false);

    if (!isRendered.current) {
        callback();
        isRendered.current = true;
    }
};

export const useOnMount = (callback: () => void): void => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useOnChange(isMounted, () => {
        if (isMounted) {
            callback();
        }
    });
};