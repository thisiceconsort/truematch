// --- Simulated User Database (for demonstration of password array) ---
// In a real application, these would be stored and managed on a secure backend.
// This array holds objects of registered users and their access codes.
let simulatedUserDatabase = [
    { name: "John Doe", email: "john.doe@example.com", phone: "+2348012345678", country: "Nigeria", accessCode: "3214JOH", unlockedVideos: {} },
    { name: "Jane Smith", email: "jane.smith@example.com", phone: "+15551234567", country: "United States", accessCode: "5678JAS", unlockedVideos: {} },
    { name: "Demo User", email: "demo@example.com", phone: "+1234567890", country: "United States", accessCode: "DEMOABC", unlockedVideos: {} }, // Special demo user
    { name: "Sam Esom", email: "orjisamuel19@gmail.com", phone: "+2347067411418", country: "Nigeria", accessCode: "2559SOM", unlockedVideos: {} },
    { name: "Chinetu Emmanuel", email: "chinetuemmanuel@gmail.com", phone: "+2349071375250", country: "Nigeria", accessCode: "1058CHI", unlockedVideos: {} },
   { name: "Micah Samuel", email: "micahblaq1@gmail.com", phone: "+31652560594", country: "Netherlands", accessCode: "5442BLA", unlockedVideos: {} },
 { name: "Barnabas Chidindu", email: "chidindubarnabasiwuafor@gmail.com", phone: "+2348066448413", country: "Nigeria", accessCode: "1234BAN", unlockedVideos: {} },
 { name: "Emsley", email: "emsleyizunna@gmail.com", phone: "+2348081848198", country: "Nigeria", accessCode: "1234IZU", unlockedVideos: {} },
 { name: "Ezumaibe Kelechiukwu", email: "sunshineworldcomputers@yahoo.com", phone: "+2349079244440", country: "Nigeria", accessCode: "2025ABC", unlockedVideos: {} },
 { name: "Peter obiakonwa", email: "peterobiakonwa@gmail.com", phone: "+2347048711326", country: "Nigeria", accessCode: "2001SHE", unlockedVideos: {} },

];
// Initialize simulatedUserDatabase from localStorage if available
const storedSimulatedUsers = localStorage.getItem('simulatedUserDatabase');
if (storedSimulatedUsers) {
    simulatedUserDatabase = JSON.parse(storedSimulatedUsers);
}
