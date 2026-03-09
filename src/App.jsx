import { useState, useEffect, useRef } from "react";

// ============================================================
// DATA
// ============================================================

const DAYS = [
  { day: 1, topic: "Basic Concepts in Government", emoji: "🏛️", color: "#e74c3c",
    notes: [
      "**Power** – the ability to influence or control the behaviour of others. It can be coercive (force) or persuasive.",
      "**Authority** – the legitimate or rightful exercise of power. Three types: Traditional, Charismatic, Legal-Rational (Weber).",
      "**Legitimacy** – the quality that makes a government accepted as rightful by the governed.",
      "**Sovereignty** – the supreme, absolute, and uncontrollable power of a state. Internal (over citizens) and External (independence from other states).",
      "**Society** – a group of people bound together by common culture, laws and institutions.",
      "**Nation** – a group of people sharing common language, culture, history and identity.",
      "**State** – has four elements: Population, Territory, Government, and Sovereignty.",
      "**Nation-State** – a state whose citizens share a common national identity (e.g. Japan).",
      "**Political Processes** – the methods through which political decisions are made: elections, lobbying, legislation.",
      "**Political Socialization** – the process by which people acquire political values, beliefs and attitudes. Agents: family, school, media, peer groups.",
      "**Political Culture** – the collective attitudes, beliefs and values of a society about government and politics.",
      "**Political Participation** – involvement of citizens in political activities: voting, campaigning, protesting."
    ],
    tips: ["JAMB loves asking to differentiate Power from Authority", "Know Weber's 3 types of authority", "State vs Nation is a favourite distinction question"]
  },
  { day: 2, topic: "Forms of Government", emoji: "👑", color: "#e67e22",
    notes: [
      "**Monarchy** – rule by one person (king/queen). Absolute monarchy: unlimited power. Constitutional monarchy: power limited by constitution (e.g. UK).",
      "**Aristocracy** – rule by the nobility or privileged class. Believed the 'best' should rule.",
      "**Oligarchy** – rule by a small group of powerful individuals (military or wealthy elite).",
      "**Autocracy** – rule by one person with absolute power; no checks on authority.",
      "**Republicanism** – a system where the head of state is elected, not hereditary. Nigeria is a republic.",
      "**Democracy** – rule by the people. Two forms: Direct Democracy (citizens vote directly, e.g. ancient Athens) and Representative/Indirect Democracy (people elect representatives).",
      "**Theocracy** – rule based on religious laws; leaders are religious figures (e.g. Iran).",
      "**Plutocracy** – rule by the wealthy.",
      "**Timocracy** – rule based on military service or property ownership.",
      "Features of Democracy: Free and fair elections, Rule of law, Separation of powers, Fundamental human rights, Independent judiciary, Free press."
    ],
    tips: ["Aristocracy = rule by the 'best/noble'", "JAMB trick: Aristocracy slogan is 'ruling of the best'", "Know the difference between Direct and Representative democracy"]
  },
  { day: 3, topic: "Arms of Government", emoji: "⚖️", color: "#f1c40f",
    notes: [
      "**The Legislature** – makes laws. Nigeria: National Assembly (Senate + House of Representatives). States: State House of Assembly.",
      "Functions of Legislature: Law-making, Approval of budget, Oversight of executive, Ratification of treaties, Impeachment of president.",
      "**The Executive** – implements laws and policies. Nigeria: President (federal), Governors (state), LGA Chairmen (local).",
      "Functions of Executive: Policy formulation, Law enforcement, Appointment of ministers, Commander-in-chief of armed forces, Foreign policy.",
      "**The Judiciary** – interprets laws and resolves disputes. Nigeria: Supreme Court (highest), Court of Appeal, Federal High Court, State High Courts, Magistrate Courts, Area Courts.",
      "Functions of Judiciary: Interpretation of constitution, Protection of fundamental rights, Resolution of disputes, Checks on executive and legislature via judicial review.",
      "**Separation of Powers** – doctrine by Montesquieu: each arm must be separate and independent to prevent tyranny.",
      "**Checks and Balances** – each arm has powers to limit the others. E.g. President can veto legislature; legislature can override veto; courts can declare laws unconstitutional.",
      "**Doctrine of Judicial Review** – power of courts to declare laws or actions unconstitutional."
    ],
    tips: ["Legislature = law MAKING; Executive = law IMPLEMENTING; Judiciary = law INTERPRETING", "Montesquieu = Separation of Powers", "Senate in Nigeria has 109 members; House of Reps has 360 members"]
  },
  { day: 4, topic: "Structures of Governance", emoji: "🗺️", color: "#2ecc71",
    notes: [
      "**Unitary System** – all powers concentrated in central government. Features: Single sovereign authority, Central government can create/abolish lower units. Examples: France, UK. Merits: Strong central authority, uniformity. Demerits: May not suit large diverse countries.",
      "**Federal System** – powers divided between central and component units by constitution. Features: Written constitution, Dual government, Judicial supremacy. Examples: Nigeria, USA, India. Merits: Suits large diverse countries, autonomy for states. Demerits: Expensive, may lead to disunity.",
      "**Confederal System** – a loose union of independent states. The central authority is weak. Example: USA under Articles of Confederation (1781–1789), Commonwealth of Nations. Merits: Preserves state sovereignty. Demerits: Weak central government, lack of unity.",
      "**Exclusive List** – matters only the federal government can legislate on (e.g. defence, currency, immigration). Nigeria has 68 items.",
      "**Concurrent List** – matters both federal and state can legislate on (e.g. education, agriculture). Nigeria has 30 items.",
      "**Residual Powers** – matters not on any list; handled by state governments."
    ],
    tips: ["Unitary = one centre of power (UK, France)", "Federal = power shared by constitution (Nigeria, USA)", "Confederal = weakest central govt (historical USA)", "Nigeria uses Exclusive + Concurrent + Residual lists"]
  },
  { day: 5, topic: "Systems of Governance & Political Ideologies", emoji: "🌐", color: "#1abc9c",
    notes: [
      "**Presidential System** – president is both head of state and head of government. Fixed term. Examples: Nigeria, USA. Features: Separation of executive from legislature, President directly elected, Ministers not from legislature.",
      "**Parliamentary System** – Prime Minister is head of government; ceremonial head of state (monarch or president). Examples: UK, India. Features: Fusion of executive and legislature, PM from parliament, Vote of no confidence can remove PM.",
      "**Monarchical System** – head of state is a monarch (king/queen). Can be absolute or constitutional.",
      "**Communalism** – a political ideology emphasising community ownership of resources; opposed to private ownership.",
      "**Feudalism** – a hierarchical system of land ownership and obligations; lords owned land, peasants worked it.",
      "**Capitalism** – private ownership of means of production; free market determines prices. Contrasts of production: bourgeoisie (owners) vs proletariat (workers).",
      "**Socialism** – collective or state ownership of means of production; wealth distributed more equally.",
      "**Communism** – extreme socialism; classless society, no private property, state owns everything (Marx & Engels).",
      "**Totalitarianism** – government controls all aspects of life; no political opposition (e.g. Nazi Germany, USSR under Stalin).",
      "**Fascism** – extreme nationalism, authoritarian rule, suppression of opposition (e.g. Mussolini's Italy, Hitler's Germany)."
    ],
    tips: ["Presidential: Nigeria, USA | Parliamentary: UK, India", "Capitalism = private ownership | Socialism = collective | Communism = extreme socialism", "Fascism + Totalitarianism both = authoritarian but fascism is nationalist"]
  },
  { day: 6, topic: "Constitution", emoji: "📜", color: "#3498db",
    notes: [
      "**Constitution** – the fundamental law of the land that defines the structure of government, rights of citizens, and limits of governmental power.",
      "Sources of Constitution: Customs and conventions, Judicial decisions, Legislation, Opinions of legal authorities, Constitutive documents.",
      "Functions of Constitution: Defines structure of government, Protects fundamental rights, Establishes rule of law, Guides conduct of government, Prevents tyranny.",
      "**Written Constitution** – codified in a single document. Examples: Nigeria (1999), USA (1787). Merits: Clear and definite, easy reference. Demerits: Rigid, difficult to amend.",
      "**Unwritten Constitution** – not in a single document; based on conventions, common law, precedents. Example: UK. Merits: Flexible, can adapt. Demerits: Uncertain, can be manipulated.",
      "**Rigid Constitution** – difficult to amend; requires special procedure. Example: Nigeria (needs 2/3 majority of NASS + 2/3 of 36 state assemblies for some sections).",
      "**Flexible Constitution** – can be amended by ordinary legislative process. Example: UK.",
      "**Supremacy of Constitution** – constitution is the highest law; any law inconsistent with it is void to the extent of inconsistency (Section 1, 1999 Constitution of Nigeria)."
    ],
    tips: ["Nigeria has written + rigid constitution", "UK has unwritten + flexible constitution", "Section 1 of 1999 Constitution = Supremacy clause", "JAMB loves asking sources and functions of constitution"]
  },
  { day: 7, topic: "Constitutional Development in Nigeria", emoji: "📋", color: "#9b59b6",
    notes: [
      "**Clifford Constitution 1922** – first constitution with elective principle. Created 4 legislative seats (3 Lagos, 1 Calabar). First time Africans elected to legislature. Named after Governor Hugh Clifford.",
      "**Richards Constitution 1946** – introduced regionalism (North, West, East). Named after Governor Arthur Richards. Criticized for being imposed without consultation.",
      "**Macpherson Constitution 1951** – more Nigerian participation. Introduced regional legislatures and council of ministers. Named after Governor John Macpherson. Led to 1953 crisis.",
      "**Lyttleton Constitution 1954** – introduced true federalism. Nigeria became a federation with Lagos as federal territory. Named after Oliver Lyttelton.",
      "**Independence Constitution 1960** – Nigeria gained independence on October 1, 1960. Parliamentary system, Governor-General as Head of State. Retained ties with UK.",
      "**Republican Constitution 1963** – Nigeria became a republic. Dr. Nnamdi Azikiwe became first President. Governor-General replaced by President.",
      "**1979 Constitution** – introduced presidential system. Obasanjo handed power to Shehu Shagari. Second Republic began.",
      "**1989 Constitution** – drafted but not fully implemented due to annulment of June 12, 1993 elections.",
      "**1999 Constitution** – current constitution. Nigeria returned to democracy. Obasanjo elected president. Presidential system. 36 states + FCT."
    ],
    tips: ["1922 = first elective; 1946 = regionalism; 1951 = more participation; 1954 = true federalism", "1960 = independence; 1963 = republic; 1979 = presidential system; 1999 = current", "JAMB LOVES these constitutions — know the governor/person behind each one"]
  },
  { day: 8, topic: "Principles of Democratic Government", emoji: "🗳️", color: "#e74c3c",
    notes: [
      "**Ethics and Accountability** – public officials must act ethically and be accountable for their decisions.",
      "**Separation of Powers** – the three arms of government (Legislature, Executive, Judiciary) must be separate and independent.",
      "**Checks and Balances** – each arm of government has the power to limit the others.",
      "**Individual and Collective Responsibility** – ministers (in parliamentary) are individually responsible for their ministries and collectively responsible for cabinet decisions.",
      "**Constitutionalism** – government must operate within the limits set by the constitution.",
      "**Rule of Law** (A.V. Dicey's Concept): Supremacy of law (no one above the law), Equality before the law, Rights are result of court decisions (not constitutions).",
      "**Representative Government** – citizens elect representatives to make decisions on their behalf.",
      "**Separation of Church and State** – government should be secular; religion should not interfere with governance.",
      "**Popular Sovereignty** – ultimate power resides in the people, exercised through elections.",
      "**Periodic Elections** – free and fair elections must be held regularly to renew mandates."
    ],
    tips: ["Dicey's Rule of Law: 3 principles — supremacy of law, equality before law, court decisions", "JAMB loves asking about Rule of Law and its components", "Constitutionalism = government limited by constitution"]
  },
  { day: 9, topic: "Political Parties & Party Systems", emoji: "🎯", color: "#e67e22",
    notes: [
      "**Political Party** – an organised group of people with common ideology who seek to win political power through elections.",
      "Functions of Political Parties: Recruitment of candidates, Political education, Government formation, Aggregation of interests, Provision of opposition.",
      "**Party Systems:**",
      "One-Party System – only one party allowed; no opposition. Example: Nigeria under military, China (CCP). Merits: Stability, quick decisions. Demerits: No democracy, tyranny.",
      "Two-Party System – two dominant parties. Example: USA (Democrats & Republicans), UK (Labour & Conservative). Merits: Stable government, clear choice. Demerits: Limited choice.",
      "Multi-Party System – many parties compete. Example: Nigeria, France, Germany. Merits: More choice, diversity of views. Demerits: Coalition governments, instability.",
      "**Nigerian Political Parties (Historical):** NCNC (Nnamdi Azikiwe), AG (Obafemi Awolowo), NPC (Ahmadu Bello) – First Republic. NPN, UPN, NPP, GNPP, PRP – Second Republic. APC, PDP – current era.",
      "**Organization of Parties** – Ward → Local → State → National levels.",
      "**Dominant Party System** – one party dominates but others exist (e.g. PDP 1999–2015 in Nigeria)."
    ],
    tips: ["NCNC = Azikiwe; AG = Awolowo; NPC = Ahmadu Bello (First Republic)", "PDP dominated 1999–2015; APC won 2015 (Buhari)", "Know the functions of political parties thoroughly"]
  },
  { day: 10, topic: "Pressure Groups & Public Opinion", emoji: "📢", color: "#f1c40f",
    notes: [
      "**Pressure Group** – an organised group that seeks to influence government policy without seeking to form a government.",
      "Types: Sectional/Protective Groups (protect members' interests, e.g. NMA, NBA, NUT, NLC), Promotional/Cause Groups (promote a cause, e.g. environmental groups, CDHR).",
      "Functions of Pressure Groups: Influencing government policy, Representing members' interests, Political education, Supplementing political parties, Providing expertise.",
      "Modes of Operation: Lobbying, Strikes and boycotts, Demonstrations, Media campaigns, Legal action.",
      "Limitations: May prioritize self-interest over public good, Can be corrupted by powerful interests, Not democratically accountable.",
      "Differences from Political Parties: Pressure groups don't contest elections; they only influence policy.",
      "**Public Opinion** – the collective view of citizens on a political issue.",
      "Formation of Public Opinion: Education, Media, Political parties, Family, Religious organisations.",
      "Methods of Assessing Public Opinion: Opinion polls, Surveys, Referenda, Elections.",
      "Functions of Public Opinion: Guides government policy, Checks government excesses, Promotes democracy.",
      "Limitations: Can be manipulated by media, Based on incomplete information, Majority opinion may oppress minorities."
    ],
    tips: ["NMA = Nigerian Medical Association; NBA = Nigerian Bar Association; NUT = Nigerian Union of Teachers; NLC = Nigerian Labour Congress", "Pressure groups INFLUENCE; political parties SEEK power", "Academic journals are NOT a source of public opinion (JAMB 2023 question!)"]
  },
  { day: 11, topic: "The Electoral Process", emoji: "🗳️", color: "#1abc9c",
    notes: [
      "**Suffrage** – the right to vote. Universal Adult Suffrage means all adults can vote regardless of sex, race, or religion.",
      "History of Suffrage: Limited suffrage (property/gender restricted) → Universal Male Suffrage → Universal Adult Suffrage.",
      "**Franchise** – the legal right to vote. Types: Universal franchise, Restricted franchise (limited to certain groups).",
      "**Types of Elections:** General elections, Bye-elections (to fill vacant seat), Primary elections (to choose party candidates), Referendum (yes/no vote on specific issue), Re-run election (when no clear winner).",
      "**Electoral System Types:** First-Past-the-Post (simple majority, e.g. UK), Proportional Representation (seats proportional to votes), Two-Round System, Alternative Vote.",
      "Ingredients of Free and Fair Election: Independent Electoral Commission, Credible voters' register, Secret ballot, Peaceful environment, Transparent counting.",
      "**INEC** – Independent National Electoral Commission. Functions: Register voters, Conduct elections, Regulate political parties, Declare election results.",
      "Problems of Elections in Nigeria: Electoral violence, Rigging, Vote buying, Underage voting, Poorly trained personnel.",
      "**Electoral Commission** – independent body that organises elections. Nigeria: INEC (federal), SIEC (state)."
    ],
    tips: ["Suffrage = right to vote; Franchise = legal right to vote", "Bye-election = to fill a vacancy; Referendum = yes/no national issue", "INEC = Independent National Electoral Commission"]
  },
  { day: 12, topic: "Citizenship", emoji: "🪪", color: "#3498db",
    notes: [
      "**Citizenship** – the legal status of being a member of a state with rights and obligations.",
      "Meaning: A citizen is a legal member of a state who enjoys full rights and owes allegiance.",
      "**Methods of Acquiring Citizenship:**",
      "Birth (Jus Soli) – citizenship by place of birth (where you are born).",
      "Descent (Jus Sanguinis) – citizenship by parentage (who your parents are).",
      "Naturalisation – a foreigner acquires citizenship after meeting conditions (residence period, language, renouncing previous citizenship).",
      "Registration – marriage to a citizen or other administrative process.",
      "Dual Citizenship – holding citizenship of two countries. Nigeria allows dual citizenship.",
      "**Renunciation** – voluntarily giving up citizenship.",
      "**Deprivation** – government forcibly removing citizenship.",
      "Rights of Citizens: Right to vote, Right to hold public office, Right to live and work freely, Protection of the state.",
      "Obligations/Duties: Pay taxes, Obey laws, Defend the state, Participate in civic processes.",
      "**Obligations of the State to Citizens:** Protection, Provision of services, Guarantee of rights."
    ],
    tips: ["Jus Soli = by soil/place of birth; Jus Sanguinis = by blood/parentage", "Naturalisation ≠ Naturalisation is not automatic", "Dual citizenship IS allowed in Nigeria (constitutional)"]
  },
  { day: 13, topic: "Civil Service & Public Corporations", emoji: "🏢", color: "#9b59b6",
    notes: [
      "**Civil Service** – the body of government employees (civil servants) who implement government policies.",
      "Characteristics: Permanence (career employment), Neutrality (apolitical), Anonymity (civil servants not publicly known), Impartiality, Hierarchy.",
      "Functions: Policy implementation, Advisory role to ministers, Record-keeping, Service delivery.",
      "**Civil Service Commission** – body responsible for recruitment, promotion and discipline of civil servants.",
      "Problems: Corruption, Tribalism/nepotism, Inefficiency, Over-staffing, Low morale, Political interference.",
      "**Public Corporations** (Parastatals) – government-owned enterprises that provide services or produce goods. Examples: NNPC, NEPA/PHCN, NTA, NIPOST, NRC.",
      "Types: Statutory Corporations (created by Act of Parliament, e.g. CBN), Public Companies (government holds majority shares).",
      "Functions of Public Corporations: Provide essential services, Prevent monopoly, Generate revenue for government.",
      "Finance: Government funding, Revenue from services, Borrowing.",
      "Control: By supervising ministry, Parliament/National Assembly oversight.",
      "Problems: Corruption, Mismanagement, Political interference, Low efficiency, Over-staffing.",
      "**Deregulation/Privatisation** – transfer of government enterprises to private ownership to improve efficiency. Nigeria privatised NEPA → PHCN → sold to private companies.",
      "**Commercialisation** – government enterprises run on commercial principles without full privatisation."
    ],
    tips: ["Civil service: Permanent, Neutral, Anonymous, Impartial", "Privatisation = sell to private; Commercialisation = run like a business but stay public", "JAMB asks about problems and functions of both"]
  },
  { day: 14, topic: "Local Government", emoji: "🏘️", color: "#2ecc71",
    notes: [
      "**Local Government** – the lowest tier of government closest to the grassroots.",
      "Evolution: Colonial era native authorities → 1976 reforms under Murtala/Obasanjo → 1999 Constitution recognition.",
      "**1976 Local Government Reform** – most significant reform. Introduced uniform structure, direct elections, financial allocation from federation account.",
      "Features of Local Government: Elected council, Defined area, Legal authority, Financial resources, Perform specific functions.",
      "Functions: Provision of basic infrastructure (roads, water, markets), Collection of local taxes/rates, Registration of births and deaths, Maintenance of primary schools (shared), Sanitation and environmental services.",
      "Structure: Chairman, Deputy Chairman, Supervisory Councillors, Councillors.",
      "Finance: Statutory allocation from federation account, Internally generated revenue, Grants from state government.",
      "Problems: Political interference from state governments, Inadequate funding, Lack of autonomy, Corruption, Illiteracy of officials.",
      "Traditional Rulers and Local Government: Traditional rulers serve advisory roles; not part of formal government structure but respected.",
      "**1989 Reform** – further strengthened local government autonomy and funding.",
      "Nigeria has **774 Local Government Areas (LGAs)**."
    ],
    tips: ["1976 = most important LG reform", "774 LGAs in Nigeria (JAMB loves this!)", "State govts have been accused of usurping LG funds — a major problem"]
  },
  { day: 15, topic: "Military in Nigerian Politics & Federalism", emoji: "🪖", color: "#e74c3c",
    notes: [
      "**Nigerian Federalism** – Nigeria operates a federal system with 36 states + FCT.",
      "Tiers: Federal, State, Local Government.",
      "Constitutions creating states: 1963 (4 regions → states), 1967 (12 states by Gowon decree), 1976 (19 states), 1987 (21 states), 1991 (30 states), 1996 (36 states).",
      "Problems of Nigerian Federalism: Revenue sharing disputes, Ethnic rivalries, Imbalance in state creation, Military dominance historically.",
      "**Military Intervention in Nigerian Politics:**",
      "Reasons for military coups: Corruption of civilian leaders, Ethnic conflicts, Economic mismanagement, Political instability.",
      "Military Regimes in Nigeria: Aguiyi-Ironsi (1966), Gowon (1966–75), Murtala Mohammed (1975–76), Obasanjo (1976–79), Buhari (1983–85), Babangida (1985–93), Abacha (1993–98), Abdulsalami (1998–99).",
      "Impact of Military Rule: Suspension of constitution, Suppression of press freedom, Human rights abuses, Development of petroleum sector, Creation of states, Unification Decree (1966).",
      "**Unification Decree No. 34 (1966)** – by Aguiyi-Ironsi, abolished federalism and imposed unitary system; led to counter-coup.",
      "Conditions for Military Withdrawal: Popular pressure, International pressure (e.g. US, UK), Economic problems, Internal military divisions.",
      "**SAP (Structural Adjustment Programme)** – introduced by Babangida 1986; economic reforms recommended by IMF/World Bank."
    ],
    tips: ["Gowon created 12 states in 1967; Murtala created 19 in 1976; Babangida created 30 in 1991; Abacha created 36 in 1996", "Unification Decree = Ironsi 1966", "SAP = Babangida 1986 (Structural Adjustment Programme)"]
  },
  { day: 16, topic: "Post-Independence Nigeria & Political Development", emoji: "🇳🇬", color: "#e67e22",
    notes: [
      "**Pre-Colonial Political Systems:** Hausa-Fulani Emirate (Islamic theocratic system, Emirs ruled), Yoruba system (Oba with council of chiefs), Igbo system (democratic, age grades, council of elders), Tiv/Idoma (segmentary, no centralised authority).",
      "**The Republics of Nigeria:**",
      "First Republic (1960–1966): Parliamentary system. PM Tafawa Balewa, President Nnamdi Azikiwe. Ended by Ironsi's coup Jan 15, 1966.",
      "Second Republic (1979–1983): Presidential system. President Shehu Shagari (NPN). Ended by Buhari's coup Dec 31, 1983.",
      "Third Republic (Aborted): IBB's transition programme. June 12, 1993 election won by MKO Abiola (SDP) annulled.",
      "Fourth Republic (1999–present): Presidential system. PDP's Olusegun Obasanjo became president May 29, 1999.",
      "**June 12, 1993** – Presidential election adjudged freest and fairest in Nigeria's history. Won by MKO Abiola; annulled by IBB.",
      "**Process of Decolonization:** British transferred power gradually. Nationalist movements demanded independence. Key leaders: Nnamdi Azikiwe (NCNC), Obafemi Awolowo (AG), Ahmadu Bello (NPC), Herbert Macaulay (NNDP).",
      "**Pan-Africanism** – movement for unity and solidarity of African peoples. Champions: Marcus Garvey, W.E.B. Du Bois, Kwame Nkrumah.",
      "**Back-to-Africa Movement** – Marcus Garvey's movement advocating African diaspora return to Africa."
    ],
    tips: ["1st Republic = Parliamentary; 2nd, 4th Republic = Presidential", "June 12 = MKO Abiola won, annulled by IBB (biggest JAMB topic)", "Herbert Macaulay = father of Nigerian nationalism"]
  },
  { day: 17, topic: "Foreign Policy & Nigeria's International Relations", emoji: "🌍", color: "#1abc9c",
    notes: [
      "**Foreign Policy** – the set of goals and strategies a state uses to interact with other states.",
      "Purpose: Protect national interests, Maintain security, Promote economic development, Achieve international recognition.",
      "Factors determining foreign policy: National interest, Geography, History, Economic considerations, Military capability, International organisations.",
      "**Nigeria's Foreign Policy Principles:** Africa as the Centre-Piece, Non-alignment, Promotion of African unity, Anti-colonialism and anti-apartheid, Respect for territorial integrity, Peaceful settlement of disputes.",
      "'**Africa as Centre-Piece**' – Nigeria's most important foreign policy principle; Africa takes priority in Nigeria's foreign relations.",
      "**Non-Alignment** – Nigeria does not take sides in superpower rivalries (Cold War era); joined the Non-Aligned Movement (NAM).",
      "**Nigeria's Foreign Policy in Practice:** Led liberation of South Africa from apartheid, Contributed troops to UN/AU peacekeeping, Founded ECOWAS, Part of African Union, Contributed to ECOMOG operations (Liberia, Sierra Leone).",
      "**NEPAD** – New Partnership for Africa's Development. Launched 2001. Aims to eradicate poverty, achieve sustainable growth in Africa.",
      "Relations with major powers: USA (strategic partner), China (growing trade), UK (Commonwealth ties), other African nations (leadership role).",
      "**Technical Aid Corps (TAC)** – Nigeria sends professionals to help other African countries."
    ],
    tips: ["Africa as Centre-Piece = Nigeria's CORE foreign policy", "NEPAD = New Partnership for Africa's Development (2001)", "Nigeria founded ECOWAS in 1975"]
  },
  { day: 18, topic: "International Organisations", emoji: "🌐", color: "#3498db",
    notes: [
      "**ECOWAS** – Economic Community of West African States. Founded: 1975 (Lagos Treaty). Members: 15 West African states. HQ: Abuja, Nigeria. Objectives: Economic integration, free movement of persons, common currency.",
      "**African Union (AU)** – formed 2002, successor to OAU (Organisation of African Unity, 1963). HQ: Addis Ababa, Ethiopia. Objectives: Unity, peace, development, human rights in Africa.",
      "**Commonwealth** – association of former British colonies. HQ: London. Nigeria re-admitted 1999 after Abacha era suspension.",
      "**OPEC** – Organisation of Petroleum Exporting Countries. Founded 1960. HQ: Vienna. Nigeria member. Controls oil production to stabilise prices.",
      "**United Nations (UN)** – established 1945 (after WWII). HQ: New York. Main organs: General Assembly, Security Council, Secretariat, ICJ, ECOSOC, Trusteeship Council.",
      "UN Specialised Agencies: UNESCO (education/culture), WHO (health), FAO (food/agriculture), ILO (labour), IMF (monetary), World Bank (development).",
      "**OAU** – Organisation of African Unity. Founded 1963 in Addis Ababa. Objectives: African unity, decolonisation, anti-apartheid. Replaced by AU in 2002.",
      "**NEPAD** – New Partnership for Africa's Development. 2001. Framework for African development with accountability.",
      "Problems of International Organisations: Lack of enforcement power, Veto power in UN Security Council, Funding problems, Dominance by powerful nations.",
      "Nigeria's membership: UN, AU, ECOWAS, Commonwealth, OPEC, G77, G20 (observer), Non-Aligned Movement."
    ],
    tips: ["ECOWAS = 1975; AU = 2002 (from OAU 1963); UN = 1945; OPEC = 1960", "NATO is NOT a body Nigeria belongs to (JAMB trick!)", "ECOMOG is ECOWAS military monitoring group"]
  },
  { day: 19, topic: "Processes of Legislation & Public Commissions", emoji: "📝", color: "#9b59b6",
    notes: [
      "**Legislation** – the process of making laws.",
      "Types of Legislative Acts: Acts (passed by NASS), Edicts (military decrees at state level), By-laws (LGA laws), Decrees (military federal laws), Delegated legislation (laws made by bodies given authority by parliament).",
      "**Process of Making a Law in Nigeria (Bill to Act):** First Reading (introduction) → Second Reading (debate on principles) → Committee Stage (detailed examination) → Third Reading (final vote) → President's Assent → Act.",
      "If President refuses to sign, NASS can override with 2/3 majority vote.",
      "**Public Commissions established by 1979 and 1999 Constitutions:**",
      "Civil Service Commission – recruitment, promotion, discipline of federal civil servants.",
      "Public Complaints Commission (Ombudsman) – investigates citizens' complaints against government.",
      "Electoral Commission (INEC) – conducts elections, registers voters, regulates parties.",
      "National Boundary Commission – delimits and demarcates Nigeria's boundaries.",
      "Revenue Mobilisation Allocation and Fiscal Commission (RMAFC) – reviews revenue sharing formula.",
      "National Population Commission – conducts census, compiles population data.",
      "National Human Rights Commission – promotes and protects human rights.",
      "Problems of Commissions: Lack of independence, Inadequate funding, Political interference, Overlapping functions."
    ],
    tips: ["Bill → First Reading → Second Reading → Committee → Third Reading → Presidential Assent → Act", "Ombudsman = Public Complaints Commission", "INEC = elections; RMAFC = revenue sharing"]
  },
  { day: 20, topic: "REVISION & EXAM STRATEGY", emoji: "🚀", color: "#e74c3c",
    notes: [
      "**EXAM DAY TIPS:**",
      "JAMB Government = 40 questions. You have roughly 1.5 minutes per question.",
      "Read ALL options before choosing; JAMB uses 'except' and 'not' questions — read carefully.",
      "High-frequency topics: Constitutional development, Arms of government, Federalism, Electoral process, Foreign policy.",
      "**Most Repeated JAMB Topics (Based on Analysis):**",
      "1. Constitutional Development (1922–1999) – appears almost every year",
      "2. Arms of Government (functions of legislature, executive, judiciary)",
      "3. Federal system vs Unitary vs Confederal",
      "4. Military rule in Nigeria (coups, reasons, effects)",
      "5. Electoral process and INEC",
      "6. Foreign Policy ('Africa as Centre-Piece', ECOWAS)",
      "7. Pressure groups vs Political parties",
      "8. Public Opinion",
      "9. Citizenship (Jus Soli vs Jus Sanguinis)",
      "10. International Organisations (ECOWAS, AU, UN, OPEC)",
      "**Quick Memory Tricks:**",
      "JAMB Government = 40 questions | Pass mark ≈ 50%",
      "For constitutions: 'Clifford Reads More Lyttleton' (1922, 1946, 1951, 1954), then 1960 independence, 1963 republic, 1979 presidential, 1999 current.",
      "Arms of Government: 'L.E.J.' – Legislature (makes), Executive (implements), Judiciary (interprets).",
      "Federalism key features: Written constitution, Bicameral legislature, Judicial supremacy, Revenue sharing."
    ],
    tips: ["Spend first 5 minutes reading through all questions", "Answer questions you know first; come back to harder ones", "Nigeria has 36 states + FCT; 774 LGAs; 109 Senators; 360 House of Reps members"]
  }
];

