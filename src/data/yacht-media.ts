import type { YachtMediaRecord } from "./yachts";

export const ATTACHED_MEDIA_SOURCE = "user-approved-attached-yachts-ts-2026-07-13";
export const ATTACHED_GALLERY_YACHT_IDS = ["yacht-02","yacht-03","yacht-04","yacht-05","yacht-06","yacht-07","yacht-08","yacht-09","yacht-10","yacht-11","yacht-12","yacht-13","yacht-15","yacht-16","yacht-17","yacht-18","yacht-19","yacht-20","yacht-21","yacht-22","yacht-23","yacht-24","yacht-25"] as const;

interface SourceMediaRecord { path: string; width: number; height: number }

const SOURCE_GALLERIES: Record<string, SourceMediaRecord[]> = {
  "yacht-02": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai0.webp", width: 1229, height: 819 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai1.webp", width: 364, height: 310 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai2.webp", width: 864, height: 1536 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai3.webp", width: 1536, height: 1152 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai4.webp", width: 864, height: 1536 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai5.webp", width: 768, height: 432 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai6.webp", width: 576, height: 768 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai7.webp", width: 557, height: 768 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai8.webp", width: 576, height: 768 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/evali_55_feet_yacht_rental_dubai/evali_55_feet_yacht_rental_dubai9.webp", width: 432, height: 768 },
  ],
  "yacht-03": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty1.webp", width: 1013, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty2.webp", width: 960, height: 640 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty9.webp", width: 2496, height: 1664 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty4.webp", width: 2496, height: 1664 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty5.webp", width: 2496, height: 1664 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty6.webp", width: 2496, height: 1498 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/50_feet_royal_majesty/50_feet_royal_majesty8.webp", width: 2496, height: 1664 },
  ],
  "yacht-04": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai1.webp", width: 360, height: 270 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai2.webp", width: 614, height: 461 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai3.webp", width: 614, height: 461 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai4.webp", width: 614, height: 461 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_42_feet_yacht_rental_dubai/azimut_42_feet_yacht_rental_dubai5.webp", width: 376, height: 281 },
  ],
  "yacht-05": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai1.webp", width: 360, height: 250 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai2.webp", width: 614, height: 461 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai3.webp", width: 1480, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai4.webp", width: 768, height: 532 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/majesty_44_feet_yacht_rental_dubai/majesty_44_feet_yacht_rental_dubai5.webp", width: 614, height: 461 },
  ],
  "yacht-06": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai1.webp", width: 639, height: 432 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai2.webp", width: 864, height: 1536 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai3.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai4.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai5.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai6.webp", width: 960, height: 540 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_50_feet_yacht_rental_dubai/azimut_50_feet_yacht_rental_dubai7.webp", width: 376, height: 281 },
  ],
  "yacht-07": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai1.webp", width: 360, height: 293 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai2.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai3.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai4.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai5.webp", width: 1536, height: 864 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/oryx_50_feet_yacht_rental_dubai/oryx_50_feet_yacht_rental_dubai6.webp", width: 1536, height: 864 },
  ],
  "yacht-08": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai1.webp", width: 360, height: 240 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai2.webp", width: 4771, height: 3182 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai3.webp", width: 4771, height: 3182 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai4.webp", width: 4633, height: 3091 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai5.webp", width: 1536, height: 1025 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai6.webp", width: 4675, height: 3118 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ferretti_50_feet_yacht_rental_dubai/ferretti_50_feet_yacht_rental_dubai7.webp", width: 376, height: 281 },
  ],
  "yacht-09": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip1.webp", width: 768, height: 512 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip2.webp", width: 643, height: 427 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip3.webp", width: 643, height: 427 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip4.webp", width: 643, height: 427 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/56_feet_majesty_yacht_trip/56_feet_majesty_yacht_trip5.webp", width: 376, height: 281 },
  ],
  "yacht-10": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai1.webp", width: 720, height: 420 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai3.webp", width: 768, height: 512 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai5.webp", width: 768, height: 512 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai6.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/azimut_55_feet_yacht_rental_dubai/azimut_55_feet_yacht_rental_dubai7.webp", width: 376, height: 281 },
  ],
  "yacht-11": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter1.webp", width: 1536, height: 1063 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter2.webp", width: 1536, height: 1063 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter3.webp", width: 679, height: 470 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter4.webp", width: 1536, height: 1063 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter5.webp", width: 1536, height: 1063 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter6.webp", width: 867, height: 600 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/88_feet_majesty_yacht_with_jacuzzi_charter/88_feet_majesty_yacht_with_jacuzzi_charter7.webp", width: 1391, height: 963 },
  ],
  "yacht-12": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_azimut_italian_racht_rental_dubai/64_feet_azimut_italian_racht_rental_dubai3.webp", width: 1536, height: 1063 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_azimut_italian_racht_rental_dubai/64_feet_azimut_italian_racht_rental_dubai0.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_azimut_italian_racht_rental_dubai/64_feet_azimut_italian_racht_rental_dubai1.webp", width: 1536, height: 1063 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_azimut_italian_racht_rental_dubai/64_feet_azimut_italian_racht_rental_dubai2.webp", width: 1536, height: 1064 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_azimut_italian_racht_rental_dubai/64_feet_azimut_italian_racht_rental_dubai4.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_azimut_italian_racht_rental_dubai/64_feet_azimut_italian_racht_rental_dubai5.webp", width: 376, height: 281 },
  ],
  "yacht-13": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai1.webp", width: 768, height: 511 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai2.webp", width: 768, height: 511 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai3.webp", width: 768, height: 511 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai4.webp", width: 768, height: 511 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai5.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai6.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/64_feet_hatteras_yacht_rental_dubai/64_feet_hatteras_yacht_rental_dubai7.webp", width: 376, height: 281 },
  ],
  "yacht-15": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/101_feet_majesty_yacht_with_jacuzzi_for_rent/101_feet_majesty_yacht_with_jacuzzi_for_rent1.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/101_feet_majesty_yacht_with_jacuzzi_for_rent/101_feet_majesty_yacht_with_jacuzzi_for_rent2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/101_feet_majesty_yacht_with_jacuzzi_for_rent/101_feet_majesty_yacht_with_jacuzzi_for_rent3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/101_feet_majesty_yacht_with_jacuzzi_for_rent/101_feet_majesty_yacht_with_jacuzzi_for_rent4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/101_feet_majesty_yacht_with_jacuzzi_for_rent/101_feet_majesty_yacht_with_jacuzzi_for_rent5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/101_feet_majesty_yacht_with_jacuzzi_for_rent/101_feet_majesty_yacht_with_jacuzzi_for_rent6.webp", width: 1536, height: 1024 },
  ],
  "yacht-16": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter1.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter6.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_heysea_yacht_with_jacuzzi_charter/90_feet_heysea_yacht_with_jacuzzi_charter7.webp", width: 1536, height: 1024 },
  ],
  "yacht-17": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter1.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter6.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_doretty_yacht_with_jacuzzi_charter/90_feet_doretty_yacht_with_jacuzzi_charter7.webp", width: 1536, height: 1024 },
  ],
  "yacht-18": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai1.webp", width: 1382, height: 922 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai6.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/ocean_dream_143_feet_feet_yacht_rental_dubai/ocean_dream_143_feet_feet_yacht_rental_dubai7.webp", width: 1536, height: 1024 },
  ],
  "yacht-19": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai1.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai6.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/135_feet_mzaail_yacht_rental_dubai/135_feet_mzaail_yacht_rental_dubai7.webp", width: 1536, height: 1024 },
  ],
  "yacht-20": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter1.webp", width: 614, height: 409 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter2.webp", width: 768, height: 576 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter3.webp", width: 960, height: 720 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter4.webp", width: 614, height: 409 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter5.webp", width: 960, height: 720 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/95_feet_doretty_yacht_with_jacuzzi_charter/95_feet_doretty_yacht_with_jacuzzi_charter6.webp", width: 614, height: 409 },
  ],
  "yacht-21": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai1.webp", width: 480, height: 289 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai2.webp", width: 480, height: 296 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai3.webp", width: 480, height: 320 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai4.webp", width: 480, height: 314 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai5.webp", width: 480, height: 302 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/92_feet_sunseeker_yacht_rental_dubai/92_feet_sunseeker_yacht_rental_dubai6.webp", width: 480, height: 308 },
  ],
  "yacht-22": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai1.webp", width: 1026, height: 1536 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai2.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai3.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai4.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai5.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai6.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai7.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/90_feet_sunseeker_yacht_rental_dubai/90_feet_sunseeker_yacht_rental_dubai8.webp", width: 376, height: 281 },
  ],
  "yacht-23": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai1.webp", width: 694, height: 768 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai2.webp", width: 768, height: 576 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai3.webp", width: 768, height: 576 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai4.webp", width: 960, height: 720 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai5.webp", width: 576, height: 768 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai6.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/151_feet_dynasty_yacht_rental_dubai/151_feet_dynasty_yacht_rental_dubai7.webp", width: 376, height: 281 },
  ],
  "yacht-24": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter1.webp", width: 1168, height: 778 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter6.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter7.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter8.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/108_feet_sundowner_yacht_with_jacuzzi_charter/108_feet_sundowner_yacht_with_jacuzzi_charter9.webp", width: 376, height: 281 },
  ],
  "yacht-25": [
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai1.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai2.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai3.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai4.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai5.webp", width: 1536, height: 1024 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai7.webp", width: 376, height: 281 },
    { path: "https://yacht.fra1.cdn.digitaloceanspaces.com/100_feet_omega_yacht_rental_dubai/100_feet_omega_yacht_rental_dubai8.webp", width: 376, height: 281 },
  ],
};

