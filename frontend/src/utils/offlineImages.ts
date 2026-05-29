// src/utils/offlineImages.ts

export interface OfflineImage {
  id: number;
  filename: string;
  path: string;
  title: string;
  date: string;
  caption: string;
}

// Exactly 26 downloaded high-quality offline images in c:\Users\tpulk\OneDrive\Desktop\Projects\secret\Stich generated ui\Final Design
export const OFFLINE_IMAGES: OfflineImage[] = [
  {
    id: 1,
    filename: 'IMG-20260401-WA0069.jpg',
    path: '/IMG-20260401-WA0069.jpg',
    title: 'The Beginning',
    date: 'Day 1 • 2026',
    caption: 'Our first hello, frozen in time.'
  },
  {
    id: 2,
    filename: 'IMG-20260401-WA0089.jpg',
    path: '/IMG-20260401-WA0089.jpg',
    title: 'Hidden Date',
    date: 'February 2026',
    caption: 'Quiet walks and unscripted laughter.'
  },
  {
    id: 3,
    filename: 'IMG-20260401-WA0093.jpg',
    path: '/IMG-20260401-WA0093.jpg',
    title: 'Hidden Date II',
    date: 'February 2026',
    caption: 'Quiet moments under the afternoon haze.'
  },
  {
    id: 4,
    filename: 'IMG-20260401-WA0100 (1).jpg',
    path: '/IMG-20260401-WA0100 (1).jpg',
    title: 'First Connection',
    date: 'March 2026',
    caption: 'Soft murmurs in the afternoon haze.'
  },
  {
    id: 5,
    filename: 'IMG-20260402-WA0003.jpg',
    path: '/IMG-20260402-WA0003.jpg',
    title: 'The Sunset Promise',
    date: '23rd Mar 2026',
    caption: 'The Koti sunset where the world stood still.'
  },
  {
    id: 6,
    filename: 'IMG-20260404-WA0102.jpg',
    path: '/IMG-20260404-WA0102.jpg',
    title: 'A Touch of Elegance',
    date: 'April 2026',
    caption: 'A touch of elegance in a busy world.'
  },
  {
    id: 7,
    filename: 'IMG-20260421-WA0049.jpg',
    path: '/IMG-20260421-WA0049.jpg',
    title: 'Golden Glances',
    date: 'April 2026',
    caption: 'Eyes that speak a thousand letters.'
  },
  {
    id: 8,
    filename: 'Home.jpg',
    path: '/Home.jpg', // Map directly to Home.jpg for home background
    title: 'Cinematic Portrait',
    date: 'May 2026',
    caption: 'Holding onto the fleeting light.'
  },
  {
    id: 9,
    filename: 'IMG-20260426-WA0042.jpg',
    path: '/IMG-20260426-WA0042.jpg',
    title: 'Unscripted Moments',
    date: 'Anniversary • 2026',
    caption: 'You and me, completely unscripted.'
  },
  {
    id: 10,
    filename: 'IMG-20260505-WA0031.jpg',
    path: '/IMG-20260505-WA0031.jpg',
    title: 'Chasing Sunsets',
    date: 'Golden Hour • 2026',
    caption: 'Chasing sunsets across the ridge.'
  },
  {
    id: 11,
    filename: 'IMG-20260507-WA0000.jpg',
    path: '/IMG-20260507-WA0000.jpg',
    title: 'Soft Focus',
    date: 'Spring 2026',
    caption: 'Frail beauty in quiet focus.'
  },
  {
    id: 12,
    filename: 'IMG-20260516-WA0022.jpg',
    path: '/IMG-20260516-WA0022.jpg',
    title: 'Golden Hour Reflections',
    date: 'May 2026',
    caption: 'Sunbeams dancing through the window frame.'
  },
  {
    id: 13,
    filename: 'IMG-20260402-WA0081.jpg',
    path: '/IMG-20260402-WA0081.jpg',
    title: 'Warm Shadows',
    date: 'May 2026',
    caption: 'Warm shadows and whispers on a Sunday.'
  },
  {
    id: 14,
    filename: 'IMG-20260517-WA0058.jpg',
    path: '/IMG-20260517-WA0058.jpg',
    title: 'Rooftop Conversations',
    date: 'May 2026',
    caption: 'Rooftop conversations in the breeze.'
  },
  {
    id: 15,
    filename: 'IMG-20260517-WA0113.jpg',
    path: '/IMG-20260517-WA0113.jpg',
    title: 'Vintage Film Capture',
    date: 'May 2026',
    caption: 'A vintage-style portrait capture with warm film grain.'
  },
  {
    id: 16,
    filename: 'IMG-20260517-WA0115.jpg',
    path: '/IMG-20260517-WA0115.jpg',
    title: 'Midnight Walks',
    date: 'May 2026',
    caption: 'Midnight walks under the neon lights.'
  },
  {
    id: 17,
    filename: 'IMG-20260402-WA0081.jpg',
    path: '/IMG-20260402-WA0081.jpg',
    title: 'Warm Shadows',
    date: 'May 2026',
    caption: 'Warm shadows and whispers on a Sunday.'
  },
  {
    id: 18,
    filename: 'IMG-20260517-WA0119.jpg',
    path: '/IMG-20260517-WA0119.jpg',
    title: 'First Movie Night',
    date: 'May 2026',
    caption: 'Shared laughter on our first cozy movie night.'
  },
  {
    id: 19,
    filename: 'IMG-20260517-WA0262.jpg',
    path: '/IMG-20260517-WA0262.jpg',
    title: 'Tender Glances',
    date: 'May 2026',
    caption: 'A glance that speaks volumes.'
  },
  {
    id: 20,
    filename: 'IMG-20260517-WA0269.jpg',
    path: '/IMG-20260517-WA0269.jpg',
    title: 'Sweet Whispers',
    date: 'May 2026',
    caption: 'Sweet whispers that make the heart beat faster.'
  },
  {
    id: 21,
    filename: 'IMG-20260402-WA0127.jpg',
    path: '/IMG-20260402-WA0127.jpg',
    title: 'Soft Smiles',
    date: 'May 2026',
    caption: 'Smiling at nothing, just happy to be here.'
  },
  {
    id: 22,
    filename: 'IMG-20260517-WA0273.jpg',
    path: '/IMG-20260517-WA0273.jpg',
    title: 'Warm Touches',
    date: 'May 2026',
    caption: 'Hands held warm in the chilly air.'
  },
  {
    id: 23,
    filename: 'IMG-20260517-WA0273.jpg',
    path: '/IMG-20260517-WA0273.jpg',
    title: 'Warm Hugs',
    date: 'May 2026',
    caption: 'Cozy and safe in a gentle embrace.'
  },
  {
    id: 24,
    filename: 'IMG-20260517-WA0278.jpg',
    path: '/IMG-20260517-WA0278.jpg',
    title: 'Golden Fields',
    date: 'May 2026',
    caption: 'Running through golden fields at dusk.'
  },
  {
    id: 25,
    filename: 'IMG-20260401-WA0069.jpg',
    path: '/IMG-20260401-WA0069.jpg',
    title: 'Quiet Walks',
    date: 'Day 50 • 2026',
    caption: 'A quiet, unscripted trail we walked together.'
  },
  {
    id: 26,
    filename: 'Snapchat-38155119.jpg',
    path: '/Snapchat-38155119.jpg',
    title: 'Playful Snapshots',
    date: 'April 2026',
    caption: 'Making silly faces, preserving the raw joy.'
  }
];