const DEFINITIONS = [
  { term: "Power", def: "The ability to influence or control the behaviour of others, with or without their consent." },
  { term: "Authority", def: "The legitimate or rightful exercise of power. Types: Traditional, Charismatic, Legal-Rational (Max Weber)." },
  { term: "Legitimacy", def: "The quality that makes government or authority accepted as rightful by the people." },
  { term: "Sovereignty", def: "The supreme, absolute, and final authority within a territory. Internal (over citizens) and External (independence from other states)." },
  { term: "State", def: "A political unit with four elements: Population, Territory, Government, and Sovereignty." },
  { term: "Nation", def: "A group of people sharing common language, culture, history, and identity, who may or may not have their own state." },
  { term: "Nation-State", def: "A state whose citizens share a common national identity (e.g. Japan, France)." },
  { term: "Political Socialization", def: "The process by which individuals acquire political values, beliefs and attitudes. Agents: family, school, media, peer groups." },
  { term: "Political Culture", def: "The collective political attitudes, beliefs and values of a society regarding government and politics." },
  { term: "Democracy", def: "A system of government where power resides in the people and is exercised directly or through elected representatives." },
  { term: "Constitution", def: "The fundamental law of the land that defines the structure of government, rights of citizens, and limits of governmental power." },
  { term: "Federalism", def: "A system of government where powers are divided between a central government and component units by a constitution." },
  { term: "Separation of Powers", def: "The doctrine (Montesquieu) that legislative, executive, and judicial powers should be in separate hands to prevent tyranny." },
  { term: "Rule of Law", def: "A.V. Dicey's concept: Supremacy of the law, equality before the law, and rights determined by court decisions." },
  { term: "Judicial Review", def: "The power of courts to declare laws or government actions unconstitutional and therefore void." },
  { term: "Checks and Balances", def: "A system where each arm of government has power to limit the other arms, preventing concentration of power." },
  { term: "Suffrage", def: "The right to vote in political elections. Universal Adult Suffrage means all adults can vote regardless of sex, race or religion." },
  { term: "Franchise", def: "The legal right to vote. Can be universal (all adults) or restricted (limited to certain groups)." },
  { term: "Pressure Group", def: "An organised group that seeks to influence government policy without seeking to form a government itself." },
  { term: "Political Party", def: "An organised group with a common ideology that seeks to win political power through elections." },
  { term: "Public Opinion", def: "The aggregate view of citizens on political issues. Formed through education, media, family, and political parties." },
  { term: "Citizenship", def: "The legal status of being a member of a state, carrying both rights (e.g. vote) and obligations (e.g. pay taxes)." },
  { term: "Jus Soli", def: "Citizenship by place of birth (where you were born). Literally 'right of the soil'." },
  { term: "Jus Sanguinis", def: "Citizenship by parentage/descent (citizenship of your parents). Literally 'right of blood'." },
  { term: "Naturalisation", def: "The process by which a foreigner acquires citizenship by meeting legal conditions (residence period, language test, etc.)." },
  { term: "Civil Service", def: "The body of permanent, neutral government employees who implement government policies. Characteristics: permanence, neutrality, anonymity, impartiality." },
  { term: "Public Corporation", def: "A government-owned enterprise that provides essential services or produces goods (e.g. NNPC, CBN, NTA)." },
  { term: "Privatisation", def: "The transfer of government-owned enterprises to private ownership to improve efficiency." },
  { term: "Commercialisation", def: "Making government enterprises operate on commercial principles while remaining government-owned." },
  { term: "Ombudsman", def: "The Public Complaints Commission; an independent officer who investigates citizens' complaints against government agencies." },
  { term: "Foreign Policy", def: "The set of goals, strategies, and actions a state uses to interact with other states and international organisations." },
  { term: "Non-Alignment", def: "Nigeria's policy of not taking sides in superpower rivalries, especially during the Cold War." },
  { term: "ECOWAS", def: "Economic Community of West African States. Founded 1975 (Lagos Treaty). 15 members. HQ: Abuja. Objective: West African economic integration." },
  { term: "NEPAD", def: "New Partnership for Africa's Development. Launched 2001. Framework for African economic development and poverty reduction." },
  { term: "Delegated Legislation", def: "Laws made by bodies (ministers, LGAs, corporations) that have been given authority by parliament to legislate in specific areas." },
  { term: "Writ of Mandamus", def: "A court order compelling a lower court or public body to perform a duty it is legally obligated to perform." },
  { term: "Habeas Corpus", def: "A court order requiring a person held in custody to be brought before a court; protects against unlawful imprisonment." },
  { term: "Bicameral Legislature", def: "A legislature with two chambers. Nigeria: Senate (upper) and House of Representatives (lower) = National Assembly." },
  { term: "Unicameral Legislature", def: "A legislature with only one chamber. Examples: some states, Israel, Denmark." },
  { term: "Referendum", def: "A direct vote by citizens on a specific political question (yes/no). Example: Brexit in UK 2016." },
  { term: "Bye-Election", def: "An election held to fill a vacant seat in the legislature outside of a general election." },
  { term: "Re-run Election", def: "An election held again when the first fails to produce a clear winner." },
  { term: "Lobbying", def: "The practice of attempting to influence the decisions of government officials by organised groups (pressure groups)." },
  { term: "Recall", def: "The removal of an elected official from office before the end of their term by voters (requires petition by constituents)." },
  { term: "Impeachment", def: "The formal process of charging and removing a high government official from office by the legislature." },
  { term: "Veto", def: "The power of the president to refuse to sign (reject) a bill passed by the legislature." },
  { term: "Electoral College", def: "A body of electors chosen to elect the president/head of state. Used in USA presidential elections." },
  { term: "Proportional Representation", def: "An electoral system where the number of seats a party wins is proportional to the number of votes it receives." },
  { term: "First-Past-the-Post", def: "An electoral system where the candidate with the most votes (not necessarily majority) wins." },
  { term: "Constitutionalism", def: "The principle that government must operate within the limits set by the constitution." },
];

