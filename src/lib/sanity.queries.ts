import groq from 'groq';

export const modulesQuery = groq`
  *[_type == "module"] | order(order asc){
    _id,
    title,
    description,
    ctaLabel,
    ctaHref,
    iconKey,
    layoutKey
  }
`;
