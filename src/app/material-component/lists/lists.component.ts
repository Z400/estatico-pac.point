import { CommonModule, DatePipe, Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MaterialComponentService } from '../material-component.service';
import { Colaborador } from '../buttons/Colaborador';
import { NovaRotina } from '../grid/NovaRotina';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiResponse } from '../buttons/ApiResponse';
 
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [DemoMaterialModule, CommonModule, MatListModule, NgFor, MatIconModule, MatDividerModule, DatePipe, FormsModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit{

    constructor(private service: MaterialComponentService, private location: Location){}
 

  ngOnInit(): void {
   this.listarColaboradores();
    this.listarItinerarios();
   
  }

  listColaboradores: Colaborador[] = [];
  listItinerarios: NovaRotina[] = [];

  messageSuccess: ApiResponse | undefined | null;
  messageError: String | undefined | null;
  
  messageSuccessDeleting:  ApiResponse | undefined | null;
  messageErrorDeleting:  String | undefined | null;
 
  messageSuccessDeletingItinierario: ApiResponse | undefined | null;
  messageErrorDeletingItinierario : String | undefined | null;

  messageSuccessAtualizacao: ApiResponse | undefined | null;
  messageErrorAtualizacao: String | undefined | null;

  itemSelecionado: Colaborador | undefined;
  itemSelecionadoItinerario: NovaRotina | undefined;

  

    selecionarItem(data: any){
      this.itemSelecionado = data;
    }

    selecionarItemItinerario(data: any){
      this.itemSelecionadoItinerario = data;
      console.log("Itinerario selecionado:", this.itemSelecionadoItinerario);
    }


  public listarColaboradores(){
    this.service.listarColaboradores().
    subscribe( 
      (res) => {
        console.log("Res funct listar:", res);
        this.listColaboradores = res;
      }, (error) => {
        console.log("Error funct listar:", error);
      }
    )
  }

  public listarItinerarios(){
    return this.service.listarItinerarios().
    subscribe( 
      (res) => {
        this.listItinerarios = res;
        console.log("Res itinirearios:", res);
        }, (error) => {
          console.log("Erro funct listItinerarios:", error);
        }
    )
  }


  public deletarColaborador(codigo: any, form: NgForm) {
        const nome = form.value.validarNome;
      
        // Comparar a string `nome` com `this.itemSelecionado?.nome`
        if (nome === this.itemSelecionado?.nome) {
          return this.service.deletarColaborador(codigo)
            .subscribe(
              (res) => {

                this.messageSuccessDeleting = res;
                console.log("Colaborador deletado!", res);
                this.messageErrorDeleting = null;

                setTimeout( () => {
                  form.reset();
                  window.location.reload();
                }, 3000)

              },
              (HttpErrorResponse) => {
                this.messageSuccessDeleting = null; 
                this.messageErrorDeleting = "Erro interno de servidor!";
                console.log("Erro func deletarColaborador:", HttpErrorResponse);
              }
            );
        }
        alert("O nome digitado não é igual ao colaborador selecionado!");
 
        return;
  }
  
  public deletarItinerario(codigo: any){
    this.service.deletarItinetario(codigo).
    subscribe(
      (res) => {
        this.messageSuccessDeletingItinierario = res;
        console.log("Res funct deletarItinerario:", res);
        this.messageErrorDeletingItinierario = null;
        setTimeout(() => {
          window.location.reload();
        }, 3000)


      }, (error)  => {
        this.messageErrorDeletingItinierario = "Erro interno de servidor!";
        console.log("Error funct deletarItinerario:", error);
      }
    )
  }


  public atualizarColaborador(form: NgForm){
    const data: Colaborador = {
      nome: form.value.nome ? form.value.nome : this.itemSelecionado?.nome,
      funcao: form.value.funcao ? form.value.funcao : this.itemSelecionado?.funcao,
      email: form.value.email ? form.value.email : this.itemSelecionado?.email,
      contato: form.value.contato ? form.value.conta : this.itemSelecionado?.contato,
      dataNascimento: form.value.dataNascimento ? form.value.dataNascimento : this.itemSelecionado?.dataNascimento,
      jornadaTrabalho: form.value.jornadaTrabalho ? form.value.jornadaTrabalho : this.itemSelecionado?.jornadaTrabalho,
      id: undefined,
      registro: undefined,
      codigo: undefined
    }
      console.log("Dados funct atualizarColaborador:", data);

      this.service.atualizarColaborador(this.itemSelecionado?.registro, data).
      subscribe (
        (res) => {
          this.messageSuccess = res;
          this.messageError = null;

          setTimeout( () => {
            form.reset();
          window.location.reload();
          this.messageSuccess= null;
          window.location.reload();
          },3000)
           
        }, (HttpErrorResponse) => {
          if(HttpErrorResponse)
            this.messageSuccess= null;
            this.messageError = "Erro interno de servidor!";
         
        }
      )

  }

  public atualizarItinerario(form: NgForm){

    const data: NovaRotina = {
      inicioTrabalho: form.value.inicioTrabalho ? form.value.inicioTrabalho : this.itemSelecionadoItinerario?.inicioTrabalho,
      inicioAlmoco: form.value.inicioAlmoco ? form.value.inicioAlmoco : this.itemSelecionadoItinerario?.inicioAlmoco,
      fimAlmoco: form.value.fimAlmoco ? form.value.fimAlmoco : this.itemSelecionadoItinerario?.fimAlmoco,
      fimTrabalho: form.value.fimTrabalho ? form.value.fimTrabalho : this.itemSelecionadoItinerario?.fimTrabalho,
      id: undefined
    }
      console.log("Dados passados para o backend:", data);
      this.service.atualizarItinerarios(this.itemSelecionadoItinerario?.id, data).
      subscribe(
        (res) => {
          this.messageSuccessAtualizacao = res;
          this.messageErrorAtualizacao = null;
          console.log(res);
          setTimeout( () => {
            form.reset();
            window.location.reload();
          }, 3000);
        }, (error) => {
          console.log(error);
          // if(HttpErrorResponse){
          //   this.messageErrorAtualizacao = "Erro interno de servidor!";
          //   this.messageSuccessAtualizacao = null;
          // }
        }
      )



  }

 
  



}