const DATES = [
  { date: "1914", event: "Amalgamation of Northern and Southern Nigeria by Lord Lugard" },
  { date: "1922", event: "Clifford Constitution — first elective principle; 4 elected seats (3 Lagos, 1 Calabar)" },
  { date: "1944", event: "National Council of Nigeria and the Cameroons (NCNC) founded by Herbert Macaulay & Nnamdi Azikiwe" },
  { date: "1946", event: "Richards Constitution — introduced regionalism (North, West, East); criticized for imposition" },
  { date: "1951", event: "Macpherson Constitution — Nigerian participation; regional legislatures; council of ministers" },
  { date: "1954", event: "Lyttleton Constitution — introduced true federalism; Lagos as federal territory" },
  { date: "1957", event: "Eastern and Western regions achieved self-governance" },
  { date: "1959", event: "Northern region achieved self-governance" },
  { date: "Oct 1, 1960", event: "Nigeria gained independence from Britain; Tafawa Balewa became PM" },
  { date: "1963", event: "Nigeria became a republic; Nnamdi Azikiwe became first President" },
  { date: "Jan 15, 1966", event: "First military coup; Major Chukwuma Kaduna Nzeogwu led; Aguiyi-Ironsi took power" },
  { date: "1966", event: "Unification Decree No.34 by Ironsi — abolished federalism, imposed unitary system" },
  { date: "July 29, 1966", event: "Counter-coup; Yakubu Gowon came to power" },
  { date: "1967", event: "Gowon divided Nigeria into 12 states (from 4 regions); Biafra war began" },
  { date: "1967–1970", event: "Nigerian Civil War (Biafra War)" },
  { date: "1975", event: "Murtala Mohammed/Obasanjo coup; ECOWAS founded (Lagos Treaty)" },
  { date: "1976", event: "Murtala Mohammed assassinated; Obasanjo took over; LG reform (19 states created)" },
  { date: "1979", event: "1979 Constitution introduced; presidential system; Shehu Shagari (NPN) elected — 2nd Republic" },
  { date: "Dec 31, 1983", event: "Buhari/Idiagbon coup ousted Shagari; ended 2nd Republic" },
  { date: "1985", event: "IBB (Babangida) overthrew Buhari in a palace coup" },
  { date: "1986", event: "SAP (Structural Adjustment Programme) introduced by Babangida" },
  { date: "1987", event: "21 states created under Babangida" },
  { date: "1991", event: "30 states created; Abuja became official capital" },
  { date: "June 12, 1993", event: "Presidential election — MKO Abiola (SDP) won; annulled by IBB. Nigeria's most controversial political event." },
  { date: "1993", event: "Abacha took power; ING under Shonekan was brief interim government" },
  { date: "1996", event: "36 states + FCT created by Abacha" },
  { date: "1998", event: "Abacha died; Abdulsalami Abubakar became head of state; transition to democracy began" },
  { date: "May 29, 1999", event: "Nigeria returned to democracy; Olusegun Obasanjo (PDP) sworn in — 4th Republic began" },
  { date: "1999", event: "Current (1999) Constitution of Nigeria came into force" },
  { date: "2001", event: "NEPAD (New Partnership for Africa's Development) launched" },
  { date: "2002", event: "African Union (AU) formally replaced OAU" },
  { date: "2015", event: "APC's Muhammadu Buhari defeated PDP's Goodluck Jonathan — first peaceful power transfer in Nigeria" },
  { date: "June 12", event: "Now celebrated as Democracy Day in Nigeria (since 2018)" },
];