// Mapping of Google Photos URLs to their offline local counterparts
export const GOOGLE_PHOTOS_MAP: Record<string, string> = {
  // Gallery & Story item 1
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAYUaa3jkHe2Sjv1CgakMozr3mnOMjzPrM3fRO_yKIfpAZbjcJtq7JJJPGyxEDdyH4ObCd2lkiqMnHDPGa_-8DjWy7F-gmG-p9MLZHcVD2ClW3UofCk6SGFATRx_L9z1nuQFY4UTxcS3iCiZmG0qvRpE2bBRbufR1o7PSwCQH6BpYZehMeSrxNe2GAL5EHXZr8KMIrJNKmgyD3gyydHCj2pPtpJxXOJVaQM5d340iRqRxI3dhH8nEo4pvWqSpPsr1wt5mjn_tnfpKU': '/IMG-20260401-WA0069.jpg',
  
  // Gallery & Story item 2
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDMLPhes4rjYQsK9qwFRleiNCdcLGtLdGa3c93y-nhK86Ids3yzL9hsfx6ccKCgsN_1PFwGphIp_UtCQm8aUXgXlfwxMZ742Dbj_xe-nnnGlMKfJQEx5GQBGWlA6ZOCFHL3liwyy5qUag4GtO4fyBuYDpFwF5qlkdT29PDJ-HJ5xA8bVKdPitMSOccMaKkrsUfZYGsLxQ5ou8aSlLyEYxYKapb6ywWv9QXtI8awERENr8XDIA6rh2KYgmTrVrm1F-UHGawd_zGMif4': '/IMG-20260401-WA0089.jpg',
  
  // Gallery & Story item 3
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDVG1JhOwI_22SfsYcSNyn8YhqtD40XoWfvBiHJ8aozCNgAZaOuLX9z_MsyepyQ94LnKlSa2znNI7YFyagOEGtFEgjMda5m5mWPMsfY3gEVQcQ3SGatky9Es6dqxtk0V0ITCk3zinUul435Fo0IrFmt7z5gzEMdlH9fDJVRTGF5xXhmgPHUWvxuYUC3j6-xcLCD-hUmxVpaSDKikQspWzaPzK28ZBt8As-YGKYID6XifSvLfzezqUd52TvBsUUVCUp9XkUJTmYKLKY': '/IMG-20260401-WA0093.jpg',
  
  // Gallery item 4
  'https://lh3.googleusercontent.com/aida-public/AB6AXuADzv7K79BXYggpspD1Au40znu0KoO_IrZIdVG1EaZvqL897ZEVRSDZ_kQSzVEkAc35H-Zh-MjK28Vmlm1FOqiO-z3ulST_2Lbvo-5DjSZhoM5qwYmAfdUAaX2JEdZqEf7t-xahoziLLfLktRoy28Kf4KeCJoxxRRPY3XNH5yfy19Kw-ZO8Glv6VO0qYu6qiwrELsXh-Z57KgOUCuNco_kiIrS1GVGsN17EJttFfmLHjgVoT3X2TysR5cICRs_eLTINeO0J4sLpbRU': '/IMG-20260401-WA0100 (1).jpg',
  
  // Gallery & Story item 5
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCK8jVGcZye3eDWP624NdjP438zJZM2B3LvzdMdE0jWYl9hPSNtKEeRf4Bi8CQAYG93gi2_LaxrUdx0SOFyDj7AretKK85Tpk2ZfZWIG9BisT9OJghH_nr7OuqF2dvMpX5L8xzPqtJDvF8g6bmSlfkras0RyW2UMwV6uWxFtnvMSAHB_00ukJ-jjZP5YXABftGCreFCSdNBR5_5dv0LXemYPQFqRUYFPQzCcVLcDjDjTdcpK_vmJA8KXwPZTyEm8Z5bj41zZbl1YbQ': '/IMG-20260402-WA0003.jpg',
  
  // Gallery item 6
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBKA__3vtAmr19d3SbAzv1AfFaVvKwkwVx513GE_m9SqM89N4JMeOVuMmKmgOQW8t7Vgo4_w961J0obilV-uHQ0bBU1Z3Y7QlTKMB28EAdMbZG67m6RqBP0TOgn69i5_6EdnwWL3fujKgJoUR4DTfv4EfNcPhVExeOPgH35qH0XWxtApfBamJ3Q-7I23uJNJwGKmYtnLEU_T3cDZmqHE5vzwLMR7WVt77NpfM2Sv-97WeGoaEkNQweO9sOFGCZUQGx_ETj-YuFL2V0': '/IMG-20260404-WA0102.jpg',
  
  // Gallery item 7
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAY9E-RLBnHaOEsO2kBtYVYCMv2XV58x3HhGKnBGC_g-FdqsLb6zQ83M8kgEoiAZFLv0U4qeT0XEUJNu7xgnmsnfVOl7ddpiV7tLNuDJX6034zEl9eKQynlb-QHYzhABGTIN9S1-MpvnPWQ8X0EBmG0S4AupCcc4Vx7qWbZJtkVNV-bgcbYzKJVPJWfzLj488vOm_K2v2_VW-smQS59azHN852SoNqVBYE2sWB8qZoPFrIBzHB6w77osoqIYsGuzG4A3Aoi51qxrVM': '/IMG-20260421-WA0049.jpg',
  
  // Gallery item 8 (Home Page Background representation)
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBTA4HRQoMOQalGihYmLUiEv1jV-0YBnrZyfNVYOTW036AkOe3nSynfhAtFbh2G0A4LZSUaKzki8X21XK2H_2nsu8mWB7q3HtrlBc82-_npfyz5W_Z-t5Ik4CdH8TzwuCNUsaSyGArk7H-64ErlsL_HAPXTtVlMdqnz3f02BiBw83B-wDegPt40lW4w8UOh685Eu0whjIGVD9ZGyqtbp83bf-ruUTDLau9aBExwM660P4LKMsEg05xj4CHHBgprCyzzFSiqLQin3vQ': '/Home.jpg',
  
  // Gallery & Story item 9
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDjm4nHt41q0qDVlZVftpl5Ws55A8fP1TPZJItnljA8UcYJpD7-zWNzz2ZBzf3MFwA3NwfNeH4vTUShPWySrcdgRU5Be1gDv8RI4irYJfgB6kKZ_NuslBtYDrS_bPAFaxzuwctQvPwk4sVngTBC_KHe2mWjlAJAyHfjWPxeM8and0byQCIRhOJCFyf2qOrvlksO9iCwDZQAWC-4z-z9T575EDVFokddCyhDpv26zAFWPxR1Wl58mWkobZBsWtORxlzMIpe_64T_wBw': '/IMG-20260426-WA0042.jpg',
  
  // Gallery item 10
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCou9XoemnLt8KO5ikNqWG_60U7Q11luecoX1a3zjRGucACNm_GZW-IR9pRfAyNBpnuZjICbtr0MPjBm_-W1LBuy0UicmQZ0zP-VNfp2KRAyFp1lNeXKCXmaZYRc2qt6gIi-VyYXdyudCC9j9lPWy2hlk490sar9gLjNnKvgljyxtXEpifKVx8Ew8Poqrz2vF0atTOsNccHrq26ozgeF_QeVMxmkW1JQfZsIf0FrxPG5e-fI_RSBa6VoR5Klfwc9wFdmZo4oEzFwQ4': '/IMG-20260505-WA0031.jpg',
  
  // Gallery mainMemories Item 2
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBuOxFc9gQ7n8kZlDwEYdIEyjZlN5FAXnNiZ0bEfKivvhXFcGrUX_8nwbwfe46pDbxxLoV0pd1tW0nLpDK3VqFmHNIQjes-ZX_TVmQVLKPDyGhjL8SVE6-RxG502rRQ_3Gqx2TRdnA699oP6Nt6o15XaVyBEEB0bU9uSDtWPQgujQz3cWrrUd5QZ61b79A3MsnmWHy2nj4aabE_y5KxYpUfxEaYllWa-lmPwGhfk4eDxmpMRfdSacePLMY6MatMpKW2uSyTz1ylp3o': '/IMG-20260507-WA0000.jpg',

  // Story bottom large landscape image (Story line 155)
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBg3dqEvO688YEKI9VNBJ3lnQt4bjUhD0gANPCAmWrYxqKXY6wI9BATHoVtDnk2Q2AdlK59MQkmEn22cc3UAr3L6BtMM8_W_qT5W8ZbiwNY2GVA821DxWmgXsxd_xMP_1tSQVes1ZUMl8r4Mjcmzvs9mmf_x1YaaI32ZdWmUbML62HOhxW-SUN3UmOO5Naitsyg5j0CPGqp4B3B3N7iXOZZtHDGu4uYO24scVC74V6tZGhlFrIUfu6RQXwBWQw3CfUF3QjwbP7ohZE': '/IMG-20260517-WA0058.jpg',

  // Story editorial portrait (Story line 200)
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSP9CA0VXXZ7am9Z8d7_AMgyE07NWriIyKDHXy_HjvAzWOEjQC_XfuhGDLwf2WBHHc3UhlCcMb0oCL4cUX531XtyffIhsZg8tCz57NNG-VHoIt40BIrsRDCP3pge5pE38AVXdw1irQeO_ej_cPXkfTP8ditZyEE47yKpv9mzBTVspglDTaYVdFF9hMtgwpteqsAXuA8UcORN6c_Rgdb6BrOE1cd5r1XBq98yeGXHNJmsolct2YKw35vMcRIXe5d6qX6s12jSOLwU': '/IMG-20260517-WA0113.jpg',

  // Timeline Event 4: First Movie Night (Story line 46)
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDj1cyxn2-h_xcOd8m4-WCd9DnQT5c__WoMi6mmR-khOGGFkQnhJmGjDrgRIJEc0CfaP4lb4Qf9OKA-9r1SMZMFSldi3leJ11ql3XyUEt3-nhYV_GBdA-n9mJOo34vqaJxlObtsN0ouCmAzU5Hjw0ArDQ7BwshE32ahIodP6XnT87kgz7GSGJGKksNKdgydcHDRZQj-hEyg0lH3FMMwqcW96yu-MJ0DxqvYPoY-wUG5aHNEiXkMQEhDqR7RULRLXyc6lre3vsnq5-s': '/IMG-20260517-WA0119.jpg'
};

/**
 * Resolves a Google Photos placeholder URL to the local offline path,
 * or returns the original path/url if no local mapping is registered.
 */
export function resolveImage(url: string): string {
  if (!url) return '';
  if (GOOGLE_PHOTOS_MAP[url]) {
    return GOOGLE_PHOTOS_MAP[url];
  }
  // If it's already a local path, keep it
  if (url.startsWith('/') || url.startsWith('http') === false) {
    return url;
  }
  return url;
}
