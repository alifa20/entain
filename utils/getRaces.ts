import { ApiResponse } from "@/types/races";

interface Props {
    data?: ApiResponse
}

export function getRaces({ data }: Props) {

    if (!data) return []

    const { next_to_go_ids: raceIds = [], race_summaries } = data.data

    const upcomingRaces = raceIds.map(raceId => race_summaries[raceId])

    return upcomingRaces


}
