
export interface DirectionsResponse {
    type:        string;
    features:    Feature[];
    query:       string[];
    attribution: string;
}

export interface Feature {
    type:                string;
    properties:          Properties;
    geometry:            Geometry;
    bbox:                number[];
    center:              number[];
    place_name:          string;
    place_type:          string[];
    relevance:           number;
    id:                  string;
    text:                string;
    matching_text:       string;
    matching_place_name: string;
    context:             Context[];
}

export interface Context {
    ref:          string;
    country_code: string;
    id:           string;
    text:         string;
    wikidata:     string;
    categories:   string[];
    "osm:tags":   OsmTags;
}

export interface OsmTags {
    population?: string;
    place:       string;
    wikipedia:   string;
    sqkm:        string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    ref:          string;
    country_code: string;
    wikidata:     string;
    kind:         string;
}
