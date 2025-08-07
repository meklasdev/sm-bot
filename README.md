# Silent Mafia Bot

Discord bot handling ticket system and product commands.

## TODO

- [x] Polish and restructure FAQ content with category select menu and ticket button
- [x] Automate media channel posts for @content role
- [x] Refresh free-keys layout with reason select menu leading to tickets
- [x] Improve auto-role panel for ping roles
- [x] Create product guide flow with nested select menus and ticket shortcut
- [x] Expand features from Gordon's specification



## specf


---

1. 🟥 Kanał #📌┃faq

Przeredaguj i uporządkuj content, by wyglądał profesjonalnie (sekcje z pogrubionymi tytułami, ikonki, wyraźne punkty).

Dodaj selektor z pytaniami i odpowiedziami (SelectMenu) → klikając wybiera się kategorię FAQ (np. Zakupy, Płatności, Scam?, Pomoc, itd.).

Dodaj przycisk, który otwiera ticket.



---

2. 📷 Kanał #📷┃media

Obsłuż ID kabalu 1382630832023408715 (rola @content) – jeśli adm wyślę tam wiadomość z linkiem (np. TikTok):

✅ Automatycznie dodaj reakcję (np. ✔️). Jeśli adm da ta reakcje 

🧹 Usuń jego wiadomość po kilku sekundach.

Wyślą ładna wiadomość z ebedem przez bota że informacja o nowym filmiku pisk do filmiku ale nie jako link a nap jak mam zgodnie gdzieś jdnaaeij że filmk(i tu link ale go nie widac)



---

3. 🎁 Kanał #📁┃free-keys

Przeredaguj wiadomość główną, dodaj lepszy layout.

Dodaj select menu wyboru powodu odbioru klucza (np. Content, Wideo, Współpraca, Promocja, Nagroda).

Obsługa powinna prowadzić do ticket systemu z odpowiednią kategorią.



---

4. 🗝️ Kanał #🗝️┃auto-role

Zrób profesjonalny SelectMenu z wyborem roli ping:

Free Stuff – darmowe rzeczy, klucze itd.
Content – powiadomienia o nowym contencie.
Customer – dostęp do dodatkowych kanałów.
Other Pings – mniej ważne powiadomienia.


Po wyborze przypisz rolę automatycznie.
Role są w plikach 


---

5. ✅ Kanał #✅┃product-guide

Zrób SelectMenu, gdzie użytkownik wybiera rodzaj produktu:

Cheats – FiveM

Spoofers – FiveM

Premium

VPN


Po wyborze pokazuje się embed z wyborem jaki produkt przez selwct menu a potem kolejny ambed linkam i narzędziami (jak obecnie w wiadomości).

Dodatkowo W selsetn menu bedize od razu przycisk do prowadzenia ticketa z kategorii suport i tam jest temat pomocy jak.am w suporcie tylko byt o było odrazu że ten temat ticketa 
---

6. 🧪 Komenda /emotes

Zrób komendę slash, która wyświetli wszystkie emotki serwera w jednym ładnym embedzie.
Tylko z serwera customowe byś mógł potem ich w różnych ebedach korzystać 
Format:

❤️ - `:heart:`
🤑 - `:money_mouth:`
🧠 - `:brain:`

Obsłuż też poprawnie emotki customowe i te z aliasami (nie :sm:, tylko realna emoji).



---

🎯 Dodatkowe uwagi:

Wszystkie SelectMenu mają być z estetycznym layoutem, nazwami i emoji.

Całość spójna stylistycznie z brandingiem Silent Mafia (ciemne kolory, purpurowy akcent, gangowy klimat).

Jeśli coś jest niezrozumiałe — pytaj Gordona.



---

emotws

