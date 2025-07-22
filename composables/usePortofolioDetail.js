import { fetchSanity, urlFor } from './useSanity'

export const usePortofolioDetail = async (portofolioId) => {
  const query = `*[_type == "portofolio" && _id == $portofolioId][0] {
    _id,
    title,
    summary,
    mainImage,
    role,
    contribution,
    year,
    description,
    gallery[] {
      asset,
      hotspot,
      crop
    }
  }`

  const data = await fetchSanity(query, { portofolioId })

  if (!data) {
    return null
  }

  return {
    ...data,
    mainImageUrl: data.mainImage ? urlFor(data.mainImage).width(800).height(600).url() : null,
    galleryImages: data.gallery ? data.gallery.map(img => ({
      url: urlFor(img).width(600).height(400).url(),
      largeUrl: urlFor(img).width(1200).height(800).url()
    })) : []
  }
}