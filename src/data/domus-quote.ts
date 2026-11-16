export type CategoryId =
  | "biometria-acceso"
  | "lpr-videovigilancia"
  | "hikcentral-control"
  | "infraestructura-ups"
  | "ingenieria-implementacion";

export interface QuoteCategory {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  accent: "gold" | "cyan" | "emerald";
}

export interface QuoteItem {
  id: number;
  ref: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: CategoryId;
  imagePath: string;
  datasheetLabel?: string;
  datasheetUrl?: string;
  highlight?: boolean;
}

export interface HeroMetric {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  displayOverride?: string;
  label: string;
  detail: string;
  accent: "gold" | "cyan" | "emerald";
}

export interface BeforeAfterCase {
  id: string;
  badge: string;
  title: string;
  location: string;
  beforeTitle: string;
  beforeSummary: string;
  afterTitle: string;
  afterSummary: string;
  impactMetric: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  mode: "slider" | "split";
}

export interface BuildingZone {
  id: string;
  number: string;
  name: string;
  shortLabel: string;
  headline: string;
  description: string;
  currentPain: string;
  solutionFlow: string[];
  hardwareSummary: { label: string; quantity: string }[];
  gallery: {
    src: string;
    caption: string;
    alt: string;
  }[];
}

export interface EngineeringPillar {
  id: string;
  title: string;
  model: string;
  metric: string;
  description: string;
  accent: "gold" | "cyan" | "emerald";
}

export const QUOTE_METADATA = {
  quoteNumber: "I-P.A.11",
  projectTitle: "Modernización de Control de Accesos y Seguridad",
  date: "16 de noviembre de 2026",
  validityDays: 20,
  client: {
    building: "Edificio Domus",
    attention: "Sandra Novoa",
    audience: "Consejo de Administración y Copropietarios",
    address: "Calle 19a #104a-53, Bogotá D.C.",
    stratum: "Estrato 6",
  },
  provider: {
    legalName: "Seguridad Explorer LTDA / IngExpertos",
    representative: "Rosa Coral",
    role: "Gerente Bogotá",
    address: "CRA 49 Nº 91-80, Bogotá D.C.",
    phone: "3228828416",
    phoneFormatted: "+57 300 6879980",
    whatsappUrl:
      "https://wa.me/573006879980?text=Hola%20Rosa%2C%20revisamos%20la%20propuesta%20I-P.A.11%20para%20el%20Edificio%20Domus%20y%20queremos%20coordinar%20los%20siguientes%20pasos.",
    email: "gerencia.bogota@seguridadexplorer.com",
    website: "https://www.seguridadexplorer.com",
    logoPath: "/images/brand/ingexpertos-logo.webp",
  },
} as const;