<:1458508A43184FEF82F5E14C168A8874:1382657774059786251> - `:1458508A43184FEF82F5E14C168A8874:`
<:2141file:1384624277122449510> - `:2141file:`
<:2141file:1384624587567923280> - `:2141file:`
<:3124memberwhiteblack:1384624130682519673> - `:3124memberwhiteblack:`
<:3124memberwhiteblack:1384624152891359273> - `:3124memberwhiteblack:`
<:3124memberwhiteblack:1384624176136196258> - `:3124memberwhiteblack:`
<:3124memberwhiteblack:1384624434111053885> - `:3124memberwhiteblack:`
<:3861memberpurple:1384624101351620658> - `:3861memberpurple:`
<:43565member:1384624359838060757> - `:43565member:`
<:9847public:1384624242800459796> - `:9847public:`
<:applebank:1382655955787059301> - `:applebank:`
<:applebank:1384626789627727904> - `:applebank:`
<a:arrowpurple:1384626293139570781> - `:arrowpurple:`
<:blik:1382655130117079184> - `:blik:`
<:bundle:1382655741986471946> - `:bundle:`
<:card:1382655048768553001> - `:card:`
<:Crown:1382657340041596991> - `:Crown:`
<:crypto:1382655100128067604> - `:crypto:`
<:DISCORD:1382653651214012477> - `:DISCORD:`
<a:emoji22:1382654880031834233> - `:emoji22:`
<:emoji22:1384624497784656035> - `:emoji22:`
<:emoji58:1382655030800416868> - `:emoji58:`
<:emoji58:1384624386862223502> - `:emoji58:`
<:F6EEC9D18D4B46AE81649E513AD75047:1382657781240299552> - `:F6EEC9D18D4B46AE81649E513AD75047:`
<:fivem:1382653699846832128> - `:fivem:`
<:Fivem:1402937925607493728> - `:Fivem:`
<a:FiveM:1384885347363586119> - `:FiveM:`
<:gift_icon:1384618944916357260> - `:gift_icon:`
<:hidepozdro:1384887156517900331> - `:hidepozdro:`
<:hx:1382653761088131152> - `:hx:`
<:IMG_5798:1382657758033084507> - `:IMG_5798:`
<:IMG_5799:1382657760625168506> - `:IMG_5799:`
<:IMG_5800:1382657766451052584> - `:IMG_5800:`
<:IMG_5801:1382657764479995996> - `:IMG_5801:`
<:IMG_5802:1382657762470658078> - `:IMG_5802:`
<:IMG_5803:1382657772352704563> - `:IMG_5803:`
<:IMG_5804:1382657770540634193> - `:IMG_5804:`
<:IMG_5805:1382657768309260298> - `:IMG_5805:`
<:IMG_5806:1382657778228658268> - `:IMG_5806:`
<:IMG_5807:1382657775892430900> - `:IMG_5807:`
<:ipvanish:1382653594716737687> - `:ipvanish:`
<:joe:1382655879882604656> - `:joe:`
<:joehellacool:1382655925214642216> - `:joehellacool:`
<:keyser:1382655865521311825> - `:keyser:`
<:legit:1384625637775507498> - `:legit:`
<:ltc:1384621218417737868> - `:ltc:`
<:MachoLogo:1382657610355966063> - `:MachoLogo:`
<a:no:1385019541670727730> - `:no:`
<:ogl:1382655256256843818> - `:ogl:`
<:ogl:1384624210143477800> - `:ogl:`
<:paypal:1382655114036252692> - `:paypal:`
<:pngsm:1384624065913950210> - `:pngsm:`
<:psc:1382655079420792922> - `:psc:`
<:red:1389181300912427159> - `:red:`
<:Rockstar:1382655702606151680> - `:Rockstar:`
<:silent:1395058293432516658> - `:silent:`
<:Steam:1382653631488200754> - `:Steam:`
<:Stock:1384625660571680779> - `:Stock:`
<:support:1382655193925156944> - `:support:`
<:susano:1382655578194837584> - `:susano:`
<:susano:1384627463153385584> - `:susano:`
<:tiagomodz_logo:1384888331866734764> - `:tiagomodz_logo:`
<:ticket:1401226055867433041> - `:ticket:`
<:unicloud:1382655674202198028> - `:unicloud:`
<:UNIRIVALS:1382656205943603323> - `:UNIRIVALS:`
<:UNIRIVALS:1384627421994553354> - `:UNIRIVALS:`
<:V_:1398725075334729840> - `:V_:`
<:venbni:1398722962785571026> - `:venbni:`
<a:Verified_Purple_Animated:1382655410795843695> - `:Verified_Purple_Animated:`
<a:Verified_Purple_Animated:1384626247702675456> - `:Verified_Purple_Animated:`
<a:verifypurple:1382681325865009163> - `:verifypurple:`
<a:yes:1385019566744146020> - `:yes:`




