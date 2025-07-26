import { fetchSanity, urlFor } from './useSanity'

export const useWork = async () => {
  const query = `*[_type == "portfolio"] | order(_createdAt desc)[0...5] {
    _id,
    title,
    summary,
    mainImage,
    slug {
      current
    },
  }`

  const data = await fetchSanity(query)

  return data.map(item => ({
    ...item,
    imageUrl: item.mainImage ? urlFor(item.mainImage)
      .width(400)
      .height(300)
      .fit('fill')
      .quality(85)
      .url() : null,
    slug: item.slug && item.slug.current ? { current: item.slug.current } : { current: '' }
  }))
}