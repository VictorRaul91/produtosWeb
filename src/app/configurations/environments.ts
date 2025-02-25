//endereco da api local
const apiUrl = "http://localhost:8080";

//mapeando endpoints

export const endpoints = {
    cadastrar_produto: `${apiUrl}/api/produtos/cadastrar`,
    atualizar_produto: `${apiUrl}/api/produtos/atualizar`,
    excluir_produto: `${apiUrl}/api/produtos/excluir`,
    consultar_produtos: `${apiUrl}/api/produtos/consultar`,
    obter_produto: `${apiUrl}/api/produtos/obter`,
    consultar_categorias: `${apiUrl}/api/categorias/consultar`
};