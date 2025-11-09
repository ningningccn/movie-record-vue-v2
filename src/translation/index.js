import { categoryTranslation } from '@/translation/category'

/**
 * Translate genres list to localized labels
 * @param {Array} genresList - Array of genre objects with id property
 * @returns {Array} Array of genre objects with label and slug
 */
export const genresT = (genresList) => {
    return genresList?.map((item) => {
        const label = categoryTranslation[item.id] ?? item.id
        return {
            label,
            slug: item.id,
        }
    })
}

