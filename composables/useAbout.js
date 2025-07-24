import { fetchSanity, urlFor } from "./useSanity";
export const useAbout = async () => {
    const query = `*[_type == "about"][0] {
        aboutImage,
        aboutDescription,
        experiences[] {
            title,
            company,
            description,
            startDate,
            endDate,
            isCurrent
        },
        educations[] {
            title,
            institution,
            description,
            startDate,
            endDate,
            isCurrent
        },
        disciplines[] {
            name
        },
        tools[] {
            name,
            icon
        }
    }`;

    const data = await fetchSanity(query);

    const formatDateToMonthYear = (dateString, isCurrent) => {
        if (isCurrent) return 'Present'; // Jika isCurrent true, kembalikan 'Present'
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return {
        description: data.aboutDescription,
        aboutImageUrl: urlFor(data.aboutImage)
            .width(300)
            .height(400)
            .fit('fill')
            .quality(85)
            .url(),
        experiences: data.experiences.map(experience => ({
            ...experience,
            formattedStartDate: formatDateToMonthYear(experience.startDate, false),
            formattedEndDate: formatDateToMonthYear(experience.endDate, experience.isCurrent),
        })),
        educations: data.educations.map(education => ({
            ...education,
            formattedStartDate: formatDateToMonthYear(education.startDate, false),
            formattedEndDate: formatDateToMonthYear(education.endDate, education.isCurrent),
        })),
        disciplines: data.disciplines,
        tools: data.tools.map(tool => ({
            ...tool,
            iconUrl: urlFor(tool.icon).url()
        })),
    }
}