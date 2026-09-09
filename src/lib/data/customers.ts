export type ProductTag = "IDV" | "AML" | "KYC" | "Doc Scan" | "VPN" | "Doc Auth" | "TMS";

export type Customer = {
  id: string;
  user: string;
  company: string;
  email: string;
  products: ProductTag[];
  usage: { label: string; percent: number } | null;
  type: "Sandbox(Cloud)" | "Live(Cloud)" | "Sandbox(On-Prem)";
  status: "Active" | "Inactive";
};

export const customers: Customer[] = [
  { id: "c1", user: "test happy", company: "test", email: "dkyc.solution@yopmail.com", products: ["IDV", "AML", "KYC"], usage: { label: "AML", percent: 5 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c2", user: "local test", company: "tets", email: "Dkyctestetst@yopmail.com", products: ["IDV", "AML", "KYC"], usage: { label: "AML", percent: 5 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c3", user: "testtstet testestset", company: "testingcs", email: "Cs.soft123@yopmail.com", products: ["IDV", "Doc Scan", "AML", "VPN"], usage: { label: "AML", percent: 2 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c4", user: "cs test", company: "testtsetst", email: "cstest123@yopmail.com", products: ["IDV", "Doc Scan", "AML", "VPN"], usage: { label: "AML", percent: 8 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c5", user: "Customer Service", company: "ufico", email: "cs@uficojo.com", products: ["IDV", "AML"], usage: { label: "IDV", percent: 90 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c6", user: "Zoulfa Khalaf", company: "UEXO", email: "Zoulfa.khalaf@uexo.com", products: ["IDV", "Doc Scan", "AML", "VPN"], usage: { label: "AML", percent: 18 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c7", user: "Gagan Singh", company: "CS", email: "gagandeeprana21@gmail.com", products: ["IDV", "Doc Scan", "Doc Auth", "AML", "TMS", "KYC"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c8", user: "Ahmed Jarrar", company: "MBFX.pro", email: "aj@mbxpro.com", products: ["IDV", "AML"], usage: null, type: "Live(Cloud)", status: "Active" },
  { id: "c9", user: "mohammad kiblawi", company: "Azm.Jo", email: "mohammad.kiblawi@azm.com", products: ["IDV", "Doc Scan"], usage: { label: "Doc Intelligence", percent: 4 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c10", user: "hani Shtayyeh", company: "aramex", email: "hanish@aramex.com", products: ["IDV", "Doc Scan", "AML", "KYC", "VPN"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c11", user: "Asmet Asmet", company: "baghdadbullionhouse.com", email: "mobileapp@baghdadbullionhouse.com", products: ["IDV", "Doc Scan", "AML", "KYC"], usage: { label: "IDV", percent: 12.3 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c12", user: "zaid smeasim", company: "baghdadbullionhouse", email: "zaid.smeasim@baghdadbullionhouse.com", products: ["IDV", "Doc Scan", "AML", "KYC"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c13", user: "test ekyc", company: "cs", email: "testpassekyc2@yopmail.com", products: ["IDV", "Doc Scan", "AML", "KYC"], usage: { label: "IDV", percent: 6.7 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c14", user: "Samer Azar", company: "tiqmo.com", email: "s.azar@tiqmo.com", products: ["Doc Scan"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c15", user: "ahmad abujazar", company: "Cleared App", email: "ahmad.abujazar@clearedapps.com", products: ["IDV", "AML"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c16", user: "srgtgrdt pfhhyt", company: "Sammiti", email: "shagunsharma@documentkyc.com", products: ["IDV"], usage: null, type: "Sandbox(Cloud)", status: "Inactive" },
  { id: "c17", user: "test ufico", company: "UFICO TESTING", email: "uficotest123@yopmail.com", products: ["IDV", "Doc Scan", "AML", "KYC"], usage: { label: "IDV", percent: 1 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c18", user: "mohammad yameen", company: "zagtrader", email: "mohammad.yameen@zagtrader.com", products: ["IDV"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c19", user: "test ji", company: "test", email: "english_app11@yopmail.com", products: ["IDV"], usage: null, type: "Sandbox(Cloud)", status: "Inactive" },
  { id: "c20", user: "test dev", company: "test dev", email: "testingcs@gmail.com", products: ["Doc Scan"], usage: null, type: "Sandbox(Cloud)", status: "Inactive" },
  { id: "c21", user: "ajay kumar", company: "cs", email: "english_app1@yopmail.com", products: ["IDV", "Doc Scan", "AML"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c22", user: "Taha Ajina", company: "Karmal", email: "taha@iss-karmal.com", products: ["IDV", "AML", "KYC"], usage: { label: "IDV", percent: 50 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c23", user: "Antony .", company: "Identy", email: "antony@identy.io", products: ["IDV"], usage: null, type: "Sandbox(Cloud)", status: "Inactive" },
  { id: "c24", user: "Afnan Albatati", company: "Azm", email: "A.Albatati@azm.sa", products: ["IDV", "Doc Scan"], usage: null, type: "Live(Cloud)", status: "Active" },
  { id: "c25", user: "Mohammad Husni", company: "willow-soft.com", email: "hasan@willow-soft.com", products: ["IDV"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c26", user: "Rana Khatib", company: "Petra Bank", email: "r.khatib@petrabank.jo", products: ["IDV", "AML", "KYC"], usage: { label: "AML", percent: 22 }, type: "Live(Cloud)", status: "Active" },
  { id: "c27", user: "Omar Nabulsi", company: "Nexus Fin", email: "omar@nexusfin.io", products: ["IDV", "Doc Scan"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c28", user: "Lara Haddad", company: "Cedar Pay", email: "lara.haddad@cedarpay.com", products: ["IDV", "AML"], usage: { label: "IDV", percent: 33 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c29", user: "Yousef Amer", company: "Gulf Exchange", email: "y.amer@gulfex.ae", products: ["AML", "TMS"], usage: null, type: "Live(Cloud)", status: "Active" },
  { id: "c30", user: "Dana Salem", company: "Alpha Trust", email: "dana@alphatrust.sa", products: ["IDV", "KYC"], usage: null, type: "Sandbox(Cloud)", status: "Inactive" },
  { id: "c31", user: "Fadi Marwan", company: "Levant Cap", email: "fadi@levantcap.com", products: ["IDV", "Doc Scan", "AML"], usage: { label: "Doc Intelligence", percent: 9 }, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c32", user: "Sami Rashid", company: "Orbit Wallet", email: "sami@orbitwallet.app", products: ["IDV", "AML", "KYC"], usage: null, type: "Sandbox(Cloud)", status: "Active" },
  { id: "c33", user: "Noor Ali", company: "Tigris Bank", email: "noor.ali@tigrisbank.iq", products: ["IDV", "Doc Scan", "AML", "KYC"], usage: { label: "AML", percent: 41 }, type: "Live(Cloud)", status: "Active" },
  { id: "c34", user: "Hala Zaid", company: "Meridian", email: "hala.zaid@meridian.jo", products: ["Doc Scan"], usage: null, type: "Sandbox(Cloud)", status: "Inactive" },
];

export const productTagStyles: Record<ProductTag, string> = {
  IDV: "bg-sky-100 text-sky-700",
  AML: "bg-amber-100 text-amber-700",
  KYC: "bg-fuchsia-100 text-fuchsia-700",
  "Doc Scan": "bg-emerald-100 text-emerald-700",
  VPN: "bg-indigo-100 text-indigo-700",
  "Doc Auth": "bg-purple-100 text-purple-700",
  TMS: "bg-rose-100 text-rose-700",
};

export const serviceOptions = [
  "IDV (Identity Verification)",
  "IDP (Intelligent Document Processing)",
  "Doc Auth (Document Authentication)",
  "TMS (Transaction Monitoring System)",
  "AML (Anti Money Laundering)",
  "KYC (Know Your Customer)",
];