export const HERO_METRICS: HeroMetric[] = [
  {
    id: "faciales",
    value: 14,
    label: "Lectores Faciales de Acceso",
    detail: "Reconocimiento del rostro en menos de 0,5 s para entrar y salir sin demoras",
    accent: "cyan",
  },
  {
    id: "lpr",
    value: 2,
    label: "Cámaras de Lectura de Placas",
    detail: "Identifican la placa del vehículo de día o de noche sin encandilarse",
    accent: "gold",
  },
  {
    id: "puertas",
    value: 16,
    label: "Puertas Controladas en Portería",
    detail: "Administración centralizada en un solo sistema con registro de visitantes",
    accent: "emerald",
  },
  {
    id: "respaldo",
    value: 24,
    suffix: "/7",
    label: "Respaldo Eléctrico Continuo",
    detail: "Dos plantas UPS para mantener puertas y cámaras activas ante cortes de luz",
    accent: "gold",
  },
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "ventanilla-domicilios",
    badge: "01 · Recepción y Domicilios",
    title: "Ventanilla Segura para Domicilios y Correspondencia",
    location: "Recepción Piso 1 — Edificio Domus",
    beforeTitle: "Situación Actual",
    beforeSummary:
      "Buzón de madera abierto y cables a la vista en portería; el guarda debe abrir la puerta principal cada vez que recibe un paquete.",
    afterTitle: "Solución Propuesta",
    afterSummary:
      "Ventanilla moderna con marco oscuro y apertura hacia adentro, acompañada de un lector facial exclusivo para domiciliarios sin abrir la puerta exterior.",
    impactMetric: "No se vuelve a abrir la puerta principal para entregas",
    beforeImage: "/images/before-after/domicilios-before.webp",
    afterImage: "/images/before-after/domicilios-after.webp",
    beforeAlt: "Recepción actual del Edificio Domus con buzón de madera y cableado expuesto",
    afterAlt: "Propuesta de ventanilla de seguridad moderna con marco oscuro en recepción Domus",
    mode: "slider",
  },
  {
    id: "intercomunicador-fermax",
    badge: "02 · Presentación de la Fachada",
    title: "Reubicación Limpia del Citófono Peatonal",
    location: "Fachada de Acceso Peatonal",
    beforeTitle: "Situación Actual",
    beforeSummary:
      "Citófono Fermax desgastado con un botón improvisado pegado con silicona, que afecta la presentación de la entrada y falla con frecuencia.",
    afterTitle: "Solución Propuesta",
    afterSummary:
      "Se retira el equipo antiguo, se resana la pared y se traslada el módulo de citofonía frente al punto de atención para recibir visitas y domicilios con orden.",
    impactMetric: "Entrada limpia, ordenada y acorde al edificio",
    beforeImage: "/images/before-after/fermax-before.webp",
    afterImage: "/images/before-after/fermax-after.webp",
    beforeAlt: "Citófono Fermax actual con pulsador improvisado pegado con silicona",
    afterAlt: "Muro exterior limpio tras retiro y reubicación estética del citófono",
    mode: "split",
  },
  {
    id: "autonomia-vehicular",
    badge: "03 · Comodidad para Residentes",
    title: "Ingreso y Salida Vehicular sin Esperar al Guarda",
    location: "Acceso Piso 1 y Salida Vehicular Sótano",
    beforeTitle: "Situación Actual",
    beforeSummary:
      "Al contar con un solo guarda por turno, cuando está atendiendo en sótanos o administración, los residentes deben esperar para que les abran el portón.",
    afterTitle: "Solución Propuesta",
    afterSummary:
      "Lectura automática de placas para vehículos autorizados y lectores faciales instalados sobre los pedestales actuales para visitantes y salida rápida.",
    impactMetric: "Se conservan las bases y estética existentes",
    beforeImage: "/images/zones/pedestal-modernizado.webp",
    afterImage: "/images/zones/salida-vehicular-sotano.webp",
    beforeAlt: "Pedestal existente modernizado con lector facial sin alterar fachada",
    afterAlt: "Salida vehicular sur en sótano con lector facial sobre base existente reutilizada",
    mode: "split",
  },
];

