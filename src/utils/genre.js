import { categoryLabels } from '@/constants'

/**
 * Get genre labels from genres list
 * @param {Array} genresList - Array of genre objects with id property
 * @returns {Array} Array of genre objects with label and slug
 */
export const getGenreLabels = (genresList) => {
    return genresList?.map((item) => {
        const label = categoryLabels[item.id] ?? item.id
        return {
            label,
            slug: item.id,
        }
    })
}

