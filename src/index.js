import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNqYW51cyIsImEiOiJjamtsZnVjYTIwMzNvM3ZybjBmZHp0aWsxIn0.tvh9DA0ZzrzIVbD3RaoZQg';

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = function(){
  var map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v10'
  });
}
registerServiceWorker();
