import { categoryTranslation } from '@/translation/category'

export const genresT = (genresList) => {
    return genresList?.map((item) => {
        const label = categoryTranslation[item.id] ?? item.id
        return {
            label,
            slug: item.id,
        }
    })
}
