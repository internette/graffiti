import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNqYW51cyIsImEiOiJjamtsZnVjYTIwMzNvM3ZybjBmZHp0aWsxIn0.tvh9DA0ZzrzIVbD3RaoZQg';

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = function(){
  if(window.location.pathname.length <= 1){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var points = JSON.parse(xhttp.responseText).features;
        var midpoint = points.map(function(point){
          return [point.geometry.coordinates[0], point.geometry.coordinates[1]];
        }).reduce(function(accumulator, currentValue){ return [(accumulator[0] + currentValue[0])/2, (accumulator[1] + currentValue[1])/2] });
        var map = new mapboxgl.Map({
          container: 'map-container',
          style: 'mapbox://styles/mapbox/light-v9',
          center: midpoint,
          zoom: 12
        });
        map.on("load", function(){
          for(var point of points){
            var marker_elm = document.createElement('div');
            marker_elm.classList = 'graffiti';
            marker_elm.style.backgroundColor = point.properties['primary-color'];
  
            // Creating Popup Content
            // -- Container
            var popup_content = document.createElement('div');
            popup_content.classList = 'mapbox-popup';
            // -- Inner Content
              // -- Image
              var img_cont = document.createElement('div');
              img_cont.classList = 'popup-img-cont';
              var image = document.createElement('div');
              image.classList = 'popup-img';
              image.style.backgroundImage = `url(${point.properties.name.split('public')[1].replace(/full_width/i, 'thumbnails').split('.')[0]}_thumb.jpg)`;
              // -- Full Size Image
              var img_fullsize_button = document.createElement('a');
              img_fullsize_button.classList = 'popup-img-zoom';
              img_fullsize_button.href = point.properties.name.split('public')[1];
              img_fullsize_button.target = '_blank';
              img_fullsize_button.innerText = '+';
              image.appendChild(img_fullsize_button);
              img_cont.appendChild(image);
              popup_content.appendChild(img_cont);
              // -- Title Bar
              var title = document.createElement('div');
              title.classList = 'popup-title';
              // title.innerHTML = '<span class="circle" style="background-color:' + point.properties['primary-color'] +'"></span>' + point.properties.name;
  
  
            var popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(popup_content.outerHTML);
            new mapboxgl.Marker(marker_elm)
              .setLngLat(point.geometry.coordinates)
              .setPopup(popup)
              .addTo(map);
          }
        });
      }
    }
    xhttp.open("GET", `${process.env.PUBLIC_URL}/json/images.geojson`, true);
    xhttp.send();
  }
}
registerServiceWorker();
