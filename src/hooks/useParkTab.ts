import { useState, useEffect } from 'react'

export function useParkTab<T>(
    fetchFn: (parkCode: string) => Promise<{ data: T[]}>,
    parkCode: string
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!parkCode) return;

        fetchFn(parkCode)
        .then(res => setData(res.data))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parkCode])

    return { data, loading, error }
}