export const BUILDING_ZONES: BuildingZone[] = [
  {
    id: "porteria-domicilios",
    number: "01",
    name: "Acceso Principal y Domicilios",
    shortLabel: "Portería",
    headline: "Ingreso independiente para residentes y entregas sin abrir el lobby",
    description:
      "Separamos el acceso de residentes, visitantes y domiciliarios con dos lectores faciales en la entrada, uno de salida en el interior y una ventanilla segura para recibir correspondencia.",
    currentPain:
      "Hoy el guarda debe abrir manualmente para cada domicilio y los residentes dependen de que esté en recepción para entrar o salir.",
    solutionFlow: [
      "Lector facial exclusivo para residentes: ingreso inmediato sin esperar al guarda.",
      "Lector dedicado para domiciliarios junto a la ventanilla interna de entrega.",
      "Lector facial de salida para residentes (los visitantes siguen saliendo bajo control de portería).",
      "Brazo hidráulico y electroimán que aseguran un cierre suave, firme y completo de la puerta.",
    ],
    hardwareSummary: [
      { label: "Lectores Faciales", quantity: "3 equipos (Entrada, Domicilios y Salida)" },
      { label: "Cierre Automático", quantity: "Electroimán y brazo hidráulico en puerta principal" },
      { label: "Puesto de Portería", quantity: "Monitor 32\" uso continuo + 2 portátiles" },
    ],
    gallery: [
      {
        src: "/images/zones/porteria-entrada.webp",
        caption: "Ingreso principal: lectores faciales independientes para residentes y domiciliarios",
        alt: "Puerta principal en madera y vidrio del Edificio Domus con lectores faciales",
      },
      {
        src: "/images/zones/porteria-salida.webp",
        caption: "Salida peatonal autónoma con brazo hidráulico y lector facial interior",
        alt: "Vista interior de salida peatonal con brazo hidráulico y lector facial",
      },
    ],
  },
  {
    id: "esclusa-ascensores",
    number: "02",
    name: "Esclusa de Ascensores y Pasillos",
    shortLabel: "Ascensores",
    headline: "Doble puerta controlada tipo esclusa hacia los ascensores",
    description:
      "Se resguarda el paso entre la recepción y los ascensores mediante dos puertas que no abren libremente sin autorización, manteniendo un acabado limpio en el lobby.",
    currentPain:
      "Las puertas entre recepción y ascensores permanecían abiertas o sin un control real que impidiera el paso libre.",
    solutionFlow: [
      "Sistema de esclusa para 3 puertas que coordina el cierre automático entre la recepción y los pasillos.",
      "Validación facial tanto para entrar a los ascensores como para salir hacia la recepción.",
      "Botones infrarrojos sin contacto (basta acercar la mano) para abrir cómodamente desde el interior.",
    ],
    hardwareSummary: [
      { label: "Control de Esclusa", quantity: "Tarjeta coordinadora + sensores de puerta" },
      { label: "Apertura Sin Contacto", quantity: "5 botones infrarrojos en acero inoxidable" },
      { label: "Cierre Seguro", quantity: "Electroimanes y brazos hidráulicos" },
    ],
    gallery: [
      {
        src: "/images/zones/ascensores-lobby.webp",
        caption: "Lobby principal hacia zona de ascensores conservando el diseño interior",
        alt: "Lobby del Edificio Domus con acceso controlado hacia ascensores",
      },
      {
        src: "/images/zones/ascensores-pasillo.webp",
        caption: "Pasillo interno de ascensores con botón sin contacto y brazo hidráulico",
        alt: "Pasillo interno junto a ascensores con puerta controlada y sensor sin contacto",
      },
    ],
  },
  {
    id: "accesos-vehiculares",
    number: "03",
    name: "Accesos y Salidas Vehiculares",
    shortLabel: "Vehicular",
    headline: "Lectura automática de placas aprovechando los pedestales actuales",
    description:
      "Control ágil en la portería vehicular del primer piso y en la entrada hacia el sótano, combinando cámaras lectoras de placas para residentes y reconocimiento facial para visitantes.",
    currentPain:
      "Los visitantes se anunciaban por citófono sin quedar registrados y los residentes debían esperar en rampa para entrar o salir.",
    solutionFlow: [
      "2 cámaras inteligentes que leen la placa automáticamente al acercarse, incluso de noche con luces altas.",
      "Registro automático de vehículos autorizados y visitantes directamente en el sistema de portería.",
      "Se reutilizan los pedestales metálicos actuales para instalar los lectores faciales sin romper muros ni alterar la fachada.",
    ],
    hardwareSummary: [
      { label: "Cámaras de Placas", quantity: "2 cámaras de intemperie resistentes a golpes" },
      { label: "Licencias de Placas", quantity: "2 canales integrados en el sistema principal" },
      { label: "Pedestales y Salidas", quantity: "Lectores faciales con caja protectora metálica" },
    ],
    gallery: [
      {
        src: "/images/zones/vehicular-sotano.webp",
        caption: "Acceso vehicular al sótano: cámara de placas para residentes y lector facial para visitantes",
        alt: "Acceso vehicular hacia sótano con lectura de placas y lector facial en pedestal",
      },
      {
        src: "/images/zones/vehicular-piso1.webp",
        caption: "Acceso vehicular primer piso con pedestal reutilizado y lectura de placas",
        alt: "Acceso vehicular primer piso del Edificio Domus",
      },
      {
        src: "/images/zones/salida-vehicular-sotano.webp",
        caption: "Salida vehicular sur desde sótano con reconocimiento facial para salir sin esperas",
        alt: "Rampa de salida vehicular del sótano con lector facial",
      },
    ],
  },
  {
    id: "sotanos-emergencia",
    number: "04",
    name: "Sótanos, Parqueaderos y Emergencias",
    shortLabel: "Sótanos",
    headline: "Control de subida a apartamentos y botones de emergencia",
    description:
      "Cierre controlado entre los parqueaderos, las escaleras y el hall de ascensores en sótanos, respaldado por 12 botones de emergencia y supervisión desde portería.",
    currentPain:
      "La puerta de madera en primer piso y los accesos desde el sótano permitían subir sin verificación individual ni aviso en portería.",
    solutionFlow: [
      "Validación facial obligatoria para pasar de parqueaderos o sótanos hacia los ascensores de apartamentos.",
      "Protección de la puerta de madera y salidas a escaleras con electroimán y botón sin contacto.",
      "12 botones rojos de emergencia ubicados estratégicamente para liberar las puertas de inmediato ante cualquier eventualidad.",
    ],
    hardwareSummary: [
      { label: "Botones de Emergencia", quantity: "12 unidades tipo hongo de alta resistencia" },
      { label: "Red de Largo Alcance", quantity: "7 distribuidores de red especiales para sótanos" },
      { label: "Protección de Equipos", quantity: "14 cajas metálicas con llave para lectores" },
    ],
    gallery: [
      {
        src: "/images/zones/sotano-ascensores.webp",
        caption: "Ascensores en sótano: validación facial individual antes de subir a apartamentos",
        alt: "Hall de ascensores en sótano con dos lectores de reconocimiento facial",
      },
      {
        src: "/images/zones/sotano-puerta.webp",
        caption: "Puerta desde sótano con lector facial y botón de emergencia tipo hongo",
        alt: "Acceso desde sótano equipado con lector facial y botón de emergencia rojo",
      },
      {
        src: "/images/zones/parqueaderos-puerta-1.webp",
        caption: "Puertas hacia parqueaderos con electroimán, botón sin contacto y registro facial",
        alt: "Puertas de acceso a parqueaderos con botón sin contacto y electroimán",
      },
    ],
  },
];

