// US Distributors
export interface USDistributor {
  id: number
  name: string
  category: string
  address: string
  phone: string
  phoneTollFree?: string
  fax?: string
  faxTollFree?: string
  email: string
  website: string
}

export const usDistributors: USDistributor[] = [
  {
    id: 1,
    name: "EDMO Distributors, Inc.",
    category: "Aviation Products - GSA and Commercial",
    address: "12830 E. Mirabeau Parkway, Spokane, WA 99216",
    phone: "+1-509-535-8280",
    phoneTollFree: "800-235-3300",
    fax: "+1-509-535-8266",
    faxTollFree: "800-828-0623",
    email: "sales@edmo.com",
    website: "https://www.edmo.com/brand/aea-technology",
  },
  {
    id: 2,
    name: "TestEquity / Techni-Tool",
    category: "Commercial All Products",
    address: "1547 N Trooper Road, Worcester, PA 19490",
    phoneTollFree: "800-832-4866",
    phone: "+1-800-832-4866",
    email: "sales@testequity.com",
    website: "https://www.testequity.com/brand/AEA/category/all?page=3",
  },
  {
    id: 3,
    name: "TEquipment.NET",
    category: "Commercial All Products",
    address: "205 Westwood Ave, Long Branch, NJ 07740",
    phone: "+1-732-403-8401",
    fax: "+1-732-222-7088",
    email: "SalesTeam@TEquipment.NET",
    website: "https://www.tequipment.net",
  },
  {
    id: 4,
    name: "ValueTronics International, Inc.",
    category: "Commercial All Products",
    address: "1675 Cambridge Drive, Elgin, IL 60123",
    phoneTollFree: "800-552-8258",
    phone: "+1-847-717-6100",
    fax: "+1-847-717-6121",
    email: "sales@valuetronics.com",
    website: "https://www.valuetronics.com",
  },
]

// International Distributors
export interface InternationalDistributor {
  id: number
  name: string
  address: string
  phone?: string
  mobile?: string
  fax?: string
  email: string
  website?: string
  isContactFactory?: boolean
}

export interface FlattenedDistributor {
  country: string
  countryLower: string
  nameLower: string
  distributor: InternationalDistributor
}

