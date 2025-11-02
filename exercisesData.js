// exercisesData.js - Banco de dados completo dos 150 exercícios organizados em 30 lições
// ATUALIZADO: Corrigido enunciados (questions) dos exercícios 'wordOrder'
// para corresponderem ao formato de preencher lacunas.

window.exercisesData = [
    // LEKTION 1: Vorstellung (Apresentação) - OK
    {
        id: 1,
        title: 'Lektion 1: Vorstellung',
        topics: ['W-Fragen', 'Personalpronomen', 'Verbkonjugation: sein, heißen'],
        grammarKeys: ['W-Fragen', 'Personalpronomen', 'sein-heißen', 'Verbkonjugation'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (heißen): Wie ___ du?',
                answer: 'heißt',
                alternatives: ['heisst'],
                explanation: 'Bei "du" verwenden wir "heißt" (2. Person Singular). Wie heißt du? = Como você se chama?'
            },
            {
                type: 'fillBlank',
                question: 'Complete a W-Frage (perguntando a origem): ___ kommst du?',
                answer: 'woher',
                alternatives: [],
                explanation: '"Woher" pergunta pela origem/de onde você vem. Woher kommst du? = De onde você vem?'
            },
            {
                type: 'fillBlank',
                question: 'Complete a W-Frage (perguntando a localização): ___ wohnst du?',
                answer: 'wo',
                alternatives: [],
                explanation: '"Wo" pergunta pela localização. Wo wohnst du? = Onde você mora?'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o pronome pessoal: Das ist Maria. ___ kommt aus Spanien.',
                answer: 'sie',
                alternatives: [],
                explanation: '"Sie" (ela) substitui "Maria" (feminino). Das ist Maria. Sie kommt aus Spanien.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o pronome pessoal: ___ heiße Rod.',
                answer: 'ich',
                alternatives: [],
                explanation: 'O pronome "ich" (eu) é usado na 1ª pessoa do singular. Ich heiße Rod.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (sein): Ich ___ Student.',
                answer: 'bin',
                alternatives: [],
                explanation: 'O verbo "sein" na 1ª pessoa singular (ich) é "bin". Ich bin Student = Eu sou estudante.'
            },
            {
                type: 'multipleChoice',
                question: 'Conjugue o verbo (wohnen): Wo ___ du?',
                answer: 'wohnst',
                options: ['wohne', 'wohnst', 'wohnt', 'wohnen'],
                explanation: 'Bei der 2. Person Singular (du) endet das Verb auf -st. Du wohnst = você mora.'
            }
        ]
    },

    // LEKTION 2: Städte und Länder (Cidades e Países) - OK
    {
        id: 2,
        title: 'Lektion 2: Städte und Länder',
        topics: ['haben', 'wohnen', 'Alphabet', 'Länder und Sprachen'],
        grammarKeys: ['haben', 'Verbkonjugation', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (haben): Ich ___ eine Frage.',
                answer: 'habe',
                alternatives: [],
                explanation: 'O verbo "haben" (ter) na 1ª pessoa singular é "habe". Ich habe eine Frage = Eu tenho uma pergunta.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (haben): Du ___ ein schönes Auto.',
                answer: 'hast',
                alternatives: [],
                explanation: 'O verbo "haben" na 2ª pessoa singular (du) é "hast". Du hast ein Auto = Você tem um carro.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o idioma: Wer aus Spanien kommt, spricht ___.',
                answer: 'spanisch',
                alternatives: [],
                explanation: 'Pessoas da Espanha (Spanien) falam espanhol (Spanisch).'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o idioma: Wer ___ spricht, kommt oft aus Portugal oder Brasilien.',
                answer: 'portugiesisch',
                alternatives: [],
                explanation: 'Português (Portugiesisch) é falado em Portugal e no Brasil.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o idioma: Er kommt aus der Türkei, er spricht ___.',
                answer: 'türkisch',
                alternatives: [],
                explanation: 'Pessoas da Turquia (Türkei) falam turco (Türkisch).'
            },
            {
                type: 'translation',
                question: 'Traduza para alemão: 25',
                answer: 'fünfundzwanzig',
                alternatives: ['fuenfundzwanzig'],
                explanation: 'Em alemão, números compostos são escritos juntos: fünf + und + zwanzig = fünfundzwanzig.'
            }
        ]
    },

    // LEKTION 3: Sprachen und Nationalitäten - OK
    {
        id: 3,
        title: 'Lektion 3: Sprachen und Nationalitäten',
        topics: ['lesen', 'sprechen', 'Negation mit nicht'],
        grammarKeys: ['Vokalwechsel', 'Negation-nicht', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Negue a frase (com "nicht"): Ich wohne ___ in Hamburg.',
                answer: 'nicht',
                alternatives: [],
                explanation: '"nicht" (não) é usado para negar verbos. Ich wohne nicht in Hamburg = Eu não moro em Hamburgo.'
            },
            {
                type: 'fillBlank',
                question: 'Negue a frase (com "nicht"): Das ist ___ mein Bruder.',
                answer: 'nicht',
                alternatives: [],
                explanation: 'Usamos "nicht" antes de substantivos com possessivo. Das ist nicht mein Bruder = Esse não é meu irmão.'
            },
            {
                type: 'fillBlank',
                question: 'Er ___ (sprechen) sehr gut Englisch.',
                answer: 'spricht',
                alternatives: [],
                explanation: 'O verbo "sprechen" muda de "e" para "i" na 3ª pessoa singular: er spricht.'
            },
            {
                type: 'multipleChoice',
                question: '___ (lesen) du gern Bücher?',
                answer: 'liest',
                options: ['lese', 'liest', 'lesen', 'lest'],
                explanation: 'O verbo "lesen" muda de "e" para "ie" com "du": du liest.'
            },
            {
                type: 'fillBlank',
                question: 'Sie ___ (sehen) einen Film.',
                answer: 'sieht',
                alternatives: [],
                explanation: 'O verbo "sehen" muda de "e" para "ie" na 3ª pessoa: sie sieht.'
            }
        ]
    },

    // LEKTION 5: Berufe und Verwandtschaft - OK
    {
        id: 5,
        title: 'Lektion 5: Berufe und Verwandtschaft',
        topics: ['arbeiten', 'studieren', 'Wortbildung -in'],
        grammarKeys: ['Berufe', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Forma feminina: Der Lehrer → Die ___',
                answer: 'lehrerin',
                alternatives: [],
                explanation: 'A forma feminina é criada adicionando "-in": der Lehrer → die Lehrerin.'
            },
            {
                type: 'fillBlank',
                question: 'Forma feminina: Der Arzt → Die ___',
                answer: 'ärztin',
                alternatives: ['aerztin'],
                explanation: 'Com Umlaut: der Arzt → die Ärztin (médica).'
            },
            {
                type: 'fillBlank',
                question: 'Complete a profissão: Er arbeitet im Krankenhaus. Er ist ___.',
                answer: 'arzt',
                alternatives: [],
                explanation: 'Quem trabalha no hospital (Krankenhaus) é médico (Arzt).'
            },
            {
                type: 'fillBlank',
                question: 'Complete a profissão: Sie unterrichtet Schüler. Sie ist ___.',
                answer: 'lehrerin',
                alternatives: [],
                explanation: 'Quem ensina (unterrichten) alunos é professora (Lehrerin).'
            },
            {
                type: 'fillBlank',
                question: 'Complete o parente: Der Vater von meinem Vater ist mein ___.',
                answer: 'großvater',
                alternatives: ['grossvater', 'opa'],
                explanation: 'O pai do seu pai é seu avô (Großvater ou Opa).'
            },
            {
                type: 'fillBlank',
                question: 'Complete o parente: Die Schwester von meiner Mutter ist meine ___.',
                answer: 'tante',
                alternatives: [],
                explanation: 'A irmã da sua mãe é sua tia (Tante).'
            }
        ]
    },

    // LEKTION 7: Lebensmittel - OK
    {
        id: 7,
        title: 'Lektion 7: Lebensmittel',
        topics: ['essen', 'Akkusativ', 'Negativartikel kein'],
        grammarKeys: ['Akkusativ', 'Negativartikel', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o artigo indefinido (Akkusativ): Ich habe ___ (der) Hund.',
                answer: 'einen',
                alternatives: [],
                explanation: 'Akkusativ masculino: ein → einen. Ich habe einen Hund = Eu tenho um cachorro.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo indefinido (Akkusativ): Er kauft ___ (die) Jacke.',
                answer: 'eine',
                alternatives: [],
                explanation: 'Akkusativ feminino não muda: eine bleibt eine.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo negativo (Akkusativ): Ich habe ___ (der) Computer.',
                answer: 'keinen',
                alternatives: [],
                explanation: 'Negativartikel im Akkusativ masculino: kein → keinen.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo negativo (Nominativ): Ist das ein Tisch? — Nein, das ist ___ Tisch.',
                answer: 'kein',
                alternatives: [],
                explanation: 'Negação de substantivo masculino no nominativo: kein Tisch.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com a cor: Die Banane ist ___.',
                answer: 'gelb',
                alternatives: [],
                explanation: 'Bananas são amarelas (gelb).'
            },
            {
                type: 'fillBlank',
                question: 'Ich trinke gern ___ (café).',
                answer: 'kaffee',
                alternatives: [],
                explanation: 'Café em alemão é "der Kaffee".'
            }
        ]
    },

    // LEKTION 9: Unregelmäßige Verben - OK
    {
        id: 9,
        title: 'Lektion 9: Unregelmäßige Verben',
        topics: ['wollen', 'Akkusativ mit allen Artikeln'],
        grammarKeys: ['Vokalwechsel', 'Akkusativ', 'Artikel'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o artigo definido (Akkusativ): Ich sehe ___ (der) Mann.',
                answer: 'den',
                alternatives: [],
                explanation: 'Akkusativ: der → den. Ich sehe den Mann.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo definido (Akkusativ): Er nimmt ___ (der) Bus.',
                answer: 'den',
                alternatives: [],
                explanation: 'Akkusativ masculino: der Bus → den Bus.'
            },
            {
                type: 'fillBlank',
                question: 'Du ___ (fahren) zu schnell.',
                answer: 'fährst',
                alternatives: ['faehrst'],
                explanation: 'Vokalwechsel a → ä: du fährst.'
            },
            {
                type: 'fillBlank',
                question: 'Er ___ (schlafen) am Wochenende lange.',
                answer: 'schläft',
                alternatives: ['schlaeft'],
                explanation: 'Vokalwechsel a → ä: er schläft.'
            },
            {
                type: 'fillBlank',
                question: 'Was ___ (essen) du gern?',
                answer: 'isst',
                alternatives: [],
                explanation: 'Vokalwechsel e → i: du isst (cuidado com duplo "s").'
            }
        ]
    },

    // LEKTION 11: Trennbare Verben - ATUALIZADO (Bug 3)
    {
        id: 11,
        title: 'Lektion 11: Trennbare Verben',
        topics: ['Trennbare Verben', 'Genitiv', 'kein im Detail'],
        grammarKeys: ['Trennbare-Verben', 'Negativartikel', 'Satzklammer'],
        exercises: [
            {
                type: 'wordOrder',
                question: 'Complete a frase (abfahren): Wann ___ der Zug ___?',
                words: ['fährt', 'ab'],
                answer: 'fährt ab',
                alternatives: ['faehrt ab'],
                explanation: 'Verbo separável (abfahren): O prefixo "ab" vai para o final. Wann fährt der Zug ab?'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (einladen): Ich ___ meine Freunde zum Essen ___.',
                words: ['lade', 'ein'],
                answer: 'lade ein',
                explanation: 'Verbo separável (einladen): O prefixo "ein" vai para o final. Ich lade ... ein.'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (zumachen): Er ___ die Tür ___.',
                words: ['macht', 'zu'],
                answer: 'macht zu',
                explanation: 'Verbo separável (zumachen): O prefixo "zu" vai para o final. Er macht ... zu.'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (einkaufen): Sie ___ im Supermarkt ___.',
                words: ['kauft', 'ein'],
                answer: 'kauft ein',
                explanation: 'Verbo separável (einkaufen): O prefixo "ein" vai para o final. Sie kauft ... ein.'
            }
        ]
    },

    // LEKTION 13: Einkaufen - OK
    {
        id: 13,
        title: 'Lektion 13: Einkaufen',
        topics: ['e/i-Wechsel', 'man', 'Possessivartikel'],
        grammarKeys: ['Vokalwechsel', 'Possessivartikel', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o possessivo (ich - Nom.): Hier ist ___ Buch (das).',
                answer: 'mein',
                alternatives: [],
                explanation: 'Possessivartikel neutro: mein Buch.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o possessivo (du - Nom.): Hier ist ___ Tasche (die).',
                answer: 'deine',
                alternatives: [],
                explanation: 'Possessivartikel feminino: deine Tasche.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o possessivo (ich - Akk.): Ich suche ___ Schlüssel (der).',
                answer: 'meinen',
                alternatives: [],
                explanation: 'Akkusativ masculino: mein → meinen Schlüssel.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo definido (Nominativ): ___ Stuhl ist alt.',
                answer: 'der',
                alternatives: [],
                explanation: 'Definiter Artikel masculino Nominativ: der Stuhl.'
            }
        ]
    },

    // LEKTION 15: Kochen - OK
    {
        id: 15,
        title: 'Lektion 15: Kochen',
        topics: ['Zahlen', 'Kochen-Verben'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'translation',
                question: 'Traduza: 42',
                answer: 'zweiundvierzig',
                alternatives: [],
                explanation: 'Números alemães: zwei + und + vierzig = zweiundvierzig.'
            },
            {
                type: 'translation',
                question: 'Traduza: 88',
                answer: 'achtundachtzig',
                alternatives: [],
                explanation: 'acht + und + achtzig = achtundachtzig.'
            },
            {
                type: 'fillBlank',
                question: 'Ich esse ___ (pão) zum Frühstück.',
                answer: 'brot',
                alternatives: [],
                explanation: 'Pão = das Brot.'
            }
        ]
    },

    // LEKTION 17: Tagesablauf - ATUALIZADO (Bug 3)
    {
        id: 17,
        title: 'Lektion 17: Tagesablauf',
        topics: ['Temporale Präpositionen', 'Tagesablauf'],
        grammarKeys: ['Temporale-Präpositionen', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Preposição temporal (dias da semana): ___ Montag spiele ich Fußball.',
                answer: 'am',
                alternatives: [],
                explanation: 'Dias da semana usam "am": am Montag.'
            },
            {
                type: 'fillBlank',
                question: 'Preposição temporal (horas): Der Film beginnt ___ 20:15 Uhr.',
                answer: 'um',
                alternatives: [],
                explanation: 'Horas exatas usam "um": um 20:15 Uhr.'
            },
            {
                type: 'fillBlank',
                question: 'Preposição temporal (estações): ___ Sommer fahren wir nach Italien.',
                answer: 'im',
                alternatives: [],
                explanation: 'Estações do ano usam "im": im Sommer.'
            },
            {
                type: 'wordOrder',
                question: 'Complete (de... até...): Ich arbeite ___ 9:00 Uhr ___ 17:00 Uhr.',
                words: ['von', 'bis'],
                answer: 'von bis',
                explanation: 'von... bis... = de... até... (Neste caso, apenas ordene as preposições)'
            }
        ]
    },

    // LEKTION 19: Freizeit - ATUALIZADO (Bug 3)
    {
        id: 19,
        title: 'Lektion 19: Freizeit',
        topics: ['fernsehen', 'schlafen', 'Freizeitaktivitäten'],
        grammarKeys: ['Trennbare-Verben', 'Vokalwechsel', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Ich ___ gern Musik. (ouvir)',
                answer: 'höre',
                alternatives: ['hoere'],
                explanation: 'ouvir = hören. Ich höre Musik.'
            },
            {
                type: 'fillBlank',
                question: 'Am Wochenende ___ ich gern Freunde. (encontrar)',
                answer: 'treffe',
                alternatives: [],
                explanation: 'encontrar = treffen. Ich treffe Freunde.'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (fernsehen): Sie ___ jeden Abend ___.',
                words: ['sieht', 'fern'],
                answer: 'sieht fern',
                explanation: 'fernsehen é trennbar: Sie sieht fern.'
            }
        ]
    },

    // LEKTION 21: Modalverben - OK
    {
        id: 21,
        title: 'Lektion 21: Freizeit und Modalverben',
        topics: ['mögen', 'können'],
        grammarKeys: ['Modalverben', 'Satzklammer'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o verbo modal (können): Ich ___ gut schwimmen.',
                answer: 'kann',
                alternatives: [],
                explanation: 'können = poder/saber. Ich kann schwimmen = Eu sei nadar.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete com o verbo modal (können): ___ du mir helfen?',
                answer: 'kannst',
                options: ['kann', 'kannst', 'können', 'könnt'],
                explanation: 'können com "du": Kannst du mir helfen?'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o verbo modal (können): Wir ___ am Samstag kommen.',
                answer: 'können',
                alternatives: [],
                explanation: 'können com "wir": Wir können kommen.'
            }
        ]
    },

    // LEKTION 23: Verabredung - OK
    {
        id: 23,
        title: 'Lektion 23: Verabredung',
        topics: ['Possessivpronomen im Akkusativ'],
        grammarKeys: ['Possessivartikel', 'Akkusativ'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o possessivo (dein - Nom.): Wo ist ___ Handy (das)?',
                answer: 'dein',
                alternatives: [],
                explanation: 'Nominativo neutro: dein Handy.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o possessivo (dein - Akk.): Ich finde ___ Handy (das) nicht.',
                answer: 'dein',
                alternatives: [],
                explanation: 'Akkusativ neutro não muda: dein Handy.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o possessivo (mein - Akk.): Hast du ___ Schlüssel (der) gesehen?',
                answer: 'meinen',
                alternatives: [],
                explanation: 'Akkusativ masculino: mein → meinen Schlüssel.'
            }
        ]
    },

    // LEKTION 25: Zeit und Geld - OK
    {
        id: 25,
        title: 'Lektion 25: Zeit und Geld',
        topics: ['können', 'brauchen', 'Uhrzeiten'],
        grammarKeys: ['Modalverben', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete a hora (formal): 8:15 → Es ist acht ___ fünfzehn.',
                answer: 'uhr',
                alternatives: [],
                explanation: 'Formato formal: acht Uhr fünfzehn.'
            },
            {
                type: 'fillBlank',
                question: 'Complete a hora (informal): 10:15 → Es ist Viertel ___ elf.',
                answer: 'nach',
                alternatives: [],
                explanation: 'Formato informal: Viertel nach elf (quinze para as onze).'
            },
            {
                type: 'fillBlank',
                question: 'Complete a hora (informal): 9:30 → Es ist halb ___.',
                answer: 'zehn',
                alternatives: [],
                explanation: 'halb zehn = 9:30 (meia para as dez).'
            }
        ]
    },

    // LEKTION 27: Modalverben Erweitert - ATUALIZADO (Bug 3)
    {
        id: 27,
        title: 'Lektion 27: Modalverben',
        topics: ['müssen', 'dürfen', 'Satzklammer mit Modalverben'],
        grammarKeys: ['Modalverben', 'Satzklammer'],
        exercises: [
            {
                type: 'wordOrder',
                question: 'Complete com o modal (können): Ich ___ heute nicht ___. (kommen)',
                words: ['kann', 'kommen'],
                answer: 'kann kommen',
                explanation: 'Modalverb Satzklammer: Verbo principal (kommen) vai para o final. Ich kann ... kommen.'
            },
            {
                type: 'wordOrder',
                question: 'Complete com o modal (können): Sie ___ sehr gut ___. (singen)',
                words: ['kann', 'singen'],
                answer: 'kann singen',
                explanation: 'Modalverb Satzklammer: Verbo principal (singen) vai para o final. Sie kann ... singen.'
            }
        ]
    },

    // LEKTION 29: Natur - OK
    {
        id: 29,
        title: 'Lektion 29: Natur',
        topics: ['finden', 'suchen', 'Natur-Wortschatz'],
        grammarKeys: ['Wortschatz', 'Verbkonjugation'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete a estação do ano: Dezember, Januar und Februar sind ___.',
                answer: 'winter',
                alternatives: [],
                explanation: 'Esses meses são no inverno (Winter) no hemisfério norte.'
            },
            {
                type: 'fillBlank',
                question: 'Complete o mês: Der Monat nach Juni ist ___.',
                answer: 'juli',
                alternatives: [],
                explanation: 'Depois de junho (Juni) vem julho (Juli).'
            }
        ]
    },

    // LEKTION 31: Kleidung - OK
    {
        id: 31,
        title: 'Lektion 31: Kleidung',
        topics: ['gefallen', 'helfen', 'Dativ Einführung'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Antônimo: groß (grande) ≠ ___',
                answer: 'klein',
                alternatives: [],
                explanation: 'O oposto de groß (grande) é klein (pequeno).'
            },
            {
                type: 'fillBlank',
                question: 'Antônimo: alt (velho) ≠ ___',
                answer: 'jung',
                alternatives: ['neu'],
                explanation: 'O oposto de alt pode ser jung (jovem) ou neu (novo).'
            },
            {
                type: 'fillBlank',
                question: 'Antônimo: teuer (caro) ≠ ___',
                answer: 'billig',
                alternatives: ['günstig'],
                explanation: 'O oposto de teuer é billig ou günstig (barato).'
            }
        ]
    },

    // LEKTION 33: Verwandtschaft - OK
    {
        id: 33,
        title: 'Lektion 33: Verwandtschaft',
        topics: ['Personalpronomen im Dativ', 'Familie'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete o parente: Die Mutter von meiner Mutter ist meine ___.',
                answer: 'großmutter',
                alternatives: ['grossmutter', 'oma'],
                explanation: 'A mãe da sua mãe é sua avó (Großmutter/Oma).'
            },
            {
                type: 'fillBlank',
                question: 'Complete o parente: Der Bruder von meinem Vater ist mein ___.',
                answer: 'onkel',
                alternatives: [],
                explanation: 'O irmão do seu pai é seu tio (Onkel).'
            }
        ]
    },

    // LEKTION 35: Reisen - ATUALIZADO (Bug 3)
    {
        id: 35,
        title: 'Lektion 35: Reisen',
        topics: ['Dativ nach "mit"', 'Verkehrsmittel'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'wordOrder',
                question: 'Complete (preposição "mit" + Dativ): Ich fahre zur Arbeit ___ ___ ___. (o trem)',
                words: ['mit', 'dem', 'Zug'],
                answer: 'mit dem zug',
                explanation: 'mit dem Zug = de trem (preposição "mit" + Dativ).'
            },
            {
                type: 'fillBlank',
                question: 'Complete o substantivo (viagem): Wir machen eine ___ nach Berlin.',
                answer: 'reise',
                alternatives: [],
                explanation: 'eine Reise machen = fazer uma viagem.'
            }
        ]
    },

    // LEKTION 37: Glückwünsche - OK
    {
        id: 37,
        title: 'Lektion 37: Glückwünsche',
        topics: ['Adjektive', 'Gratulationen'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Das Auto ist sehr ___. (schnell)',
                answer: 'schnell',
                alternatives: [],
                explanation: 'Das Auto ist schnell = O carro é rápido.'
            },
            {
                type: 'fillBlank',
                question: 'Das Buch ist ___. (langweilig)',
                answer: 'langweilig',
                alternatives: [],
                explanation: 'langweilig = chato/entediante.'
            }
        ]
    },

    // LEKTION 39: Orte in der Stadt - OK
    {
        id: 39,
        title: 'Lektion 39: Orte in der Stadt',
        topics: ['Wechselpräpositionen', 'Stadtorte'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete o substantivo (computador): Mein ___ (der) ist langsam.',
                answer: 'computer',
                alternatives: [],
                explanation: 'Mein Computer ist langsam = Meu computador é lento.'
            },
            {
                type: 'fillBlank',
                question: 'Complete o substantivo (impressora): Der ___ (der) funktioniert nicht.',
                answer: 'drucker',
                alternatives: [],
                explanation: 'der Drucker = a impressora. Der Drucker funktioniert nicht = A impressora não funciona.'
            }
        ]
    },

    // LEKTION 41: Berufe Erweitert - OK
    {
        id: 41,
        title: 'Lektion 41: Berufe',
        topics: ['Ortspräpositionen im Dativ', 'Berufe erweitert'],
        grammarKeys: ['Wortschatz', 'Berufe'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (sein): Was ___ Sie von Beruf?',
                answer: 'sind',
                alternatives: [],
                explanation: 'Was sind Sie von Beruf? = Qual é sua profissão?'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (sein): Ich ___ Lehrerin.',
                answer: 'bin',
                alternatives: [],
                explanation: 'Ich bin Lehrerin = Eu sou professora.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (arbeiten): Er ___ als Arzt.',
                answer: 'arbeitet',
                alternatives: [],
                explanation: 'Er arbeitet als Arzt = Ele trabalha como médico.'
            }
        ]
    },

    // LEKTION 43: Pläne - OK
    {
        id: 43,
        title: 'Lektion 43: Pläne',
        topics: ['für', 'um (zu)', 'Zukunftspläne'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o artigo definido (Nominativ): ___ Tisch ist neu.',
                answer: 'der',
                alternatives: [],
                explanation: 'Nominativo masculino: Der Tisch ist neu.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo definido (Akkusativ): Ich kaufe ___ Tisch.',
                answer: 'den',
                alternatives: [],
                explanation: 'Akkusativ masculino: Ich kaufe den Tisch.'
            }
        ]
    },

    // LEKTION 45: Feste - OK
    {
        id: 45,
        title: 'Lektion 45: Ostern und Weihnachten',
        topics: ['Dativverben', 'Feste'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o plural: Ich habe zwei ___. (Bruder)',
                answer: 'brüder',
                alternatives: ['brueder'],
                explanation: 'Plural de Bruder: die Brüder (com Umlaut).'
            },
            {
                type: 'fillBlank',
                question: 'Das kostet ___ Euro. (100)',
                answer: 'hundert',
                alternatives: [],
                explanation: '100 = (ein)hundert.'
            }
        ]
    },

    // LEKTION 47: Telefon - OK
    {
        id: 47,
        title: 'Lektion 47: Telefon',
        topics: ['zu Hause / nach Hause', 'Telefonieren'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (lernen): Ich ___ Deutsch.',
                answer: 'lerne',
                alternatives: [],
                explanation: 'Presente simples: Ich lerne Deutsch.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o verbo (essen): Er ___ gern Pizza.',
                answer: 'isst',
                alternatives: [],
                explanation: 'Vokalwechsel: Er isst gern Pizza.'
            }
        ]
    },

    // LEKTION 49: Tageszeiten - OK
    {
        id: 49,
        title: 'Lektion 49: Tageszeiten',
        topics: ['Temporale Präpositionen erweitert', 'Tageszeiten'],
        grammarKeys: ['Temporale-Präpositionen', 'Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Preposição temporal (estações): ___ Sommer ist es heiß.',
                answer: 'im',
                alternatives: [],
                explanation: 'Estações usam "im": Im Sommer ist es heiß.'
            },
            {
                type: 'fillBlank',
                question: 'Preposição temporal (horas): Der Kurs beginnt ___ 18:30 Uhr.',
                answer: 'um',
                alternatives: [],
                explanation: 'Horas exatas usam "um": um 18:30 Uhr.'
            },
            {
                type: 'fillBlank',
                question: 'Preposição temporal (dias da semana): ___ Mittwoch habe ich einen Termin.',
                answer: 'am',
                alternatives: [],
                explanation: 'Dias da semana usam "am": am Mittwoch.'
            }
        ]
    },

    // LEKTION 51: Perfekt com haben - OK
    {
        id: 51,
        title: 'Lektion 51: Perfekt mit haben',
        topics: ['Perfekt regelmäßig', 'haben als Hilfsverb'],
        grammarKeys: ['Perfekt', 'Perfekt-haben', 'Satzklammer'],
        exercises: [
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (lernen): Ich ___ Deutsch ___.',
                answer: 'habe gelernt',
                options: ['habe gelernt', 'bin gelernt', 'habe gelerntet', 'bin gelerntet'],
                explanation: 'Perfekt com haben: Ich habe Deutsch gelernt. (ge + Raiz + t)'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (hören): Er ___ Musik ___.',
                answer: 'hat gehört',
                options: ['hat gehört', 'ist gehört', 'habe gehört', 'ist gehort'],
                explanation: 'Perfekt: Er hat Musik gehört.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a pergunta no Perfekt (machen): ___ du die Hausaufgaben ___?',
                answer: 'hast gemacht',
                options: ['habe gemacht', 'hast gemacht', 'hat gemacht', 'bist gemacht'],
                explanation: 'Perfekt com du: Hast du die Hausaufgaben gemacht?'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (kochen): Wir ___ Pizza ___.',
                answer: 'haben gekocht',
                options: ['haben gekocht', 'sind gekocht', 'haben gekocht', 'sind gekochen'],
                explanation: 'Perfekt: Wir haben Pizza gekocht.'
            }
        ]
    },

    // LEKTION 53: Perfekt com sein - OK
    {
        id: 53,
        title: 'Lektion 53: Perfekt mit sein',
        topics: ['Perfekt mit sein', 'Bewegungsverben'],
        grammarKeys: ['Perfekt', 'Perfekt-sein', 'Satzklammer'],
        exercises: [
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (fahren): Ich ___ nach Berlin ___.',
                answer: 'bin gefahren',
                options: ['habe gefahren', 'bin gefahren', 'bin gefahrt', 'habe gefahrt'],
                explanation: 'Movimento usa sein: Ich bin nach Berlin gefahren.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (gehen): Er ___ ins Kino ___.',
                answer: 'ist gegangen',
                options: ['hat gegangen', 'ist gegangen', 'hat gegangt', 'ist gegangt'],
                explanation: 'gehen usa sein: Er ist ins Kino gegangen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (laufen): Wir ___ nach Hause ___.',
                answer: 'sind gelaufen',
                options: ['sind gelaufen', 'haben gelaufen', 'sind gelauft', 'haben gelauft'],
                explanation: 'Movimento: Wir sind nach Hause gelaufen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a pergunta no Perfekt (kommen): ___ du gestern ___?',
                answer: 'bist gekommen',
                options: ['hast gekommen', 'bist gekommen', 'hast gekommt', 'bist gekommt'],
                explanation: 'kommen usa sein: Bist du gestern gekommen?'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (fliegen): Sie (pl.) ___ in die USA ___.',
                answer: 'sind geflogen',
                options: ['haben geflogen', 'sind geflogen', 'haben gefliegt', 'sind gefliegt'],
                explanation: 'fliegen usa sein: Sie sind in die USA geflogen.'
            }
        ]
    },

    // LEKTION 55: Jahreszeiten - OK
    {
        id: 55,
        title: 'Lektion 55: Jahreszeiten',
        topics: ['Perfekt regelmäßig erweitert', 'Jahreszeiten'],
        grammarKeys: ['Perfekt', 'Perfekt-haben', 'Wortschatz'],
        exercises: [
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (bleiben): Ich ___ zu Hause ___.',
                answer: 'bin geblieben',
                options: ['bin geblieben', 'habe geblieben', 'bin gebleibt', 'habe gebleibt'],
                explanation: 'bleiben (ficar, mudança de estado) usa sein: Ich bin zu Hause geblieben.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (sein): Er ___ gestern krank ___.',
                answer: 'ist gewesen',
                options: ['hat gewesen', 'ist gewesen', 'hat gesein', 'ist gesein'],
                explanation: 'O Perfekt do verbo "sein" usa "sein": Er ist krank gewesen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (aufstehen): Wir ___ um 7 Uhr ___.',
                answer: 'sind aufgestanden',
                options: ['haben aufgestanden', 'sind aufgestanden', 'haben aufgesteht', 'sind aufgesteht'],
                explanation: 'aufstehen (levantar-se, mudança de estado) usa sein: Wir sind ... aufgestanden.'
            }
        ]
    },

    // LEKTION 57: Lebensläufe - OK
    {
        id: 57,
        title: 'Lektion 57: Lebensläufe',
        topics: ['Perfekt unregelmäßig', 'Biografien'],
        grammarKeys: ['Perfekt', 'Perfekt-haben', 'Wortschatz'],
        exercises: [
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (lesen): Ich ___ ein Buch ___.',
                answer: 'habe gelesen',
                options: ['habe gelesen', 'bin gelesen', 'habe gelest', 'bin gelest'],
                explanation: 'Perfekt irregular com haben: Ich habe ein Buch gelesen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (treffen): Er ___ seinen Freund ___.',
                answer: 'hat getroffen',
                options: ['hat getroffen', 'ist getroffen', 'hat getrefft', 'ist getrefft'],
                explanation: 'treffen no Perfekt usa haben: Er hat seinen Freund getroffen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (trinken): Wir ___ Wasser ___.',
                answer: 'haben getrunken',
                options: ['sind getrunken', 'haben getrinkt', 'sind getrinkt', 'haben getrunken'],
                explanation: 'trinken no Perfekt usa haben: Wir haben Wasser getrunken.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a pergunta no Perfekt (sehen): ___ ihr den Film ___?',
                answer: 'habt gesehen',
                options: ['seid gesehen', 'habt gesehen', 'seid geseht', 'habt geseht'],
                explanation: 'sehen no Perfekt usa haben: Habt ihr den Film gesehen?'
            }
        ]
    },

    // LEKTION 59: Wetter - OK
    {
        id: 59,
        title: 'Lektion 59: Wetter',
        topics: ['Perfekt ohne "ge-"', 'Wetter-Wortschatz'],
        grammarKeys: ['Perfekt', 'Verben-ieren', 'Wortschatz'],
        exercises: [
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (studieren): Ich ___ Deutsch ___.',
                answer: 'habe studiert',
                options: ['habe studiert', 'habe gestudiert', 'bin studiert', 'bin gestudiert'],
                explanation: 'Verbos em "-ieren" não usam "ge-" no Perfekt: Ich habe Deutsch studiert.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a pergunta no Perfekt (reparieren): ___ du das Auto ___?',
                answer: 'hast repariert',
                options: ['bist repariert', 'hast gerepariert', 'hast repariert', 'bist gerepariert'],
                explanation: 'Verbos em "-ieren" (reparieren) não usam "ge-": Hast du das Auto repariert?'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (telefonieren): Er ___ mit mir ___.',
                answer: 'hat telefoniert',
                options: ['ist telefoniert', 'hat getelefoniert', 'ist getelefoniert', 'hat telefoniert'],
                explanation: 'Verbos em "-ieren" (telefonieren) não usam "ge-": Er hat ... telefoniert.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (anrufen): Ich ___ dich ___.',
                answer: 'habe angerufen',
                options: ['habe angerufen', 'habe gerufenan', 'bin angerufen', 'bin gerufenan'],
                explanation: 'Verbo separável no Perfekt: "ge-" fica no meio. Ich habe dich angerufen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a frase no Perfekt (einkaufen): Er ___ im Supermarkt ___.',
                answer: 'hat eingekauft',
                options: ['ist eingekauft', 'hat eingekauft', 'hat gekauftein', 'ist gekauftein'],
                explanation: 'Verbo separável no Perfekt: "ge-" fica no meio. Er hat eingekauft.'
            }
        ]
    },
    
    // LEKTION 60-65: Revisão e consolidação
    {
        id: 60,
        title: 'Lektion 60: Wiederholung Teil 1',
        topics: ['Wiederholung: Artikel, Negation, Perfekt'],
        grammarKeys: ['Artikel', 'Negation-nicht', 'Negativartikel', 'Perfekt'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Negue o substantivo (com "kein"): Ich habe ___ Zeit. (die Zeit)',
                answer: 'keine',
                alternatives: [],
                explanation: 'Negação de substantivo feminino: keine Zeit.'
            },
            {
                type: 'fillBlank',
                question: 'Negue a frase (com "nicht"): Er ist ___ mein Freund.',
                answer: 'nicht',
                alternatives: [],
                explanation: 'nicht antes de possessivo: Er ist nicht mein Freund.'
            },
            {
                type: 'fillBlank',
                question: 'Negue o substantivo (com "kein"): Wir kaufen ___ Auto. (das Auto)',
                answer: 'kein',
                alternatives: [],
                explanation: 'Negação de substantivo neutro: kein Auto.'
            },
            {
                type: 'fillBlank',
                question: 'Negue o adjetivo (com "nicht"): Das finde ich ___ gut.',
                answer: 'nicht',
                alternatives: [],
                explanation: 'nicht antes de adjetivo: nicht gut.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete a pergunta no Perfekt (machen): Was ___ du gestern ___?',
                answer: 'hast gemacht',
                options: ['hast gemacht', 'bist gemacht', 'habe gemacht', 'bin gemacht'],
                explanation: 'Perfekt: Was hast du gestern gemacht?'
            }
        ]
    },

    // LEKTION 61: ATUALIZADO (Bug 3)
    {
        id: 61,
        title: 'Lektion 61: Wiederholung Teil 2',
        topics: ['Wiederholung: Vokalwechsel, Trennbar, Temporal'],
        grammarKeys: ['Vokalwechsel', 'Trennbare-Verben', 'Temporale-Präpositionen'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Er ___ (lesen) ein Buch.',
                answer: 'liest',
                alternatives: [],
                explanation: 'Vokalwechsel e→ie: Er liest ein Buch.'
            },
            {
                type: 'fillBlank',
                question: 'Du ___ (sprechen) zu schnell.',
                answer: 'sprichst',
                alternatives: [],
                explanation: 'Vokalwechsel e→i: Du sprichst zu schnell.'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (anrufen): Ich ___ dich morgen ___.',
                words: ['rufe', 'an'],
                answer: 'rufe an',
                explanation: 'Verbo separável (anrufen): "an" vai para o final.'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (abfahren): Der Zug ___ um 10 Uhr ___.',
                words: ['fährt', 'ab'],
                answer: 'fährt ab',
                alternatives: ['faehrt ab'],
                explanation: 'Verbo separável (abfahren): "ab" vai para o final.'
            },
            {
                type: 'fillBlank',
                question: 'Preposição temporal (hora exata): ___ 8:00 Uhr',
                answer: 'um',
                alternatives: [],
                explanation: 'Horas exatas: um 8:00 Uhr.'
            }
        ]
    },

    // LEKTION 62: ATUALIZADO (Bug 3)
    {
        id: 62,
        title: 'Lektion 62: Wiederholung Teil 3',
        topics: ['Wiederholung: Satzklammer, Perfekt haben/sein'],
        grammarKeys: ['Satzklammer', 'Perfekt', 'Perfekt-haben', 'Perfekt-sein'],
        exercises: [
            {
                type: 'wordOrder',
                question: 'Complete com o modal (müssen): Ich ___ heute ___. (arbeiten)',
                words: ['muss', 'arbeiten'],
                answer: 'muss arbeiten',
                explanation: 'Satzklammer Modal: Verbo principal (arbeiten) no final. Ich muss ... arbeiten.'
            },
            {
                type: 'wordOrder',
                question: 'Complete no Perfekt (arbeiten): Ich ___ heute ___.',
                words: ['habe', 'gearbeitet'],
                answer: 'habe gearbeitet',
                explanation: 'Satzklammer Perfekt: Particípio (gearbeitet) no final. Ich habe ... gearbeitet.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (gehen): Er ___ nach Hause ___.',
                answer: 'ist gegangen',
                options: ['hat gegangen', 'ist gegangen', 'hat gegangt', 'ist gegangt'],
                explanation: 'Movimento usa sein: Er ist nach Hause gegangen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (lesen): Sie ___ ein Buch ___.',
                answer: 'hat gelesen',
                options: ['hat gelesen', 'ist gelesen', 'hat gelest', 'ist gelest'],
                explanation: 'haben no Perfekt: Sie hat ein Buch gelesen.'
            }
        ]
    },

    // LEKTION 63: OK
    {
        id: 63,
        title: 'Lektion 63: Wortschatz Mix 1',
        topics: ['Wortschatz: Essen, Familie, Berufe'],
        grammarKeys: ['Wortschatz'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o plural: Ich kaufe drei ___. (der Apfel)',
                answer: 'äpfel',
                alternatives: ['aepfel'],
                explanation: 'Plural mit Umlaut: die Äpfel.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o plural: Ich esse zwei ___. (die Banane)',
                answer: 'bananen',
                alternatives: [],
                explanation: 'Plural -n: die Bananen.'
            },
            {
                type: 'fillBlank',
                question: 'Thomas ist ___. (Programmierer)',
                answer: 'programmierer',
                alternatives: [],
                explanation: 'Beruf männlich: Programmierer.'
            },
            {
                type: 'fillBlank',
                question: 'Anna ist ___. (Programmiererin)',
                answer: 'programmiererin',
                alternatives: [],
                explanation: 'Beruf weiblich: Programmiererin.'
            }
        ]
    },

    // LEKTION 64: ATUALIZADO (Bug 3)
    {
        id: 64,
        title: 'Lektion 64: Wortschatz Mix 2',
        topics: ['Wortschatz: Möbel, Transport, Alltag'],
        grammarKeys: ['Wortschatz', 'Akkusativ'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete com o artigo indefinido (Akkusativ): Ich kaufe ___ Tisch. (der)',
                answer: 'einen',
                alternatives: [],
                explanation: 'Akkusativ masculino: einen Tisch.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo indefinido (Akkusativ): Wir brauchen ___ Lampe. (die)',
                answer: 'eine',
                alternatives: [],
                explanation: 'Akkusativ feminino: eine Lampe.'
            },
            {
                type: 'fillBlank',
                question: 'Complete com o artigo indefinido (Akkusativ): Ich nehme ___ Bus. (der)',
                answer: 'einen',
                alternatives: [],
                explanation: 'Akkusativ: einen Bus.'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (aufstehen): Morgens ___ ich um 7 Uhr ___.',
                words: ['stehe', 'auf'],
                answer: 'stehe auf',
                explanation: 'Trennbar: Ich stehe um 7 Uhr auf.'
            }
        ]
    },

    // LEKTION 65: OK
    {
        id: 65,
        title: 'Lektion 65: Perfekt Übungen',
        topics: ['Perfekt intensive Übung'],
        grammarKeys: ['Perfekt', 'Perfekt-haben', 'Perfekt-sein'],
        exercises: [
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (schwimmen): Ich ___ gestern ___.',
                answer: 'bin geschwommen',
                options: ['bin geschwommen', 'habe geschwommen', 'bin geschwimmt', 'habe geschwimmt'],
                explanation: 'schwimmen (nadar, com deslocamento) usa "sein". Ich bin geschwommen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (lesen): Er ___ ein Buch ___.',
                answer: 'hat gelesen',
                options: ['hat gelesen', 'ist gelesen', 'hat gelest', 'ist gelest'],
                explanation: 'Perfekt: Er hat ein Buch gelesen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (treffen): Wir ___ Freunde ___.',
                answer: 'haben getroffen',
                options: ['haben getroffen', 'sind getroffen', 'haben getrefft', 'sind getrefft'],
                explanation: 'treffen mit haben: Wir haben Freunde getroffen.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (gehen): Sie ___ ins Kino ___.',
                answer: 'ist gegangen',
                options: ['hat gegangen', 'ist gegangen', 'hat gegangt', 'ist gegangt'],
                explanation: 'Bewegung: Sie ist ins Kino gegangen.'
            }
        ]
    },

    // LEKTION 66: OK (Estes eram para ser 'wordOrder' de frase inteira)
    {
        id: 66,
        title: 'Lektion 66: Satzbildung Übungen',
        topics: ['Satzbau in verschiedenen Zeiten'],
        grammarKeys: ['Satzklammer', 'Verbkonjugation'],
        exercises: [
            {
                type: 'wordOrder',
                question: 'Ordene a frase (Presente):',
                words: ['Ich', 'lerne', 'Deutsch', 'in Berlin', '.'],
                answer: 'ich lerne deutsch in berlin .',
                alternatives: ['in berlin lerne ich deutsch .'],
                explanation: 'Richtige Wortstellung: Subjekt (Ich) + Verb (lerne) + ...'
            },
            {
                type: 'wordOrder',
                question: 'Ordene a frase (Perfekt):',
                words: ['Ich', 'habe', 'in Berlin', 'Deutsch', 'gelernt', '.'],
                answer: 'ich habe in berlin deutsch gelernt .',
                alternatives: ['in berlin habe ich deutsch gelernt .'],
                explanation: 'Perfekt Satzklammer: Auxiliar (habe) na Posição 2, Particípio (gelernt) no final.'
            }
        ]
    },

    // LEKTION 67: OK
    {
        id: 67,
        title: 'Lektion 67: W-Fragen Vertiefung',
        topics: ['W-Fragen in verschiedenen Kontexten'],
        grammarKeys: ['W-Fragen', 'Entscheidungsfragen'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete a W-Frage (Wie?): ___ ist deine Telefonnummer?',
                answer: 'wie',
                alternatives: [],
                explanation: 'Wie fragt nach der Telefonnummer.'
            },
            {
                type: 'fillBlank',
                question: '___ fährst du im Urlaub? (destino)',
                answer: 'wohin',
                alternatives: [],
                explanation: 'Wohin fragt nach dem Ziel/Destination.'
            },
            {
                type: 'fillBlank',
                question: '___ ist dein Lieblingssänger? (pessoa)',
                answer: 'wer',
                alternatives: [],
                explanation: 'Wer fragt nach Personen.'
            },
            {
                type: 'fillBlank',
                question: '___ lernst du Deutsch? (motivo)',
                answer: 'warum',
                alternatives: [],
                explanation: 'Warum fragt nach dem Grund.'
            }
        ]
    },

    // LEKTION 68: OK
    {
        id: 68,
        title: 'Lektion 68: Artikel-Training',
        topics: ['Artikel Nominativ vs. Akkusativ'],
        grammarKeys: ['Artikel', 'Akkusativ'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Artigo definido (Nominativ): ___ Stuhl ist alt.',
                answer: 'der',
                alternatives: [],
                explanation: 'Nominativo masculino: Der Stuhl.'
            },
            {
                type: 'fillBlank',
                question: 'Artigo definido (Akkusativ): Ich kaufe ___ Stuhl.',
                answer: 'den',
                alternatives: [],
                explanation: 'Akkusativ masculino: den Stuhl.'
            },
            {
                type: 'fillBlank',
                question: 'Artigo indefinido (Akkusativ): Ich suche ___ Stift.',
                answer: 'einen',
                alternatives: [],
                explanation: 'Indefiniter Artikel Akkusativ: einen Stift.'
            },
            {
                type: 'fillBlank',
                question: 'Artigo definido (Akkusativ): Ich suche ___ Stift von dir.',
                answer: 'den',
                alternatives: [],
                explanation: 'Definiter Artikel Akkusativ: den Stift.'
            }
        ]
    },

    // LEKTION 69: OK
    {
        id: 69,
        title: 'Lektion 69: Possessivartikel-Training',
        topics: ['Possessivartikel in verschiedenen Fällen'],
        grammarKeys: ['Possessivartikel', 'Akkusativ'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Possessivo (mein - Nominativ): ___ Computer (der) ist alt.',
                answer: 'mein',
                alternatives: [],
                explanation: 'Nominativo masculino: Mein Computer.'
            },
            {
                type: 'fillBlank',
                question: 'Possessivo (mein - Akkusativ): Ich benutze ___ Computer (der) nicht.',
                answer: 'meinen',
                alternatives: [],
                explanation: 'Akkusativ masculino: meinen Computer.'
            },
            {
                type: 'fillBlank',
                question: 'Possessivo (mein - Nominativ): ___ Tasche (die) ist schwer.',
                answer: 'meine',
                alternatives: [],
                explanation: 'Nominativo feminino: Meine Tasche.'
            },
            {
                type: 'fillBlank',
                question: 'Possessivo (mein - Akkusativ): Er nimmt ___ Tasche (die).',
                answer: 'meine',
                alternatives: [],
                explanation: 'Akkusativ feminino (não muda): meine Tasche.'
            }
        ]
    },

    // LEKTION 70: ATUALIZADO (Bug 3)
    {
        id: 70,
        title: 'Lektion 70: Final Review - Alles zusammen',
        topics: ['Comprehensive Review'],
        grammarKeys: ['W-Fragen', 'Perfekt', 'Satzklammer', 'Akkusativ', 'Temporale-Präpositionen'],
        exercises: [
            {
                type: 'fillBlank',
                question: 'Complete a W-Frage: ___ hast du gestern gemacht?',
                answer: 'was',
                alternatives: [],
                explanation: 'W-Frage im Perfekt: Was hast du gemacht?'
            },
            {
                type: 'wordOrder',
                question: 'Complete a frase (Perfekt): Ich ___ in Berlin Deutsch ___. (lernen)',
                words: ['habe', 'gelernt'],
                answer: 'habe gelernt',
                explanation: 'Perfekt: Ich habe in Berlin Deutsch gelernt.'
            },
            {
                type: 'wordOrder',
                question: 'Complete com o modal (können): Ich ___ in Berlin Deutsch ___. (lernen)',
                words: ['kann', 'lernen'],
                answer: 'kann lernen',
                explanation: 'Modal: Ich kann in Berlin Deutsch lernen.'
            },
            {
                type: 'wordOrder',
                question: 'Ordene a frase (aufstehen):',
                words: ['Ich', 'stehe', 'um 7 Uhr', 'auf', '.'],
                answer: 'ich stehe um 7 uhr auf .',
                explanation: 'Trennbar im Präsens: Ich stehe um 7 Uhr auf.'
            },
            {
                type: 'multipleChoice',
                question: 'Complete no Perfekt (anfangen):',
                answer: 'habe angefangen',
                options: ['habe angefangen', 'bin angefangen', 'habe gefangen an', 'bin gefangen an'],
                explanation: 'Trennbar im Perfekt: Ich habe jetzt angefangen (ge no meio).'
            }
        ]
    }
];
