import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./animal-list.page.scss'],
})
export class AnimalListPage implements OnInit {

  constructor(private readonly firestore: Firestore) { }

  listaAnimal = new Array();
  maxResults = 10;
  ultimoAnimalRecuperado: any = null;
  isSearch: boolean = false;
  query = "";
  registrosCargados = false;

  ngOnInit() {
    if (!this.registrosCargados) {
      this.listarAnimal();
    }
  }

 /* ionViewWillEnter() {
    if (!this.registrosCargados) {
      this.listarAnimal();
    }
  }*/

  ionViewWillEnter() {
    // Reset list and reload when entering the view
    this.listaAnimal = [];
    this.ultimoAnimalRecuperado = null;
    this.listarAnimal();
  }

  listarAnimalSinFiltro = () => {
    const animalRef = collection(this.firestore, 'animal');

    let q;
    if (!this.ultimoAnimalRecuperado) {
      q = query(animalRef, limit(this.maxResults));
    } else {
      q = query(animalRef, limit(this.maxResults), startAfter(this.ultimoAnimalRecuperado));
    }
    getDocs(q).then(re => {
      let total = re.docs.length;

      if (!re.empty) {
        re.forEach(doc => {
          this.ultimoAnimalRecuperado = re.docs[re.docs.length - 1];
          let animal: any = doc.data();
          animal.id = doc.id;

          this.listaAnimal.push(animal);
        });
      }
    });
  }

  listarAnimal = () => {
    const animalRef = collection(this.firestore, 'animal');

    if ((this.query + "").length > 0) {
      let q = undefined;
      if (this.ultimoAnimalRecuperado) {
        q = query(animalRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults),
          startAfter(this.ultimoAnimalRecuperado));
      } else {
        q = query(animalRef,
          where("nombre", ">=", this.query.toUpperCase()),
          where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.maxResults));
      }

      getDocs(q).then(re => {
        if (!re.empty) {
          let nuevoArray = new Array();

          for (let i = 0; i < re.docs.length; i++) {
            const doc: any = re.docs[i].data();
            if (doc.nombre.toUpperCase().startsWith(this.query.toUpperCase().charAt(0))) {
              nuevoArray.push(re.docs[i])
            }
          }

          this.ultimoAnimalRecuperado = re.docs[nuevoArray.length - 1];
          for (let i = 0; i < nuevoArray.length; i++) {
            const doc: any = nuevoArray[i];
            let animal: any = doc.data();
            animal.id = doc.id;
            this.listaAnimal.push(animal);

          }

        }
      });

    } else {
      this.listarAnimalSinFiltro();
    }

    this.registrosCargados = true; // Marcamos que los registros han sido cargados
  }

  onIonInfinite(ev: any) {
    this.listarAnimal();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  clickSearch = () => {
    this.isSearch = true;
  }

  clearSearch = () => {
    this.isSearch = false;
    this.query = "";

    this.listaAnimal = new Array();
    this.ultimoAnimalRecuperado = null;
    this.registrosCargados = false; // Marcamos que los registros deben volver a cargarse
    this.listarAnimal();
  }

  buscarSearch = (e: any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaAnimal = new Array();
    this.ultimoAnimalRecuperado = null;
    this.registrosCargados = false; // Marcamos que los registros deben volver a cargarse
    this.listarAnimal();
  }

}
