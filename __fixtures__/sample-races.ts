import { ApiResponse, CATEGORY_IDS } from '@/types/races'

export const getSampleRacesData = (): ApiResponse => {
  const now = Math.floor(Date.now() / 1000);

  return {
  status: 200,
  data: {
    next_to_go_ids: [
      'race-001',
      'race-002',
      'race-003',
      'race-004',
      'race-005',
      'race-006'
    ],
    race_summaries: {
      'race-001': {
        race_id: 'race-001',
        race_name: 'Melbourne Cup',
        race_number: 7,
        meeting_id: 'meet-001',
        meeting_name: 'Flemington',
        category_id: CATEGORY_IDS.HORSE_RACING,
        advertised_start: {
          seconds: now + 10 // 10 seconds from now
        },
        race_form: {
          distance: 3200,
          distance_type: {
            id: 'dt-001',
            name: 'Metres',
            short_name: 'm'
          },
          distance_type_id: 'dt-001',
          track_condition: {
            id: 'tc-001',
            name: 'Good',
            short_name: 'good'
          },
          track_condition_id: 'tc-001',
          weather: {
            id: 'w-001',
            name: 'Fine',
            short_name: 'fine',
            icon_uri: 'Fine'
          },
          weather_id: 'w-001',
          race_comment: 'The race that stops a nation. Top contenders include Thunder Storm and Lightning Bolt.',
          additional_data: '{}',
          generated: 1,
          silk_base_url: 'drr38safykj6s.cloudfront.net',
          race_comment_alternative: 'Premier racing event with elite field.'
        },
        venue_id: 'venue-001',
        venue_name: 'Flemington',
        venue_state: 'VIC',
        venue_country: 'AUS'
      },
      'race-002': {
        race_id: 'race-002',
        race_name: 'Golden Slipper Stakes',
        race_number: 5,
        meeting_id: 'meet-002',
        meeting_name: 'Rosehill',
        category_id: CATEGORY_IDS.HORSE_RACING,
        advertised_start: {
          seconds: now + 300 // 5 minutes from now
        },
        race_form: {
          distance: 1200,
          distance_type: {
            id: 'dt-001',
            name: 'Metres',
            short_name: 'm'
          },
          distance_type_id: 'dt-001',
          track_condition: {
            id: 'tc-002',
            name: 'Soft',
            short_name: 'soft'
          },
          track_condition_id: 'tc-002',
          weather: {
            id: 'w-002',
            name: 'Overcast',
            short_name: 'overcast',
            icon_uri: 'Overcast'
          },
          weather_id: 'w-002',
          race_comment: 'Juvenile championship race featuring promising two-year-olds.',
          additional_data: '{}',
          generated: 1,
          silk_base_url: 'drr38safykj6s.cloudfront.net',
          race_comment_alternative: 'Top juvenile racing action.'
        },
        venue_id: 'venue-002',
        venue_name: 'Rosehill',
        venue_state: 'NSW',
        venue_country: 'AUS'
      },
      'race-003': {
        race_id: 'race-003',
        race_name: 'Bendigo Cup',
        race_number: 3,
        meeting_id: 'meet-003',
        meeting_name: 'Bendigo',
        category_id: CATEGORY_IDS.GREYHOUND,
        advertised_start: {
          seconds: now + 180 // 3 minutes from now
        },
        race_form: {
          distance: 450,
          distance_type: {
            id: 'dt-001',
            name: 'Metres',
            short_name: 'm'
          },
          distance_type_id: 'dt-001',
          track_condition: {
            id: 'tc-001',
            name: 'Good',
            short_name: 'good'
          },
          track_condition_id: 'tc-001',
          weather: {
            id: 'w-001',
            name: 'Fine',
            short_name: 'fine',
            icon_uri: 'Fine'
          },
          weather_id: 'w-001',
          race_comment: 'Fast greyhounds battle for supremacy. Speed Star is the one to watch.',
          additional_data: '{}',
          generated: 1,
          silk_base_url: 'drr38safykj6s.cloudfront.net',
          race_comment_alternative: 'Elite greyhound competition.'
        },
        venue_id: 'venue-003',
        venue_name: 'Bendigo',
        venue_state: 'VIC',
        venue_country: 'AUS'
      },
      'race-004': {
        race_id: 'race-004',
        race_name: 'Wentworth Park Sprint',
        race_number: 8,
        meeting_id: 'meet-004',
        meeting_name: 'Wentworth Park',
        category_id: CATEGORY_IDS.GREYHOUND,
        advertised_start: {
          seconds: now + 420 // 7 minutes from now
        },
        race_form: {
          distance: 520,
          distance_type: {
            id: 'dt-001',
            name: 'Metres',
            short_name: 'm'
          },
          distance_type_id: 'dt-001',
          track_condition: {
            id: 'tc-001',
            name: 'Good',
            short_name: 'good'
          },
          track_condition_id: 'tc-001',
          weather: {
            id: 'w-003',
            name: 'Clear',
            short_name: 'clear',
            icon_uri: 'Clear'
          },
          weather_id: 'w-003',
          race_comment: 'Competitive field with Rocket Runner showing recent form.',
          additional_data: '{}',
          generated: 1,
          silk_base_url: 'drr38safykj6s.cloudfront.net',
          race_comment_alternative: 'Quality greyhound sprint.'
        },
        venue_id: 'venue-004',
        venue_name: 'Wentworth Park',
        venue_state: 'NSW',
        venue_country: 'AUS'
      },
      'race-005': {
        race_id: 'race-005',
        race_name: 'Albion Park Pacers Cup',
        race_number: 6,
        meeting_id: 'meet-005',
        meeting_name: 'Albion Park',
        category_id: CATEGORY_IDS.HARNESS,
        advertised_start: {
          seconds: now + 240 // 4 minutes from now
        },
        race_form: {
          distance: 2138,
          distance_type: {
            id: 'dt-001',
            name: 'Metres',
            short_name: 'm'
          },
          distance_type_id: 'dt-001',
          track_condition: {
            id: 'tc-001',
            name: 'Good',
            short_name: 'good'
          },
          track_condition_id: 'tc-001',
          weather: {
            id: 'w-001',
            name: 'Fine',
            short_name: 'fine',
            icon_uri: 'Fine'
          },
          weather_id: 'w-001',
          race_comment: 'Mobile pace with strong field. Midnight Express looking sharp.',
          additional_data: '{}',
          generated: 1,
          silk_base_url: 'drr38safykj6s.cloudfront.net',
          race_comment_alternative: 'Premier harness racing.'
        },
        venue_id: 'venue-005',
        venue_name: 'Albion Park',
        venue_state: 'QLD',
        venue_country: 'AUS'
      },
      'race-006': {
        race_id: 'race-006',
        race_name: 'Menangle Magic Mile',
        race_number: 4,
        meeting_id: 'meet-006',
        meeting_name: 'Menangle',
        category_id: CATEGORY_IDS.HARNESS,
        advertised_start: {
          seconds: now + 540 // 9 minutes from now
        },
        race_form: {
          distance: 1609,
          distance_type: {
            id: 'dt-001',
            name: 'Metres',
            short_name: 'm'
          },
          distance_type_id: 'dt-001',
          track_condition: {
            id: 'tc-001',
            name: 'Good',
            short_name: 'good'
          },
          track_condition_id: 'tc-001',
          weather: {
            id: 'w-002',
            name: 'Overcast',
            short_name: 'overcast',
            icon_uri: 'Overcast'
          },
          weather_id: 'w-002',
          race_comment: 'Classic mile race featuring Dream Dancer and Night Rider.',
          additional_data: '{}',
          generated: 1,
          silk_base_url: 'drr38safykj6s.cloudfront.net',
          race_comment_alternative: 'Traditional mile championship.'
        },
        venue_id: 'venue-006',
        venue_name: 'Menangle',
        venue_state: 'NSW',
        venue_country: 'AUS'
      }
    }
  },
  message: 'Sample race data for testing'
  };
}
