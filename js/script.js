const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

let request = new XMLHttpRequest()
request.open('GET', 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72', true)
request.onload = function() {
  // Iniciando acesso aos dados JSON
  let data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(post => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const img = document.createElement('img')
      img.src = post.photo

      const h3 = document.createElement('h3')
      h3.textContent = `Tipo de acomodação: ${post.property_type}`

      const p = document.createElement('p')
      post.name = post.name.substring(0, 300)
      p.textContent = `Descrição: ${post.name}...`

      const span = document.createElement('span')
      span.textContent = `R$${post.price}/noite`

      const h4 = document.createElement('h4')
      h4.textContent = `Total R$ `


      /**Adicionando elementos html*/
      container.appendChild(card)
      card.appendChild(img)
      card.appendChild(h3)
      card.appendChild(p)
      card.appendChild(span)
      card.appendChild(h4)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send();

/**Função valida data */
function validaCalendar(){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
  today = yyyy+'-'+mm+'-'+dd;
  /**Data de check-in não pode ser inferior a data atual */
  document.getElementById("calendar-in").setAttribute("min", today);
  /**Data da check-out não pode ser inferior do que a data de check-in */    
  document.getElementById("calendar-out").setAttribute("min", (document.getElementById("calendar-in").value));
  
}/**Fim da função ValidaCalendar */

/**Calcula Preço Total */
function precoTotal(diarias,){

}
/** Fim função Calcula Preço Total */

/**Calcula Perído */
function calculaPeriodo() {
  let numero = document.getElementById('numeroHospedes').value;
  let dataEntrada = new Date(document.getElementById('calendar-in').value);
  let dataSaida = new Date (document.getElementById('calendar-out').value);

  let diarias = dataSaida.getDate() - dataEntrada.getDate();
  
  if(diarias === 0){
    console.log("Diarias inferior a " +diarias+ " dia.")
    diarias+=1;
    console.log("Trabalhamos apenas com dias de um dia.") 
  }
  
}