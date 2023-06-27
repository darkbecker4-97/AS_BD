//COMANDOS PARA FAZER O CRUD ->

//Inserir Clientes:
db.clientes.insertOne({
  nome: "Nome do Cliente",
  endereco: "Endereço do Cliente",
  telefone: "Telefone do Cliente",
});

//Consultar clientes:
db.clientes.find({ nome: "Nome do Cliente" });

//Atualizar o telefone do cliente:
db.clientes.updateOne(
  { _id: ObjectId("ID do Cliente") },
  { $set: { telefone: "Novo Telefone" } }
);

//ou atualizar todas as infos do cli:
db.clientes.updateOne(
  { _id: ObjectId("ID do Cliente") },
  {
    $set: {
      telefone: "Novo Telefone",
      nome: "Novo Nome",
      endereco: "Novo Endereço",
    },
  }
);

//Excluir clientes:
db.clientes.deleteOne({ _id: ObjectId("ID do Cliente") });

//----------------------------------

//Inserir pizzas:
db.pizzas.insertOne({
  nome: "Nome da Pizza",
  tamanhos: ["Tamanho 1", "Tamanho 2"],
  precos: [
    { tamanho: "Tamanho 1", preco: 10 },
    { tamanho: "Tamanho 2", preco: 15 },
  ],
});

//Consultar pizzas:
db.pizzas.find({ nome: "Nome da Pizza" });

//Atualizar pizzas:
db.pizzas.updateOne(
  { _id: ObjectId("ID da Pizza") },
  { $set: { nome: "Novo Nome" } }
);

//Excluir pizzas:
db.pizzas.deleteOne({ _id: ObjectId("ID da Pizza") });

//------------------------------------

//Inserir bebidas:
db.bebidas.insertOne({
  nome: "Nome da Bebida",
  preco: 5,
});

//Consultar bebidas:
db.bebidas.find({ nome: "Nome da Bebida" });

//Atualizar bebidas:
db.bebidas.updateOne({ _id: ObjectId("ID da Bebida") }, { $set: { preco: 8 } });

//Excluir bebidas:
db.bebidas.deleteOne({ _id: ObjectId("ID da Bebida") });

//------------------------------------

//Inserir pedidos:
db.pedidos.insertOne({
  cliente_id: ObjectId("ID do Cliente"),
  data_hora: new Date(),
  tipo: "Tipo de Entrega",
  endereco_entrega: "Endereço de Entrega",
  itens: [
    {
      produto_id: ObjectId("ID do Produto"),
      tipo: "Tipo do Produto",
      quantidade: 2,
    },
  ],
  total: 20,
});

//Consultar pedidos:
db.pedidos.find({ cliente_id: ObjectId("ID do Cliente") });

//Atualizar pedidos:
db.pedidos.updateOne(
  { _id: ObjectId("ID do Pedido") },
  {
    $push: {
      itens: {
        produto_id: ObjectId("ID do Produto"),
        tipo: "Tipo do Produto",
        quantidade: 1,
      },
    },
  }
);

//Excluir pedidos:
db.pedidos.deleteOne({ _id: ObjectId("ID do Pedido") });

//------------------------------------

//5-Comandos MongoDB para as consultas que devem incluir pelo menos uma de cada: consulta simples,
//consulta com uma condição.
// Consulta simples para listar todos os clientes
db.clientes.find();

//Com condição: // Consulta para encontrar um cliente específico com base no nome
db.clientes.find({ nome: "Nome do Cliente" });

//6-Comando MongoDB com 2 consultas usando Aggregate.
//uma que utilize join e outra que utilize group by.
// Consulta que realiza um join entre as coleções pedidos e clientes
db.pedidos.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente",
    },
  },
  {
    $unwind: "$cliente",
  },
  {
    $project: {
      _id: 0,
      pedido_id: "$_id",
      cliente_nome: "$cliente.nome",
      cliente_endereco: "$cliente.endereco",
    },
  },
]);

//Consulta usando group by (agregação com $group):
// Consulta que realiza um group by na coleção pizzas para obter o total de vendas por categoria
db.pizzas.aggregate([
  {
    $group: {
      _id: "$categoria",
      totalVendas: { $sum: "$vendas" },
    },
  },
]);

//7-Índices apropriados para melhorar o desempenho das consultas. Explicar por que desses índices.
//Criando índice no campo "cliente_id" da coleção "pedidos" :
db.pedidos.createIndex({ cliente_id: 1 });

//Usando o Index e colocando o id de um cliente para retornar seu pedido:
db.pedidos
  .find({ cliente_id: "6491f5d1100f96b4467cb3bf" })
  .hint({ cliente_id: 1 });

db.pedidos.createIndex({ cliente_id: 2 });
cliente_id_2;
db.pedidos
  .find({ cliente_id: "6491f5d9100f96b4467cb3c0" })
  .hint({ cliente_id: 2 });

/*7-PORQUE CRIAMOS UM ÍNDICE PARA RETORNAR O(OS) PEDIDO(S) DE UM CLIENTE EM EXPECÍFICO? 
criar um índice no campo que representa o ID do cliente ajuda o banco de dados a encontrar os pedidos de um cliente específico de forma rápida. 
Isso melhora o desempenho do sistema, porque reduz o tempo necessário para fazer essa pesquisa. É como ter um índice em um livro, onde você pode ir 
diretamente para a página desejada, em vez de ler todo o livro desde o início.*/
