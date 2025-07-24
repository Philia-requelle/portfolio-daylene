import { fetchSanity, urlFor } from './useSanity'

export const useportfolioDetail = async (portfolioSlug) => {
  const currentPortfolioQuery = `*[_type == "portfolio" && slug.current == $portfolioSlug][0] {
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
    },
    links[]
  }`

  const allPortfoliosQuery = `*[_type == "portfolio"] | order(_createdAt asc) {
    _id,
    slug
  }`

  const [currentPortfolioData, allPortfoliosData] = await Promise.all([
    fetchSanity(currentPortfolioQuery, { portfolioSlug }),
    fetchSanity(allPortfoliosQuery)
  ])

  if (!currentPortfolioData) {
    return null
  }

  const currentIndex = allPortfoliosData.findIndex(p => p._id === currentPortfolioData._id)

  const previousPortfolio = currentIndex > 0 ? allPortfoliosData[currentIndex - 1] : null
  const nextPortfolio = currentIndex < allPortfoliosData.length - 1 ? allPortfoliosData[currentIndex + 1] : null

  return {
    ...currentPortfolioData,
    mainImageUrl: currentPortfolioData.mainImage ? urlFor(currentPortfolioData.mainImage).width(800).height(600).url() : null,
    galleryImages: currentPortfolioData.gallery ? currentPortfolioData.gallery.map(img => ({
      url: urlFor(img).width(600).height(400).url(),
      largeUrl: urlFor(img).width(1200).height(800).url()
    })) : [],
    previousPortfolioSlug: previousPortfolio ? previousPortfolio.slug.current : null,
    nextPortfolioSlug: nextPortfolio ? nextPortfolio.slug.current : null
  }
}
