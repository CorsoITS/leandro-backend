
const query =  await conncetion.query();
const query2 = await conncetion.query()

//esegiore promise in contempornea
const [cont1, cont2] = await Promise.all([
    conncetion.query(),
    conncetion.query()
])
//se uan fallisce esplode tutto

//allSettled
//se una va in errore dentor ogetto ci sarà estrrore


//race
//il primo che risponde va bene

//singleton


