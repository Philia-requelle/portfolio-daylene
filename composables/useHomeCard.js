// composables/useHomeCard.js
import { fetchSanity, urlFor } from './useSanity'

export const useHomeCard = async () => {
  const query = `*[_type == "portofolio"] | order(_createdAt desc)[0...5] {
    _id,
    title,
    summary,
    mainImage
  }`

  const data = await fetchSanity(query)

  return data.map(item => ({
    ...item,
    imageUrl: urlFor(item.mainImage).width(600).height(400).url(),
  }))
}