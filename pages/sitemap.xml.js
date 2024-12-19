import prisma from "../lib/prisma";
import {
  dogpatchData,
  missionBayData,
  rinconHillData,
  SFData
} from "../lib/defaults";

export async function getServerSideProps({ req, res }) {
  const host = req.headers.host;

  // Dogpatch data as default
  var location = dogpatchData.location;
  var linkHome = dogpatchData.linkHome;
  var hasDistricts = false;

  // Mission Bay
  if (host === missionBayData.domain) {
    linkHome = missionBayData.linkHome;
    location = missionBayData.location;
  }

  // Rincon Hill
  if (host === rinconHillData.domain) {
    linkHome = rinconHillData.linkHome;
    location = rinconHillData.location;
  }

  // SF Homepage
  if (host === SFData.domain) {
    linkHome = SFData.linkHome;
    location = null;
    hasDistricts = true;
  }

  // We make an API call to gather slugs values of all complexes in DB
  var complexes = null;
  var districts = null;
  if (location) {
    complexes = await prisma.complex.findMany({
      where: {
        location: String(location)
      },
      select: {
        slug: true,
        image: true
      }
    });
  } else {
    complexes = await prisma.complex.findMany({
      select: {
        slug: true,
        image: true
      }
    });
  }

  if (hasDistricts) {
    districts = await prisma.district.findMany({
      select: {
        link: true,
        image: true
      }
    });
  }

  // We generate the XML sitemap with the complexes data
  const sitemap = generateSiteMap(linkHome, complexes, districts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
}

function generateSiteMap(linkHome, complexes, districts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     <url>
       <loc>${linkHome}</loc>
     </url>
     <url>
       <loc>${linkHome}favorites</loc>
     </url>
     <url>
       <loc>${linkHome}signup</loc>
     </url>
     <url>
       <loc>${linkHome}communities-comparison</loc>
     </url>
     ${
       complexes &&
       complexes
         .map((complex) => {
           return `
      <url>
          <loc>${`${linkHome}${complex.slug}`}</loc>
          <image:image>
            <image:loc>${complex.image}</image:loc>
          </image:image>
      </url>
    `;
         })
         .join("")
     }
     ${
       districts &&
       districts
         .map((district) => {
           return `
     <url>
         <loc>${district.link}</loc>
         <image:image>
           <image:loc>${district.image}</image:loc>
         </image:image>
     </url>
   `;
         })
         .join("")
     }
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export default SiteMap;
