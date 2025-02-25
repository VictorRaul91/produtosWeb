import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoints } from '../../../configurations/environments';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule,  //biblioteca de componentes comuns
    FormsModule, //biblioteca de formulario 
    ReactiveFormsModule //biblioteca de formularios reativos
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {

  //ATRIBUTOS
  categorias: any[] = [];  // array de objetos json
  mensagem: string = '';

  //construtor
  constructor(private http: HttpClient){}


  //funcao executada ao iniciar componente
  ngOnInit(){
    //fazendo uma requisicao get para a API
    this.http.get(endpoints.consultar_categorias)
    .subscribe({  //aguardando retorno da API
      next:(data) =>{ //CAPTURANDO DADOS OBTIDOS
       //atribuindo os dados obtidos a variavel categorias
       this.categorias = data as any[];
      }
    })
  }


  form = new FormGroup({
    nome : new FormControl('',[
      Validators.required, // campo obrigatorio
      Validators.minLength(8), Validators.maxLength(100)
    ]),
    preco : new FormControl('', [
      Validators.required, 
      Validators.min(0.01)
    ]),
    quantidade : new FormControl('', [
      Validators.required, Validators.min(0)
    ]),
    categoriaId : new FormControl('',[
      Validators.required
    ])
});

//funcao auxiliar se cada campo foi prenchido corretamente
get f(){
  return this.form.controls;
}

//funcao para capturar o evento SUBMIT do formulario
onSubmit(){
 //fazendo uma requisicao POST para o endpoint de cadastro de produtos
 this.http.post(endpoints.cadastrar_produto,this.form.value)
 .subscribe({ // aguardando o retorno da API
  next:(data: any) =>{ //capturando os dados obtidos
    this.mensagem = data.message; // capturando mensagem de retorno
    
    console.log(data);
    this.form.reset();
  } 
  
 })

 
}

}