export const ENGINEERING_PILLARS: EngineeringPillar[] = [
  {
    id: "lpr-wdr",
    title: "Cámaras de Placas con Visión Nocturna",
    model: "Referencia DS-TCG405-E · Antideslumbrante",
    metric: "Resistencia a Lluvia y Golpes",
    description:
      "Óptica especial que evita que las luces altas de los vehículos encandilen la cámara en las rampas, protegida contra lluvia exterior e intentos de vandalismo.",
    accent: "gold",
  },
  {
    id: "poe-sotanos",
    title: "Señal Estable en Todos los Sótanos",
    model: "7 Equipos de Red + Cableado 100% Cobre",
    metric: "Hasta 250 m de Alcance",
    description:
      "Cableado certificado 100% en cobre y equipos de distribución de largo alcance para llevar energía y señal hasta los sótanos sin fallas ni caídas de voltaje.",
    accent: "cyan",
  },
  {
    id: "hikcentral-core",
    title: "Sistema Centralizado Sin Mensualidades",
    model: "Software HikCentral · Grabador 4K + Respaldo UPS",
    metric: "16 Puertas · Respaldo Eléctrico",
    description:
      "Licencias permanentes que no generan pagos mensuales recurrentes, con grabación continua en disco de 6TB y dos plantas UPS de respaldo ante cortes de energía.",
    accent: "emerald",
  },
];

export const QUOTE_CATEGORIES: QuoteCategory[] = [
  {
    id: "biometria-acceso",
    name: "Reconocimiento Facial y Cierre de Puertas",
    shortName: "Facial y Puertas",
    tagline: "14 lectores faciales, cajas protectoras metálicas, electroimanes, esclusa, brazos hidráulicos y botones de emergencia.",
    accent: "cyan",
  },
  {
    id: "hikcentral-control",
    name: "Software Central y Equipos de Portería",
    shortName: "Software y Cómputo",
    tagline: "Licencias permanentes para 16 puertas y visitantes, monitor de 32 pulgadas de uso continuo y 2 portátiles Dell Core i7.",
    accent: "gold",
  },
  {
    id: "lpr-videovigilancia",
    name: "Cámaras de Placas y Grabación de Video",
    shortName: "Placas y Video",
    tagline: "2 cámaras lectoras de placas, cámara adicional para portería, grabador de 16 canales y disco de almacenamiento de 6TB.",
    accent: "emerald",
  },
  {
    id: "infraestructura-ups",
    name: "Cableado, Red de Sótanos y Respaldo Eléctrico",
    shortName: "Red y Respaldo UPS",
    tagline: "2 plantas UPS de respaldo, 7 equipos de red para sótanos, cableado 100% cobre y tubería metálica con accesorios.",
    accent: "cyan",
  },
  {
    id: "ingenieria-implementacion",
    name: "Instalación, Configuración y Puesta en Marcha",
    shortName: "Instalación",
    tagline: "Mano de obra completa, trabajo limpio respetando acabados, configuración del sistema, activación de licencias y pruebas.",
    accent: "gold",
  },
];

