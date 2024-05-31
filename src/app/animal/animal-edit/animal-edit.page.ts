import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { collection, addDoc, updateDoc, Firestore, doc, getDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { getDownloadURL, uploadBytesResumable, Storage, ref, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./animal-edit.page.scss'],
})
export class AnimalEditPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  id: any;  //atributo que recibe el id del reg. desde la ruta
  isNew: boolean = false;
  animal: any = {};
  fecha: Date = new Date();

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) { }

  //metodo de la interfaz OnInit
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log("params", params);
      this.id = params.id;
      if (params.id == 'new') {
        this.isNew = true;
      } else {
        this.obtenerAnimal(this.id);
      }
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  
  editarAnimal = () => {
    console.log("Aqui editar en firebase");
    const document = doc(this.firestore, "animal", this.id);

    updateDoc(document, {
      nombre: this.animal.nombre,
      especie: this.animal.especie,
      edad: this.animal.edad,
      genero: this.animal.genero,
      fecha : new Date(this.animal.fecha),
      estado: this.animal.estado,
      //avatar: this.avatar,
    }).then(() => {
      console.log("Registro Editado");
      this.presentSuccessAlert();
      this.router.navigate(['/animal-list']);
    }).catch(error => {
      console.error("Error al editar el registro", error);
    });

  }

  //Mensaje de que ha guardado
  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Guardada con éxito',
      buttons: ['OK']
    });

    await alert.present();
  }

  guardarAnimal() {
    if (this.validarCampos()) {
      if (this.isNew) {
        this.incluirAnimal();
      } else {
        this.editarAnimal();
      }
    } else {
      let errorMessage = '';
      if (!this.animal.nombre || !this.animal.especie || !this.animal.edad || !this.animal.genero || !this.animal.fecha || !this.animal.estado) {
        errorMessage = 'Por favor, complete todos los campos.';
      } else if (!(/^\d+$/.test(this.animal.edad))) {
        errorMessage = 'Edad debe ser un número positivo.';
      } else if (parseInt(this.animal.edad) < 0) {
        errorMessage = 'El código debe ser un número positivo.';
      }
      // Mostrar mensaje de error
      this.presentErrorAlert(errorMessage);
    }
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error al guardar',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  validarCampos(): boolean {
    return this.animal.nombre && this.animal.especie && this.animal.genero && this.animal.fecha && this.animal.estado && /^\d+$/.test(this.animal.edad);
  }

  isValidForm(): boolean {
    return this.animal.nombre && this.animal.especie && this.animal.genero && this.animal.fecha && this.animal.estado && /^\d+$/.test(this.animal.edad);
  }

  incluirAnimal = () => {
    console.log("Aqui incluir en firebase");
    let animalRef = collection(this.firestore, "animal");
  
    addDoc(animalRef, {
      nombre: this.animal.nombre,
      especie: this.animal.especie,
      edad: this.animal.edad,
      genero: this.animal.genero,
      fecha : new Date(this.animal.fecha),
      estado: this.animal.estado,
     // avatar: ''
    }).then((docRef) => {
      console.log("Registro Incluido con ID:", docRef.id);
      this.id = docRef.id;
    /*  if (this.avatar) {
        this.editarAvatar(this.avatar);
      }*/
      this.presentSuccessAlert();
      this.router.navigate(['/animal-list']);
    }).catch(error => {
      console.error("Error al incluir animal:", error);
    });
  }
  

  async eliminarAnimal() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            // Eliminar el registro
            this.eliminarRegistro();
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarRegistro() {
    console.log("Aqui eliminar en firebase");
    const document = doc(this.firestore, "animal", this.id);

    deleteDoc(document).then(() => {
      console.log("Registro Eliminado");
      this.router.navigate(['/animal-list']);
    }).catch(error => {
      console.error('Error al eliminar animal:', error);
    });
  }

  obtenerAnimal = (id: string) => {
    const document = doc(this.firestore, "animal", id);
    getDoc(document).then(doc => {
      console.log("Registro a editar", doc.data());
      if (doc.data()) {
        this.animal = doc.data();

        this.animal.fecha = this.animal.fecha.toDate()?.toISOString()
        .substring(0, 10)+"";
      }
    }).catch(error => {
      console.error("Error al obtener animal", error);
    });
  }

}
