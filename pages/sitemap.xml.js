import prisma from "../lib/prisma";
import { dogpatchData, missionBayData } from "../lib/defaults";
const EXTERNAL_DATA_URL = "https://www.dogpatchapartments.com";

export async function getServerSideProps({ req, res }) {
  const host = req.headers.host;
  var location = "Dogpatch";
  if (host === dogpatchData.domain) location = dogpatchData.location;
  if (host === missionBayData.domain) location = missionBayData.location;

  // We make an API call to gather slugs values of all complexes in DB
  const complexes = await prisma.complex.findMany({
    where: {
      location: String(location),
    },
    select: {
      slug: true,
      image: true,
    },
  });

  // We generate the XML sitemap with the complexes data
  const sitemap = generateSiteMap(host, complexes);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

function generateSiteMap(host, complexes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.sitemaps.org/schemas/sitemap-image/1.1">
     <url>
       <loc>${host}</loc>
     </url>
     <url>
       <loc>${host}/favorites</loc>
     </url>
     <url>
       <loc>${host}/signup</loc>
     </url>
     <url>
       <loc>${host}/communities-comparison</loc>
     </url>
     ${complexes
       .map((complex) => {
         return `
      <url>
          <loc>${`${host}/${complex.slug}`}</loc>
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
