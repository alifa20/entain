
import { useGetNextRacesQuery } from '@/lib/services/api';
import { getRaces } from '@/utils/getRaces';
import { useMemo } from 'react';

const refetchFrequency = 60000 // 60 seconds

export function useRaceData() {
    const { data: raw, isLoading, error } = useGetNextRacesQuery({ count: 10 },
        {
            pollingInterval: refetchFrequency,
        }
    )

    const data = useMemo(() => getRaces({ data: raw }), [raw])

    return { data, isLoading, error }
}