export const APPROVED_ATTACHED_MEDIA_URLS = Object.values(SOURCE_GALLERIES).flatMap((gallery) =>
  gallery.map((media) => media.path),
);

export const isApprovedAttachedMediaPath = (id: string, rightsRecordId: string, path: string) =>
  rightsRecordId === `media-attached-gallery-${id}` &&
  Boolean(SOURCE_GALLERIES[id]?.some((media) => media.path === path));

export const mediaForYacht = (id: string, name: string): YachtMediaRecord[] => {
  const gallery = SOURCE_GALLERIES[id];
  if (!gallery) return [{ type: "image", path: "/media/yacht-placeholder.svg", altAr: `صورة بديلة محايدة لليخت ${name}`, width: 1200, height: 1200, rightsRecordId: "media-neutral-placeholder-001", featured: true, priority: 0 }];
  return gallery.map((media, index) => ({ type: "image", ...media, altAr: `${name} — صورة ${index + 1}`, rightsRecordId: `media-attached-gallery-${id}`, featured: index === 0, priority: index }));
};

export const galleryCountForYacht = (id: string) => SOURCE_GALLERIES[id]?.length ?? 0;
export const isNeutralYachtMedia = (media: YachtMediaRecord) => media.rightsRecordId === "media-neutral-placeholder-001";
