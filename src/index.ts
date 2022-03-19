const ApiURL="https://icanhazdadjoke.com/";
const ApiWeather="https://api.openweathermap.org/data/2.5/";
const apiWeatherKey="b27d17915c9a48af6fd599494e734cfe";
const ApiChuckURL="https://api.chucknorris.io/jokes/random";
var change=false;
let reportJokes:any=[];
var src="";

//ej1
//obtenemos el chiste con petición a la api
function getJoke() {
    fetch(`${ApiURL}`,{headers:{ 'Accept': 'application/json'}})
    .then(response=>response.json())
    .then(joke =>{
        //mostramos el chiste
        let contenedor= document.getElementById("text");
        contenedor!.innerHTML='';
        contenedor!.innerHTML=joke.joke;
        document.getElementById('mostrar')?.classList.remove('hide');   
    });

    change=false; //para ejercicio 5
}

//Ej 3
//hacemos la valoración de los chistes
function setValue(event:any){
    let score=0;
    let joke=document.getElementById("text")!.innerHTML;
    let date=new Date().toISOString();
    switch (event.target.innerHTML) {
        case 'Malo':
            score=1;
            break;
        case 'Regular':
            score=2;
            break;
        case 'Genial':
            score=3;
            break;
        default:
            break;
    }
    //creamos el reporte de los chistes
    let object={joke:joke,score:score,date:date};
    reportJokes.push(object);
    document.getElementById('mostrar')?.classList.add('hide');
    console.log(reportJokes);
}

//ej4

function getWeather() {
    
    //obtenemos posición navegador
    navigator.geolocation.getCurrentPosition( async function(position) {
        var lat=position.coords.latitude;
        var lon= position.coords.longitude;
        
        //hacemos la petición a la api atmosférica
        await fetch(`${ApiWeather}weather?lat=${lat}&lon=${lon}&appid=${apiWeatherKey}`)
        .then(response => response.json())
        .then(weather =>{
        //mostramos el valor (lo dejo comentado porque en el ej5 lo hacemos de otra manera)
        //document.getElementById('weather')!.innerHTML=weather.weather[0].main;

        //obtenemos el icono
        switch (weather.weather[0].description) {
            case 'clear sky':
                src= "http://openweathermap.org/img/wn/01d@2x.png"
            break;
            case 'few clouds':
                src= "http://openweathermap.org/img/wn/02d@2x.png"
            break;
            case 'scattered clouds':
                src= "http://openweathermap.org/img/wn/03d@2x.png"
            break;
            case 'broken clouds':
                src= "http://openweathermap.org/img/wn/04d@2x.png"
              break;
            case 'shower rain':
                src= "http://openweathermap.org/img/wn/09d@2x.png"
              break;
            case 'rain':
                src= "http://openweathermap.org/img/wn/10d@2x.png"
              break;
            case 'thunderstorm':
                src= "http://openweathermap.org/img/wn/11d@2x.png"
              break;
            case 'snow':
                src= "http://openweathermap.org/img/wn/13d@2x.png"
              break;
            case 'mist':
                src= "http://openweathermap.org/img/wn/50d@2x.png"
              break;
            
            default:
                document.getElementById('weather')!.innerHTML=weather.weather[0].main;
              break;
        } 
         
         //mostramos el icono y la temperatura según indica el ej 5
        var image=document.createElement('img');
        image.setAttribute('src',src);
        document.getElementById('weather')!.appendChild(image);
        document.getElementById('weather')!.innerHTML+='| '+(((weather.main.temp)-32)/1,8)+' º';
        console.log(weather);
        });    
       
    });
}

window.onload=function(){
    getWeather();
}

//ej5
//obtenemos chiste de la api de Chuck Norris
function getJokeChuck() {
    fetch(`${ApiChuckURL}`)
    .then(response=>response.json())
    .then(joke =>{
        //mostramos el chiste
        let contenedor= document.getElementById("text");
        contenedor!.innerHTML='';
        contenedor!.innerHTML=joke.value;
        document.getElementById('mostrar')?.classList.remove('hide'); 
    });
    change=true; 
}

//mostramos alternativamente chistes de una api u otra
function toggle(){
    change ?  getJoke() :getJokeChuck();
}
