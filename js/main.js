var brand= document.querySelector('.navbar-brand')
var qBtn = document.querySelectorAll('.nav-link')
var searchInp = document.querySelector('#search')
//current location
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

  
    var currentLoc = lat + "," + lng;
    
    localStorage.setItem('currentLoc', currentLoc)
    if (localStorage.getItem('search')!=null) {
      
      setUs(localStorage.getItem('search'))
    } else {
      
      setUs(localStorage.getItem('currentLoc'))
    }
  })
  
var weather;
//API
async function setUs(q) {
  
  var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c96aabd46c4411faad181020230308&q=${q}&days=3`)
  weather = await res.json()



  

  displayWether()
  localStorage.setItem('search',q)
}
//display
function displayWether() {
  var box = ``
  box +=
    `
  <div class="card border-info mb-0 border-2 text-bg-dark bg-black">
               <div class="card-header bg-transparent border-info border-2 d-flex justify-content-between ">
                <span class="text-white lh-1">${new Date(weather.location.localtime).toLocaleDateString('en-us', { weekday: "long" })}</span>
                <span class="text-white lh-1">${new Date().toLocaleDateString('us-en', { day: 'numeric', month: 'long' })}</span>
               </div>
              <div class="card-body ps-2">
                <h3 class="fs-6">${weather.location.name}</h3>
                <div class="d-flex align-items-center  gap-3">
                  <h4 class="f-1 fw-bolder py-2 ">${weather.current.temp_c}<sup>o</sup>C</h4>
                  <span><img src="${weather.current.condition.icon}" alt="${weather.current.condition.text}"></span>
                  
                </div>
                <h5 class="fs-6">${weather.current.condition.text}</h5>
              </div>
              <h6 class="mb-0 text-white text-end card-footer border-info">today</h6>
              
            </div>
  `;
  for (let i = 1; i < 3; i++) {
    box +=
      `
      <div class="card  mb-0 ${i%2==0?'border-info  text-bg-dark bg-black':'text-bg-light bg-info'}">
               <div class="card-header ${i%2==0?'border-info':'border-black'} bg-transparent border-2 d-flex justify-content-center ">
                <span class="${i%2==0? 'text-white':'text-black fw-bold'} lh-1">${new Date(weather.forecast.forecastday[i].date).toLocaleDateString('us-en' ,{weekday:'long'})}</span>
               </div>
              <div class="card-body">
                <div class="d-flex flex-column align-items-center ">
                  <span><img src="${weather.forecast.forecastday[i].day.condition.icon}" alt"${weather.forecast.forecastday[i].day.condition.text}"></span>
                  <h4 class="fs-1 fw-bolder pt-2 ">${weather.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h4>
                  <h4 class="fs-6 fw-bolder pb-2 ">${weather.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</h4>
                  <h5 class="fs-6">${weather.forecast.forecastday[i].day.condition.text}</h5>
                  
                </div>
                
              </div>
              <h6 class="card-footer ${i%2==0?'text-white border-info':'fw-bold border-black text-black'} mb-0  text-end">${i==1 ? 'Tomorrow': i==2 ? 'AfterTomorrow':0}</h6>
              
            </div>
      `
    
  }
  document.querySelector('.card-group').innerHTML = box;

}
function currentLocation(params) {
  setUs(localStorage.removeItem('search'))
  setUs(localStorage.getItem('currentLoc'))
}
brand.addEventListener('click', function () {
  currentLocation()
 
})
function active(i) {
  for (let x = 0; x < qBtn.length; x++) {
    qBtn[x].classList.remove('active')
    
  }
  qBtn[i].classList.add('active')
}
for (let i = 0; i < qBtn.length; i++) {
  qBtn[i].addEventListener('click', function () {
    active(i)
    if (i==0) {
      currentLocation()
    } else {
      localStorage.setItem('search', qBtn[i].innerHTML)
      setUs(qBtn[i].innerHTML)
    }
  })
  
  
}
searchInp.addEventListener('input',function () {
  localStorage.setItem('search', searchInp.value)
  setUs(localStorage.getItem('search'))
})
searchInp.addEventListener('keydown',function (e) {
  if (e.key == 'Enter') {
    localStorage.setItem('search', searchInp.value)
    setUs(searchInp.value)
    searchInp.value = ""
  } 
})
