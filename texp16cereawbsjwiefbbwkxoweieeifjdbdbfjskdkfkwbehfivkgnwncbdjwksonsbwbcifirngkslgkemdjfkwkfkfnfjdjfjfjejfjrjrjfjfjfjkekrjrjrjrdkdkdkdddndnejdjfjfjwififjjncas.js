// --- Simulated User Database (for demonstration of password array) ---
// In a real application, these would be stored and managed on a secure backend.
// This array holds objects of registered users and their access codes.
let simulatedUserDatabase = [
    { name: "John Doe", email: "john.doe@example.com", phone: "+2348012345678", country: "Nigeria", accessCode: "3214JOH", unlockedVideos: {} },
    { name: "Sam Esom", email: "orjisamuel19@gmail.com", phone: "+2347067411418", country: "Nigeria", accessCode: "2559SOM", unlockedVideos: {} },
    { name: "Chinetu Emmanuel", email: "chinetuemmanuel@gmail.com", phone: "+2349071375250", country: "Nigeria", accessCode: "1058CHI", unlockedVideos: {} },
   { name: "Micah Samuel", email: "micahblaq1@gmail.com", phone: "+31652560594", country: "Netherlands", accessCode: "5442BLA", unlockedVideos: {} },
 { name: "Barnabas Chidindu", email: "chidindubarnabasiwuafor@gmail.com", phone: "+2348066448413", country: "Nigeria", accessCode: "1234BAN", unlockedVideos: {} },
 { name: "Emsley Izunna", email: "emsleyizunna@gmail.com", phone: "+2348081848198", country: "Nigeria", accessCode: "1234IZU", unlockedVideos: {} },
 { name: "Ezumaibe Kelechiukwu", email: "sunshineworldcomputers@yahoo.com", phone: "+2349079244440", country: "Nigeria", accessCode: "2025ABC", unlockedVideos: {} },
 { name: "Peter obiakonwa", email: "peterobiakonwa@gmail.com", phone: "+2347048711326", country: "Nigeria", accessCode: "2001SHE", unlockedVideos: {} },
{ name: "Agalee Ifeanyi", email: "agaleeifeanyi@gmail.com", phone: "+2349057014199", country: "Nigeria", accessCode: "5555OKA", unlockedVideos: {} },
{ name: "Denrele Philips", email: "dphilips1122@gmail.com", phone: "+2349076621945", country: "Nigeria", accessCode: "1414ABC", unlockedVideos: {} },
{ name: "Franklin Afola", email: "pe6970172@gmail.com", phone: "+2349038116390", country: "Nigeria", accessCode: "1997FRA", unlockedVideos: {} },
{ name: "Chidinma Iheanachor", email: "lightsolomon210eli@gmail.com", phone: "+2348128678246", country: "Nigeria", accessCode: "6754IKE", unlockedVideos: {} },
{ name: "Onyeka Arimonu", email: "omegachris@gmail.com", phone: "+23481342..725", country: "Nigeria", accessCode: "1345ADC", unlockedVideos: {} },
{ name: "Osmond Echezona", email: "echezonaosmond@gmail.com", phone: "+2348061452349", country: "Nigeria", accessCode: "5602ECH", unlockedVideos: {} },
{ name: "Modestus Chukwudalu", email: "echezonaosmond@gmail.com", phone: "+2348061452349", country: "Nigeria", accessCode: "2349ECH", unlockedVideos: {} },
{ name: "Emmanuel Edet", email: "okoney12@gmail.com", phone: "+2348121272626", country: "Nigeria", accessCode: "1234OKO", unlockedVideos: {} },


];
// Initialize simulatedUserDatabase from localStorage if available
const storedSimulatedUsers = localStorage.getItem('simulatedUserDatabase');
if (storedSimulatedUsers) {
    simulatedUserDatabase = JSON.parse(storedSimulatedUsers);
}