export const QUOTE_ITEMS: QuoteItem[] = [
  {
    id: 1,
    ref: "DS-1LN5E-E/E-Plug",
    description: "Bobina Cable UTP 305m Cat 5E 100% Cobre Interior, Gris",
    quantity: 4,
    unitPrice: 452372,
    totalPrice: 1809488,
    category: "infraestructura-ups",
    imagePath: "/images/products/utp-cat5e.webp",
  },
  {
    id: 2,
    ref: "DS-1LN6-UE-W-Plug",
    description: "Bobina Cable UTP 305m Cat 6 100% Cobre Interior, 24 AWG, Blanco",
    quantity: 1,
    unitPrice: 523125,
    totalPrice: 523125,
    category: "infraestructura-ups",
    imagePath: "/images/products/utp-cat6.webp",
  },
  {
    id: 3,
    ref: "Botón Emergencia Hongo",
    description: "Botón de emergencia enclavado (tipo hongo) plástico alta resistencia",
    quantity: 12,
    unitPrice: 42300,
    totalPrice: 507600,
    category: "biometria-acceso",
    imagePath: "/images/products/boton-emergencia.webp",
  },
  {
    id: 4,
    ref: "DS-K4H255S + DS-K4H255-LZ",
    description: "Chapa magnética 600 Lbs (272 Kg) con soporte L/Z original Hikvision",
    quantity: 5,
    unitPrice: 103883,
    totalPrice: 519415,
    category: "biometria-acceso",
    imagePath: "/images/products/electroiman-600.webp",
  },
  {
    id: 5,
    ref: "Cable Neopreno 2x20 x 200m",
    description: "Rollo de cable encauchetado neopreno 2x20 x 200 metros 100% cobre",
    quantity: 6,
    unitPrice: 231933,
    totalPrice: 1391598,
    category: "infraestructura-ups",
    imagePath: "/images/products/cable-neopreno.webp",
  },
  {
    id: 6,
    ref: "DS-UPS3000-X",
    description: "UPS 3000 VA / 1800 W, pantalla LCD, protección sobrecarga, 6 tomas NEMA",
    quantity: 2,
    unitPrice: 1465290,
    totalPrice: 2930580,
    category: "infraestructura-ups",
    imagePath: "/images/products/ups-3kva.webp",
    datasheetLabel: "Ficha Técnica UPS 3KVA",
    highlight: true,
  },
  {
    id: 7,
    ref: "DS-K7P07",
    description: "Pulsador sin contacto infrarrojo, acero inoxidable, LED indicador, 12V",
    quantity: 5,
    unitPrice: 50000,
    totalPrice: 250000,
    category: "biometria-acceso",
    imagePath: "/images/products/boton-notouch.webp",
  },
  {
    id: 8,
    ref: "DS-2CD1327G3-LIU",
    description: "Cámara Turret IP 2MP ColorVu 3.0 Luz Híbrida 30m, lente 2.8mm, AcuSense, IP67",
    quantity: 1,
    unitPrice: 240898,
    totalPrice: 240898,
    category: "lpr-videovigilancia",
    imagePath: "/images/products/camara-colorvu.webp",
  },
  {
    id: 9,
    ref: "DS-TCG405-E",
    description: "Cámara Inteligente LPR/ANPR 4MP, varifocal motorizado 3.1-6mm, IP67, IK10",
    quantity: 2,
    unitPrice: 2591433,
    totalPrice: 5182866,
    category: "lpr-videovigilancia",
    imagePath: "/images/products/camara-lpr.webp",
    datasheetLabel: "Ficha Técnica LPR 4MP",
    highlight: true,
  },
  {
    id: 10,
    ref: "WD60PURZ",
    description: 'Disco duro 6TB Western Digital Purple SATA 3.5" especial para videovigilancia',
    quantity: 1,
    unitPrice: 1312200,
    totalPrice: 1312200,
    category: "lpr-videovigilancia",
    imagePath: "/images/products/hdd-6tb.webp",
  },
  {
    id: 11,
    ref: "DS-K1T342MFWX-E1",
    description: "Terminal Reconocimiento Facial IP65, WiFi/PoE, 1.500 rostros, 3.000 huellas/tarjetas",
    quantity: 14,
    unitPrice: 720292,
    totalPrice: 10084088,
    category: "biometria-acceso",
    imagePath: "/images/products/terminal-facial.webp",
    datasheetLabel: "Ficha Técnica Terminal Facial",
    highlight: true,
  },
  {
    id: 12,
    ref: "HikCentral-P-VSS/Base",
    description: "Licencia Base HikCentral Professional para videovigilancia (0CH base)",
    quantity: 1,
    unitPrice: 314925,
    totalPrice: 314925,
    category: "hikcentral-control",
    imagePath: "/images/products/licencia-hikcentral.webp",
  },
  {
    id: 13,
    ref: "HikCentral-P-ACS-16Door",
    description: "Licencia HikCentral Professional control de acceso hasta 16 puertas (Promo)",
    quantity: 1,
    unitPrice: 3900706,
    totalPrice: 3900706,
    category: "hikcentral-control",
    imagePath: "/images/products/licencia-hikcentral.webp",
    highlight: true,
  },
  {
    id: 14,
    ref: "HikCentral-P-Visitor/Module",
    description: "Módulo de expansión gestión de visitantes para HikCentral Professional",
    quantity: 1,
    unitPrice: 2401298,
    totalPrice: 2401298,
    category: "hikcentral-control",
    imagePath: "/images/products/licencia-hikcentral.webp",
  },
  {
    id: 15,
    ref: "HikCentral-P-VSS-1CH/ANPR",
    description: "Licencia por canal cámara ANPR lectura de placas en HikCentral Professional",
    quantity: 2,
    unitPrice: 859802,
    totalPrice: 1719604,
    category: "hikcentral-control",
    imagePath: "/images/products/licencia-hikcentral.webp",
  },
  {
    id: 16,
    ref: "DS-7616NI-Q2/16P",
    description: "Videograbador NVR 8MP (4K) / 16 Canales IP / 16 Puertos PoE+ (150W) / H.265+",
    quantity: 1,
    unitPrice: 1513701,
    totalPrice: 1513701,
    category: "lpr-videovigilancia",
    imagePath: "/images/products/nvr-16ch.webp",
    datasheetLabel: "Ficha Técnica NVR 4K",
    highlight: true,
  },
  {
    id: 17,
    ref: "Protector Metálico Facial",
    description: "Protector metálico resistente con chapa para terminal facial",
    quantity: 14,
    unitPrice: 120000,
    totalPrice: 1680000,
    category: "biometria-acceso",
    imagePath: "/images/products/protector-facial.webp",
  },
  {
    id: 18,
    ref: "Caja Acme León 20x20x12",
    description: "Caja plástica de paso 20 x 20 x 12 cm para protección de conexiones",
    quantity: 7,
    unitPrice: 45927,
    totalPrice: 321489,
    category: "infraestructura-ups",
    imagePath: "/images/products/caja-paso.webp",
  },
  {
    id: 19,
    ref: "Mano de Obra Sistema",
    description: "Instalación, configuración HikCentral, activación licencias y pruebas",
    quantity: 1,
    unitPrice: 11912284,
    totalPrice: 11912284,
    category: "ingenieria-implementacion",
    imagePath: "/images/products/mano-obra.webp",
    highlight: true,
  },
  {
    id: 20,
    ref: 'Tubería EMT 1/2"',
    description: 'Tubería EMT de 1/2" con accesorios de conexión y fijación',
    quantity: 50,
    unitPrice: 17496,
    totalPrice: 874800,
    category: "infraestructura-ups",
    imagePath: "/images/products/tuberia-emt.webp",
  },
  {
    id: 21,
    ref: "B-LOCK BL-ILO3",
    description: "Tarjeta de esclusa control de acceso para 3 puertas",
    quantity: 1,
    unitPrice: 378965,
    totalPrice: 378965,
    category: "biometria-acceso",
    imagePath: "/images/products/tarjeta-esclusa.webp",
  },
  {
    id: 22,
    ref: "DC6085L",
    description: "Brazo hidráulico cierrapuertas para puertas de 60 a 85 kg (<1100mm)",
    quantity: 6,
    unitPrice: 98415,
    totalPrice: 590490,
    category: "biometria-acceso",
    imagePath: "/images/products/brazo-hidraulico.webp",
  },
  {
    id: 23,
    ref: "WK-PS210-V2",
    description: "Switch PoE 8 puertos 10/100 Mbps + 2 Uplink, 30W/puerto, alcance extendido",
    quantity: 7,
    unitPrice: 107773,
    totalPrice: 754411,
    category: "infraestructura-ups",
    imagePath: "/images/products/switch-poe.webp",
  },
  {
    id: 24,
    ref: "DHI-LM32-F200N",
    description: 'Monitor Industrial LED 32" Full HD (1920x1080), HDMI/VGA/USB, operación 24/7',
    quantity: 1,
    unitPrice: 787878,
    totalPrice: 787878,
    category: "hikcentral-control",
    imagePath: "/images/products/monitor-32.webp",
    datasheetLabel: "Ficha Técnica Monitor 32\"",
  },
  {
    id: 25,
    ref: "LY-CM200",
    description: "Contacto magnético cableado liviano para puerta/esclusa",
    quantity: 5,
    unitPrice: 6561,
    totalPrice: 32805,
    category: "biometria-acceso",
    imagePath: "/images/products/contacto-magnetico.webp",
  },
  {
    id: 26,
    ref: "Cable Dúplex 2x12 x 100m",
    description: "Rollo cable dúplex 2x12 x 100 metros para alimentación eléctrica",
    quantity: 1,
    unitPrice: 78732,
    totalPrice: 78732,
    category: "infraestructura-ups",
    imagePath: "/images/products/cable-duplex.webp",
  },
  {
    id: 27,
    ref: "PORTÁTIL",
    description:
      'DELL PRO-15 PV15250. Intel Core i7 1355U, 16GB DDR5, 512GB SSD, Pantalla 15,6" FHD HDMI, Windows 11 Profesional (Licencia Windows 11 Pro 64 Bits)',
    quantity: 2,
    unitPrice: 4290000,
    totalPrice: 8580000,
    category: "hikcentral-control",
    imagePath: "/images/products/portatil-dell.webp",
    highlight: true,
  },
];

