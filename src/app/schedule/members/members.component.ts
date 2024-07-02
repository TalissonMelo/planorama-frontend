import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  memberRequest = {
    nickname: '',
    phone: '',
    type: 'REGULAR', // Valor padrão
  };

  members: any[] = []; // Membros da agenda
  displayedMembers: any[] = []; // Membros exibidos na tabela
  allMembers: any[] = []; // Todos os membros do sistema
  searchTerm: string = '';

  ngOnInit(): void {
    // Simulação de membros da agenda (podem ser obtidos de outro componente ou serviço)
    this.members = [
      {
        id: 1,
        member: { nickname: 'user1', phone: '123456789', type: 'REGULAR' },
      },
      {
        id: 2,
        member: { nickname: 'user2', phone: '987654321', type: 'PREMIUM' },
      },
      {
        id: 3,
        member: { nickname: 'user3', phone: '555666777', type: 'REGULAR' },
      },
      {
        id: 4,
        member: { nickname: 'admin', phone: '999888777', type: 'PREMIUM' },
      },
    ];

    // Simulação de todos os membros do sistema (pode ser obtido de um serviço RESTful, por exemplo)
    this.allMembers = [
      { nickname: 'user1' },
      { nickname: 'user2' },
      { nickname: 'user3' },
      { nickname: 'admin' },
      { nickname: 'guest' },
    ];

    // Carregar membros da agenda inicialmente
    this.atualizarListaExibida();
  }

  adicionarMembro(): void {
    // Lógica para adicionar membro (simulação)
    const newMember = {
      id: this.members.length + 1,
      member: {
        nickname: this.memberRequest.nickname,
        phone: this.memberRequest.phone,
        type: this.memberRequest.type,
      },
    };
    this.members.push(newMember);
    this.memberRequest = { nickname: '', phone: '', type: 'REGULAR' }; // Limpar campos do formulário
    this.atualizarListaExibida();
  }

  buscarMembros(): void {
    // Filtrar membros do sistema com base no searchTerm
    this.displayedMembers = this.allMembers.filter((member) =>
      member.nickname.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  atualizarListaExibida(): void {
    // Atualizar a lista exibida da agenda com base na busca ou lista completa da agenda
    if (this.searchTerm.trim() !== '') {
      this.buscarMembros();
    } else {
      this.displayedMembers = this.members.slice(); // Copiar todos os membros da agenda para displayedMembers
    }
  }

  visualizarMembro(member: any): void {
    // Implementar lógica para visualizar um membro da agenda
    console.log('Visualizar membro da agenda:', member);
  }

  editarMembro(member: any): void {
    // Implementar lógica para editar um membro da agenda
    console.log('Editar membro da agenda:', member);
  }

  deletarMembro(member: any): void {
    // Implementar lógica para deletar um membro da agenda
    console.log('Deletar membro da agenda:', member);
    // Exemplo de como remover localmente (após confirmação do backend)
    const index = this.members.findIndex((m) => m.id === member.id);
    if (index !== -1) {
      this.members.splice(index, 1);
      this.atualizarListaExibida();
    }
  }

  voltar(): void {
    // Implementar lógica para voltar
    console.log('Voltando...');
    // Aqui você pode implementar a navegação para a página anterior, por exemplo:
    // this.location.back(); // Importar Location do '@angular/common'
  }
}
