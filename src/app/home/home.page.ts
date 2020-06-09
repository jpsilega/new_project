import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mapRef = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();


  origen = { lat: -34.8434620 , lng: -56.145936599999994 };

  destino = { lat: -34.8432529, lng: -56.147936588899994 };
  

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) { }



  ngOnInit() {
    this.CargarMapa()
    
  }


 async CargarMapa(){
      const loading = await this.loadingCtrl.create();
      loading.present();   
     
      const myLatLng = await this.getLocalizacion();

    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.mapRef = new google.maps.Map(mapEle, {
      //center: myLatLng,
      center: this.origen,
      zoom: 16
    });
    this.directionsDisplay.setMap(this.mapRef);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.AddMarker(myLatLng.lat, myLatLng.lng);
      console.log(myLatLng.lat, myLatLng.lng);
     // this.calculateRoute();
    });
    
  }

  private calculateRoute(){
    this.directionsService.route({
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('No se pudieron mostrar las direcciones debido a: ' + status);
      }
    });
  }

  private AddMarker(latitud: number, longitud: number){
    const marker = new google.maps.Marker({
      position: {
        lat: latitud,
        lng: longitud
      },
      zoom: 8,
      map: this.mapRef,
      title: 'Estoy!'
    });
  }

  private async getLocalizacion(){
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
   
  }


}
