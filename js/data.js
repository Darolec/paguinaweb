// Data for products generated automatically from folder structure
const allProducts = [
    {
        id: "prod-curaway-agujachiba",
        title: "Aguja para biopsia (Tipo Chiba)",
        desc: "Aguja para la toma de muestras de tejido blando por aspiración. Manufacturado en acero inoxidable con pabellón metálico-plástico para mejorar agarre y manejo.",
        img: "assets/Productos/curaway/aguja chiba/AgujaChiba.png",
        gallery: ["assets/Productos/curaway/aguja chiba/AgujaChiba.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "16G, 18G, 20G, 21G, 22G, 23G" }, { label: "Longitud", val: "150mm, 200mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Chiba'],
        url: "producto.html?id=prod-curaway-agujachiba"
    },
    {
        id: "prod-curaway-agujaparasistemamagnum",
        title: "Aguja de Biospsia Desechable para Disparador Magnum",
        desc: "Aguja de biopsia desechable fabricada en acero inoxidable, diseñada para ser utilizada con el disparador Magnum. Ofrece una alta precisión y un manejo confortable.",
        img: "assets/Productos/curaway/aguja para sistemamagnum/Magnum.png",
        gallery: ["assets/Productos/curaway/aguja para sistemamagnum/Magnum.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "14G, 16G, 18G, 20G" }, { label: "Longitud", val: "80mm, 100mm, 130mm, 160mm, 180mm, 200mm, 250mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Magnum'],
        url: "producto.html?id=prod-curaway-agujaparasistemamagnum"
    },
    {
        id: "prod-curaway-agujasemiautomatica",
        title: "Aguja para Biopsia Semi-automatica",
        desc: "Alcance ajustable de 10mm o 20mm. Diseño exclisivo de bloqueo de seguridad para evitar disparos accedentales deurante el prcedimiento.",
        img: "assets/Productos/curaway/agujaSemi-automatica/SemiAutomatica.png",
        gallery: ["assets/Productos/curaway/agujaSemi-automatica/SemiAutomatica.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "14G, 16G, 18G" }, { label: "Longitud", val: "80mm, 100mm, 130mm, 160mm, 200mm, 250mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Semi-automatica'],
        url: "producto.html?id=prod-curaway-agujasemiautomatica"
    },
    {
        id: "prod-curaway-agujatrucut",
        title: "Aguja para Biopsia (Tipo Tru-cut)",
        desc: "Aguja para toma de muestra de tejido blando para tecnica manual. Manufacturadas en acero inoxidable y pabellon plastico para mejor agarre. Estilete con muestra de 18 mm.",
        img: "assets/Productos/curaway/agujatrucut/AgujaTrucut.png",
        gallery: ["assets/Productos/curaway/agujatrucut/AgujaTrucut.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "14G, 16G, 18G, 20G" }, { label: "Longitud", val: "100mm, 150mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Trucut'],
        url: "producto.html?id=prod-curaway-agujatrucut"
    },
    {
        id: "prod-curaway-alambredeinspeccionmamaria",
        title: "Alambre de inspeccion mamaria",
        desc: "Este intumento esta localiado para localizar microlesiones mamarias con guia de rayos X o ultrasonido. Proporciona instrucciones claras a los cirujanos para disminucion de la incicion y la herida.",
        img: "assets/Productos/curaway/Alambredeinspeccionmamaria/AlambreMamario.png",
        gallery: ["assets/Productos/curaway/Alambredeinspeccionmamaria/AlambreMamario.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Inspección Mamaria" }, { label: "Modelos", val: "Version J, Vercion Y, Version Q" }, { label: "Longitud", val: "N/A" }],
        cat: "Curaway",
        tags: ['Curaway', 'Inspección Mamaria', 'Alambre', 'J', 'Y', 'Q'],
        url: "producto.html?id=prod-curaway-alambredeinspeccionmamaria"
    },
    {
        id: "prod-curaway-automatica",
        title: "Instrumento automático para biopsia",
        desc: "Instrumento automático para biopsia de manipulación con una sola mano.",
        img: "assets/Productos/curaway/automatica/AgujaAutomatica.png",
        gallery: ["assets/Productos/curaway/automatica/AgujaAutomatica.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "14G, 16G, 18G, 20G" }, { label: "Longitud", val: "80mm, 100mm, 130mm, 160mm, 200mm, 250mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Automatica'],
        url: "producto.html?id=prod-curaway-automatica"
    },
    {
        id: "prod-curaway-illinoise",
        title: "Aguja manual para aspiración de médula ósea (Tipo Illinoise)",
        desc: "La aguja cuenta con un mecanismo de bloqueo interno que evita daños en la punta y garantiza una inyección segura. Permite ajustar la longitud de la aguja en un solo paso para una punción segura. Punta de acero especial diseñada para procedimientos de punción mínimamente invasivos.",
        img: "assets/Productos/curaway/Illinoise/AgujaIllinos.png",
        gallery: ["assets/Productos/curaway/Illinoise/AgujaIllinos.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "15G, 16G, 18G" }, { label: "Longitud", val: "10mm, 20mm, 30mm, 40mm, 50mm, 60mm, 80mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Illinoise'],
        url: "producto.html?id=prod-curaway-illinoise"
    },
    {
        id: "prod-curaway-jamshiy",
        title: "Aguja manual  para médula ósea (Tipo Jamshidy)",
        desc: "Diseño de doble punta para una mayor comodidad al tomar muestras de diferentes puntos. Diseño de extremo poroso para una recolección de muestras tridimensional más completa..",
        img: "assets/Productos/curaway/Jamshiy/AgujaJamshidi.png",
        gallery: ["assets/Productos/curaway/Jamshiy/AgujaJamshidi.png"],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "11G, 13G" }, { label: "Longitud", val: "50mm, 70mm, 100mm, 150mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Jamshidy'],
        url: "producto.html?id=prod-curaway-jamshiy"
    },
    {
        id: "prod-curaway-osgood",
        title: "Agujas para biopsia de médula ósea (Tipo Osgood/Rosenthal)",
        desc: "Agujas para toma de muestras por aspiración de medula ósea. Manufacturadas en acero inoxidable y pabellón metálico-plástico para mejor agarre.",
        img: "assets/Productos/curaway/osgood/AgujaOsgood.png",
        gallery: [
            "assets/Productos/curaway/osgood/AgujaOsgood.png",
            "assets/Productos/curaway/osgood/AgujaOsgood2.png",
            "assets/Productos/curaway/osgood/AgujaOsgood3.png"
        ],
        specs: [{ label: "Marca", val: "Curaway" }, { label: "Uso", val: "Biopsia" }, { label: "Calibre", val: "14G, 16G, 18G, 20G" }, { label: "Longitud", val: "33mm, 50mm" }],
        cat: "Curaway",
        tags: ['Curaway', 'Biopsia', 'Aguja', 'Osgood', 'Rosenthal'],
        url: "producto.html?id=prod-curaway-osgood"
    },
    {
        id: "prod-fushan-biovacacanalado",
        title: "Equipo para Drenaje Post-quirúrgico con Sonda Acanalada y Reservorio de Silicon (Tipo Biovac)",
        desc: "Incluye Sonda Acanalado de diversos calibres con Reservorio de Silicon con salida inferior. Bolsa Recolectora. Con o sin trocar. Presentación Individual. Estériles y desechables.",
        img: "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/biovacacanalado.png",
        gallery: [
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/biovacacanalado.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/bolsaparadrenaje.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/cateterparadrenajeacanalado.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/colareservorio.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/entradosreservario.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/reservariodesilicon.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac acanalado/trokar.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "10fr, 15fr, 16fr, 19fr, 20fr" }, { label: "Longitud", val: "Catéter" }],
        cat: "Fushan",
        tags: ['Fushan', 'Biovac', 'Drenaje Quirúrgico', 'Sonda Acanalada', 'Reservorio de Silicon',],
        url: "producto.html?id=prod-fushan-biovacacanalado"
    },
    {
        id: "prod-fushan-biovacplano",
        title: "Equipo para Drenaje Post-quirúrgico con Sonda Plana y Reservorio de Silicon (Tipo Biovac)",
        desc: "Incluye Sonda Plana de diversos calibres con Reservorio de Silicon con salida inferior. Bolsa Recolectora. Con o sin trocar. Presentación Individual. Estériles y desechables.",
        img: "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/viovackredondo.png",
        gallery: [
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/Cateterparadrenajaplano.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/bolsaparadrenaje.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/colareservorio.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/entradosreservario.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/reservariodesilicon.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/trokar.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac plano/viovackredondo.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "7mm, 10mm, 15mm" }, { label: "Capacidad", val: "100ml, 200ml" }],
        cat: "Fushan",
        tags: ['Fushan', 'Biovac', 'Drenaje Quirúrgico', 'Sonda Plana', 'Reservorio de Silicon'],
        url: "producto.html?id=prod-fushan-biovacplano"
    },
    {
        id: "prod-fushan-biovacredondo",
        title: "Equipo para Drenaje Post-quirúrgico con Sonda Redonda y Reservorio de Silicon (Tipo Biovac)",
        desc: "Incluye Sonda Redonda de diversos calibres con Reservorio de Silicon con salida inferior, Bolsa recolectora, Con o Sin trocar. Presentación Individual. Estériles y desechables.",
        img: "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/biovac.png",
        gallery: [
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/biovac.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/bolsaparadrenaje.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/cateterparadrenajeacanalado.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/colareservorio.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/entradosreservario.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/reservariodesilicon.png",
            "assets/Productos/fushan/reservo de silicon tipo biovac/biovac redondo/trokar.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "10fr, 12fr, 14fr, 15fr, 16fr, 18fr, 19fr, 20fr" }, { label: "Capacidad", val: "100ml, 200ml" }],
        cat: "Fushan",
        tags: ['Fushan', 'Biovac', 'Drenaje Quirúrgico', 'Sonda Redonda', 'Reservorio de Silicon'],
        url: "producto.html?id=prod-fushan-biovacredondo"
    },
    {
        id: "prod-fushan-reservoriodesilicon",
        title: "Reservorio de Silicon",
        desc: " Reservorio de Silicon Marca Fushan capacidad de 100 ml y con entrada inferior.",
        img: "assets/Productos/fushan/reservorio de silicon/reservariodesilicon.png",
        gallery: [
            "assets/Productos/fushan/reservorio de silicon/reservariodesilicon.png",
            "assets/Productos/fushan/reservorio de silicon/colareservorio.png",
            "assets/Productos/fushan/reservorio de silicon/entradosreservario.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Capacidad", val: "100 ml, 200 ml" }],
        cat: "Fushan",
        tags: ['Fushan', 'Reservorio de Silicon', 'Drenaje Quirúrgico', 'Biovac', 'JacksonPratt'],
        url: "producto.html?id=prod-fushan-reservoriodesilicon"
    },
    {
        id: "prod-fushan-jacksonprattacanalado",
        title: "Equipo para Drenaje Post-quirúrgico con Sonda Acanalada y Reservorio de Silicon (Tipo Jackson Pratt)",
        desc: "Incluye Sonda Acanalada de diversos calibres con Reservorio de Silicon con salida inferior, Con o Sin trocar. Presentación Individual. Estériles y desechables.",
        img: "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/jacksonacanalado.png",
        gallery: [
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/jacksonacanalado.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/cateterparadrenajeacanalado.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/colareservorio.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/entradosreservario.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/reservariodesilicon.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt acanalado/trokar.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "10fr, 15fr, 16fr, 19fr, 20fr" }, { label: "Capacidad", val: "100ml, 200ml" }],
        cat: "Fushan",
        tags: ['Fushan', 'JacksonPratt', 'Drenaje Quirúrgico', 'Sonda Acanalada', 'Reservorio de Silicon'],
        url: "producto.html?id=prod-fushan-jacksonprattacanalado"
    },
    {
        id: "prod-fushan-jacksonprattplano",
        title: "Equipo para Drenaje Post-quirúrgico con Sonda Plana y Reservorio de Silicon (Tipo Jackson Pratt)",
        desc: "Incluye Sonda Plana de diversos calibres con Reservorio de Silicon con salida inferior, Con o Sin trocar. Presentación Individual. Estériles y desechables.",
        img: "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/jacksonplano.png",
        gallery: [
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/jacksonplano.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/Cateterparadrenajaplano.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/colareservorio.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/entradosreservario.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/reservoriodesilicon.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt plano/trokar.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "10fr, 15fr, 16fr, 19fr, 20fr" }, { label: "Capacidad", val: "100ml, 200ml" }],
        cat: "Fushan",
        tags: ['Fushan', 'JacksonPratt', 'Drenaje Quirúrgico', 'Sonda Plana', 'Reservorio de Silicon'],
        url: "producto.html?id=prod-fushan-jacksonprattplano"
    },
    {
        id: "prod-fushan-jacksonprattredondo",
        title: "Equipo para Drenaje Post-quirúrgico con Sonda Redonda y Reservorio de Silicon (Tipo Jackson Pratt)",
        desc: "Incluye Sonda Redonda de diversos calibres con Reservorio de Silicon con salida inferior, Con o Sin trocar. Presentación Individual. Estériles y desechables.",
        img: "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/jacksonredondo.png",
        gallery: [
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/jacksonredondo.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/cateterparadrenajeredondo.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/colareservorio.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/entradosreservario.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/reservariodesilicon.png",
            "assets/Productos/fushan/reservorio de slicon tipo jackson pratt/jackson pratt redondo/trokar.png"
        ],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "10fr, 15fr, 16fr, 19fr, 20fr" }, { label: "Capacidad", val: "100ml, 200ml" }],
        cat: "Fushan",
        tags: ['Fushan', 'JacksonPratt', 'Drenaje Quirúrgico', 'Sonda Redonda', 'Reservorio de Silicon'],
        url: "producto.html?id=prod-fushan-jacksonprattredondo"
    },
    {
        id: "prod-fushan-sondadealimentacioninfantil",
        title: "Tubos gástricos para alimentación infantil",
        desc: "De plástico transparente. Con orificio en el extremo proximal y otro lateral en los dos primeros cm. Para alimentación, descompresión ó succión continua. Abordaje naso/orogástrico. Manufacturados en PVC grado médico. Punta Abierta con 4 orificios laterales. Marcas de Graduación.",
        img: "assets/Productos/fushan/SondadeAlimentacionInfantil/TuboAgastrico deAlimetcionInfantil.png",
        gallery: ["assets/Productos/fushan/SondadeAlimentacionInfantil/TuboAgastrico deAlimetcionInfantil.png"],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Nutrición / Alimentación" }, { label: "Calibre", val: "5fr, 6fr, 8fr" }, { label: "Longitud", val: "38cm, 90cm (Sonda)" }],
        cat: "Fushan",
        tags: ['Fushan', 'SondaGastrica', 'Nutrición / Alimentación', 'Sonda de Alimentación Infantil'],
        url: "producto.html?id=prod-fushan-sondadealimentacioninfantil"
    },
    {
        id: "prod-fushan-sondagastircalevin",
        title: "Sonda Gastirca Levin",
        desc: "Ficha técnica para Sonda Gastirca Levin (Fushan).",
        img: "assets/Productos/fushan/SondaGastircaLevin/CatatersondaGastricaLevin.png",
        gallery: ["assets/Productos/fushan/SondaGastircaLevin/CatatersondaGastricaLevin.png"],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Drenaje Quirúrgico" }, { label: "Calibre", val: "N/A" }, { label: "Longitud", val: "Catéter" }],
        cat: "Fushan",
        tags: ['Fushan', 'SondaGastrica', 'Nutrición / Alimentación', 'Sonda de Levin'],
        url: "producto.html?id=prod-fushan-sondagastircalevin"
    },
    {
        id: "prod-fushan-tubogastricopoliuretano",
        title: "Tubo Gastrico con punta lastrada de Poliuretano (Tipo Nutrición Enteral)",
        desc: "De poliuretano. Punta de tungsteno de 3 grs. Para uso en nutrición enteral. Manufacturados en Poliuretano Grado Médico opaco a los Rayos X.",
        img: "assets/Productos/fushan/TuboGastrico/TuboGastricoPoliuretano/TuboGastricodePiliuretano.png",
        gallery: ["assets/Productos/fushan/TuboGastrico/TuboGastricoPoliuretano/TuboGastricodePiliuretano.png"],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Nutrición / Alimentación" }, { label: "Calibre", val: "10fr, 12fr, 14fr, 16fr, 18fr, 20fr" }, { label: "Longitud", val: "114cm (Sonda)" }],
        cat: "Fushan",
        tags: ['Fushan', 'TuboGastrico', 'Nutrición / Alimentación'],
        url: "producto.html?id=prod-fushan-tubogastricopoliuretano"
    },
    {
        id: "prod-fushan-tubogastricosilicon",
        title: "Tubo Gastrico con punta lastrada de Silicon (Tipo Nutrición Enteral)",
        desc: "De Silicon. Punta de tungsteno de 3 grs. Para uso en nutrición enteral. Manufacturados en Silicon Grado Médico opaco a los Rayos X.",
        img: "assets/Productos/fushan/TuboGastrico/TuboGastricoPoliuretano/TuboGastricodePiliuretano.png",
        gallery: ["assets/Productos/fushan/TuboGastrico/TuboGastricoPoliuretano/TuboGastricodePiliuretano.png"],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Nutrición / Alimentación" }, { label: "Calibre", val: "10fr, 12fr, 14fr, 16fr, 18fr, 20fr" }, { label: "Longitud", val: "114cm (Sonda)" }],
        cat: "Fushan",
        tags: ['Fushan', 'TuboGastrico', 'Nutrición / Alimentación'],
        url: "producto.html?id=prod-fushan-tubogastricosilicon"
    },
    {
        id: "prod-fushan-tubogatricodesilicon",
        title: "Tubo Gatrico de Silicon",
        desc: "Ficha técnica para Tubo Gatrico de Silicon (Fushan).",
        img: "assets/Productos/fushan/TuboGastrico/TuboGatricodeSilicon/TuboGastirco deSilicon.png",
        gallery: ["assets/Productos/fushan/TuboGastrico/TuboGatricodeSilicon/TuboGastirco deSilicon.png"],
        specs: [{ label: "Marca", val: "Fushan" }, { label: "Uso", val: "Nutrición / Alimentación" }, { label: "Calibre", val: "N/A" }, { label: "Longitud", val: "114cm (Sonda)" }],
        cat: "Fushan",
        tags: ['Fushan', 'TuboGastrico', 'Nutrición / Alimentación'],
        url: "producto.html?id=prod-fushan-tubogatricodesilicon"
    },
    {
        id: "prod-hoshimed-bolsadepierna",
        title: "Bolsa recolectora de orina para pierna con cinturón",
        desc: " Bolsa recolectora de orina para pierna con cinturón. Capacidad de 350 ml, 500ml, 750ml",
        img: "assets/Productos/Hoshimed/bolsa de orina/Bolsade pierna/bolsadepierna.png",
        gallery: ["assets/Productos/Hoshimed/bolsa de orina/Bolsade pierna/bolsadepierna.png"],
        specs: [{ label: "Marca", val: "Hoshimed" }, { label: "Uso", val: "Recolección de Orina" }, { label: "Capacidad", val: "350 ml, 500ml, 750ml" }, { label: "Longitud", val: "N/A" }],
        cat: "Hoshimed",
        tags: ['Hoshimed', 'BolsaDeOrina', 'Recolección de Orina'],
        url: "producto.html?id=prod-hoshimed-bolsadepierna"
    },
    {
        id: "prod-hoshimed-bolsadeorinalub04",
        title: "Bolsa recolectora de orina LUB04",
        desc: "Capacidad de 2000 ml. Con válvula en T. Válvula antirreflejo sin látex. Pinza para sábana de color azul. Tubo de entrada: diámetro exterior: 10 mm, longitud: 120 cm (o longitud personalizable)..",
        img: "assets/Productos/Hoshimed/bolsa de orina/bolsadeorina Lub-04/bolsadeorinalunb4.png",
        gallery: ["assets/Productos/Hoshimed/bolsa de orina/bolsadeorina Lub-04/bolsadeorinalunb4.png"],
        specs: [{ label: "Marca", val: "Hoshimed" }, { label: "Uso", val: "Recolección de Orina" }, { label: "Capacidad", val: "2000 ml" }, { label: "Calibre", val: "10 mm" }, { label: "Longitud", val: "120cm (Tubo)" }],
        cat: "Hoshimed",
        tags: ['Hoshimed', 'BolsaDeOrina', 'Recolección de Orina'],
        url: "producto.html?id=prod-hoshimed-bolsadeorinalub04"
    },
    {
        id: "prod-hoshimed-bolsadeorinalub05",
        title: "Bolsa recolectora de orina de lujo LUB05",
        desc: "Capacidad de 2000 ml con válvula en T. Cámara antigoteo y válvula antirretorno. Soporte y cordón de plástico. Incluye pinza para fijar a la sábana (color blanco) y bolsillo para la cánula. Tubo de entrada: diámetro exterior: 11 mm, longitud: 120 cm (o longitud personalizable).",
        img: "assets/Productos/Hoshimed/bolsa de orina/bolsadeorina Lub-05/bolsadeorinalub5.png",
        gallery: ["assets/Productos/Hoshimed/bolsa de orina/bolsadeorina Lub-05/bolsadeorinalub5.png"],
        specs: [{ label: "Marca", val: "Hoshimed" }, { label: "Uso", val: "Recolección de Orina" }, { label: "Capacidad", val: "2000 ml" }, { label: "Calibre", val: "11 mm" }, { label: "Longitud", val: "120cm (Tubo)" }],
        cat: "Hoshimed",
        tags: ['Hoshimed', 'BolsaDeOrina', 'Recolección de Orina', 'Bolsa de Orina de Lujo'],
        url: "producto.html?id=prod-hoshimed-bolsadeorinalub05"
    },
    {
        id: "prod-kindly-epidural",
        title: "Agujas para anestesia retrobulbar (Tipo Atkinson)",
        desc: "Aguja para anestesia retrobulbar. Diversos calibres y longitudes. Desechables. Cánula y estilete en acero inoxidable 304L. Pabellón de plástico transparente. Siliconizada para una suave penetración.",
        img: "assets/Productos/Kindly/epidural/anestaciaepidural.png",
        gallery: ["assets/Productos/Kindly/epidural/anestaciaepidural.png"],
        specs: [{ label: "Marca", val: "Kindly" }, { label: "Uso", val: "Anestesia / Punción" }, { label: "Calibre", val: "25G, 26G, 27G" }, { label: "Longitud", val: "33mm, 50mm" }],
        cat: "Kindly",
        tags: ['Kindly', 'Epidural', 'Anestesia', 'Punción', 'Agujas para anestesia retrobulbar (Tipo Atkinson)'],
        url: "producto.html?id=prod-kindly-epidural"
    },
    {
        id: "prod-kindly-quincke",
        title: "Agujas para raquianestesia ó punción lumbar (Tipo Quincke)",
        desc: "Aguja Intraespinal para raquianestesia o punción Lumbar. Con mandril. Tipo Quincke/Green. Estéril. Diversos calibres y Longitudes.",
        img: "assets/Productos/Kindly/Green/green.png",
        gallery: ["assets/Productos/Kindly/Green/green.png"],
        specs: [{ label: "Marca", val: "Kindly" }, { label: "Uso", val: "Anestesia / Punción" }, { label: "Calibre", val: "18G, 19G, 20G, 21G, 22G, 23G, 24G, 25G, 26G, 27G" }, { label: "Longitud", val: "50mm, 90mm, 120mm" }],
        cat: "Kindly",
        tags: ['Kindly', 'Quincke', 'Anestesia', 'Punción', 'Agujas para raquianestesia ó punción lumbar (Tipo Quincke)'],
        url: "producto.html?id=prod-kindly-quincke"
    },
    {
        id: "prod-kindly-green",
        title: "Agujas para raquianestesia ó punción lumbar (Tipo Green)",
        desc: "Aguja Intraespinal para raquianestesia o punción Lumbar. Con mandril. Tipo Green. Estéril. Diversos calibres y Longitudes.",
        img: "assets/Productos/Kindly/Green/green.png",
        gallery: ["assets/Productos/Kindly/Green/green.png"],
        specs: [{ label: "Marca", val: "Kindly" }, { label: "Uso", val: "Anestesia / Punción" }, { label: "Calibre", val: "18G, 19G, 20G, 21G, 22G, 23G, 24G, 25G, 26G, 27G" }, { label: "Longitud", val: "50mm, 90mm, 120mm" }],
        cat: "Kindly",
        tags: ['Kindly', 'Green', 'Anestesia', 'Punción', 'Agujas para raquianestesia ó punción lumbar (Tipo Green)'],
        url: "producto.html?id=prod-kindly-green"
    },
    {
        id: "prod-kindly-huber",
        title: "Aguja para quimioterapia con set de infusión (Tipo Huber)",
        desc: "Agujas para perfusión de soluciones o sustancias medicamentosas. Sitio en “Y”. Manufacturadas en acero inoxidable 304L y pabellón plástico para mejor agarre. Con o sin tubo de extensión y sitio de inyección.",
        img: "assets/Productos/Kindly/huber/huber.png",
        gallery: ["assets/Productos/Kindly/huber/huber.png"],
        specs: [{ label: "Marca", val: "Kindly" }, { label: "Uso", val: "Acceso Vascular" }, { label: "Calibre", val: "19G, 21G, 22G" }, { label: "Longitud", val: "19mm, 24mm" }],
        cat: "Kindly",
        tags: ['Kindly', ' Huber', 'Acceso Vascular'],
        url: "producto.html?id=prod-kindly-huber"
    },
    {
        id: "prod-kindly-touhy",
        title: "Agujas para anestesia epidural (Tipo Touhy)",
        desc: "Aguja Intraespinal, para raquianestesia ó bloqueo epidural. Con ó sin plato basal y mandril. Reusables ó desechables. Cánula y estilete en acero inoxidable 304L. Pabellón de metal ó plástico transparente. Con ó sin plato basal. Cánula marcada con indicadores de profundidad. Siliconizada para una suave penetración.",
        img: "assets/Productos/Kindly/Touhy/touhy.png",
        gallery: ["assets/Productos/Kindly/Touhy/touhy.png"],
        specs: [{ label: "Marca", val: "Kindly" }, { label: "Uso", val: "Anestesia / Punción" }, { label: "Calibre", val: "16G, 17G, 18G, 20G" }, { label: "Longitud", val: "80mm, 90mm" }],
        cat: "Kindly",
        tags: ['Kindly', 'Touhy', 'Anestesia', 'Punción', 'Agujas para anestesia epidural (Tipo Touhy)'],
        url: "producto.html?id=prod-kindly-touhy"
    },
    {
        id: "prod-kindly-whitacre",
        title: "Agujas para raquianestesia punta de lápiz (Tipo Withacre)",
        desc: "Aguja Intraespinal para raquianestesia o bloqueo subaracnoideo. Punta de lápiz. Con conector roscado luerlock hembra traslucido y mandril con botón indicador. Con depósito de 0.2ml en pabellón para líquido cefalorraquídeo.",
        img: "assets/Productos/Kindly/Whitacre/Whitacre.png",
        gallery: ["assets/Productos/Kindly/Whitacre/Whitacre.png"],
        specs: [{ label: "Marca", val: "Kindly" }, { label: "Uso", val: "Anestesia / Punción" }, { label: "Calibre", val: "22G, 23G, 24G, 25G, 26G, 27G" }, { label: "Longitud", val: "90mm, 120mm" }],
        cat: "Kindly",
        tags: ['Kindly', 'Whitacre', 'Anestesia', 'Punción', 'Agujas para raquianestesia punta de lápiz (Tipo Withacre)'],
        url: "producto.html?id=prod-kindly-whitacre"
    },
    {
        id: "prod-weikand-canulanasaladulto",
        title: "Cánula Nasal Adulto con Tubos De Extensión Para Oxígeno",
        desc: "Dispositivos tubulares de plástico grado médico utilizados para la administración de oxigenoterapia y otros gases medicinales en pacientes con problemas de insuficiencia respiratoria, aguda o crónica y otras patologías afines.",
        img: "assets/Productos/weikand/CanulaNasal/CanulaNasalAdulto/CanulaNasal.png",
        gallery: [
            "assets/Productos/weikand/CanulaNasal/CanulaNasalAdulto/CanulaNasal.png",
            "assets/Productos/weikand/CanulaNasal/CanulaNasalAdulto/CanulaNasal1.png",
            "assets/Productos/weikand/CanulaNasal/CanulaNasalAdulto/CanulaNasal2.png"
        ],
        specs: [{ label: "Marca", val: "Weikand" }, { label: "Uso", val: "Respiratorio" }, { label: "Calibre", val: "N/A" }, { label: "Longitud", val: "180cm (Tubo)" }],
        cat: "Weikand",
        tags: ['Weikand', 'CanulaNasal', 'Respiratorio', 'Canula'],
        url: "producto.html?id=prod-weikand-canulanasaladulto"
    },
    {
        id: "prod-weikand-canulanasalinfantil",
        title: "Cánula Nasal Infantil con Tubos De Extensión Para Oxígeno",
        desc: "Dispositivos tubulares de plástico grado médico utilizados para la administración de oxigenoterapia y otros gases medicinales en pacientes con problemas de insuficiencia respiratoria, aguda o crónica y otras patologías afines.",
        img: "assets/Productos/weikand/CanulaNasal/CanulaNasalInfantil/CanulaNasal.png",
        gallery: [
            "assets/Productos/weikand/CanulaNasal/CanulaNasalInfantil/CanulaNasal.png",
            "assets/Productos/weikand/CanulaNasal/CanulaNasalInfantil/CanulaNasal1.png",
            "assets/Productos/weikand/CanulaNasal/CanulaNasalInfantil/CanulaNasal2.png"
        ],
        specs: [{ label: "Marca", val: "Weikand" }, { label: "Uso", val: "Respiratorio" }, { label: "Longitud", val: "180cm (Tubo)" }],
        cat: "Weikand",
        tags: ['Weikand', 'CanulaNasal', 'Respiratorio', 'Canula'],
        url: "producto.html?id=prod-weikand-canulanasalinfantil"
    },
    {
        id: "prod-weikand-mascarilladeoxigenoadulto",
        title: "Mascarilla Adulto Simple para oxigenoterapia",
        desc: "Son dispositivos de plástico grado médico utilizados para la administración de oxigenoterapia y otros gases medicinales en pacientes con problemas de insuficiencia respiratoria, aguda ó crónica y otras patologías afines.",
        img: "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoAdulto/Mascarilladeoxigeno.png",
        gallery: [
            "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoAdulto/Mascarilladeoxigeno.png",
            "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoAdulto/Mascarilladeoxigeno2.png",
            "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoAdulto/MascarillodeOxigeno.png"
        ],
        specs: [{ label: "Marca", val: "Weikand" }, { label: "Uso", val: "Respiratorio" }, { label: "Longitud", val: "180cm (Tubo)" }],
        cat: "Weikand",
        tags: ['Weikand', 'MascarillaDeOxigeno', 'Respiratorio', 'Mascarilla'],
        url: "producto.html?id=prod-weikand-mascarilladeoxigenoadulto"
    },
    {
        id: "prod-weikand-mascarilladeoxigenoinfantil",
        title: "Mascarilla Infantil Simple para oxigenoterapia",
        desc: "Son dispositivos de plástico grado médico utilizados para la administración de oxigenoterapia y otros gases medicinales en pacientes con problemas de insuficiencia respiratoria, aguda ó crónica y otras patologías afines.",
        img: "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoInfamtil/Mascarilladeoxigeno.png",
        gallery: [
            "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoInfamtil/Mascarilladeoxigeno.png",
            "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoInfamtil/Mascarilladeoxigeno2.png",
            "assets/Productos/weikand/MascarilladeOxigeno/MascarilladeOxigenoInfamtil/MascarillodeOxigeno.png"
        ],
        specs: [{ label: "Marca", val: "Weikand" }, { label: "Uso", val: "Respiratorio" }, { label: "Longitud", val: "180cm (Tubo)" }],
        cat: "Weikand",
        tags: ['Weikand', 'MascarillaDeOxigeno', 'Respiratorio', 'Mascarilla'],
        url: "producto.html?id=prod-weikand-mascarilladeoxigenoinfantil"
    },
    {
        id: "prod-weikand-tubodeoxigeno",
        title: "Tubo de extensión para oxígeno",
        desc: "Los Tubos De Extensión Para Oxígeno son dispositivos tubulares de plástico grado médico utilizados para la administración de oxigenoterapia y otros gases medicinales en pacientes con problemas de insuficiencia respiratoria, aguda o crónica y otras patologías afines.",
        img: "assets/Productos/weikand/TubodeOxigeno/Tubodeoxigeno.png",
        gallery: [
            "assets/Productos/weikand/TubodeOxigeno/Tubodeoxigeno.png",
            "assets/Productos/weikand/TubodeOxigeno/Tubodeextencion.png",
            "assets/Productos/weikand/TubodeOxigeno/tubodeoxigeno (2).png"
        ],
        specs: [{ label: "Marca", val: "Weikand" }, { label: "Uso", val: "Respiratorio" }, { label: "Longitud", val: "180cm (Tubo)" }],
        cat: "Weikand",
        tags: ['Weikand', 'TuboDeOxigeno', 'Respiratorio', 'Tubo'],
        url: "producto.html?id=prod-weikand-tubodeoxigeno"
    },
    {
        id: "prod-zhongshan-balonbacky",
        title: "Balon hemostático postparto  (Tipo Bakri)",
        desc: "Balón hemostático postparto 24Fr Capacidad 500ml, para la prevención y contención compresiva de la hemorragia posparto; fácil de operar, hemostasia rápida, segura y efectiva.",
        img: "assets/Productos/Zhongshan/BalonBacky/BalonBakri.png",
        gallery: [
            "assets/Productos/Zhongshan/BalonBacky/BalonBakri.png",
            "assets/Productos/Zhongshan/BalonBacky/BalonBakri (2).png",
            "assets/Productos/Zhongshan/BalonBacky/balonposparto.png"
        ],
        specs: [{ label: "Marca", val: "Zhongshan" }, { label: "Uso", val: "Obstétrico" }, { label: "Calibre", val: "24fr" }, { label: "Capacidad", val: "500ml" }],
        cat: "Zhongshan",
        tags: ['Zhongshan', 'BalonBacky', 'Obstétrico', 'Catéter'],
        url: "producto.html?id=prod-zhongshan-balonbacky"
    },
    {
        id: "prod-zhongshan-balonbackydoble",
        title: "Catéter doble balón para dilatación cervical",
        desc: "Catéter 100% silicón utilizado para la expansión mecánica del cuello uterino del cuello uterino con una madurez deficiente antes de la inducción a término del parto en las mujeres.",
        img: "assets/Productos/Zhongshan/BalonBackyDoble/doblebalonparadilatacion.png",
        gallery: [
            "assets/Productos/Zhongshan/BalonBackyDoble/doblebalonparadilatacion.png",
            "assets/Productos/Zhongshan/BalonBackyDoble/doblebalonparadilatacion (2).png"
        ],
        specs: [{ label: "Marca", val: "Zhongshan" }, { label: "Uso", val: "Obstétrico" }, { label: "Calibre", val: "24fr" }, { label: "Capacidad", val: "N/A" }],
        cat: "Zhongshan",
        tags: ['Zhongshan', 'BalonBackyDoble', 'Obstétrico', 'Catéter'],
        url: "producto.html?id=prod-zhongshan-balonbackydoble"
    },
    {
        id: "prod-zhongshan-balonbackytriangular",
        title: "Balón hemostático postparto  (Tipo Triangular)",
        desc: "Catéter 100% silicón utilizado para la expansión mecánica del cuello uterino del cuello uterino con una madurez deficiente antes de la inducción a término del parto en las mujeres.",
        img: "assets/Productos/Zhongshan/BalonBackyTriangular/catterbalontriangular.png",
        gallery: [
            "assets/Productos/Zhongshan/BalonBackyTriangular/catterbalontriangular.png"
        ],
        specs: [{ label: "Marca", val: "Zhongshan" }, { label: "Uso", val: "Obstétrico" }, { label: "Calibre", val: "24fr" }, { label: "Capacidad", val: "500ml" }],
        cat: "Zhongshan",
        tags: ['Zhongshan', 'BalonBackyTriangular', 'Obstétrico', 'Catéter'],
        url: "producto.html?id=prod-zhongshan-balonbackytriangular"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allProducts };
}

/**
 * Formatea el título del producto para mostrar "(Tipo ...)" como subtítulo
 */
function formatTitleHTML(title) {
    if (!title) return '';
    // Local escape helper to avoid depending on other scripts (data.js is loaded first)
    function escapeHTMLLocal(str) {
        return String(str || '').replace(/[&<>"']/g, function (s) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
        });
    }

    const match = title.match(/(\(Tipo.*?\))/i);
    if (match) {
        const subtitle = match[0];
        const before = title.replace(subtitle, '');
        return escapeHTMLLocal(before) + '<span class="product-subtitle">' + escapeHTMLLocal(subtitle) + '</span>';
    }
    return escapeHTMLLocal(title);
}


