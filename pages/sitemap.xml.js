import prisma from "../lib/prisma";
const EXTERNAL_DATA_URL = "https://www.dogpatchapartments.com";

export async function getServerSideProps({ res }) {
  // We make an API call to gather slugs values of all complexes in DB
  const complexes = await prisma.complex.findMany({
    where: {
      location: String("Dogpatch"),
    },
    select: {
      slug: true,
      image: true,
    },
  });

  // We generate the XML sitemap with the complexes data
  const sitemap = generateSiteMap(complexes);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

function generateSiteMap(complexes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.dogpatchapartments.com</loc>
     </url>
     <url>
       <loc>https://www.dogpatchapartments.com/favorites</loc>
     </url>
     <url>
       <loc>https://www.dogpatchapartments.com/signup</loc>
     </url>
     <url>
       <loc>https://www.dogpatchapartments.com/communities-comparison</loc>
     </url>
     ${complexes
       .map((complex) => {
         return `
      <url>
          <loc>${`${EXTERNAL_DATA_URL}/${complex.slug}`}</loc>
          <image:image>
            <image:loc>${complex.image}</image:loc>
          </image:image>
      </url>
    `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export default SiteMap;
