import { baseURL, person } from "@/config";

export function JsonLdSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: baseURL,
    image: `${baseURL}/images/avatar.png`,
    jobTitle: "Full-Stack Developer",
    email: person.email,
    telephone: "",
    sameAs: [
      "https://github.com/KathiravanBCS",
      "https://www.linkedin.com/in/kathiravan-vittobha-182569317/",
      "https://x.com/Kathiravan27117",
      "https://peerlist.io/kathiravan",
    ],
    knowsLanguage: person.languages,
    worksFor: {
      "@type": "Organization",
      name: "VSTN Technologies",
      url: "https://vstntechnologies.com",
    },
    homeLocation: {
      "@type": "Place",
      name: "Chennai, Tamil Nadu, India",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: person.name,
    url: baseURL,
    logo: `${baseURL}/images/logo.png`,
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, and AI integration",
    sameAs: [
      "https://github.com/KathiravanBCS",
      "https://www.linkedin.com/in/kathiravan-vittobha-182569317/",
      "https://x.com/Kathiravan27117",
      "https://peerlist.io/kathiravan",
    ],
    contact: {
      "@type": "ContactPoint",
      contactType: "General",
      email: person.email,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseURL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${baseURL}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blog",
        item: `${baseURL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Specialties",
        item: `${baseURL}/specialties`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: `${baseURL}/contact`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </>
  );
}
