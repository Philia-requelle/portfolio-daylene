import { fetchSanity, urlFor } from './useSanity'

export const useHomeCard = async () => {
  const query = `*[_type == "portfolio"] | order(_createdAt desc)[0...5] {
    _id,
    title,
    summary,
    mainImage
  }`

  const data = await fetchSanity(query)

  return data.map(item => ({
    ...item,
    imageUrl: urlFor(item.mainImage)
      .width(400)
      .height(300)
      .fit('fill')
      .quality(85)
      .url(),
  }))
}