const QUESTION_BANK = [
  { q: "Which constitution introduced the elective principle in Nigeria?", opts: ["1946 Richards", "1922 Clifford", "1951 Macpherson", "1954 Lyttleton"], ans: 1, exp: "The 1922 Clifford Constitution was the first to introduce elective principle, creating 4 elected seats (3 in Lagos, 1 in Calabar).", year: "Classic", topic: "Constitutional Development" },
  { q: "The first republican constitution of Nigeria was enacted in", opts: ["1960", "1963", "1979", "1999"], ans: 1, exp: "Nigeria became a republic in 1963. Nnamdi Azikiwe became the first President, replacing the Governor-General.", year: "Classic", topic: "Constitutional Development" },
  { q: "Which system of government has the President as both head of state and head of government?", opts: ["Parliamentary", "Monarchical", "Presidential", "Federal"], ans: 2, exp: "In a Presidential system (like Nigeria and USA), the President combines the roles of head of state and head of government.", year: "Classic", topic: "Systems of Governance" },
  { q: "The doctrine of separation of powers was propounded by", opts: ["John Locke", "A.V. Dicey", "Montesquieu", "Aristotle"], ans: 2, exp: "Baron de Montesquieu, in his book 'The Spirit of the Laws' (1748), propounded the doctrine of separation of powers.", year: "Classic", topic: "Arms of Government" },
  { q: "A.V. Dicey's concept of Rule of Law does NOT include which of the following?", opts: ["Supremacy of law", "Equality before the law", "Separation of powers", "Rights determined by courts"], ans: 2, exp: "A.V. Dicey's Rule of Law has three elements: supremacy of law, equality before law, and rights determined by court decisions. Separation of powers is Montesquieu's concept.", year: "Classic", topic: "Democratic Principles" },
  { q: "Which of the following is NOT a feature of a federal state?", opts: ["Written constitution", "Bicameral legislature", "Single level of government", "Revenue allocation"], ans: 2, exp: "A federal state has multiple levels of government (central + component units). Single level of government is a feature of a unitary system.", year: "Classic", topic: "Structures of Governance" },
  { q: "The Richards Constitution of 1946 was criticized mainly because", opts: ["It created too many regions", "It was imposed without adequate consultation", "It gave too much power to Africans", "It abolished native courts"], ans: 1, exp: "The Richards Constitution was heavily criticized because it was imposed without adequate consultation with Nigerians.", year: "Classic", topic: "Constitutional Development" },
  { q: "ECOWAS was established in", opts: ["1963", "1975", "1979", "1991"], ans: 1, exp: "ECOWAS (Economic Community of West African States) was established in 1975 by the Lagos Treaty, with Nigeria playing a leading role.", year: "Classic", topic: "International Organisations" },
  { q: "Nigeria's foreign policy is primarily centered on", opts: ["Asia as the centre-piece", "Europe as the centre-piece", "Africa as the centre-piece", "America as the centre-piece"], ans: 2, exp: "The core principle of Nigeria's foreign policy is 'Africa as the Centre-Piece', meaning Africa takes priority in all Nigeria's foreign relations.", year: "Classic", topic: "Foreign Policy" },
  { q: "Jus Soli means citizenship acquired by", opts: ["Birth descent", "Place of birth", "Marriage", "Naturalisation"], ans: 1, exp: "Jus Soli (Latin: right of the soil) means citizenship is determined by the place where a person is born.", year: "Classic", topic: "Citizenship" },
  { q: "The Lyttleton Constitution of 1954 was significant because it", opts: ["Introduced regionalism", "Introduced true federalism", "Made Nigeria a republic", "Introduced presidential system"], ans: 1, exp: "The 1954 Lyttleton Constitution is significant for introducing true federalism in Nigeria and making Lagos a federal territory.", year: "Classic", topic: "Constitutional Development" },
  { q: "The process by which a legislature can make a law despite presidential refusal is called", opts: ["Judicial review", "Legislative override", "Bill of rights", "Veto power"], ans: 1, exp: "Legislative override is when parliament/legislature enacts a bill into law despite presidential veto, typically requiring a 2/3 supermajority vote.", year: "2023", topic: "Legislature" },
  { q: "Which of the following is NOT a source of public opinion?", opts: ["Social media", "Academic Journals", "Opinion polls", "Political parties"], ans: 1, exp: "Academic journals are scholarly publications, not a direct medium through which public opinion is formed or expressed.", year: "2023", topic: "Public Opinion" },
  { q: "Which of the following is a right associated with citizenship?", opts: ["Right to education", "Right to vote", "Right to privacy", "Right to property"], ans: 1, exp: "The right to vote is the most fundamental right directly associated with citizenship, allowing participation in the democratic process.", year: "2023", topic: "Citizenship" },
  { q: "Jus Sanguinis grants citizenship based on", opts: ["Parental citizenship", "Place of birth", "Ethnic background", "Length of residency"], ans: 0, exp: "Jus Sanguinis (right of blood) means citizenship is acquired through the citizenship of one's parents, not place of birth.", year: "2023", topic: "Citizenship" },
  { q: "When an election fails to produce a clear winner, the process is called", opts: ["A recall", "A re-run election", "A bye-election", "A referendum"], ans: 1, exp: "A re-run election is held when the initial election fails to produce a clear winner. A bye-election fills a vacant seat.", year: "2023", topic: "Electoral Process" },
  { q: "The process of forming public opinion is known as", opts: ["Polling", "Socialization", "Mobilization", "Persuasion"], ans: 1, exp: "Socialization is the process by which individuals acquire norms, values, and beliefs that shape their political opinions and perspectives.", year: "2023", topic: "Public Opinion" },
  { q: "A form of government with the slogan 'rule of the best' is", opts: ["Democracy", "Aristocracy", "Timocracy", "Plutocracy"], ans: 1, exp: "Aristocracy (from Greek: aristos = best) is government by the nobility or those considered 'best' qualified to rule.", year: "2019", topic: "Forms of Government" },
  { q: "An order compelling a lower court to perform a legal duty is called", opts: ["Writ of Mandamus", "Habeas Corpus", "Certiorari", "Quo Warranto"], ans: 0, exp: "Writ of Mandamus is a court order compelling a lower court, tribunal, or public body to perform a duty it is legally required to perform.", year: "2019", topic: "Judiciary" },
  { q: "Which of the following is NOT a member of international organisations Nigeria belongs to?", opts: ["ECOWAS", "AU", "Commonwealth", "NATO"], ans: 3, exp: "NATO (North Atlantic Treaty Organization) is a security alliance of North American and European countries. Nigeria is NOT a member.", year: "Classic", topic: "International Organisations" },
  { q: "The Unification Decree of 1966 was promulgated by", opts: ["Yakubu Gowon", "Aguiyi-Ironsi", "Murtala Mohammed", "Olusegun Obasanjo"], ans: 1, exp: "Major-General Aguiyi-Ironsi promulgated Decree No. 34 (Unification Decree) in 1966, which abolished federalism and imposed a unitary system.", year: "Classic", topic: "Military in Nigeria" },
  { q: "The 1976 Local Government Reform was carried out under", opts: ["Buhari", "Obasanjo/Murtala", "Babangida", "Gowon"], ans: 1, exp: "The landmark 1976 LG Reform was carried out under the Murtala Mohammed/Obasanjo military government, creating a uniform LG structure.", year: "Classic", topic: "Local Government" },
  { q: "How many Local Government Areas does Nigeria have?", opts: ["756", "774", "800", "36"], ans: 1, exp: "Nigeria has 774 Local Government Areas (LGAs) spread across the 36 states and FCT.", year: "Classic", topic: "Local Government" },
  { q: "Nigeria's Senate has how many members?", opts: ["360", "109", "120", "150"], ans: 1, exp: "The Nigerian Senate has 109 members — 3 from each of the 36 states plus 1 from FCT. The House of Representatives has 360 members.", year: "Classic", topic: "Legislature" },
  { q: "The first civilian president of Nigeria's Second Republic was", opts: ["Nnamdi Azikiwe", "Shehu Shagari", "Olusegun Obasanjo", "Tafawa Balewa"], ans: 1, exp: "Shehu Shagari of the NPN (National Party of Nigeria) was the first president of Nigeria's Second Republic (1979–1983), following the 1979 presidential constitution.", year: "Classic", topic: "Nigeria's Political History" },
  { q: "Nigeria returned to democratic governance in which year?", opts: ["1993", "1996", "1999", "2003"], ans: 2, exp: "Nigeria returned to democracy on May 29, 1999, when Olusegun Obasanjo was sworn in as President under the 4th Republic.", year: "Classic", topic: "Nigeria's Political History" },
  { q: "Which body is responsible for conducting elections in Nigeria?", opts: ["SIEC", "INEC", "EFCC", "NPC"], ans: 1, exp: "INEC (Independent National Electoral Commission) is responsible for conducting federal elections, registering voters, and regulating political parties in Nigeria.", year: "Classic", topic: "Electoral Process" },
  { q: "Which of the following is a characteristic of the civil service?", opts: ["Political partisanship", "Anonymity", "Public elections", "Short-term appointment"], ans: 1, exp: "Anonymity is a key characteristic of the civil service — civil servants work behind the scenes; ministers take public credit/blame for policies.", year: "Classic", topic: "Civil Service" },
  { q: "The OAU was replaced by the African Union in", opts: ["1999", "2001", "2002", "2005"], ans: 2, exp: "The African Union (AU) was formally launched in 2002 in Durban, South Africa, replacing the Organisation of African Unity (OAU) which was founded in 1963.", year: "Classic", topic: "International Organisations" },
  { q: "NEPAD stands for", opts: ["New Economic Partnership for African Development", "New Partnership for Africa's Development", "National Economic Plan for African Democracy", "Nigerian Enterprise for Africa's Development"], ans: 1, exp: "NEPAD = New Partnership for Africa's Development. It was adopted in 2001 as a framework to address Africa's development challenges.", year: "Classic", topic: "Foreign Policy" },
  { q: "The Macpherson Constitution of 1951 led to", opts: ["Independence for Nigeria", "True federalism", "The 1953 constitutional crisis", "Creation of 12 states"], ans: 2, exp: "The Macpherson Constitution's provisions, particularly relating to the legislature, led to the 1953 constitutional crisis and the breakdown of the constitution.", year: "Classic", topic: "Constitutional Development" },
];