const internationalDistributorsRaw: Record<string, InternationalDistributor[]> = {
  Argentina: [
    { id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true },
  ],
  Australia: [
    {
      id: 1,
      name: "Benelec P/L",
      address: "Unit 2/581-587 Gardeners Road, Mascot, NSW 2020, Australia\nP.O. Box 21, Mascot, NSW 1460, Australia",
      phone: "61-2-9364 7000",
      fax: "61-2-9364 7099",
      email: "inquiries@benelec.com.au",
      website: "https://www.benelec.com.au",
    },
  ],
  Austria: [
    {
      id: 1,
      name: "Heinz Bolli AG",
      address: "Rutihofstrasse 1, CH-9052 Niederteufen, Switzerland",
      phone: "+41 71 335 0720",
      fax: "+41 71 335 0721",
      email: "heinz.bolli@hbag.ch",
      website: "https://www.hbag.ch",
    },
  ],
  Bahrain: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Belgium: [
    {
      id: 1,
      name: "C.N. Rood N.V./S.A",
      address: "Z. 1. Researchpark 40, Zellik 1731, Belgium",
      phone: "+32 (0) 467 03 50",
      fax: "+32 (0) 466 25 00",
      email: "info.belgium@cnrood.com",
      website: "https://www.cnrood.com",
    },
  ],
  Brazil: [
    {
      id: 1,
      name: "Radiohaus Radiocommunicacao",
      address: "Rua Candelaria, 672 Centro, Indaiatuba, SP 13330-180, Brazil",
      phone: "+55 19 3894-2677",
      email: "erwin@radiohaus.com.br",
      website: "https://www.radiohaus.com.br",
    },
  ],
  Canada: [
    {
      id: 1,
      name: "AllCan Distributors",
      address: "12612-124 Street, Edmonton, Alberta T5L 0N7, Canada",
      phone: "800-661-1905",
      fax: "877-451-3052",
      email: "order@allcan.com",
      website: "https://www.allcan.com",
    },
    {
      id: 2,
      name: "Stratatek T&M",
      address: "101 Amber St, Unit 18-20, Markham, ON L3R 3B2, Canada",
      phone: "1 (905) 406-0100",
      email: "info@stratatek.com",
      website: "https://www.stratatek.com/aea-technology",
    },
  ],
  China: [
    {
      id: 1,
      name: "Beijing Peony Electronic Group Co.",
      address: "No. 2 Garden Road, Beijing 100191, China",
      phone: "86-10-8228270, 13801327712",
      email: "zhaopeng@peony.cn",
      website: "http://www.peony.cn",
    },
    {
      id: 2,
      name: "Nanjing Stone System Integration Co., Ltd.",
      address: "7-1A-2, No 79 Chating East Street, Jianye District, Nanjing, China",
      phone: "86-25-84401822",
      email: "wangj731214@163.com",
    },
  ],
  Cyprus: [
    {
      id: 1,
      name: "Broadcasters Warehouse",
      address: "AZUR Residence Suite 23, Georgiou A48, Germasogeia, Limassol 4048, Cyprus",
      phone: "+357 97 869 349",
      email: "sales@broadcasterswarehouse.com",
      website: "https://www.broadcasterswarehouse.com",
    },
  ],
  Denmark: [
    {
      id: 1,
      name: "DX Supply",
      address: "Vikingavagen 21a, Solentuna 19133, Sweden",
      phone: "+46 (0) 84403939",
      email: "Info@dxsupply.com",
      website: "https://www.dxsupply.com",
    },
  ],
  Egypt: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Finland: [
    {
      id: 1,
      name: "DX Supply",
      address: "Vikingavagen 21a, Solentuna 19133, Sweden",
      phone: "+46 (0) 84403939",
      email: "Info@dxsupply.com",
      website: "https://www.dxsupply.com",
    },
  ],
  France: [
    {
      id: 1,
      name: "Equipements Scientifiques",
      address: "Tests Energy Measures Department, 127 rue de Buzenval - BP 26, Garches 92380, France",
      phone: "+33 (01) 47 95 99 45",
      fax: "+33 (01) 47 01 16 22",
      email: "tem@es-france.com",
      website: "https://www.es-france.com",
    },
  ],
  Germany: [
    {
      id: 1,
      name: "Heinz Bolli AG",
      address: "Rutihofstrasse 1, CH-9052 Niederteufen, Switzerland",
      phone: "+41 71 335 0720",
      fax: "+41 71 335 0721",
      email: "heinz.bolli@hbag.ch",
      website: "https://www.hbag.ch",
    },
  ],
  Greece: [
    {
      id: 1,
      name: "SKT Testing OE",
      address: "3 Kritis Str, 15351 Pallini, Greece",
      phone: "+30 210 6618414",
      fax: "+30 210 6618421",
      email: "ksimitzi@skt-testing.gr",
      website: "https://www.skt-testing.gr",
    },
  ],
  India: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Indonesia: [
    {
      id: 1,
      name: "Wellracom Group",
      address: "JI. Bratang Binangun 83-85, Surabaya 60284, Indonesia",
      phone: "62-31-501-8888, 502-8888",
      fax: "62-31-502-8888",
      email: "suprapto_jagyantama@wellracom.co.id",
      website: "https://www.wellracom.co.id",
    },
  ],
  Israel: [
    {
      id: 1,
      name: "Bynet Electronics Ltd.",
      address: "27 Habarzel St., Ramat Hachayal, Tel Aviv 69710, Israel",
      phone: "+972-3-7684999",
      fax: "+972-3-6475979",
      email: "lioram@bynet.co.il",
      website: "https://www.bynete.co.il",
    },
  ],
  Japan: [
    {
      id: 1,
      name: "Japan Communication & Electric Co., Ltd.",
      address: "15-15 Shiba 3-Chrome, Tokyo 1050014, Japan",
      phone: "03-3456-5721",
      fax: "03-5232-2962",
      email: "webmaster@jacom.com",
      website: "https://www.jacom.com",
    },
  ],
  Jordan: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Kuwait: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Luxembourg: [
    {
      id: 1,
      name: "C.N. Rood N.V./S.A",
      address: "Z. 1. Researchpark 40, Zellik 1731, Belgium",
      phone: "+32 (0) 467 03 50",
      fax: "+32 (0) 466 25 00",
      email: "info.netherlands@cnrood.com",
      website: "https://www.cnrood.com",
    },
  ],
  Malaysia: [
    {
      id: 1,
      name: "TekMark Sdn Bhd",
      address:
        "B-G-8, Endah Promenade, No. 5, Jalan 3/149E, Taman Sri Endah, Sri Petaling, 57000 Kuala Lumpur, Malaysia",
      phone: "603-9057-8999",
      fax: "603-9057-3999",
      email: "tekmark.kl@tekmarkgroup.com",
      website: "https://www.tekmarkgroup.com",
    },
  ],
  Mexico: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Moldova: [
    {
      id: 1,
      name: "RomTek Electronics SRL",
      address: "Str. Somesul Rece No. 5, Sector 1, Bucharest 013791, Romania",
      phone: "+4021-269.2008, +4031-405.54.17/18",
      fax: "+4021-269.2009",
      email: "office@romtek.ro",
      website: "https://www.romteck.ro",
    },
  ],
  Netherlands: [
    {
      id: 1,
      name: "C.N. Rood N.V./S.A",
      address: "Z. 1. Researchpark 40, Zellik 1731, Belgium",
      phone: "+32 (0) 467 03 50",
      fax: "+32 (0) 466 25 00",
      email: "info.netherlands@cnrood.com",
      website: "https://www.cnrood.com",
    },
  ],
  "New Zealand": [
    {
      id: 1,
      name: "Wireless Design",
      address: "91A Cecil Road, Wadestown, Wellington 6012, New Zealand",
      phone: "64-27-6116-053",
      email: "sales@wirelessdesign.co.nz",
      website: "https://www.wirelessdesign.co.nz",
    },
  ],
  Norway: [
    {
      id: 1,
      name: "DX Supply",
      address: "Vikingavagen 21a, Solentuna 19133, Sweden",
      phone: "+46 (0) 84403939",
      email: "Info@dxsupply.com",
      website: "https://www.dxsupply.com",
    },
  ],
  Oman: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Pakistan: [
    {
      id: 1,
      name: "C&C Com",
      address: "Top Floor IK Tower Plot No. 2, MPCHS Markaz E11/3, Islamabad 44000, Pakistan",
      phone: "92-51-2228696",
      email: "imran@cc.com.pk",
      website: "https://www.cc.com.pk",
    },
    {
      id: 2,
      name: "Star Communications Services",
      address: "House 95-C, Street 53, I-8/3, Islamabad, Pakistan",
      phone: "92 51-4444639",
      fax: "92 51 4860139",
      email: "wasif@starcom.net.pk",
      website: "https://www.starcom.com.pk",
    },
  ],
  Poland: [
    {
      id: 1,
      name: "Radicom",
      address: "ul Slowackiego 58/6, 81-392 Gdynia, Poland",
      phone: "(58) 661 75 06",
      fax: "(58) 661 60 56",
      email: "radicom@radicom.pl",
      website: "https://www.radicom.pl",
    },
  ],
  Portugal: [
    {
      id: 1,
      name: "Adler Instrumentos, S.L.",
      address: "c/Antonio de Cabezón, 83 2ª planta, 28034 Madrid, Spain",
      phone: "+34 (9) 1 358 4046",
      fax: "+34 (9) 1 358 1383",
      email: "info@adler-instrumentos.es",
      website: "https://www.adler-instrumentos.es",
    },
  ],
  Qatar: [{ id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true }],
  Romania: [
    {
      id: 1,
      name: "RomTek Electronics SRL",
      address: "Str. Somesul Rece No. 5, Sector 1, Bucharest 013791, Romania",
      phone: "+4021-269.2008, +4031-405.54.17/18",
      fax: "+4021-269.2009",
      email: "office@romtek.ro",
      website: "https://www.romteck.ro",
    },
  ],
  "Saudi Arabia": [
    { id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true },
  ],
  Singapore: [
    {
      id: 1,
      name: "TekMark Singapore Pte Ltd",
      address: "33, Ubi Ave 3, #03-17 Vertex Tower B, Singapore 408868",
      phone: "65-6549 7240",
      fax: "65-6749 7001",
      email: "tekmark.sg@tekmarkgroup.com",
      website: "https://www.tekmarkgroup.com",
    },
  ],
  Slovenia: [
    {
      id: 1,
      name: "BELMET MI d.o.o.",
      address: "Cesta Ljubljanske brigade 23a, Ljubljana 1000, Slovenia",
      phone: "+386 1 51 888 10",
      fax: "+386 1 51 888 20",
      email: "jurij.kos@belmet.si",
      website: "https://www.belmet.si",
    },
  ],
  "South Africa": [
    {
      id: 1,
      name: "Intuicom",
      address: "South Africa",
      phone: "011 9793752 O/H",
      fax: "082 823 2656 A/H",
      email: "aeconradie@gmail.com",
    },
  ],
  "South Korea": [
    {
      id: 1,
      name: "Wavenix Co, Ltd",
      address: "516, Sebang Globalcity, 1595, Kwanyang, Dongan, Anyang, Gyeonggi-Do, 431-060, South Korea",
      phone: "82-31-388-8150",
      fax: "82-31-388-8152",
      email: "wave@wavenix.com",
      website: "https://www.wavenix.com",
    },
  ],
  Spain: [
    {
      id: 1,
      name: "Adler Instrumentos, S.L.",
      address: "c/Antonio de Cabezón, 83 2ª planta, 28034 Madrid, Spain",
      phone: "+34 (9) 1 358 4046",
      fax: "+34 (9) 1 358 1383",
      email: "info@adler-instrumentos.es",
      website: "https://www.adler-instrumentos.es",
    },
    {
      id: 2,
      name: "Equipements Scientifiques",
      address: "Tests Energy Measures Department, 127 rue de Buzenval - BP 26, Garches 92380, France",
      phone: "+33 (01) 47 95 99 45",
      fax: "+33 (01) 47 01 16 22",
      email: "tem@es-france.com",
      website: "https://www.es-france.com",
    },
  ],
  Sweden: [
    {
      id: 1,
      name: "DX Supply",
      address: "Vikingavagen 21a, Solentuna 19133, Sweden",
      phone: "+46 (0) 84403939",
      email: "Info@dxsupply.com",
      website: "https://www.dxsupply.com",
    },
  ],
  Switzerland: [
    {
      id: 1,
      name: "Heinz Bolli AG",
      address: "Rutihofstrasse 1, CH-9052 Niederteufen, Switzerland",
      phone: "+41 71 335 0720",
      fax: "+41 71 335 0721",
      email: "heinz.bolli@hbag.ch",
      website: "https://www.hbag.ch",
    },
  ],
  Taiwan: [
    {
      id: 1,
      name: "Rim-Tai Radio Communications",
      address: "No. 160 Tai Yuan N. Rd., Taichung 40466, Taiwan",
      phone: "886(4)22955093",
      fax: "866(4)22586412",
      email: "polo@rimtai.com",
      website: "https://www.rimtai.com",
    },
  ],
  Thailand: [
    {
      id: 1,
      name: "TekMark Sdn Bhd",
      address: "No. 2 Jalan Radin Anum 2, Bandar Baru Sri Petaling, 57000 Kuala Lumpur, Malaysia",
      phone: "603-9057-8999",
      fax: "603-9057-3999",
      email: "tekmark.kl@tekmarkgroup.com",
      website: "https://www.tekmarkgroup.com",
    },
  ],
  Turkey: [
    {
      id: 1,
      name: "Kocyigit Construction Electric Co., Ltd.",
      address: "Mursel Ulec Mah. 948. Sok. 42/B, IIker-Dikmen, Ankara 06450, Turkey",
      phone: "0-312-483 80 19",
      fax: "0-312-483 80 26",
      email: "info@kocyigit.com.tr",
      website: "https://www.kocyigit.com.tr",
    },
    {
      id: 2,
      name: "Partner HTF Elektronik, LTD",
      address: "Bahriye Ucok Mah. 1762/1 Sokak. No. 12/3, 35580 Karsiyaka / IZMIR, Turkey",
      phone: "+90 312 472 92 67",
      email: "info@partnerelectronic.com",
      website: "https://www.partnerelectronic.com",
    },
  ],
  "United Arab Emirates": [
    { id: 1, name: "Contact Factory", address: "", email: "sales@aeatechnology.com", isContactFactory: true },
  ],
  "United Kingdom": [
    {
      id: 1,
      name: "Broadcasters Warehouse",
      address: "35, Brompton Square, London SW3 2AE, United Kingdom",
      phone: "+44 7421 388 981",
      email: "sales@broadcasterswarehouse.com",
      website: "https://www.broadcasterswarehouse.com",
    },
    {
      id: 2,
      name: "Equipements Scientifiques",
      address: "Tests Energy Measures Department, 127 rue de Buzenval - BP 26, Garches 92380, France",
      phone: "+33 (01) 47 95 99 45",
      fax: "+33 (01) 47 01 16 22",
      email: "tem@es-france.com",
      website: "https://www.es-france.com",
    },
  ],
  Vietnam: [
    {
      id: 1,
      name: "Escom Ltd.",
      address: "2nd Floor Office Block #6, 17T7 Building, Trung Hoa - Nhan Chinh, Hanoi, Vietnam",
      phone: "84-4-2811-422",
      mobile: "84-91-208-6668",
      email: "haohq@escom.com.vn",
      website: "https://www.escom.com.vn",
    },
  ],
}

// Pre-compute flattened list with lowercase strings for fast searching
export const flattenedDistributors: FlattenedDistributor[] = Object.keys(internationalDistributorsRaw)
  .sort()
  .flatMap((country) =>
    internationalDistributorsRaw[country]
      .filter((d) => !d.isContactFactory)
      .map((distributor) => ({
        country,
        countryLower: country.toLowerCase(),
        nameLower: distributor.name.toLowerCase(),
        distributor,
      })),
  )

// Set of countries that only have "Contact Factory" entries
export const contactFactoryCountries = new Set(
  Object.entries(internationalDistributorsRaw)
    .filter(([_, distributors]) => distributors.every((d) => d.isContactFactory))
    .map(([country]) => country.toLowerCase()),
)

// All country names (lowercase) for checking if search matches a known country
export const allCountriesLower = new Set(Object.keys(internationalDistributorsRaw).map((c) => c.toLowerCase()))
