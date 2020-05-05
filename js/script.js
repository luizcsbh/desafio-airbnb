const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72?page=1&page_size=2', true)
request.onload = function() {
  // Iniciando acesso aos dados JSON
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(post => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const img = document.createElement('img')
      img.src = post.photo

      const h3 = document.createElement('h3')
      h3.textContent = post.property_type

      const p = document.createElement('p')
      post.name = post.name.substring(0, 300)
      p.textContent = `${post.name}...`

      const span = document.createElement('span')
      span.textContent = `R$${post.price}/noite`

      container.appendChild(card)
      card.appendChild(img)
      card.appendChild(h3)
      card.appendChild(p)
      card.appendChild(span)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send();

$(function(){
  $("a").click(function(){
      $("a").removeClass("selected");
      $(this).addClass("selected");
  })
      
  function ativa(id){
      $("header nav a").removeClass("selected");
      $(id).addClass("selected");
  }
      
  $("#aLugares").on("click", function(){
    $("#Lugares").scrollView();  
    ativa(this);
  })
  
  $("#aEstadia").on("click", function(){
    $("#Lugares").scrollView();    
    ativa(this);
  })
})