// ============================================================
// MAIN APP
// ============================================================

export default function JAMBGovApp() {
  const [tab, setTab] = useState("home");
  const [selectedDay, setSelectedDay] = useState(null);
  const [completedDays, setCompletedDays] = useState(() => {
    try { return JSON.parse(localStorage.getItem("jg_completed") || "[]"); } catch { return []; }
  });
  const [defSearch, setDefSearch] = useState("");
  const [defTab, setDefTab] = useState("definitions");
  const [quizState, setQuizState] = useState({ active: false, qIndex: 0, score: 0, selected: null, showExp: false, finished: false, filter: "all", questions: [] });
  const [streak, setStreak] = useState(0);

  const markComplete = (day) => {
    const updated = completedDays.includes(day) ? completedDays.filter(d => d !== day) : [...completedDays, day];
    setCompletedDays(updated);
    try { localStorage.setItem("jg_completed", JSON.stringify(updated)); } catch {}
  };

  const startQuiz = (filter = "all") => {
    let qs = QUESTION_BANK;
    if (filter !== "all") qs = qs.filter(q => q.topic === filter || q.year === filter);
    qs = [...qs].sort(() => Math.random() - 0.5);
    setQuizState({ active: true, qIndex: 0, score: 0, selected: null, showExp: false, finished: false, filter, questions: qs });
    setTab("quiz");
  };

  const handleAnswer = (idx) => {
    if (quizState.selected !== null) return;
    setQuizState(s => ({ ...s, selected: idx, showExp: true, score: s.score + (idx === s.questions[s.qIndex].ans ? 1 : 0) }));
  };

  const nextQ = () => {
    const next = quizState.qIndex + 1;
    if (next >= quizState.questions.length) {
      setQuizState(s => ({ ...s, finished: true }));
    } else {
      setQuizState(s => ({ ...s, qIndex: next, selected: null, showExp: false }));
    }
  };

  const filteredDefs = DEFINITIONS.filter(d => d.term.toLowerCase().includes(defSearch.toLowerCase()) || d.def.toLowerCase().includes(defSearch.toLowerCase()));
  const filteredDates = DATES.filter(d => d.date.includes(defSearch) || d.event.toLowerCase().includes(defSearch.toLowerCase()));
  const daysLeft = 20 - completedDays.length;
  const progress = Math.round((completedDays.length / 20) * 100);

  const topics = [...new Set(QUESTION_BANK.map(q => q.topic))];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0a0e1a", minHeight: "100vh", color: "#e8e0d0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #1a2340 100%)", borderBottom: "1px solid #2a3560", padding: "16px 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 28 }}>🇳🇬</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: "bold", color: "#f0c040", letterSpacing: 1 }}>JAMB GOV PREP</div>
              <div style={{ fontSize: 11, color: "#8899bb" }}>20-Day Crash Course</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["🏠","home"],["📅","days"],["📚","defs"],["❓","quiz"]].map(([icon, t]) => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? "#f0c040" : "rgba(255,255,255,0.05)",
                color: tab === t ? "#0a0e1a" : "#aabbcc",
                border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer",
                fontWeight: tab === t ? "bold" : "normal", fontSize: 13, fontFamily: "inherit"
              }}>{icon} {t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>

        {/* HOME TAB */}
        {tab === "home" && (
          <div>
            {/* Progress Banner */}
            <div style={{ background: "linear-gradient(135deg, #1a3a2a, #0d2518)", border: "1px solid #2d5a3d", borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: "bold", color: "#4ade80" }}>{daysLeft} Days Left</div>
                  <div style={{ color: "#86efac", fontSize: 14 }}>{completedDays.length} of 20 topics completed</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 36, fontWeight: "bold", color: "#f0c040" }}>{progress}%</div>
                  <div style={{ color: "#d4a017", fontSize: 12 }}>Complete</div>
                </div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, height: 12, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(90deg, #22c55e, #4ade80)", height: "100%", width: `${progress}%`, borderRadius: 8, transition: "width 0.5s" }} />
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Topics", val: "20", icon: "📖", color: "#3b82f6" },
                { label: "Questions", val: QUESTION_BANK.length + "+", icon: "❓", color: "#8b5cf6" },
                { label: "Definitions", val: DEFINITIONS.length, icon: "📝", color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ background: "#111827", border: `1px solid ${s.color}33`, borderRadius: 12, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 24 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Hot Tips */}
            <div style={{ background: "#1a1208", border: "1px solid #92400e", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ color: "#f59e0b", fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>🔥 JAMB HOTLIST — Study These FIRST</div>
              {["Constitutional Development (1922–1999) — appears EVERY year", "Arms of Government functions — very frequently tested", "Nigeria's political history (republics, coups)", "Foreign Policy ('Africa as Centre-Piece') — always in exam", "Electoral process & INEC — regular feature", "Citizenship: Jus Soli vs Jus Sanguinis — JAMB favourite"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #2d2010", color: "#fcd34d", fontSize: 13 }}>
                  <span style={{ color: "#f59e0b" }}>⭐</span>{t}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <button onClick={() => setTab("days")} style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", border: "none", borderRadius: 12, padding: 20, cursor: "pointer", color: "white", textAlign: "left", fontFamily: "inherit" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📅</div>
                <div style={{ fontWeight: "bold", fontSize: 15 }}>Study Plan</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>Day-by-day curriculum</div>
              </button>
              <button onClick={() => startQuiz("all")} style={{ background: "linear-gradient(135deg, #3b1f5e, #7c3aed)", border: "none", borderRadius: 12, padding: 20, cursor: "pointer", color: "white", textAlign: "left", fontFamily: "inherit" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
                <div style={{ fontWeight: "bold", fontSize: 15 }}>Practice Quiz</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>All past questions</div>
              </button>
              <button onClick={() => setTab("defs")} style={{ background: "linear-gradient(135deg, #1f3a20, #16a34a)", border: "none", borderRadius: 12, padding: 20, cursor: "pointer", color: "white", textAlign: "left", fontFamily: "inherit" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📚</div>
                <div style={{ fontWeight: "bold", fontSize: 15 }}>Definitions</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>All key terms + dates</div>
              </button>
              <button onClick={() => { setDefTab("dates"); setTab("defs"); }} style={{ background: "linear-gradient(135deg, #3a1a10, #dc2626)", border: "none", borderRadius: 12, padding: 20, cursor: "pointer", color: "white", textAlign: "left", fontFamily: "inherit" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📅</div>
                <div style={{ fontWeight: "bold", fontSize: 15 }}>Key Dates</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>All important years</div>
              </button>
            </div>
          </div>
        )}

        {/* DAYS TAB */}
        {tab === "days" && !selectedDay && (
          <div>
            <h2 style={{ color: "#f0c040", marginBottom: 4, fontSize: 22 }}>📅 20-Day Study Plan</h2>
            <p style={{ color: "#8899bb", marginBottom: 20, fontSize: 13 }}>Tap a day to open its study notes. Mark as done when complete.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {DAYS.map((d) => {
                const done = completedDays.includes(d.day);
                return (
                  <div key={d.day} style={{ background: done ? "#0f2f1a" : "#111827", border: `1px solid ${done ? "#22c55e" : d.color + "44"}`, borderRadius: 12, padding: 14, cursor: "pointer", transition: "all 0.2s", position: "relative" }}
                    onClick={() => setSelectedDay(d.day)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ background: d.color + "22", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: d.color, fontWeight: "bold" }}>Day {d.day}</div>
                      <span onClick={e => { e.stopPropagation(); markComplete(d.day); }} style={{ fontSize: 18, cursor: "pointer" }}>{done ? "✅" : "⬜"}</span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <span style={{ fontSize: 20 }}>{d.emoji}</span>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: "#e8e0d0", marginTop: 4, lineHeight: 1.3 }}>{d.topic}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SINGLE DAY VIEW */}
        {tab === "days" && selectedDay && (() => {
          const d = DAYS.find(x => x.day === selectedDay);
          return (
            <div>
              <button onClick={() => setSelectedDay(null)} style={{ background: "none", border: "1px solid #374151", color: "#9ca3af", borderRadius: 8, padding: "8px 16px", cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}>← Back to Plan</button>
              <div style={{ background: "#111827", border: `1px solid ${d.color}`, borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ color: d.color, fontSize: 13, fontWeight: "bold", marginBottom: 4 }}>DAY {d.day} OF 20</div>
                    <h2 style={{ margin: 0, fontSize: 20, color: "#f3f4f6" }}>{d.emoji} {d.topic}</h2>
                  </div>
                  <button onClick={() => markComplete(d.day)} style={{ background: completedDays.includes(d.day) ? "#166534" : "#1f2937", border: "none", borderRadius: 8, padding: "8px 14px", color: completedDays.includes(d.day) ? "#4ade80" : "#9ca3af", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                    {completedDays.includes(d.day) ? "✅ Done" : "Mark Done"}
                  </button>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: "#9ca3af", fontSize: 12, fontWeight: "bold", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>📖 Study Notes</div>
                  {d.notes.map((note, i) => {
                    const isBold = note.startsWith("**");
                    const text = note.replace(/\*\*/g, "");
                    return (
                      <div key={i} style={{ padding: "10px 14px", marginBottom: 6, background: isBold ? d.color + "15" : "#0f172a", borderRadius: 8, borderLeft: `3px solid ${isBold ? d.color : "#374151"}`, fontSize: 14, lineHeight: 1.6, color: isBold ? "#f3f4f6" : "#d1d5db", fontWeight: isBold ? "bold" : "normal" }}>
                        {text}
                      </div>
                    );
                  })}
                </div>

                <div style={{ background: "#1a1208", border: "1px solid #92400e", borderRadius: 12, padding: 16 }}>
                  <div style={{ color: "#f59e0b", fontWeight: "bold", fontSize: 14, marginBottom: 10 }}>⚡ JAMB Tips for This Topic</div>
                  {d.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: i < d.tips.length - 1 ? "1px solid #2d2010" : "none", color: "#fcd34d", fontSize: 13 }}>
                      <span>💡</span><span>{tip}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  {d.day > 1 && <button onClick={() => setSelectedDay(d.day - 1)} style={{ flex: 1, background: "#1f2937", border: "none", borderRadius: 8, padding: 12, color: "#9ca3af", cursor: "pointer", fontFamily: "inherit" }}>← Previous Day</button>}
                  {d.day < 20 && <button onClick={() => setSelectedDay(d.day + 1)} style={{ flex: 1, background: d.color, border: "none", borderRadius: 8, padding: 12, color: "white", cursor: "pointer", fontWeight: "bold", fontFamily: "inherit" }}>Next Day →</button>}
                </div>
              </div>
            </div>
          );
        })()}

        {/* DEFINITIONS TAB */}
        {tab === "defs" && (
          <div>
            <h2 style={{ color: "#f0c040", marginBottom: 4, fontSize: 22 }}>📚 Reference Library</h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["definitions","📝 Definitions"],["dates","📅 Key Dates"]].map(([t, l]) => (
                <button key={t} onClick={() => setDefTab(t)} style={{ background: defTab === t ? "#f0c040" : "#1f2937", color: defTab === t ? "#0a0e1a" : "#9ca3af", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: defTab === t ? "bold" : "normal", fontSize: 13, fontFamily: "inherit" }}>{l}</button>
              ))}
            </div>
            <input value={defSearch} onChange={e => setDefSearch(e.target.value)} placeholder={defTab === "definitions" ? "Search definitions..." : "Search dates or events..."} style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 14px", color: "#f3f4f6", fontSize: 14, marginBottom: 16, boxSizing: "border-box", fontFamily: "inherit" }} />

            {defTab === "definitions" && (
              <div>
                <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 12 }}>{filteredDefs.length} terms</div>
                {filteredDefs.map((d, i) => (
                  <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 10, padding: "14px 16px", marginBottom: 8, borderLeft: "3px solid #3b82f6" }}>
                    <div style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{d.term}</div>
                    <div style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.6 }}>{d.def}</div>
                  </div>
                ))}
              </div>
            )}

            {defTab === "dates" && (
              <div>
                <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 12 }}>{filteredDates.length} dates</div>
                {filteredDates.map((d, i) => (
                  <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 10, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 14, borderLeft: "3px solid #f59e0b" }}>
                    <div style={{ color: "#f59e0b", fontWeight: "bold", fontSize: 15, minWidth: 60, whiteSpace: "nowrap" }}>{d.date}</div>
                    <div style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.6 }}>{d.event}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* QUIZ TAB */}
        {tab === "quiz" && !quizState.active && (
          <div>
            <h2 style={{ color: "#f0c040", marginBottom: 4, fontSize: 22 }}>❓ Question Bank</h2>
            <p style={{ color: "#8899bb", marginBottom: 20, fontSize: 13 }}>Practice authentic JAMB-style questions. Choose a topic or do them all.</p>
            <button onClick={() => startQuiz("all")} style={{ width: "100%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: 12, padding: 18, color: "white", fontWeight: "bold", fontSize: 16, cursor: "pointer", marginBottom: 16, fontFamily: "inherit" }}>
              🎯 Practice All Questions ({QUESTION_BANK.length} Qs)
            </button>
            <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 10 }}>Or practice by topic:</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {topics.map(t => (
                <button key={t} onClick={() => startQuiz(t)} style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: 12, color: "#d1d5db", cursor: "pointer", fontSize: 12, textAlign: "left", fontFamily: "inherit" }}>
                  <span style={{ color: "#9ca3af" }}>📌</span> {t}<br/>
                  <span style={{ color: "#6b7280", fontSize: 11 }}>{QUESTION_BANK.filter(q => q.topic === t).length} questions</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "quiz" && quizState.active && !quizState.finished && (() => {
          const q = quizState.questions[quizState.qIndex];
          const isCorrect = quizState.selected === q.ans;
          return (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <button onClick={() => setQuizState(s => ({ ...s, active: false }))} style={{ background: "none", border: "1px solid #374151", color: "#9ca3af", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>← Exit</button>
                <div style={{ color: "#9ca3af", fontSize: 13 }}>Q {quizState.qIndex + 1} / {quizState.questions.length}</div>
                <div style={{ color: "#4ade80", fontSize: 13, fontWeight: "bold" }}>Score: {quizState.score}</div>
              </div>

              <div style={{ background: "#111827", borderRadius: 8, height: 6, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ background: "#7c3aed", height: "100%", width: `${((quizState.qIndex) / quizState.questions.length) * 100}%`, transition: "width 0.3s" }} />
              </div>

              <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span style={{ background: "#7c3aed22", color: "#a78bfa", borderRadius: 6, padding: "3px 10px", fontSize: 11 }}>{q.year}</span>
                  <span style={{ background: "#1f2937", color: "#6b7280", borderRadius: 6, padding: "3px 10px", fontSize: 11 }}>{q.topic}</span>
                </div>
                <div style={{ fontSize: 16, color: "#f3f4f6", lineHeight: 1.6, fontWeight: "bold" }}>{q.q}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {q.opts.map((opt, i) => {
                  let bg = "#1f2937", border = "#374151", color = "#d1d5db";
                  if (quizState.selected !== null) {
                    if (i === q.ans) { bg = "#052e16"; border = "#22c55e"; color = "#4ade80"; }
                    else if (i === quizState.selected && i !== q.ans) { bg = "#2d0f0f"; border = "#ef4444"; color = "#f87171"; }
                  }
                  return (
                    <button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "14px 16px", color, cursor: quizState.selected === null ? "pointer" : "default", textAlign: "left", fontSize: 14, fontFamily: "inherit", transition: "all 0.2s" }}>
                      <span style={{ opacity: 0.6 }}>{String.fromCharCode(65+i)}. </span>{opt}
                    </button>
                  );
                })}
              </div>

              {quizState.showExp && (
                <div style={{ background: isCorrect ? "#052e16" : "#2d0f0f", border: `1px solid ${isCorrect ? "#22c55e" : "#ef4444"}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: "bold", color: isCorrect ? "#4ade80" : "#f87171", marginBottom: 8, fontSize: 14 }}>
                    {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
                  </div>
                  <div style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.6 }}>{q.exp}</div>
                </div>
              )}

              {quizState.showExp && (
                <button onClick={nextQ} style={{ width: "100%", background: "#7c3aed", border: "none", borderRadius: 10, padding: 14, color: "white", fontWeight: "bold", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                  {quizState.qIndex + 1 < quizState.questions.length ? "Next Question →" : "See Results 🎉"}
                </button>
              )}
            </div>
          );
        })()}

        {tab === "quiz" && quizState.finished && (
          <div style={{ textAlign: "center", padding: 30 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>{quizState.score / quizState.questions.length >= 0.7 ? "🎉" : "📚"}</div>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#f0c040", marginBottom: 8 }}>Quiz Complete!</div>
            <div style={{ fontSize: 48, fontWeight: "bold", color: quizState.score / quizState.questions.length >= 0.5 ? "#4ade80" : "#f87171", marginBottom: 8 }}>
              {quizState.score}/{quizState.questions.length}
            </div>
            <div style={{ color: "#9ca3af", fontSize: 16, marginBottom: 8 }}>
              {Math.round((quizState.score / quizState.questions.length) * 100)}% — {quizState.score / quizState.questions.length >= 0.7 ? "Excellent! 🔥" : quizState.score / quizState.questions.length >= 0.5 ? "Good, keep studying! 💪" : "More practice needed 📖"}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
              <button onClick={() => startQuiz(quizState.filter)} style={{ background: "#7c3aed", border: "none", borderRadius: 10, padding: "12px 24px", color: "white", cursor: "pointer", fontWeight: "bold", fontFamily: "inherit" }}>Retry</button>
              <button onClick={() => setQuizState(s => ({ ...s, active: false, finished: false }))} style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 24px", color: "#d1d5db", cursor: "pointer", fontFamily: "inherit" }}>Back to Menu</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
