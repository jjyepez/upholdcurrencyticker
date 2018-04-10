const ti = 25000
let persist = []
const tick = () => {
  const $p = document.querySelector('.progress')
  $p.classList.remove('progresando')
  $p.classList.add('progresando')
  fetch('https://noesishosting.com/sw/cors/?a=cors&url=https://api.uphold.com/v0/ticker/USD')
  .then( rsp => rsp.json() )
  .then( data => {
    const $ticker = document.querySelector('.ticker')
          $ticker.innerHTML = ''
    $ticker.innerHTML += `<br/>Cryptocurrency<br/><br/>`
    data.forEach( el => {
      const symbol = (el.pair).replace(eval('/'+el.currency+'/ig'),'')
      if( ['BTC','ETH','XRP','BCH','LTC','BTG','DASH'].indexOf(symbol) != -1){
        const trend = persist[symbol] > el.ask  ? '▾' : (
          persist[symbol] < el.ask  ? '▴' : (
          persist[symbol] == el.ask ? '=' :  '•'
          ))
          const cl_trend = trend == '▾' ? 'down' : (
             trend == '▴' ? 'up'   : (
             trend == '•' ? 'ini'  : 'eq'
             ))
        const precio = el.bid
        $ticker.innerHTML += `
          <div class='row'>
            <div style='width: 5rem'>${symbol}</div>
            <div style='flex:1'>$ ${precio}</div>
            <div style='width: 2rem' class='${cl_trend}'>${trend}</div>
          </div>
         `
        persist[symbol] = precio
      }
    })
    $ticker.innerHTML += `<br/>Fiat currency<br/><br/>`
    data.forEach( el => {
      const symbol = (el.pair).replace(eval('/'+el.currency+'/ig'),'')
      if( ['GBP','CNY','EUR'].indexOf(symbol) != -1){
        const trend = persist[symbol] > el.ask  ? '▾' : (
                      persist[symbol] < el.ask  ? '▴' : (
                      persist[symbol] == el.ask ? '=' :  '•'
                      ))
        const cl_trend = trend == '▾' ? 'down' : (
                         trend == '▴' ? 'up'   : (
                         trend == '•' ? 'ini'  : 'eq'
                         ))
        const precio = el.bid
        $ticker.innerHTML += `
          <div class='row'>
            <div style='width: 5rem'>${symbol}</div>
            <div style='flex:1'>$ ${precio}</div>
            <div style='width: 2rem' class='${cl_trend}'>${trend}</div>
          </div>
         `
        persist[symbol] = precio
      }
    })
  })
  .catch(e =>{
    console.log(e, e.message)
  })
}
tick()
setInterval( tick, ti )
