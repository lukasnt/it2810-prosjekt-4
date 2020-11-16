# Prosjekt 4

## Hvordan kjøre appen?

### 1. Installere avhengigheter
Husk å ha expo installert globalt på maskinen. Hvis det ikke er det, kjør følgende kommando i terminalen:

`npm install expo-cli --global`

Kjør følgende kommando i terminalvinduet når man er under /app:

`npm install`

### 2. Starte Expo
Kjøre følgende kommando i terminalvinduet (også under /app):

`expo start`

### 3. Kjøre på mobilen
Deretter skann QR koden med mobilen og åpne linken som kommer opp i expo-appen. (Husk å ha expo-appen installert på mobilen og at mobilen og pcen er på samme lokalnett)

(Det tar sikkert litt tid før alt lastes inn)

### 4. Production mode
For enda bedre ytelse kan man også kjøre i production mode, som er et valg på expo-app-konsollen i nettleseren (Dette er ikke nødvendig da, men blir litt kjappere)


## React Native
React Native applikasjonen er satt opp ved å kjøre expo init skriptet ved bruke av expo-cli. TypeScript er brukt som programmeringsspråk i utviklingen. Alle react komponenter er plassert i components-mappen og er ytterligere gruppert i undermapper etter kategorierer (movie og search).

I implementasjon har det ved unntak av tredjepartskomponentene blitt brukt de ordinære mekanismene i React som props og state med en hensiktsmessig komponentstruktur. Komponentene har så godt som mulig blitt dekomponert slik at de er så enkle og leselig som mulig. Funksjoner og annen kode som ikke er selvforklarende er også kommentert.

Søke-siden (searchpage) består hovedsakelig av én komponent som er innebygd i React Native, nemlig [FlatList](https://reactnative.dev/docs/flatlist). Brukergrensesnittet som knapper og menyer er lagt inn som header i FlatList-komponenten og data om filmer er lagt inn i data-propertien. Fordelen med å bruke FlatList-komponenten over f.eks ScrollView er at for veldig lange lister så er det kun det som er på skjermen som blir rendret, noe som gjør at ytelsen blir mindre påvirket av at man har lastet inn veldig mye data.

Det er også gjort noen andre ytelsesforbedringer knyttet til re-rendring på tilstandsoppdatering. F.eks skal ikke alle filmene bli re-rendret hvis annen tilstand har blitt endret på søke-siden (som f.eks searchParams), men kun hvis searchResult har blitt endret. Logikk knyttet til dette har blitt implementert i shouldComponentRender-metoden for SearchPage-komponenten. Dette har forhåpentligvis gjort at brukergrensesnittet blir kjappere og mer interaktivt, selv på tidspunkt der det er veldig mange filmer oppe.


### React Navigation
React Navigation er et tredjepartsbibliotek som er brukt for å ha forskjellige skjermer som man kan navigere mellom. I denne applikasjonen er det stort sett brukt for å kunne å gå til en egen skjerm når man vil se mer informasjon om en film. React Navigation vil fikse alt av navigasjons-barer (på toppen), history-tilstand slik at back-knapp kan bli brukt og at innholdet kommer på riktig plass og er synlig. 

### React native paper
React Native Paper er et tredjepartsbibliotek for UI-komponenter for React Native. Dette biblioteket var ment å erstatte Material UI som hadde blitt brukt på det tidligere web-prosjektet. React native paper er basert på de samme material design guidelines som Material UI og har mange lignende komponenter. Dette gjorde at det ble enklere å gjenbruke kode fra forrige prosjekt, og det er derfor dette UI-biblioteket ble valgt. 

## Redux
Redux fungerer stort sett på samme måte som det har gjort på forrige prosjekt (se mer [her](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-24/prosjekt-3/-/blob/master/README.md#redux)). Eneste endring er at tilstand knyttet til user har blitt fjernet siden fokuset i denne innleveringen var verken på innlogging eller brukergenerert data.

## Backend
Backend fra prosjekt 3 har blitt gjenbrukt og satt opp på en VM slik at den kan aksesseres uten å være på samme nettverk. For mer dokumentasjon om hvordan backend fungerer kan man se på forrige prosjekt (se mer [her](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-24/prosjekt-3/-/blob/master/README.md#backend))


## Manuell e2e testing

Den manuelle e2e testingen foregår ved at man manuelt kjører appen slik som vist øverst i dokumentasjonen. Deretter går man igjennom alle punktene i sjekklisten nedenfor og ser om man får det resultatet som er beskrevet som forventet opprørsel. Dette har blitt gjort på android-enhet Moto G (5S) Plus og på en iOS simulator. For enda grundigere testing burde det kanskje også testes på andre mobile enheter. F.eks mindre kraftigere enheter, enheter med svært liten skjerm eller svært stor skjerm osv.

### Sjekkliste
* Sjekke at appen åpnes korrekt og det er ingen error som kommer opp.
* Sjekke at layouten fungerer og at alle elementene vises der de skal.
* Sjekke at alle filmene vises og at skrolling til bunnen laster inn nye filmer, dette gjør man for 3 innlastinger. Det forventes selvfølgelig at det skal lastes inn flere filmer i listen.
* Sjekke at søkefunksjonaliteten fungerer. Her bruker man eksempel-queryet «batman».
* Sjekke at endringen av sortering fungerer. Her endrer man til «release» (Dette gjør man etter at man har satt queryet). Her forventes man å få batman filmer som ikke enda å ha kommet ut først.
* Sjekke at endring av sorterings-retning fungerer. Her endrer man til pil opp. Det forventes at det skal nå komme gamle "batman" filmer.
* Sjekke at filtrering fungerer. Først endrer man de andre instillingene slik det var når appen startet. Deretter setter man filterne til "Action" og "Adventure". Her forventes det selvføgelig at alle filmene ihvertfall har sjangeren "Action" og "Adventure".


## Andre Opplysininger
Hvis det kommer print i konsollet om VirtualizedList, er dette ikke en error eller warning, men kun en opplysning. Dette forklarer hvordan man skal lage komponentene i en FlatList, og dette er tilfredstilt i appen i tillegg til at ytelsen er god i praksis. Men opplysningen vil som regel alltid komme opp i konsollen når listen blir lang nok på development mode.