export const FINANCIAL_SUMMARY = {
  subtotal: 60593946,
  ivaRate: 0.19,
  ivaAmount: 11512849.74,
  total: 72106795.74,
  advance50Percent: 36053397.87,
  balance50Percent: 36053397.87,
} as const;

export const COMMERCIAL_TERMS = {
  paymentScheme: [
    {
      step: "01",
      percentage: "50%",
      title: "Anticipo para Inicio de Obra",
      amount: FINANCIAL_SUMMARY.advance50Percent,
      note: "Aplica para valores mayores a $500.000 antes de IVA. Da inicio al despacho de equipos y programación de la instalación.",
    },
    {
      step: "02",
      percentage: "50%",
      title: "Saldo Contraentrega a Satisfacción",
      amount: FINANCIAL_SUMMARY.balance50Percent,
      note: "Se paga al finalizar la instalación, activar el sistema en portería y realizar las pruebas a satisfacción con la administración.",
    },
  ],
  warranty: {
    duration: "1 Año de Garantía Oficial",
    description:
      "Los equipos suministrados cuentan con garantía por un (1) año a partir de su instalación a satisfacción del cliente.",
    exclusions:
      "La garantía no incluye daños ocasionados por fluctuaciones eléctricas ni manipulación de equipos por parte de terceros sin previa autorización de Seguridad Explorer LTDA y/o IngExpertos.",
  },
  validity: {
    days: 20,
    description:
      "Esta cotización tiene una validez de veinte (20) días calendario a partir de la fecha de envío.",
  },
  rawLegalNote:
    "El proyecto dará inicio con el pago de anticipo por el 50% del valor total a pagar (aplica para valores mayores a $500.000 antes de IVA). El saldo a contraentrega. Esta cotización tiene una validez de 20 días a partir de la fecha de envío. Equipos suministrados cuentan con garantía por un año a partir de su instalación a satisfacción del cliente. Garantía no incluye daños por fluctuaciones eléctricas ni manipulación de equipos por parte de terceros, sin previa autorización de Seguridad Explorer LTDA y/o IngExpertos.",
} as const;

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const copExactFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCOP(value: number, showDecimals = false): string {
  return showDecimals
    ? copExactFormatter.format(value)
    : copFormatter.format(Math.round(value));
}
