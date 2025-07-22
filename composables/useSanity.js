import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 1. Setup Sanity connection
const client = createClient({
  projectId: 'c0oa8gno',
  dataset: 'production',
  apiVersion: '2023-07-21',
  useCdn: true,
})

// 2. Create image URL
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// 3. common fetch
export const fetchSanity = async (query, params = {}) => {
  return await client.fetch(query, params)
}
