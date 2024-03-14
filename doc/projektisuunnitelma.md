# Projektisuunnitelma

|  |  |
|:-:|:-:|
| Dokumentti | Projektisuunnitelma |
| Laatija: | Janne Arkko |
| Versio: | 1.0 |
| Päivämäärä: | 9.2.2024 |

## 1. Uutisaggregaattori ja sentimenttianalyysi -alusta

## 1.1 Tausta ja lähtökohdat

Nykyisessä informaatioyhteiskunnassa uutisvirta on jatkuvaa ja loputonta, ja se sisältää laajan kirjon erilaisia näkökulmia, aiheita ja tunnetiloja. Ihmiset altistuvat päivittäin valtaville määrille tietoa, mikä voi olla sekä hyödyllistä, että haitallista. Monet ihmiset kamppailevat usein löytääkseen jatkuvasta uutisvirrasta luotettavaa ja merkityksellistä sisältöä.

Tämän projektin tavoitteena on luoda alusta, joka keskittää luetuimmat uutisvirrat yhteen sovellukseen, suorittaa sentimenttianalyysin uutisten sisällöille ja näyttää käyttäjälle uutisen sentimentin (esimerkiksi: positiivinen, negatiivinen, neutraali). Käyttäjällä on mahdollisuus suodattaa uutisvirtaa esimerkiksi vain positiivisiin uutisiin.

Mahdollisuudella valita minkälaista sisältöä käyttäjälle tarjotaan, voi olla monia myönteisiä vaikutuksia. Informaatiolukutaito on ensiarvoisen tärkeää tällä disinformaation aikakaudella ja sentimenttianalyysi voi tarjota syvällisempiä oivalluksia uutisten sävyistä ja tunnelatauksista, auttaen käyttäjiä ymmärtämään paremmin erilaisia näkökulmia ja mielipiteitä. Tämä on erityisen tärkeää polarisoituneessa mediaympäristössä, jossa eri lähteiden tuottamat uutis-sisällöt voivat vaihdella suuresti. Jatkuva negatiivisille uutisille altistuminen voi vaikuttaa myös haitallisesti ihmisen mielenterveyteen. Mahdollisuus suodattaa ja valita uutisia sentimentin avulla antaa käyttäjille mahdollisuuden suojella omaa hyvinvointiaan, tarjoamalla keinoja vähentää ahdistusta ja stressiä.

Projekti toteutetaan Jyväskylän ammattikorkeakoulun informaatioteknologian instituutin järjestämien 'Deep Learning TTC8060-3008', 'Web User Interface Programming TTC8420-3005' sekä 'Web Server Programming TTC8430-3004' -opintojaksojen puitteissa tehtävänä harjoitustyönä, joka yhdistää kaikkien kolmen opintojakson vaadittavat harjoitustyöt yhdeksi kokonaisuudeksi.

## 1.2 Tavoitteet ja tehtävät

### 1.2.1 Tavoite

Tuottaa uutisaggregaattori ja sentimenttianalyysi -alusta, joka keskittää suurimpien suomalaisten uutispalveluiden tuottaman sisällön yhteen sovellukseen ja jakaa uutisvirran sentimenttianalyysin avulla eri luokkiin.

### 1.2.2 Tehtävät

Projekti aloitetaan niin sanotusti puhtaalta pöydältä ja edetään vaihe vaiheelta. 

Projektin ensimmäiseen vaiheeseen kuuluu sentimenttianalyysia luovan tekoälymallin luominen ja testaus.

Toisessa vaiheessa kehitetään sovelluksen palvelimen puoli, joka pystyy tarjoamaan ensimmäisen vaiheen tekoälymallille dataa ja välittämään sen tuottamia tuloksia eteenpäin.

Kolmannessa vaiheessa kehitetään sovelluksen käyttöliittymä.

Projektille on aikaa vain muutama kuukausi, joten osa mahdollisista ominaisuuksista ja testauksesta voi olla mahdotonta toteuttaa ajanjakson puitteissa.

## 1.3 Rajaus

Projekti toteutetaan käyttäen Python ja JavaScript -ohjelmointikieliä sekä käyttöliittymän osalta React-sovelluskehystä.

Projekti rajataan ominaisuuksiltaan niin, että käytössä on vain yksi sentimenttianalyysiin käytetty tekoälymalli. Uutisia haetaan vain suurimmilta uutistuottajilta ja niiden ilmaisilta palveluilta. 