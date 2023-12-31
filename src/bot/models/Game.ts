export interface Game {
    id?:         number;
    attributes?: GameAttributes;
}

export interface GameAttributes {
    name?:             string;
    createdAt?:        Date;
    updatedAt?:        Date;
    publishedAt?:      Date;
    description?:      string;
    req_min?:          string;
    rec_rec?:          string;
    trailer_url?:      string;
    generos?:          Caracterisiticas;
    caracterisiticas?: Caracterisiticas;
    vistas?:           Caracterisiticas;
    companias?:        Caracterisiticas;
    cover?:            Cover;
    plataformas?:      Caracterisiticas;
}

export interface Caracterisiticas {
    data?: Datum[];
}

export interface Datum {
    id?:         number;
    attributes?: DatumAttributes;
}

export interface DatumAttributes {
    name?:        string;
    createdAt?:   Date;
    updatedAt?:   Date;
    publishedAt?: Date;
}

export interface Cover {
    data?: Data;
}

export interface Data {
    id?:         number;
    attributes?: DataAttributes;
}

export interface DataAttributes {
    name?:              string;
    alternativeText?:   null;
    caption?:           null;
    width?:             number;
    height?:            number;
    formats?:           Formats;
    hash?:              string;
    ext?:               string;
    mime?:              string;
    size?:              number;
    url?:               string;
    previewUrl?:        null;
    provider?:          string;
    provider_metadata?: ProviderMetadata;
    createdAt?:         Date;
    updatedAt?:         Date;
}

export interface Formats {
    thumbnail?: Thumbnail;
}

export interface Thumbnail {
    ext?:               string;
    url?:               string;
    hash?:              string;
    mime?:              string;
    name?:              string;
    path?:              null;
    size?:              number;
    width?:             number;
    height?:            number;
    provider_metadata?: ProviderMetadata;
}

export interface ProviderMetadata {
    public_id?:     string;
    resource_type?: string;
}
