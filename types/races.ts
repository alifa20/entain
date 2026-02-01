// API Response Types, genarated from the json api example
export interface ApiResponse {
    status: number
    data: RaceData
    message: string
}

export interface RaceData {
    next_to_go_ids: string[]
    race_summaries: Record<string, RaceSummary>
}

// Race Summary
export interface RaceSummary {
    race_id: string
    race_name: string
    race_number: number
    meeting_id: string
    meeting_name: string
    category_id: string
    advertised_start: AdvertisedStart
    race_form: RaceForm
    venue_id: string
    venue_name: string
    venue_state: string
    venue_country: string
}

export interface AdvertisedStart {
    seconds: number
}

export interface RaceForm {
    distance: number
    distance_type: DistanceType
    distance_type_id: string
    track_condition: TrackCondition
    track_condition_id: string
    weather: Weather
    weather_id: string
    race_comment: string
    additional_data: string
    generated: number
    silk_base_url: string
    race_comment_alternative: string
}

export interface DistanceType {
    id: string
    name: string
    short_name: string
}

export interface TrackCondition {
    id: string
    name: string
    short_name: string
}

export interface Weather {
    id: string
    name: string
    short_name: string
    icon_uri: string
}

// Category IDs (for filtering)
export const CATEGORY_IDS = {
    HORSE_RACING: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
    GREYHOUND: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    HARNESS: '161d9be2-e909-4326-8c2c-35ed71fb460b',
} as const

export type CategoryId = typeof CATEGORY_IDS[keyof typeof CATEGORY_IDS]
