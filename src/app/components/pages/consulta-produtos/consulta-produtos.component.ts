import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-produtos',
  imports: [
    CommonModule, //diretivas básicas de componente do angular
    FormsModule, //diretivas de formulário do angular
    ReactiveFormsModule //diretivas de formulário reativo do angular
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent {

produtos: any[] = [];
mensagem: string = '';

  constructor(private http:HttpClient ){}

  //criando o formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(3)]),
  });  

  //metodo para verificar se os campos estáo com erro
  get f(){
    return this.form.controls;
  }

  //metodo para enviar o formulario
  onSubmit(){
    this.http.get('http://localhost:8080/api/produtos/consultar/' + this.form.value.nome)
    .subscribe({
      next: (data) =>{
        this.produtos = data as any[];
        this.mensagem = `Quantidade de registros  ${this.produtos.length}`;
        console.log(data);  
      }
    })
  }

}
