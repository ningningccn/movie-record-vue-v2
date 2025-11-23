/**
 * TMDB (The Movie Database) label mappings
 * Centralized labels for categories, countries, and media types
 */

// Category/Genre labels
export const categoryLabels = {
    28: '動作',
    12: '冒險',
    16: '動畫',
    35: '喜劇',
    80: '犯罪',
    99: '紀錄',
    18: '劇情',
    10751: '家庭',
    14: '奇幻',
    36: '歷史',
    27: '恐怖',
    10402: '音樂',
    9648: '懸疑',
    10749: '愛情',
    878: '科學',
    10770: '電視電影',
    53: '驚悚',
    10752: '戰爭',
    37: '西部',
    10759: '動作冒險',
    10762: '兒童',
    10763: '新聞',
    10764: '真人秀',
    10765: '科幻與奇幻',
    10766: '肥皂劇',
    10767: '脱口秀',
    10768: '戰爭與政治',
}

// Category options array for form selects
export const categoryOptions = Object.entries(categoryLabels).map(([id, label]) => ({
    id: Number(id),
    label,
}))

// Country labels
export const countryLabels = {
    JP: '日本',
    TW: '台灣',
    US: '美國',
    KR: '韓國',
    HK: '香港',
    CN: '中國',
}

// Media type labels
export const typeLabels = {
    movie: '電影',
    tv: '電視劇',
    cartoon: '動漫',
}

