import { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Database,
  Users,
  Globe,
  CheckCircle2,
  Mail,
  ChevronRight,
  ArrowRight,
  Clock,
  ExternalLink,
  Mic,
  Scale,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Itlinkers - Your Privacy Matters",
  description:
    "Read Itlinkers' comprehensive privacy policy. Learn how we collect, use, protect, and manage your personal information in compliance with applicable laws.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "Itlinkers privacy",
    "data security",
    "information collection",
    "user privacy",
  ],
};

const sections = [
  { id: "consent", title: "1. Consent" },
  { id: "types", title: "2. Types of Information" },
  { id: "collection", title: "3. Collection & Storage" },
  { id: "purpose", title: "4. Purpose" },
  { id: "sharing", title: "5. Sharing & Disclosure" },
  { id: "links", title: "6. Links to Other Websites" },
  { id: "children", title: "7. Children's Privacy" },
  { id: "rights", title: "8. Data Protection Rights" },
  { id: "storage", title: "9. Storage & Transfer" },
  { id: "cookies", title: "10. Cookies" },
  { id: "retention", title: "11. Data Retention" },
  { id: "security", title: "12. Security" },
  { id: "recording", title: "13. Recording" },
  { id: "updates", title: "14. Updates" },
  { id: "misc", title: "15. Miscellaneous" },
  { id: "grievance", title: "16. Grievance Officer" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Header />

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
          {/* Abstract Background Patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in-up">
              <Shield className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-white tracking-wide">
                Trusted & Secure
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up [animation-delay:200ms]">
              Privacy Policy
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              We care about your privacy. Your privacy is important to us at
              Itlinkers. We respect your privacy regarding any information we
              may collect from you across our website.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar Navigation - Sticky on Desktop */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
                <h3 className="uppercase text-xs font-bold text-muted-foreground tracking-wider mb-4 px-3">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md transition-all"
                    >
                      <span className="truncate">{section.title}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-12 lg:space-y-16">
              {/* Introduction/Legal Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium leading-relaxed uppercase tracking-wide">
                    THIS PRIVACY POLICY IS AN ELECTRONIC RECORD IN THE FORM OF
                    AN ELECTRONIC CONTRACT FORMED UNDER THE INFORMATION
                    TECHNOLOGY ACT, 2000 AND THE RULES MADE THEREUNDER AND THE
                    AMENDED PROVISIONS PERTAINING TO ELECTRONIC DOCUMENTS /
                    RECORDS IN VARIOUS STATUTES AS AMENDED BY THE INFORMATION
                    TECHNOLOGY ACT, 2000 OR ANY RELEVANT STATUTE OR REGULATION
                    UNDER ANY APPLICABLE JURISDICTION. THIS PRIVACY POLICY DOES
                    NOT REQUIRE ANY PHYSICAL, ELECTRONIC OR DIGITAL SIGNATURE.
                  </p>
                </div>

                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                  <p>
                    The purpose of this Privacy Policy is to ensure that there
                    is an intact charter to collect, use and protect any
                    personal and/or sensitive data collected by us. This Policy
                    defines our procedure for collection, usage, processing,
                    disclosure and protection of any information obtained by us
                    through the Platform. Capitalized terms that are not defined
                    in this Privacy Policy shall have the same meaning as
                    ascribed to them in our Terms of Service. Any reference made
                    to Privacy policy in this document shall mean and refer to
                    the latest version of the Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Sections Container */}
              <div className="space-y-16">
                {/* 1. Consent */}
                <section id="consent" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      1
                    </span>
                    <h2 className="text-2xl font-bold">Consent</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                    <p className="font-bold text-foreground mb-4">
                      PLEASE READ THIS PRIVACY POLICY CAREFULLY AS IT AFFECTS
                      YOUR RIGHTS AND LIABILITIES UNDER LAW. BY USING THIS
                      PLATFORM AND AVAILING OUR SERVICES, YOU INDICATE THAT YOU
                      UNDERSTAND, AGREE AND CONSENT TO THIS PRIVACY POLICY. IF
                      YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY,
                      PLEASE DO NOT USE THIS WEBSITE OR AVAIL OUR SERVICES.
                    </p>
                    <p className="mb-4">
                      Please be advised that any Information procured by us,
                      shall be:
                    </p>
                    <div className="grid gap-3 mb-6">
                      {[
                        "Processed fairly and lawfully for rendering the Services",
                        "Obtained only for specified and lawful purposes",
                        "Adequate, relevant and not excessive in relation to the purpose",
                        "Able to be reviewed by the User, from time to time",
                        "Not kept longer than for the time which it is required",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mb-4">
                      If you do not agree with this Privacy Policy, you may
                      refuse or withdraw your consent any time, or alternatively
                      choose to not provide us with any Personal Information,
                      you understand that under such circumstance, we may be
                      unable to render Services. Any such intimation to withdraw
                      your consent can be sent to{" "}
                      <a
                        href="mailto:admin@itlinkers.co.in"
                        className="text-primary hover:underline"
                      >
                        admin@itlinkers.co.in
                      </a>
                      .
                    </p>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-800 dark:text-amber-200">
                      WE SHALL NOT BE LIABLE FOR ANY LOSS OR DAMAGE SUSTAINED BY
                      REASON OF ANY DISCLOSURE (INADVERTENT OR OTHERWISE) OF ANY
                      DATA, IF THE SAME IS EITHER (A) REQUIRED FOR SHARING YOUR
                      INFORMATION FOR LEGITIMATE PURPOSES; OR (B) WAS CAUSED
                      THROUGH NO FAULT, ACT, OR OMISSION OF THE COMPANY.
                    </div>
                  </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* 2. Types of Information */}
                <section id="types" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      2
                    </span>
                    <h2 className="text-2xl font-bold">
                      Types of Information Collected by Us
                    </h2>
                  </div>
                  <div className="grid gap-6">
                    <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-blue-500" />
                        <h3 className="text-lg font-bold">Personal Data</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Information that relates to a natural person through
                        which an individual is identified, such as the name,
                        contact details, email address, gender, age,
                        organisation name, organisation email id, demographic
                        information such as address and pin code, any photo
                        identity or any other information relevant to product
                        choice and preferences provided by a User.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Lock className="w-6 h-6 text-rose-500" />
                        <h3 className="text-lg font-bold">
                          Sensitive Personal Data
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Information relating to: (i) government ID cards; (ii)
                        financial information such as bank account or credit
                        card or debit card or other payment instrument details;
                        and (iii) any detail relating to the above-mentioned
                        points as provided to us.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Database className="w-6 h-6 text-amber-500" />
                        <h3 className="text-lg font-bold">
                          Technical Information
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Information gathered through various technologies
                        (cookies, web beacons) including IP address, device or
                        browser type, ISP, clickstream data, operating system,
                        unique device identifiers, and mobile network.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Globe className="w-6 h-6 text-green-500" />
                        <h3 className="text-lg font-bold">
                          Locational Information
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Information obtained through GPS or other means, such as
                        the geographical location of the User.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold mb-2">
                        Social Media Data
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        If you access the Platform through a third-party
                        platform such as a social media service, Information we
                        collect may include your user name, profile picture,
                        email address or friends list.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold mb-2">
                        Non-Personal Information
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Information that does not reveal your specific identity,
                        such as browser information, pixel tags, demographic
                        information, etc.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    (The Sensitive Personal Data, Technical Information,
                    Locational Information and Non-Personal Information are
                    collectively referred to as "Information").
                  </p>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* 3. Collection */}
                <section id="collection" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      3
                    </span>
                    <h2 className="text-2xl font-bold">
                      Collection & Storage of Information
                    </h2>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      3.1 Information may be collected in various ways including
                      during the course of you registering as a User on the
                      Platform, or availing certain Services offered on the
                      Platform.
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      3.2 We may receive Information about you from third-party
                      platform, such as social media platforms, marketing and
                      advertising firms, commercially available sources and
                      business partners to whom you have consented disclosure of
                      such Information.
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      3.3 Please do note that each category of Information may
                      be treated differently as per this Privacy Policy.
                    </p>
                  </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* 4. Purpose */}
                <section id="purpose" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      4
                    </span>
                    <h2 className="text-2xl font-bold">
                      Purpose for Collecting Information
                    </h2>
                  </div>
                  <p className="mb-6 text-slate-600 dark:text-slate-300">
                    The Company collects, uses, stores and processes your
                    Information for any purpose as may be permissible under
                    applicable laws and shall include the following:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      "Render Services and facilitate use",
                      "Respond to inquiries or fulfil requests",
                      "Provide information about Services",
                      "Send important administrative information",
                      "Send surveys and marketing communications",
                      "Improve user experience",
                      "Address technical problems",
                      "Protect integrity of Platform",
                      "Conduct academic research and analytics",
                      "Respond to legal processes",
                      "Implement information security practices",
                      "Determine security breaches",
                      "Investigate illegal activities and fraud",
                      "Enable business evaluations by potential buyers/investors",
                    ].map((purpose, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {purpose}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <h4 className="font-bold text-sm mb-2">
                        15. Business or Research Purposes
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        The Information (except Sensitive Personal Information)
                        is used for business or research purposes, including
                        improving and customizing the Platform. We may archive
                        this information for future communications.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <h4 className="font-bold text-sm mb-2">
                        16. Aggregating Information / Anonymized data
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        We may aggregate Information and analyse it to further
                        accentuate the level of services. This includes average
                        number of Users, clicks, features used, etc. In doing
                        so, we shall not constitute disclosure of any Sensitive
                        Personal Information.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* 5. Sharing */}
                <section
                  id="sharing"
                  className="scroll-mt-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      5
                    </span>
                    <h2 className="text-2xl font-bold">
                      Sharing & Disclosure of Your Information
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    We do not rent, sell or disclose or share any Information
                    that we collect from you, with third parties, save and
                    except in order to provide you with the Services.
                  </p>

                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-sm">
                        5.2 Third-Party Service Providers
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We shall share the information to the third-party
                        service providers/ vendors, to provide you with the
                        Services.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg space-y-2">
                      <h4 className="font-bold text-sm">
                        5.3 Legal and Safety Disclosures
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We may disclose Information where necessary to:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Comply with applicable law or legal process.</li>
                        <li>
                          Respond to requests from public and government
                          authorities.
                        </li>
                        <li>
                          Protect our rights, privacy, safety or property.
                        </li>
                        <li>
                          Protect against legal liability or personal safety of
                          Users.
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-sm mb-2">
                        5.4 Merger or Acquisition
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We may share Information upon merger or acquisition of
                        Company with another company.
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-sm mb-2">
                        5.6 Employees/Agents
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        We follow a strict confidentiality policy. Information
                        may be disclosed to employees on a need to know basis.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 6. Links */}
                <section id="links" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      6
                    </span>
                    <h2 className="text-2xl font-bold">
                      Link to Other Websites and Third-Party Services
                    </h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                    <p>
                      Our Platform may provide links to other sites for
                      convenience only. We are not responsible for the content
                      or privacy practices of these sites.
                    </p>
                    <p>
                      We use support services of third-party platforms for
                      payment gateways. Your financial information is collected,
                      stored and retained by such third-party platforms. You are
                      requested to check their "Privacy Policy".
                    </p>
                  </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* 7. Children */}
                <section id="children" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      7
                    </span>
                    <h2 className="text-2xl font-bold">Children's Privacy</h2>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg p-5">
                    <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
                      We are committed to protecting the privacy of children. If
                      your child is a resident of India and under 18 years of
                      age, we require consent of their legal guardian. If you
                      think that Your child has provided Personal Information
                      without your consent, contact us immediately to remove it.
                    </p>
                  </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                {/* 8. Rights */}
                <section id="rights" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      8
                    </span>
                    <h2 className="text-2xl font-bold">
                      Data Protection Rights
                    </h2>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="grid gap-6">
                      <div className="flex gap-4">
                        <div className="mt-1 bg-white dark:bg-slate-800 p-1.5 rounded shadow-sm">
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            8.1.1 Rectifying, correcting, updating and removing
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            You can access, edit, modify and/or update your
                            Personal Information by logging into your user
                            profile or writing to us.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="mt-1 bg-white dark:bg-slate-800 p-1.5 rounded shadow-sm">
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            8.1.2 Accessing and updating or deleting
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            We will provide you with information about whether
                            we hold any of your Personal Information upon
                            request.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="mt-1 bg-white dark:bg-slate-800 p-1.5 rounded shadow-sm">
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            8.1.3 Object or restrict processing
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            You have the right to object to or request
                            restriction of processing.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="mt-1 bg-white dark:bg-slate-800 p-1.5 rounded shadow-sm">
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            8.1.4 Portability
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            You have the right to request us to transfer Your
                            Personal Information to another controller or
                            directly to you.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-medium">
                        To exercise these rights, please contact us on{" "}
                        <a
                          href="mailto:admin@itlinkers.co.in"
                          className="text-primary hover:underline"
                        >
                          admin@itlinkers.co.in
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </section>

                {/* 9-12 Group */}
                <div className="grid md:grid-cols-2 gap-8">
                  <section id="storage" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                        9
                      </span>
                      <h3 className="font-bold text-lg">Storage & Transfer</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Your Information will primarily be stored in electronic
                      form. We may store, collect, process and use your data in
                      countries other than Republic of India under compliance
                      with applicable laws.
                    </p>
                  </section>
                  <section id="cookies" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                        10
                      </span>
                      <h3 className="font-bold text-lg">Cookies</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Our Platform may utilize "cookies" and other Technical
                      Information. You can deny access to the installation of
                      the Cookies by modifying the settings on your web browser.
                    </p>
                  </section>
                  <section id="retention" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                        11
                      </span>
                      <h3 className="font-bold text-lg">Data Retention</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      We will retain your Information for as long as your
                      Account is active or as needed to provide our Services. If
                      you deactivate your account, we may retain Information as
                      permitted under law.
                    </p>
                  </section>
                  <section id="security" className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                        12
                      </span>
                      <h3 className="font-bold text-lg">
                        Security & Safeguards
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      We use reasonable security practices and procedures
                      (physical, managerial, technical) as mandated under
                      applicable laws. However, no security system is 100%
                      impenetrable.
                    </p>
                  </section>
                </div>

                {/* 13. Recording */}
                <section id="recording" className="scroll-mt-32">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      13
                    </span>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Mic className="w-5 h-5" /> Recording
                    </h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    We reserve the right and you expressly consent to us
                    recording the classes, discussions, processes, events,
                    conversations, feedback, pertaining to our courses, offered
                    online or any other format.
                  </p>
                </section>

                {/* 14. Updates */}
                <section
                  id="updates"
                  className="scroll-mt-32 bg-slate-50 dark:bg-slate-900/30 p-5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700"
                >
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h3 className="font-bold text-base mb-1">
                        14. Updates to Privacy Policy
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We may change the data privacy practices and update this
                        Privacy Policy as and when the need arises. We suggest
                        you regularly check this Privacy Policy.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 15. Miscellaneous */}
                <section id="misc" className="scroll-mt-32">
                  <div className=" bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      <Scale className="w-4 h-4" /> 15. Miscellaneous
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed uppercase">
                      ENFORCEABILITY OF THE REMAINDER OF THIS PRIVACY POLICY.
                      THIS PRIVACY POLICY DOES NOT APPLY TO ANY INFORMATION
                      OTHER THAN THE INFORMATION COLLECTED BY US THROUGH THE
                      PLATFORM. ALL UNSOLICITED INFORMATION SHALL BE DEEMED TO
                      BE NON-CONFIDENTIAL.
                    </p>
                  </div>
                </section>

                {/* 16. Grievance Officer - Prominent */}
                <section id="grievance" className="scroll-mt-32">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl shrink-0">
                        <Mail className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">
                          16. Grievance Officer
                        </h2>
                        <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                          In furtherance of the Information Technology Act, 2000
                          ("IT Act") and the Information Technology
                          (Intermediary Guidelines and Digital Media Ethics
                          Code) Rules, 2021, a grievance officer is appointed.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                              Contact Email
                            </div>
                            <a
                              href="mailto:admin@itlinkers.co.in"
                              className="block text-lg font-medium hover:text-accent transition-colors"
                            >
                              admin@itlinkers.co.in
                            </a>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                              SLA
                            </div>
                            <div className="text-sm font-medium">
                              Revert: 24 hours | Redress: 15 days
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bottom CTA */}
                <div className="text-center py-12 border-t border-slate-200 dark:border-slate-800 mt-16">
                  <p className="text-muted-foreground mb-6">
                    Still have questions regarding your privacy?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                  >
                    Contact Support Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
