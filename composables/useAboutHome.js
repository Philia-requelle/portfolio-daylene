import { fetchSanity, urlFor } from "./useSanity";

export const useAboutHome = async () => {
    const query = `*[_type == "about"][0] {
        aboutImage,
        aboutDescription,
        }`;

    const data = await fetchSanity(query);

    return {
        description: data.aboutDescription,
        aboutImageUrl: urlFor(data.aboutImage)
            .width(300)
            .height(400)
            .fit('fill')
            .quality(85)
            .url(),
    }
}